import { createFileRoute } from "@tanstack/react-router";
import { CartProvider } from "@/components/store/cart-context";
import { Navbar } from "@/components/store/navbar";
import { ScrollHero } from "@/components/store/scroll-hero";
import { Products } from "@/components/store/products";
import { Features, Footer, Guarantee, Story } from "@/components/store/sections";
import { CartDrawer } from "@/components/store/cart-drawer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "برنج فلاح و پسران | خرید برنج طارم اصیل فریدونکنار" },
      {
        name: "description",
        content: "خرید آنلاین برنج طارم دانه بلند فریدونکنار در بسته‌های ۲، ۵، ۱۰ و ۲۰ کیلویی؛ ارسال مستقیم از کارخانه با ضمانت بازگشت وجه.",
      },
      { property: "og:title", content: "برنج فلاح و پسران — طارم اصیل فریدونکنار" },
      { property: "og:description", content: "از دل شالیزارهای فریدونکنار تا سفرهٔ شما؛ خرید مستقیم از کارخانه." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <CartProvider>
      <div id="top">
        <Navbar />
        <main>
          <ScrollHero />
          <Products />
          <Story />
          <Features />
          <Guarantee />
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}
