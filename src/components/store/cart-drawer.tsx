import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProduct } from "@/lib/products";
import { formatToman, toPersianDigits } from "@/lib/format";
import { MAX_QTY } from "@/lib/cart";
import { useCart } from "./cart-context";
import { CheckoutDialog } from "./checkout-dialog";
import riceSack from "@/assets/rice-sack.jpg";

export function CartDrawer() {
  const { lines, open, setOpen, update, remove, total, count } = useCart();
  const [checkout, setCheckout] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen]);

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm"
            />
            <motion.aside
              key="drawer"
              role="dialog"
              aria-label="سبد خرید"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 32, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-50 flex w-full max-w-md flex-col bg-background shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-border px-6 py-5">
                <div>
                  <h2 className="text-xl font-extrabold">سبد خرید</h2>
                  <p className="text-xs text-muted-foreground">{toPersianDigits(count)} کالا</p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="بستن"
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full hover:bg-secondary"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {lines.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                  <span className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary text-gold">
                    <ShoppingBag className="h-9 w-9" />
                  </span>
                  <p className="font-bold">سبد خرید شما خالی است</p>
                  <p className="text-sm text-muted-foreground">طعم اصیل طارم فریدونکنار منتظر شماست.</p>
                  <Button
                    variant="navy"
                    className="mt-2 rounded-full"
                    onClick={() => {
                      setOpen(false);
                      document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    مشاهده محصولات
                  </Button>
                </div>
              ) : (
                <>
                  <ul className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
                    <AnimatePresence initial={false}>
                      {lines.map((line) => {
                        const p = getProduct(line.id);
                        if (!p) return null;
                        return (
                          <motion.li
                            key={line.id}
                            layout
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -40 }}
                            className="flex gap-4 rounded-2xl border border-border bg-card p-3"
                          >
                            <img src={riceSack} alt="" className="h-20 w-20 rounded-xl object-cover" />
                            <div className="flex flex-1 flex-col">
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <p className="text-sm font-bold">طارم فریدونکنار</p>
                                  <p className="text-xs text-muted-foreground">{p.name}</p>
                                </div>
                                <button
                                  onClick={() => remove(line.id)}
                                  aria-label="حذف"
                                  className="cursor-pointer text-muted-foreground transition-colors hover:text-crimson"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                              <div className="mt-auto flex items-center justify-between pt-2">
                                <div className="flex items-center rounded-full border border-border">
                                  <button
                                    onClick={() => update(line.id, line.qty + 1)}
                                    disabled={line.qty >= MAX_QTY}
                                    aria-label="افزایش"
                                    className="flex h-8 w-8 cursor-pointer items-center justify-center disabled:opacity-40"
                                  >
                                    <Plus className="h-3.5 w-3.5" />
                                  </button>
                                  <span className="w-6 text-center text-sm font-bold">{toPersianDigits(line.qty)}</span>
                                  <button
                                    onClick={() => update(line.id, line.qty - 1)}
                                    aria-label="کاهش"
                                    className="flex h-8 w-8 cursor-pointer items-center justify-center"
                                  >
                                    <Minus className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                                <p className="text-sm font-extrabold">{formatToman(p.price * line.qty)}</p>
                              </div>
                            </div>
                          </motion.li>
                        );
                      })}
                    </AnimatePresence>
                  </ul>
                  <div className="space-y-4 border-t border-border bg-secondary/60 px-6 py-6">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>هزینه ارسال</span>
                      <span className="font-medium text-foreground">رایگان</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold">جمع کل</span>
                      <span className="text-2xl font-black">{formatToman(total)}</span>
                    </div>
                    <Button variant="gold" size="xl" className="w-full" onClick={() => setCheckout(true)}>
                      تکمیل خرید
                    </Button>
                  </div>
                </>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
      <CheckoutDialog open={checkout} onOpenChange={setCheckout} />
    </>
  );
}
