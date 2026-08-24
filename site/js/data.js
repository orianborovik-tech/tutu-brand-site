/* ============================================================
   Taste of Asia — אטריות אודון מוכנות
   Product data + bilingual dictionary (HE default, EN toggle)
   All copy here is original brand copy — edit freely.
   ============================================================ */

window.TOA = window.TOA || {};

/* ---------- Product / commerce data ---------- */
TOA.product = {
  id: 'udon-200',
  sku: 'TOA-UDON-200',
  currency: '₪',
  weight: '200 גרם',
  variants: [
    { id: 'single', qtyLabel: { he: 'יחידה בודדת', en: 'Single pack' }, packs: 1, price: 9.9 },
    { id: 'trio',   qtyLabel: { he: 'מארז שלישייה', en: 'Pack of 3' },  packs: 3, price: 26.9, badge: { he: 'הכי משתלם', en: 'Best value' } },
    { id: 'six',    qtyLabel: { he: 'מארז שישייה', en: 'Pack of 6' },   packs: 6, price: 49.9 },
  ],
  nutrition: [
    // per 100g — placeholder values, replace with lab values from the real label
    { key: 'energy',   he: 'אנרגיה (קלוריות)', en: 'Energy (calories)', value: '132', unit: { he: 'קק"ל', en: 'kcal' } },
    { key: 'protein',  he: 'חלבונים', en: 'Protein', value: '3.2', unit: { he: 'גרם', en: 'g' } },
    { key: 'carbs',    he: 'פחמימות', en: 'Carbohydrates', value: '27.5', unit: { he: 'גרם', en: 'g' } },
    { key: 'sugars',   he: 'מתוכן: סוכרים', en: 'of which: sugars', value: '0.6', unit: { he: 'גרם', en: 'g' }, sub: true },
    { key: 'fat',      he: 'שומנים', en: 'Fat', value: '0.5', unit: { he: 'גרם', en: 'g' } },
    { key: 'satfat',   he: 'מתוכן: שומן רווי', en: 'of which: saturated', value: '0.1', unit: { he: 'גרם', en: 'g' }, sub: true },
    { key: 'sodium',   he: 'נתרן', en: 'Sodium', value: '320', unit: { he: 'מ"ג', en: 'mg' } },
  ],
};

