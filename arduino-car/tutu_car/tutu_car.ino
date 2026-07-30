/*
 * ============================================================
 *  רכב טוטו — רכב אלחוטי בשליטת WiFi
 * ============================================================
 *  לוח:    NodeMCU (ESP8266)
 *  דרייבר: L9110S או TB6612 (אותו קוד עובד לשניהם!)
 *  מנועים: 2 (2WD)
 *
 *  איך זה עובד:
 *  הלוח מקים רשת WiFi משלו בשם TUTU-CAR.
 *  מתחברים אליה מהטלפון, גולשים ל- http://192.168.4.1
 *  ומקבלים דף עם ג'ויסטיק מגע ששולט ברכב.
 *
 *  אין צורך בראוטר ביתי ואין צורך באינטרנט —
 *  הרכב הוא הרשת. ה-USB משמש רק להעלאת הקוד, פעם אחת.
 * ============================================================
 */

#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <DNSServer.h>

// ===================== הגדרות — אפשר לשנות =====================

const char* AP_SSID = "TUTU-CAR";   // שם רשת ה-WiFi שהרכב יוצר
const char* AP_PASS = "12345678";   // הסיסמה (חייבת להיות לפחות 8 תווים)

// --- חיבורי המנועים (לפי הכיתוב שמודפס על לוח ה-NodeMCU) ---
// מנוע שמאל
const int L_PIN_FWD  = D1;   // D1 = GPIO5  -> קדימה
const int L_PIN_BACK = D2;   // D2 = GPIO4  -> אחורה
// מנוע ימין
const int R_PIN_FWD  = D5;   // D5 = GPIO14 -> קדימה
const int R_PIN_BACK = D6;   // D6 = GPIO12 -> אחורה

// אם מנוע מסתובב הפוך ממה שצריך — אל תחליפו חוטים!
// פשוט תהפכו כאן false ל-true והעלו את הקוד שוב.
const bool L_REVERSED = false;
const bool R_REVERSED = false;

// מתחת לערך הזה המנוע רק מזמזם ולא זז. אם הרכב "חלש" בהתחלה — תעלו קצת.
const int MIN_PWM = 70;

// פקודות קטנות מזה נחשבות "עצור" (אזור מת של הג'ויסטיק)
const int DEADZONE = 5;

// האצה/האטה הדרגתית: כמה מותר לשנות את המהירות בכל צעד, וכל כמה זמן צעד.
// בלי זה, היפוך פתאומי ממהירות מלאה גורם לזינוק זרם שמפיל את הסוללות.
const int SLEW_STEP = 20;
const unsigned long SLEW_INTERVAL_MS = 15;

// ביטחון: אם לא הגיעה פקודה מהטלפון תוך הזמן הזה (במילישניות) — הרכב עוצר.
// ככה אם ה-WiFi מתנתק, הרכב לא בורח לבד.
const unsigned long FAILSAFE_MS = 600;

// ================== מכאן והלאה — הקוד עצמו ==================

ESP8266WebServer server(80);
DNSServer dnsServer;
IPAddress apIP(192, 168, 4, 1);

unsigned long lastCommandTime = 0;
bool motorsRunning = false;

// המהירות שהטלפון ביקש (יעד) לעומת המהירות בפועל (מתקרבת ליעד בהדרגה)
int targetLeft = 0, targetRight = 0;
int currentLeft = 0, currentRight = 0;
unsigned long lastSlewTime = 0;

// עצירה מוחלטת של שני המנועים
void stopMotors() {
  targetLeft = targetRight = 0;
  currentLeft = currentRight = 0;
  digitalWrite(L_PIN_FWD, LOW);
  digitalWrite(L_PIN_BACK, LOW);
  digitalWrite(R_PIN_FWD, LOW);
  digitalWrite(R_PIN_BACK, LOW);
  motorsRunning = false;
}

