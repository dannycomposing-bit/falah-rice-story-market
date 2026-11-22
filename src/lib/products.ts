export type Product = {
  id: string;
  name: string;
  weightKg: number;
  /** Price in Toman */
  price: number;
  tagline: string;
  badge?: string;
};

export const products: Product[] = [
  {
    id: "tarom-2kg",
    name: "بسته تست ۲ کیلویی",
    weightKg: 2,
    price: 890_000,
    tagline: "برای اولین تجربهٔ طعم اصیل طارم",
    badge: "پیشنهاد آشنایی",
  },
  {
    id: "tarom-5kg",
    name: "کیسه ۵ کیلویی",
    weightKg: 5,
    price: 2_150_000,
    tagline: "مناسب خانواده‌های کوچک",
  },
  {
    id: "tarom-10kg",
    name: "کیسه ۱۰ کیلویی",
    weightKg: 10,
    price: 4_200_000,
    tagline: "انتخاب محبوب خانواده‌های ایرانی",
    badge: "پرفروش‌ترین",
  },
  {
    id: "tarom-20kg",
    name: "کیسه ۲۰ کیلویی",
    weightKg: 20,
    price: 8_200_000,
    tagline: "به‌صرفه‌ترین انتخاب برای مصرف سالانه",
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
