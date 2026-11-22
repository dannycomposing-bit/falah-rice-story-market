import { motion } from "framer-motion";
import { Check, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { products, type Product } from "@/lib/products";
import { formatToman, toPersianDigits } from "@/lib/format";
import { useCart } from "./cart-context";
import riceSack from "@/assets/rice-sack.jpg";

function ProductCard({ product, index }: { product: Product; index: number }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const perKg = Math.round(product.price / product.weightKg / 1000) * 1000;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-transform duration-500 hover:-translate-y-1.5"
    >
      {product.badge && (
        <span className="absolute right-4 top-4 z-10 rounded-full bg-crimson px-3 py-1 text-[11px] font-bold text-ivory">
          {product.badge}
        </span>
      )}
      <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
        <img
          src={riceSack}
          alt={`برنج طارم فریدونکنار - ${product.name}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
        />
        <span className="absolute bottom-4 left-4 flex h-16 w-16 flex-col items-center justify-center rounded-full border border-gold/70 bg-navy/90 text-ivory backdrop-blur">
          <span className="text-xl font-black leading-none text-gold">{toPersianDigits(product.weightKg)}</span>
          <span className="text-[10px]">کیلوگرم</span>
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-medium text-gold">طارم دانه بلند فریدونکنار</p>
        <h3 className="mt-1.5 text-xl font-extrabold">{product.name}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{product.tagline}</p>
        <div className="my-5 gold-rule opacity-50" />
        <div className="mt-auto flex items-end justify-between">
          <div>
            <p className="text-2xl font-black">{formatToman(product.price)}</p>
            <p className="mt-1 text-xs text-muted-foreground">هر کیلو {formatToman(perKg)}</p>
          </div>
        </div>
        <Button
          variant={added ? "gold" : "navy"}
          size="lg"
          className="mt-5 w-full rounded-full"
          onClick={() => {
            add(product.id);
            setAdded(true);
            toast.success(`${product.name} به سبد خرید اضافه شد`);
            setTimeout(() => setAdded(false), 1600);
          }}
        >
          {added ? <Check /> : <ShoppingBag />}
          {added ? "اضافه شد" : "افزودن به سبد خرید"}
        </Button>
      </div>
    </motion.article>
  );
}

export function Products() {
  return (
    <section id="products" className="relative scroll-mt-20 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="محصولات"
          title="طارم اصیل، در اندازهٔ سفرهٔ شما"
          text="برداشت تازهٔ امسال، سورت‌شده و بسته‌بندی بهداشتی؛ مستقیم از کارخانه به آشپزخانهٔ شما."
        />
        <div className="mt-16 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, text, light }: { eyebrow: string; title: string; text?: string; light?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="mx-auto max-w-2xl text-center"
    >
      <span className="inline-flex items-center gap-3 text-sm font-bold text-gold">
        <span className="h-px w-8 bg-gold" />
        {eyebrow}
        <span className="h-px w-8 bg-gold" />
      </span>
      <h2 className={`mt-4 text-3xl font-black leading-snug md:text-5xl ${light ? "text-ivory" : ""}`}>{title}</h2>
      {text && <p className={`mt-5 text-base leading-8 md:text-lg ${light ? "text-ivory/70" : "text-muted-foreground"}`}>{text}</p>}
    </motion.div>
  );
}