// הפעלת מנוע אחד. value בין 100- (אחורה מלא) ל-100+ (קדימה מלא)
void driveMotor(int pinFwd, int pinBack, int value, bool reversed) {
  if (reversed) value = -value;

  int magnitude = abs(value);
  if (magnitude < DEADZONE) {          // אזור מת — נחשב עצירה
    digitalWrite(pinFwd, LOW);
    digitalWrite(pinBack, LOW);
    return;
  }
  if (magnitude > 100) magnitude = 100;

  // ממפים 1..100 אל MIN_PWM..255 כדי שהמנוע באמת יסתובב גם באיטיות
  int pwm = MIN_PWM + (int)((255 - MIN_PWM) * (long)magnitude / 100);

  if (value > 0) {
    digitalWrite(pinBack, LOW);
    analogWrite(pinFwd, pwm);
  } else {
    digitalWrite(pinFwd, LOW);
    analogWrite(pinBack, pwm);
  }
}

int clamp100(int v) {
  if (v >  100) return  100;
  if (v < -100) return -100;
  return v;
}

// מקבל את מיקום הג'ויסטיק וקובע מהירות-יעד לכל מנוע
// x: 100- (שמאלה) עד 100+ (ימינה), y: 100- (אחורה) עד 100+ (קדימה)
// s: מגבלת מהירות באחוזים (20..100)
void applyDrive(int x, int y, int s) {
  x = clamp100(x);
  y = clamp100(y);

  // ערבוב טנק קלאסי: פנייה = גלגל אחד מהר יותר מהשני
  int left  = clamp100(y + x);
  int right = clamp100(y - x);

  if (s < 0)   s = 0;
  if (s > 100) s = 100;
  targetLeft  = left  * s / 100;
  targetRight = right * s / 100;
}

// צעד אחד של התקרבות אל מהירות היעד
int slewToward(int current, int target) {
  if (current < target) {
    current += SLEW_STEP;
    if (current > target) current = target;
  } else if (current > target) {
    current -= SLEW_STEP;
    if (current < target) current = target;
  }
  return current;
}

// רץ כל הזמן מה-loop: מקרב את המנועים בהדרגה למהירות היעד
void updateMotors() {
  if (millis() - lastSlewTime < SLEW_INTERVAL_MS) return;
  lastSlewTime = millis();

  currentLeft  = slewToward(currentLeft,  targetLeft);
  currentRight = slewToward(currentRight, targetRight);

  driveMotor(L_PIN_FWD, L_PIN_BACK, currentLeft,  L_REVERSED);
  driveMotor(R_PIN_FWD, R_PIN_BACK, currentRight, R_REVERSED);
  motorsRunning = (abs(currentLeft) >= DEADZONE || abs(currentRight) >= DEADZONE);
}

