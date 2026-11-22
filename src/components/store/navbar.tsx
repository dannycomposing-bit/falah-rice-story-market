import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useCart } from "./cart-context";
import { toPersianDigits } from "@/lib/format";

const links = [
  { href: "#products", label: "محصولات" },
  { href: "#story", label: "داستان ما" },
  { href: "#guarantee", label: "تضمین اصالت" },
  { href: "#contact", label: "تماس با ما" },
];

export function Navbar() {
  const { count, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${scrolled || menu ? "glass-navy py-3" : "bg-transparent py-5"}`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">
        <a href="#top" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/60 text-lg font-black text-gold">
            ف
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-base font-extrabold text-ivory md:text-lg">برنج فلاح و پسران</span>
            <span className="text-[11px] text-gold-soft/80">طارم اصیل فریدونکنار</span>
          </span>
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative text-sm font-medium text-ivory/85 transition-colors hover:text-gold after:absolute after:-bottom-1.5 after:right-0 after:h-px after:w-0 after:bg-gold after:transition-all hover:after:w-full"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpen(true)}
            aria-label="سبد خرید"
            className="relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-ivory/20 text-ivory transition-colors hover:border-gold hover:text-gold"
          >
            <ShoppingBag className="h-5 w-5" />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.4, opacity: 0 }}
                  className="absolute -left-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-crimson px-1 text-[11px] font-bold text-ivory"
                >
                  {toPersianDigits(count)}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <button
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-ivory md:hidden"
            onClick={() => setMenu((m) => !m)}
            aria-label="منو"
          >
            {menu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menu && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden px-5 md:hidden"
          >
            {links.map((l) => (
              <li key={l.href} className="border-b border-ivory/10 last:border-0">
                <a href={l.href} onClick={() => setMenu(false)} className="block py-4 text-ivory/90">
                  {l.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
