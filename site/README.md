# Taste of Asia — אתר מוצר: אטריות אודון מוכנות

אתר סטטי (HTML/CSS/JS טהור, בלי build) שנבנה בהשראת המבנה והפיצ'רים של
en.manayerbamate.com — במימוש מקורי לחלוטין, עבור מוצר אחד: **אטריות אודון מוכנות
200 גרם, כשר פרווה KF**.

## הרצה מקומית

```bash
cd site
python3 -m http.server 8000
# פתחו http://localhost:8000
```

## מבנה

```
index.html      דף בית (hero רב-סצנות, יתרונות, מארזים, ניוזלטר, אינסטגרם)
product.html    דף מוצר (גלריה, וריאנטים, מנוי, ערכים תזונתיים, קנבס אינטראקטיבי)
about.html      הסיפור
faq.html        שו"ת (אקורדיון בלעדי, רקע זהב)
stores.html     נקודות מכירה + חיפוש
contact.html    צור קשר
404.html        עמוד שגיאה (רקע מתחלף)
css/style.css   מערכת העיצוב כולה (RTL/LTR עם logical properties)
js/data.js      נתוני מוצר + מילון עברית/אנגלית — לעריכת תוכן התחילו כאן
js/partials.js  header/פוטר/מגירות משותפים (מוזרקים לכל עמוד)
js/main.js      עגלה, i18n, סליידרים, אנימציות, משחק הפוטר
js/product.js   לוגיקת דף המוצר
assets/img/     איורי SVG + התמונות שלכם (ראו IMAGE-PROMPTS.md)
```

## תמונות

ראו `IMAGE-PROMPTS.md` — צרו תמונה, שמרו בשם הקובץ המצוין ב-`assets/img/`,
והאתר יחליף את ה-placeholder אוטומטית.

## עריכת תוכן

- מחירים/מארזים/ערכים תזונתיים: `js/data.js` → `TOA.product`
- כל הטקסטים (עברית+אנגלית): `js/data.js` → `TOA.i18n`
- רשימת חנויות: `js/data.js` → `TOA.stores`
- צבעי מותג: `css/style.css` → `:root`

## הערות

- העגלה שומרת ב-localStorage; כפתור "לתשלום" הוא דמו (אין סליקה).
- טופסי ניוזלטר/קשר הם דמו — חברו ל-backend/שירות לפי הצורך.
- ניתוח מלא של אתר המקור: `ANALYSIS.md`.
