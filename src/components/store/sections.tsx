import { motion } from "framer-motion";
import { BadgeCheck, Flower2, Leaf, MapPin, Phone, ShieldCheck, Soup, Truck, Mail, Instagram, Clock } from "lucide-react";
import { SectionHeading } from "./products";
import cookedRice from "@/assets/cooked-rice.jpg";

const features = [
  { icon: Flower2, title: "عطر و طعم اصیل", text: "طارم هاشمی فریدونکنار با عطری که از دم‌کشیدن تا سر سفره ماندگار است." },
  { icon: Soup, title: "پخت و ری عالی", text: "دانه‌های بلند، قد کشیده و جدا از هم؛ کته و آبکش بی‌نقص در هر بار پخت." },
  { icon: Truck, title: "ارسال مستقیم از کارخانه", text: "بدون واسطه، از انبار کارخانه در فریدونکنار تا درِ منزل شما." },
  { icon: ShieldCheck, title: "ضمانت بازگشت وجه", text: "اگر کیفیت مطابق انتظارتان نبود، کل مبلغ را بی‌قیدوشرط برمی‌گردانیم." },
];

export function Features() {
  return (
    <section id="features" className="relative bg-secondary/60 py-24 md:py-32">
      <div className="absolute inset-0 persian-pattern opacity-60" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading eyebrow="ویژگی‌های برنج ما" title="کیفیتی که در هر دانه پیداست" />
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group rounded-3xl border border-border bg-card p-8 text-center transition-all duration-500 hover:border-gold/50 hover:shadow-soft"
            >
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-navy text-gold transition-transform duration-500 group-hover:rotate-6">
                <f.icon className="h-7 w-7" strokeWidth={1.5} />
              </span>
              <h3 className="mt-6 text-lg font-extrabold">{f.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{f.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Story() {
  return (
    <section id="story" className="scroll-mt-20 py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center gap-3 text-sm font-bold text-gold">
            <span className="h-px w-8 bg-gold" />
            داستان ما
          </span>
          <h2 className="mt-4 text-3xl font-black leading-snug md:text-5xl">سه نسل، یک شالیزار، یک قول</h2>
          <p className="mt-6 text-base leading-8 text-muted-foreground md:text-lg">
            خانوادهٔ فلاح از سال‌ها پیش در شالیزارهای فریدونکنار برنج طارم می‌کارند. پدربزرگ با دست نشا می‌کرد؛ امروز
            پسران او همان دانه را با فرآوری تمام‌اتوماتیک و بهداشتی به سفرهٔ شما می‌رسانند — بدون اختلاط، بدون واسطه.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-4">
            {[
              ["۳", "نسل شالیکاری"],
              ["۱۰۰٪", "طارم خالص"],
              ["۳۱", "استان تحت پوشش"],
            ].map(([n, l]) => (
              <div key={l} className="rounded-2xl border border-border p-4 text-center">
                <p className="text-3xl font-black text-gradient-gold">{n}</p>
                <p className="mt-1 text-xs text-muted-foreground">{l}</p>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-[2.5rem] border border-gold/30" />
          <img src={cookedRice} alt="پلو زعفرانی با برنج طارم فلاح و پسران" loading="lazy" className="relative aspect-[5/6] w-full rounded-[2rem] object-cover shadow-soft" />
        </motion.div>
      </div>
    </section>
  );
}

export function Guarantee() {
  const items = [
    { icon: BadgeCheck, text: "دارای پروانهٔ بهداشت و سیب سلامت" },
    { icon: Leaf, text: "بدون افزودنی، بدون اختلاط با برنج وارداتی" },
    { icon: MapPin, text: "کشت و فرآوری در فریدونکنار، مازندران" },
  ];
  return (
    <section id="guarantee" className="scroll-mt-20 bg-gradient-navy py-24 text-ivory md:py-28">
      <div className="mx-auto max-w-6xl px-5 text-center md:px-8">
        <SectionHeading
          light
          eyebrow="تضمین اصالت"
          title="هر کیسه، شناسنامه‌دار"
          text="روی هر کیسه کد رهگیری درج شده تا مزرعه، تاریخ برداشت و تاریخ بسته‌بندی برنج خود را بدانید."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {items.map((it) => (
            <div key={it.text} className="flex items-center gap-4 rounded-2xl border border-gold/25 bg-ivory/5 p-5 text-right">
              <it.icon className="h-8 w-8 shrink-0 text-gold" strokeWidth={1.5} />
              <p className="text-sm leading-7 text-ivory/85">{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer id="contact" className="bg-navy-deep text-ivory">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-4 md:px-8">
        <div className="md:col-span-2">
          <p className="text-2xl font-black">برنج فلاح و پسران</p>
          <p className="mt-4 max-w-md text-sm leading-7 text-ivory/65">
            تولیدکنندهٔ برنج طارم دانه بلند اصیل فریدونکنار؛ از شالیزار خانوادگی تا سفرهٔ شما.
          </p>
          <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-gold/50 px-5 py-2.5">
            <MapPin className="h-4 w-4 text-gold" />
            <span className="text-sm font-bold text-gold-soft">محصول اصیل فریدونکنار · مازندران</span>
          </div>
        </div>
        <div>
          <p className="font-bold text-gold">دسترسی سریع</p>
          <ul className="mt-5 space-y-3 text-sm text-ivory/70">
            {[
              ["#products", "محصولات"],
              ["#story", "داستان ما"],
              ["#guarantee", "تضمین اصالت"],
              ["#features", "ویژگی‌ها"],
            ].map(([h, l]) => (
              <li key={h}>
                <a href={h} className="transition-colors hover:text-gold">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-bold text-gold">تماس با ما</p>
          <ul className="mt-5 space-y-3 text-sm text-ivory/70">
            <li className="flex items-center gap-3"><Phone className="h-4 w-4 text-gold" /><span dir="ltr">011-0000-0000</span></li>
            <li className="flex items-center gap-3"><Mail className="h-4 w-4 text-gold" /><span dir="ltr">info@example.com</span></li>
            <li className="flex items-center gap-3"><Instagram className="h-4 w-4 text-gold" /><span dir="ltr">@falah.rice</span></li>
            <li className="flex items-center gap-3"><Clock className="h-4 w-4 text-gold" />شنبه تا پنجشنبه، ۹ تا ۱۸</li>
            <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />مازندران، فریدونکنار</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ivory/10">
        <p className="mx-auto max-w-7xl px-5 py-6 text-center text-xs text-ivory/45 md:px-8">
          © {new Date().getFullYear()} برنج فلاح و پسران — تمامی حقوق محفوظ است.
        </p>
      </div>
    </footer>
  );
}
