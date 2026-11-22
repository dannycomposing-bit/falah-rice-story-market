import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatToman, toPersianDigits } from "@/lib/format";
import { useCart } from "./cart-context";

export function CheckoutDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const { total, clear, setOpen } = useCart();
  const [orderNo, setOrderNo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const phone = String(data.get("phone") ?? "").replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
    if (!/^09\d{9}$/.test(phone)) {
      setError("شماره موبایل باید ۱۱ رقم و با ۰۹ شروع شود.");
      return;
    }
    setError(null);
    setOrderNo(String(Math.floor(100000 + Math.random() * 900000)));
    clear();
  };

  const close = (o: boolean) => {
    onOpenChange(o);
    if (!o && orderNo) {
      setOrderNo(null);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent dir="rtl" className="max-w-lg rounded-3xl border-gold/30 bg-background text-right [&>button]:left-4 [&>button]:right-auto">
        {orderNo ? (
          <div className="flex flex-col items-center py-6 text-center">
            <CheckCircle2 className="h-16 w-16 text-gold" />
            <h3 className="mt-4 text-2xl font-black">سفارش شما ثبت شد</h3>
            <p className="mt-2 text-muted-foreground">
              شمارهٔ سفارش: <span className="font-bold text-foreground">{toPersianDigits(orderNo)}</span>
            </p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              همکاران ما به‌زودی برای هماهنگی ارسال با شما تماس می‌گیرند.
            </p>
            <Button variant="navy" className="mt-6 rounded-full px-8" onClick={() => close(false)}>
              بازگشت به فروشگاه
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader className="text-right sm:text-right">
              <DialogTitle className="text-2xl font-black">تکمیل خرید</DialogTitle>
              <DialogDescription>مبلغ قابل پرداخت: {formatToman(total)} — پرداخت در محل</DialogDescription>
            </DialogHeader>
            <form onSubmit={onSubmit} className="mt-2 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">نام و نام خانوادگی</Label>
                <Input id="name" name="name" required className="h-11 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">شماره موبایل</Label>
                <Input id="phone" name="phone" inputMode="tel" dir="ltr" placeholder="09xxxxxxxxx" required className="h-11 rounded-xl text-left" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">آدرس کامل</Label>
                <Textarea id="address" name="address" required rows={3} className="rounded-xl" />
              </div>
              {error && <p className="text-sm text-crimson">{error}</p>}
              <Button type="submit" variant="gold" size="xl" className="w-full">
                ثبت نهایی سفارش
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
