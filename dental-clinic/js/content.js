/* Practice content extracted from zahnarztpraxisdrstrahl.de
   (services, team, photos, contact details). Images live in
   /assets/site/ and were downloaded from the same site. */

export const PRACTICE = {
  name: 'Zahnarztpraxis Dr. Borhanodin Hosseini',
  street: 'Fürstengutweg 8',
  city: '78462 Konstanz',
  phone: '07531 25 25 0',
  phoneHref: 'tel:+49753125250',
  fax: '07531 284 62 28',
  email: 'info@zahnarztpraxisdrstrahl.de',
  hours: [
    { day: 'دوشنبه', time: '۸:۳۰ – ۱۲:۳۰ و ۱۳:۳۰ – ۱۷:۳۰' },
    { day: 'سه‌شنبه', time: '۸:۳۰ – ۱۴:۰۰' },
    { day: 'چهارشنبه', time: '۸:۳۰ – ۱۲:۳۰ و ۱۳:۳۰ – ۱۷:۳۰' },
    { day: 'پنجشنبه', time: '۸:۳۰ – ۱۲:۳۰ و ۱۳:۳۰ – ۱۷:۳۰' },
    { day: 'جمعه', time: '۸:۳۰ – ۱۳:۰۰' },
  ],
};

/* "Leistungen" — the full treatment spectrum of the practice. */
export const SERVICES = [
  {
    id: 'zahnreinigung',
    fa: 'جرمگیری حرفه‌ای دندان',
    de: 'Professionelle Zahnreinigung',
    text: 'حذف جرم و پلاک از نواحی سخت‌دسترس، پالیش سطح دندان و فلوورایدتراپی؛ همراه با بررسی لثه برای پیشگیری از پریودنتیت.',
    icon: '✦',
    image: '/assets/site/cleaning.jpg',
    bookable: true,
    price: '۷۹ €',
  },
  {
    id: 'implantologie',
    fa: 'ایمپلنت دندان',
    de: 'Implantatversorgung',
    text: 'جایگزینی دندان از دست‌رفته با ایمپلنت تیتانیومی؛ حفظ دندان‌های مجاور و بازگرداندن عملکرد و زیبایی.',
    icon: '◈',
    image: '/assets/site/implant-3.jpg',
  },
  {
    id: 'prophylaxe',
    fa: 'پروتکل پیشگیری',
    de: 'Prophylaxe',
    text: 'برنامه‌ی پیشگیری فردی: آموزش بهداشت، نمایان‌کردن پلاک، پاک‌سازی کامل جرم‌ها و سیلانت شیارهای دندان.',
    icon: '❖',
    image: '/assets/site/practice.jpg',
  },
  {
    id: 'aesthetik',
    fa: 'دندانپزشکی زیبایی',
    de: 'Ästhetische Zahnheilkunde',
    text: 'طراحی لبخند، ترمیم‌های همرنگ دندان و اصلاح فرم دندان‌ها با نگاه زیبایی‌شناسانه و محافظه‌کارانه.',
    icon: '✧',
  },
  {
    id: 'prothetik',
    fa: 'پروتزهای باکیفیت',
    de: 'Hochwertige Prothetik',
    text: 'روکش، بریج و پروتزهای ثابت و متحرک با متریال مدرن، طراحی دیجیتال و تطابق دقیق.',
    icon: '◎',
    image: '/assets/site/implant-6.jpg',
  },
  {
    id: 'parodontologie',
    fa: 'درمان لثه',
    de: 'Parodontologie',
    text: 'تشخیص و درمان التهاب لثه و پریودنتیت؛ جلوگیری از تحلیل لثه و استخوان و حفظ دندان‌های طبیعی.',
    icon: '⌁',
  },
  {
    id: 'kieferorthopaedie',
    fa: 'ارتودنسی',
    de: 'Kieferorthopädie',
    text: 'اصلاح ناهنجاری‌های دندانی و فکی برای کودکان و بزرگسالان، همراه با پیگیری منظم مسیر درمان.',
    icon: '⊹',
  },
  {
    id: 'bleaching',
    fa: 'بلیچینگ و سفیدکردن',
    de: 'Bleaching',
    text: 'روشن‌کردن درجه‌بندی‌شده‌ی رنگ دندان با مواد کم‌حساسیت‌زا و کنترل‌شده، بدون آسیب به مینا.',
    icon: '☼',
  },
  {
    id: 'hypnose',
    fa: 'هیپنوتیزم درمانی',
    de: 'Hypnose',
    text: 'کاهش اضطراب و درد در جلسات درمانی؛ گزینه‌ای آرام برای بیماران مضطرب یا درمان‌های طولانی.',
    icon: '◐',
  },
  {
    id: 'akupunktur',
    fa: 'طب سوزنی',
    de: 'Akupunktur',
    text: 'کمک به تسکین درد، آرام‌سازی و کاهش رفلکس‌های تهوع در درمان‌های دندانپزشکی.',
    icon: '✚',
  },
  {
    id: 'funktionsdiagnostik',
    fa: 'تشخیص عملکردی مفصل فک',
    de: 'Funktionsdiagnostik',
    text: 'بررسی اختلالات مفصل گیجگاهی‌فکی و سایش دندان‌ها؛ درمان دردهای فک و عضلات جونده.',
    icon: '◍',
  },
  {
    id: 'mundgeruch',
    fa: 'درمان بوی بد دهان',
    de: 'Mundgeruch',
    text: 'تشخیص علت واقعی بوی بد دهان با تست تخصصی و برنامه‌ی درمانی مؤثر، نه فقط خوشبوکننده.',
    icon: '❍',
  },
  {
    id: 'zahnschienen',
    fa: 'اسپلینت و زانشینن',
    de: 'Zahnschienen',
    text: 'اسپلینت‌های محافظ برای دندان‌قروچه، اختلال خواب و محافظت از نتایج درمان ارتودنسی.',
    icon: '▤',
  },
];