// ---------- דף השליטה (נשלח לטלפון) ----------
const char CONTROL_PAGE[] PROGMEM = R"rawliteral(<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<title>רכב טוטו 🚗</title>
<style>
  * { margin:0; padding:0; box-sizing:border-box; -webkit-tap-highlight-color:transparent; }
  html, body { height:100%; overflow:hidden; }
  body {
    font-family: -apple-system, "Segoe UI", Arial, sans-serif;
    background:#10151f; color:#e8ecf4;
    display:flex; flex-direction:column; align-items:center;
    justify-content:space-between; padding:12px; user-select:none;
  }
  header { display:flex; align-items:center; gap:10px; width:100%; max-width:420px; }
  h1 { font-size:1.2rem; font-weight:700; flex:1; }
  #dot { width:14px; height:14px; border-radius:50%; background:#777; transition:background .2s; }
  #dot.ok  { background:#2ecc71; box-shadow:0 0 8px #2ecc71; }
  #dot.bad { background:#e74c3c; box-shadow:0 0 8px #e74c3c; }
  #status { font-size:.8rem; color:#9aa4b5; }

  #pad {
    position:relative; touch-action:none;
    width:min(72vw, 46vh, 340px); height:min(72vw, 46vh, 340px);
    border-radius:50%;
    background:radial-gradient(circle at 50% 40%, #1d2635, #141b28);
    border:3px solid #2a3648;
    box-shadow:inset 0 0 30px rgba(0,0,0,.5);
  }
  #pad::before, #pad::after {
    content:""; position:absolute; background:#232e40;
  }
  #pad::before { left:50%; top:8%; bottom:8%; width:2px; transform:translateX(-50%); }
  #pad::after  { top:50%; right:8%; left:8%; height:2px; transform:translateY(-50%); }
  #knob {
    position:absolute; left:50%; top:50%;
    width:34%; height:34%; border-radius:50%;
    background:radial-gradient(circle at 35% 30%, #5b8def, #2f5fc4);
    border:3px solid #7ba4f5;
    box-shadow:0 6px 16px rgba(0,0,0,.55);
    transform:translate(-50%, -50%);
  }
  .row { width:100%; max-width:420px; display:flex; flex-direction:column; gap:8px; }
  label { font-size:.9rem; color:#9aa4b5; display:flex; justify-content:space-between; }
  input[type=range] { width:100%; accent-color:#5b8def; height:34px; }
  #stopBtn {
    width:100%; padding:14px; font-size:1.15rem; font-weight:800;
    color:#fff; background:#c0392b; border:none; border-radius:14px;
    box-shadow:0 4px 0 #7f241a; cursor:pointer;
  }
  #stopBtn:active { transform:translateY(3px); box-shadow:0 1px 0 #7f241a; }
</style>
</head>
<body>
  <header>
    <h1>🚗 רכב טוטו</h1>
    <span id="status">מתחבר...</span>
    <div id="dot"></div>
  </header>

  <div id="pad"><div id="knob"></div></div>

  <div class="row">
    <label>מהירות מרבית <span id="spdVal">70%</span></label>
    <input type="range" id="spd" min="20" max="100" value="70">
    <button id="stopBtn">■ עצור הכל</button>
  </div>

<script>
  var pad = document.getElementById('pad');
  var knob = document.getElementById('knob');
  var dot = document.getElementById('dot');
  var statusEl = document.getElementById('status');
  var spdSlider = document.getElementById('spd');
  var spdVal = document.getElementById('spdVal');

  var x = 0, y = 0;          // -100..100 (y חיובי = קדימה)
  var active = false;
  var inflight = false;
  var inflightSince = 0;
  var okCount = 0, failCount = 0;

  spdSlider.addEventListener('input', function(){
    spdVal.textContent = spdSlider.value + '%';
  });

  function setKnob(nx, ny) {  // nx,ny in -1..1
    var r = pad.clientWidth / 2;
    var kx = nx * r * 0.62, ky = ny * r * 0.62;
    knob.style.transform = 'translate(calc(-50% + ' + kx + 'px), calc(-50% + ' + ky + 'px))';
  }

  function handleMove(clientX, clientY) {
    var rect = pad.getBoundingClientRect();
    var cx = rect.left + rect.width / 2;
    var cy = rect.top + rect.height / 2;
    var dx = (clientX - cx) / (rect.width / 2);
    var dy = (clientY - cy) / (rect.height / 2);
    var len = Math.sqrt(dx*dx + dy*dy);
    if (len > 1) { dx /= len; dy /= len; }
    setKnob(dx, dy);
    x = Math.round(dx * 100);
    y = Math.round(-dy * 100);  // מסך: למטה = חיובי, אצלנו: קדימה = חיובי
  }

  function release() {
    active = false;
    x = 0; y = 0;
    setKnob(0, 0);
    send(true);
  }

  pad.addEventListener('pointerdown', function(e){
    active = true;
    pad.setPointerCapture(e.pointerId);
    handleMove(e.clientX, e.clientY);
    e.preventDefault();
  });
  pad.addEventListener('pointermove', function(e){
    if (active) { handleMove(e.clientX, e.clientY); e.preventDefault(); }
  });
  pad.addEventListener('pointerup', release);
  pad.addEventListener('pointercancel', release);

  document.getElementById('stopBtn').addEventListener('click', function(){
    release();
  });

  // גם חצים במקלדת (נוח לבדיקה מהמחשב)
  var keys = {};
  function keysToXY() {
    y = (keys.ArrowUp ? 100 : 0) + (keys.ArrowDown ? -100 : 0);
    x = (keys.ArrowRight ? 100 : 0) + (keys.ArrowLeft ? -100 : 0);
    setKnob(x/100, -y/100);
  }
  document.addEventListener('keydown', function(e){
    if (document.activeElement && document.activeElement.tagName === 'INPUT') return;
    if (e.key.indexOf('Arrow') === 0) { keys[e.key] = true; keysToXY(); e.preventDefault(); }
  });
  document.addEventListener('keyup', function(e){
    if (document.activeElement && document.activeElement.tagName === 'INPUT') return;
    if (e.key.indexOf('Arrow') === 0) { keys[e.key] = false; keysToXY(); e.preventDefault(); }
  });

  function setStatus(ok) {
    if (ok) {
      okCount++; failCount = 0;
      dot.className = 'ok';
      statusEl.textContent = 'מחובר';
    } else {
      failCount++;
      if (failCount >= 2) {
        dot.className = 'bad';
        statusEl.textContent = 'אין קשר לרכב!';
      }
    }
  }

  function send(force) {
    // בקשה שנתקעה יותר מחצי שנייה לא חוסמת את הבאות (חשוב ברשת חלשה)
    if (inflight && !force && (Date.now() - inflightSince) < 500) return;
    inflight = true;
    inflightSince = Date.now();
    var controller = new AbortController();
    var timer = setTimeout(function(){ controller.abort(); }, 400);
    var url = '/drive?x=' + x + '&y=' + y + '&s=' + spdSlider.value;
    fetch(url, { cache: 'no-store', signal: controller.signal })
      .then(function(r){ clearTimeout(timer); setStatus(r.ok); inflight = false; })
      .catch(function(){ clearTimeout(timer); setStatus(false); inflight = false; });
  }

  // שולחים פקודה כל 120 אלפיות שנייה — גם כשעומדים,
  // כדי שהרכב ידע שהקשר חי (אחרת הוא עוצר לבד מטעמי בטיחות)
  setInterval(function(){ send(false); }, 120);
</script>
</body>
</html>)rawliteral";