/* ---------- Bilingual dictionary ---------- */
TOA.i18n = {
  /* --- global / header --- */
  'brand.name':        { he: 'Taste of Asia', en: 'Taste of Asia' },
  'nav.product':       { he: 'האטריות', en: 'The Noodles' },
  'nav.about':         { he: 'הסיפור', en: 'Our Story' },
  'nav.faq':           { he: 'שאלות ותשובות', en: 'FAQ' },
  'nav.stores':        { he: 'נקודות מכירה', en: 'Where to Buy' },
  'nav.contact':       { he: 'צרו קשר', en: 'Contact' },
  'nav.buy':           { he: 'לקנייה', en: 'Shop' },
  'header.cart':       { he: 'עגלה', en: 'Cart' },
  'lang.switch':       { he: 'EN', en: 'עב' },
  'skip.content':      { he: 'דלגו לתוכן', en: 'Skip to content' },

  /* --- intro / preloader --- */
  'intro.line':        { he: 'טעם של אסיה. מוכן בדקה.', en: 'A taste of Asia. Ready in a minute.' },

  /* --- home hero --- */
  'hero.kicker':       { he: 'אטריות אודון טריות ומוכנות', en: 'Fresh, ready-to-wok udon noodles' },
  'hero.title.1':      { he: 'אטריות', en: 'Udon' },
  'hero.title.2':      { he: 'אודון', en: 'Noodles' },
  'hero.sub':          { he: 'עבות, רכות ומלאות טעם — מתאימות להקפצה, למרקים ולמנות קרות. פותחים, מקפיצים, אוכלים.', en: 'Thick, springy and full of flavor — made for stir-fries, soups and cold dishes. Open, toss, eat.' },
  'hero.cta':          { he: 'לקנות עכשיו', en: 'Shop now' },
  'hero.cta2':         { he: 'איך מכינים?', en: 'How to cook' },
  'hero.badge.kosher': { he: 'כשר פרווה', en: 'Kosher Parve' },
  'hero.badge.weight': { he: '200 גרם', en: '200 g' },
  'hero.badge.time':   { he: 'מוכן ב-60 שניות', en: 'Ready in 60 seconds' },
  'marquee.text':      { he: 'הקפצה · מרקים · סלטים קרים · מוכן בדקה · כשר פרווה ·', en: 'Stir-fry · Soups · Cold salads · Ready in a minute · Kosher Parve ·' },

  /* --- home imagesDuo --- */
  'duo.title':         { he: 'מהווק שלנו לצלחת שלכם', en: 'From our wok to your plate' },
  'duo.text':          { he: 'האודון שלנו מבושל מראש ונארז בטריות, כדי שכל מה שנשאר לכם הוא דקה אחת של הקפצה. בלי להרתיח סיר, בלי לחכות — רק טעם.', en: 'Our udon is pre-cooked and packed fresh, so all that’s left for you is one minute in the pan. No boiling, no waiting — just flavor.' },
  'duo.caption1':      { he: 'הקפצה מהירה בווק', en: 'A quick toss in the wok' },
  'duo.caption2':      { he: 'מרק אודון מנחם', en: 'Comforting udon soup' },

  /* --- arched headlines & extras --- */
  'arch.onlygood':     { he: 'רק טוב בפנים', en: 'ONLY GOOD INSIDE' },
  'arch.everyday':     { he: 'הייתם אוכלים את זה כל יום?', en: 'YOU WOULD EAT THIS EVERY DAY?' },
  'word.udon':         { he: 'אודון', en: 'UDON' },
  'badge.value':       { he: 'הכי משתלם', en: 'Best value' },
  'news.note':         { he: '* עדיין לא שולחים אודון בדואר, אבל מי יודע...', en: "* We don't mail udon yet, but who knows..." },

  /* --- home wordParagraph --- */
  'word.big':          { he: 'אטריה עבה. טעם גדול. דקה אחת.', en: 'Thick noodle. Big flavor. One minute.' },
  'word.text':         { he: 'אודון הוא נשמת המטבח היפני: אטריית חיטה עבה שסופגת כל רוטב ונשארת נגיסה. אנחנו מכינים אותו בשיטה המסורתית — ואורזים אותו כך שיהיה מוכן בדיוק כשאתם רעבים.', en: 'Udon is the soul of Japanese cooking: a thick wheat noodle that soaks up any sauce and keeps its bite. We make it the traditional way — and pack it to be ready exactly when hunger strikes.' },

  /* --- home slider (bundles) --- */
  'slider.title':      { he: 'בחרו את המארז שלכם', en: 'Pick your pack' },
  'slider.hint':       { he: 'גררו לצפייה', en: 'Drag to explore' },
  'card.add':          { he: 'הוספה לעגלה', en: 'Add to cart' },
  'card.view':         { he: 'לעמוד המוצר', en: 'View product' },

  /* --- serving ideas --- */
  'ideas.title':       { he: 'שלוש דרכים, דקה אחת', en: 'Three ways, one minute' },
  'ideas.1.title':     { he: 'יאקי-אודון מוקפץ', en: 'Yaki udon stir-fry' },
  'ideas.1.text':      { he: 'ווק חם, מעט שמן, ירקות פריכים, רוטב סויה — והאטריות ישר מהשקית.', en: 'Hot wok, a little oil, crisp vegetables, soy sauce — noodles straight from the pack.' },
  'ideas.2.title':     { he: 'מרק אודון חם', en: 'Hot udon soup' },
  'ideas.2.text':      { he: 'ציר מיסו או ירקות רותח, בצל ירוק, והאודון מצטרף לדקה אחת בלבד.', en: 'Simmering miso or vegetable broth, spring onion, and the udon joins for just one minute.' },
  'ideas.3.title':     { he: 'סלט אודון קר', en: 'Cold udon salad' },
  'ideas.3.text':      { he: 'שטיפה קרה, שומשום, מלפפון וויניגרט סויה-ליים. מרענן במיוחד.', en: 'A cold rinse, sesame, cucumber and a soy-lime vinaigrette. Seriously refreshing.' },

  /* --- newsletter --- */
  'news.title':        { he: 'מתכון חדש בכל שבוע', en: 'A new recipe every week' },
  'news.text':         { he: 'הירשמו וקבלו מתכוני אודון, טיפים מהמטבח האסייתי ומבצעים — ישר למייל.', en: 'Sign up for udon recipes, Asian-kitchen tips and offers — straight to your inbox.' },
  'news.placeholder':  { he: 'כתובת המייל שלכם', en: 'Your email address' },
  'news.button':       { he: 'הרשמה', en: 'Subscribe' },
  'news.success':      { he: 'תודה! נתראה במייל 🍜', en: 'Thanks! See you in your inbox 🍜' },
  'news.error':        { he: 'כתובת מייל לא תקינה', en: 'Please enter a valid email' },

  /* --- instagram --- */
  'insta.title':       { he: 'עוקבים אחרינו?', en: 'Following us?' },
  'insta.handle':      { he: '@tasteofasia.il', en: '@tasteofasia.il' },

  /* --- footer --- */
  'footer.tagline':    { he: 'טעם של אסיה, מוכן בדקה.', en: 'A taste of Asia, ready in a minute.' },
  'footer.shop':       { he: 'חנות', en: 'Shop' },
  'footer.info':       { he: 'מידע', en: 'Info' },
  'footer.follow':     { he: 'עקבו אחרינו', en: 'Follow us' },
  'footer.terms':      { he: 'תנאי שימוש', en: 'Terms of use' },
  'footer.refund':     { he: 'מדיניות החזרים', en: 'Refund policy' },
  'footer.privacy':    { he: 'מדיניות פרטיות', en: 'Privacy policy' },
  'footer.rights':     { he: '© 2026 Taste of Asia. כל הזכויות שמורות.', en: '© 2026 Taste of Asia. All rights reserved.' },
  'footer.credits':    { he: 'קרדיטים', en: 'Credits' },

  /* --- cart drawer --- */
  'cart.title':        { he: 'העגלה שלי', en: 'My cart' },
  'cart.empty':        { he: 'העגלה ריקה — בואו נמלא אותה באודון.', en: 'Your cart is empty — let’s fix that with udon.' },
  'cart.empty.cta':    { he: 'לעמוד המוצר', en: 'Go to product' },
  'cart.subtotal':     { he: 'סה"כ ביניים', en: 'Subtotal' },
  'cart.shipping':     { he: 'משלוח מחושב בקופה · משלוח חינם מעל ₪99', en: 'Shipping calculated at checkout · Free over ₪99' },
  'cart.checkout':     { he: 'לתשלום', en: 'Checkout' },
  'cart.remove':       { he: 'הסרה', en: 'Remove' },
  'cart.added':        { he: 'נוסף לעגלה!', en: 'Added to cart!' },
  'cart.demo':         { he: 'זהו אתר הדגמה — הקופה אינה פעילה עדיין.', en: 'This is a demo site — checkout is not live yet.' },

  /* --- product page --- */
  'pdp.breadcrumb':    { he: 'ראשי / אטריות אודון מוכנות', en: 'Home / Ready Udon Noodles' },
  'pdp.title':         { he: 'אטריות אודון מוכנות', en: 'Ready Udon Noodles' },
  'pdp.short':         { he: 'אטריות חיטה עבות בסגנון יפני, מבושלות מראש וארוזות בטריות. מתאימות להקפצה, למרקים ולמנות קרות.', en: 'Thick Japanese-style wheat noodles, pre-cooked and packed fresh. Perfect for stir-fries, soups and cold dishes.' },
  'pdp.qty':           { he: 'כמות', en: 'Quantity' },
  'pdp.variant':       { he: 'מארז', en: 'Pack size' },
  'pdp.add':           { he: 'הוספה לעגלה', en: 'Add to cart' },
  'pdp.buynow':        { he: 'קנייה מהירה', en: 'Buy it now' },
  'pdp.perunit':       { he: 'ליחידה', en: 'per pack' },
  'pdp.nutrition':     { he: 'ערכים תזונתיים', en: 'Nutrition facts' },
  'pdp.per100':        { he: 'ל-100 גרם', en: 'per 100 g' },
  'pdp.ingredients':   { he: 'רכיבים', en: 'Ingredients' },
  'pdp.ingredients.list': { he: 'קמח חיטה, מים, מלח, מווסת חומציות (חומצה לקטית), שמן צמחי.', en: 'Wheat flour, water, salt, acidity regulator (lactic acid), vegetable oil.' },
  'pdp.allergens':     { he: 'מכיל גלוטן (חיטה). מיוצר בקו המייצר גם מוצרי סויה ושומשום.', en: 'Contains gluten (wheat). Produced on a line that also handles soy and sesame.' },
  'pdp.kosher':        { he: 'כשר פרווה בהשגחת KF', en: 'Kosher Parve, KF certified' },
  'pdp.storage':       { he: 'לשמור במקום קריר ויבש. לאחר הפתיחה — בקירור עד 3 ימים.', en: 'Store in a cool, dry place. After opening — refrigerate up to 3 days.' },
  'pdp.long.title':    { he: 'האודון שתמיד מוכן לפניכם', en: 'The udon that’s always ready before you are' },
  'pdp.long.1':        { he: 'כל שקית מכילה 200 גרם של אטריות אודון עבות, מבושלות בעדינות ונאטמות בטריות מלאה. המרקם נשאר קפיצי ונגיס — בדיוק כמו במסעדה.', en: 'Every pouch holds 200 grams of thick udon noodles, gently cooked and sealed at peak freshness. The texture stays springy and toothsome — just like at a restaurant.' },
  'pdp.long.2':        { he: 'אין צורך בהרתחה: פותחים את השקית, מוסיפים לווק, למרק או לקערה — ותוך דקה יש לכם מנה אסייתית אמיתית.', en: 'No boiling needed: open the pouch, add to a wok, a soup or a bowl — and within a minute you have a real Asian dish.' },
  'pdp.spin.hint':     { he: 'גררו לסיבוב האריזה', en: 'Drag to spin the pack' },
  'pdp.reco':          { he: 'ישלים את המנה', en: 'Completes the dish' },
  'pdp.howto.title':   { he: 'איך מכינים?', en: 'How to cook' },
  'pdp.howto.1':       { he: 'פותחים את השקית ומפרידים את האטריות בעדינות.', en: 'Open the pouch and gently separate the noodles.' },
  'pdp.howto.2':       { he: 'מוסיפים לווק חם, למרק רותח או שוטפים במים קרים לסלט.', en: 'Add to a hot wok, a simmering soup, or rinse cold for a salad.' },
  'pdp.howto.3':       { he: 'דקה אחת — ומגישים.', en: 'One minute — and serve.' },

  /* --- pdp extras --- */
  'sub.single':        { he: 'הזמנה חד-פעמית', en: 'One-time order' },
  'sub.save':          { he: 'מנוי חודשי — חוסכים 10%', en: 'Subscribe & save 10%' },
  'sub.freq1':         { he: 'משלוח כל שבועיים', en: 'Delivery every 2 weeks' },
  'sub.freq2':         { he: 'משלוח פעם בחודש', en: 'Delivery once a month' },
  'pdp.low1':          { he: 'נשארו רק', en: 'Only' },
  'pdp.low2':          { he: 'במלאי!', en: 'left in stock!' },
  'usp.vegan':         { he: '100% טבעוני', en: '100% vegan' },
  'usp.fresh':         { he: 'טרי, לא מיובש', en: 'Fresh, never dried' },
  'check.1':           { he: 'קמח חיטה איכותי, מים ומלח — וזהו', en: 'Quality wheat flour, water and salt — that’s it' },
  'check.2':           { he: 'מבושל מראש — בלי להרתיח סיר', en: 'Pre-cooked — no pot to boil' },
  'check.3':           { he: 'ללא ביצים · ללא רכיבים מן החי', en: 'No eggs · no animal ingredients' },
  'check.4':           { he: 'ללא צבעי מאכל וללא חומרים משמרים', en: 'No food coloring, no preservatives' },
  'check.5':           { he: 'אריזה אטומה ששומרת על טריות', en: 'Sealed pouch that locks in freshness' },
  'check.6':           { he: 'כשר פרווה בהשגחת KF', en: 'Kosher Parve, KF certified' },
  'var.single':        { he: 'יחידה בודדת', en: 'Single pack' },
  'var.trio':          { he: 'מארז שלישייה', en: 'Pack of 3' },
  'var.six':           { he: 'מארז שישייה', en: 'Pack of 6' },

  /* --- about page --- */
  'about.title':       { he: 'הסיפור של האודון שלנו', en: 'The story of our udon' },
  'about.intro':       { he: 'אודון נולד ביפן לפני יותר מאלף שנה — אטריית חיטה עבה, פשוטה וממכרת, שהפכה למאכל נחמה לאומי.', en: 'Udon was born in Japan over a thousand years ago — a thick, simple, addictive wheat noodle that became a national comfort food.' },
  'about.p1':          { he: 'ב-Taste of Asia האמנו שגם מטבח ביתי בישראל יכול לקבל אודון אמיתי: לא מיובש, לא מקופסה — אלא טרי, רך וקפיצי, שמוכן תוך דקה.', en: 'At Taste of Asia we believed a home kitchen in Israel deserves real udon: not dried, not from a box — but fresh, soft and springy, ready in a minute.' },
  'about.p2':          { he: 'האטריות שלנו מיוצרות מקמח חיטה איכותי, מבושלות בעדינות ונארזות באריזה אטומה ששומרת על הטריות — בכשרות KF, פרווה.', en: 'Our noodles are made from quality wheat flour, gently cooked and sealed in a freshness-locking pouch — Kosher Parve, certified by KF.' },
  'about.h2':          { he: 'מה מיוחד באודון?', en: 'What makes udon special?' },
  'about.p3':          { he: 'העובי. אטריית אודון עבה פי ארבעה מאטריה רגילה, ולכן היא סופגת רטבים בלי להתפרק ונשארת נגיסה גם במרק רותח. זה מה שהופך אותה למלכת ההקפצות.', en: 'The thickness. An udon noodle is four times thicker than a regular noodle, so it soaks up sauces without falling apart and keeps its bite even in boiling soup. That’s what makes it the queen of stir-fries.' },
  'about.stat1.n':     { he: '60', en: '60' },
  'about.stat1.t':     { he: 'שניות להכנה', en: 'seconds to ready' },
  'about.stat2.n':     { he: '200', en: '200' },
  'about.stat2.t':     { he: 'גרם בכל שקית', en: 'grams per pouch' },
  'about.stat3.n':     { he: '3', en: '3' },
  'about.stat3.t':     { he: 'דרכי הגשה: ווק, מרק, קר', en: 'ways to serve: wok, soup, cold' },

  /* --- FAQ page --- */
  'faq.title':         { he: 'שאלות ותשובות', en: 'Frequently asked questions' },
  'faq.q1':            { he: 'צריך להרתיח את האטריות לפני השימוש?', en: 'Do I need to boil the noodles first?' },
  'faq.a1':            { he: 'לא! האטריות מבושלות מראש. מוסיפים אותן ישירות לווק או למרק לדקה אחת, או שוטפים במים קרים למנה קרה.', en: 'No! The noodles are pre-cooked. Add them straight to a wok or soup for one minute, or rinse under cold water for a cold dish.' },
  'faq.q2':            { he: 'המוצר כשר?', en: 'Is the product kosher?' },
  'faq.a2':            { he: 'כן, המוצר כשר פרווה בהשגחת KF. סמל הכשרות מופיע על גבי האריזה.', en: 'Yes — Kosher Parve under KF supervision. The certification mark appears on the package.' },
  'faq.q3':            { he: 'האם המוצר טבעוני?', en: 'Is it vegan?' },
  'faq.a3':            { he: 'כן. האטריות מכילות קמח חיטה, מים ומלח בלבד — ללא ביצים וללא רכיבים מן החי.', en: 'Yes. The noodles contain only wheat flour, water and salt — no eggs, no animal ingredients.' },
  'faq.q4':            { he: 'האם יש גלוטן?', en: 'Does it contain gluten?' },
  'faq.a4':            { he: 'כן, האטריות עשויות קמח חיטה ומכילות גלוטן.', en: 'Yes, the noodles are made from wheat flour and contain gluten.' },
  'faq.q5':            { he: 'איך שומרים את המוצר?', en: 'How should I store it?' },
  'faq.a5':            { he: 'לפני הפתיחה — במקום קריר ויבש. אחרי הפתיחה — במקרר עד 3 ימים, בכלי סגור.', en: 'Before opening — cool and dry. After opening — refrigerated for up to 3 days in a sealed container.' },
  'faq.q6':            { he: 'איפה אפשר לקנות?', en: 'Where can I buy it?' },
  'faq.a6':            { he: 'ברשתות השיווק המובחרות ובחנויות האסייתיות ברחבי הארץ. רשימה מלאה בעמוד נקודות המכירה.', en: 'At leading supermarket chains and Asian groceries across Israel. See the full list on our Where-to-Buy page.' },
  'faq.q7':            { he: 'לכמה מנות מספיקה שקית אחת?', en: 'How many servings per pouch?' },
  'faq.a7':            { he: 'שקית של 200 גרם מספיקה למנה עיקרית נדיבה אחת או לשתי מנות צד.', en: 'A 200 g pouch makes one generous main dish or two side servings.' },

  /* --- stores page --- */
  'stores.title':      { he: 'נקודות מכירה', en: 'Where to buy' },
  'stores.intro':      { he: 'האטריות שלנו מחכות לכם במדפי הרשתות והחנויות הבאות:', en: 'Find our noodles on the shelves of these chains and stores:' },
  'stores.online':     { he: 'או פשוט הזמינו כאן באתר עם משלוח עד הבית.', en: 'Or simply order here with home delivery.' },
  'stores.cat1':       { he: 'רשתות שיווק', en: 'Supermarket chains' },
  'stores.cat2':       { he: 'חנויות אסייתיות', en: 'Asian groceries' },
  'stores.cat3':       { he: 'מעדניות ושווקים', en: 'Delis & markets' },
  'stores.search':     { he: 'חיפוש חנות או עיר...', en: 'Search a store or city...' },

  /* --- contact page --- */
  'contact.title':     { he: 'צרו קשר', en: 'Contact us' },
  'contact.intro':     { he: 'שאלה? מתכון? שיתוף פעולה? נשמח לשמוע מכם.', en: 'A question? A recipe? A collaboration? We’d love to hear from you.' },
  'contact.name':      { he: 'שם מלא', en: 'Full name' },
  'contact.email':     { he: 'אימייל', en: 'Email' },
  'contact.message':   { he: 'הודעה', en: 'Message' },
  'contact.send':      { he: 'שליחה', en: 'Send' },
  'contact.success':   { he: 'ההודעה נשלחה! נחזור אליכם בהקדם.', en: 'Message sent! We’ll get back to you soon.' },
  'contact.details':   { he: 'פרטי התקשרות', en: 'Contact details' },
  'contact.mail':      { he: 'hello@tasteofasia.co.il', en: 'hello@tasteofasia.co.il' },
  'contact.phone':     { he: '03-1234567', en: '+972-3-1234567' },

  /* --- 404 --- */
  'nf.title':          { he: 'אופס, הצלחת הזאת ריקה', en: 'Oops, this plate is empty' },
  'nf.cta':            { he: 'חזרה לדף הבית', en: 'Back home' },
};

/* Store list data (placeholder names — replace with the real ones) */
TOA.stores = {
  cat1: ['שופרסל שלי', 'טיב טעם', 'יוחננוף', 'ויקטורי', 'קרפור'],
  cat2: ['China Town תל אביב', 'האנוי מרקט', 'Asia Shop חיפה', 'טוקיו מרקט ירושלים'],
  cat3: ['מעדני המושבה', 'שוק הנמל ת"א', 'דלישס רמת השרון'],
  cat1en: ['Shufersal Sheli', 'Tiv Taam', 'Yochananof', 'Victory', 'Carrefour'],
  cat2en: ['China Town Tel Aviv', 'Hanoi Market', 'Asia Shop Haifa', 'Tokyo Market Jerusalem'],
  cat3en: ['HaMoshava Deli', 'TLV Port Market', 'Delicious Ramat Hasharon'],
};