export const TEAM = [
  {
    name: 'دکتر برهان‌الدین حسینی',
    role: 'دندانپزشک · ایمپلنت و پروتز',
    text: 'دانش‌آموخته‌ی شاریته برلین؛ ایمپلنت، اندودانتیکس، ارتودنسی، سدیشن وریدی و رادیوگرافی سه‌بعدی.',
    image: '/assets/site/dr-hosseini.jpg',
  },
  {
    name: 'ویولتسا راکا',
    role: 'تیم درمان',
    text: 'همراه بیماران در مسیر درمان؛ از پذیرش و هماهنگی نوبت‌ها تا همراهی کنار صندلی.',
    image: '/assets/site/team-vjollca.jpg',
  },
  {
    name: 'تیم دستیاران',
    role: 'دستیار دندانپزشکی',
    text: 'آماده‌سازی اتاق درمان، استریلیزاسیون و همراهی آرام بیمار در تمام جلسات.',
    image: '/assets/site/team-assistenz.jpg',
  },
];

/* Photos used by the 3D gallery — every image is from the practice site. */
export const GALLERY = [
  { src: '/assets/site/practice.jpg', label: 'درمان در اتاق کلینیک' },
  { src: '/assets/site/cleaning.jpg', label: 'جرمگیری حرفه‌ای' },
  { src: '/assets/site/team-1.jpg', label: 'تیم کلینیک' },
  { src: '/assets/site/team-2.jpg', label: 'تیم کلینیک' },
  { src: '/assets/site/team-assistenz.jpg', label: 'دستیاران درمان' },
  { src: '/assets/site/team-vjollca.jpg', label: 'تیم درمان' },
  { src: '/assets/site/news-1.jpg', label: 'کارت هدیه‌ی لبخند' },
  { src: '/assets/site/services-board.jpg', label: 'زانشینن مدرن‌کلیر' },
  { src: '/assets/site/hero-2.jpg', label: 'کنستانتس، بندر' },
];