// ---------- טיפול בבקשות מהדפדפן ----------

void handleRoot() {
  server.send_P(200, "text/html", CONTROL_PAGE);
}

void handleDrive() {
  int x = server.arg("x").toInt();
  int y = server.arg("y").toInt();
  int s = server.hasArg("s") ? server.arg("s").toInt() : 100;
  applyDrive(x, y, s);
  lastCommandTime = millis();
  server.send(200, "text/plain", "ok");
}

void handleStop() {
  stopMotors();
  lastCommandTime = millis();
  server.send(200, "text/plain", "stopped");
}

// כל כתובת לא מוכרת -> מפנים לדף השליטה (עוזר לטלפון למצוא את הדף)
void handleNotFound() {
  server.sendHeader("Location", "http://192.168.4.1/", true);
  server.send(302, "text/plain", "");
}

void setup() {
  // קודם כל, לפני כל דבר אחר: להשתיק את המנועים
  // (אחרת הם עלולים לרטוט לרגע בהדלקה)
  pinMode(L_PIN_FWD, OUTPUT);
  pinMode(L_PIN_BACK, OUTPUT);
  pinMode(R_PIN_FWD, OUTPUT);
  pinMode(R_PIN_BACK, OUTPUT);
  stopMotors();

  Serial.begin(115200);
  delay(100);
  Serial.println();
  Serial.println("TUTU CAR starting...");

  // טווח PWM אחיד של 0..255 בכל גרסאות הספרייה
  analogWriteRange(255);
  analogWriteFreq(1000);

  // מקימים רשת WiFi עצמאית
  WiFi.mode(WIFI_AP);
  WiFi.softAPConfig(apIP, apIP, IPAddress(255, 255, 255, 0));
  WiFi.softAP(AP_SSID, AP_PASS);

  // שרת DNS קטן: כל כתובת שמקלידים מובילה לרכב
  dnsServer.start(53, "*", apIP);

  server.on("/", handleRoot);
  server.on("/drive", handleDrive);
  server.on("/stop", handleStop);
  server.onNotFound(handleNotFound);
  server.begin();

  // הנורה הכחולה על הלוח נדלקת = הרשת מוכנה (בנורה הזאת LOW = דולק)
  pinMode(LED_BUILTIN, OUTPUT);
  digitalWrite(LED_BUILTIN, LOW);

  Serial.print("WiFi network: ");
  Serial.println(AP_SSID);
  Serial.println("Control page: http://192.168.4.1");
}

void loop() {
  dnsServer.processNextRequest();
  server.handleClient();
  updateMotors();

  // ביטחון: אין פקודות מהטלפון? עוצרים.
  if ((motorsRunning || targetLeft != 0 || targetRight != 0)
      && (millis() - lastCommandTime > FAILSAFE_MS)) {
    stopMotors();
    Serial.println("Failsafe: no commands, motors stopped");
  }
}
