import { Layout } from "@/components/Layout";
import { CategoryCard } from "@/components/CategoryCard";
import { JOB_CATEGORIES } from "@shared/schema";

export default function Categories() {
  const categories = [
    {
      id: "admin",
      title: JOB_CATEGORIES.admin,
      // Office setting for admin
      image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&auto=format&fit=crop",
      description: "موقعیت‌های شغلی اداری، منشی‌گری، حسابداری و مدیریت دفتری با حقوق عالی."
    },
    {
      id: "technical",
      title: JOB_CATEGORIES.technical,
      // Engineer/Technical worker
      image: "https://images.unsplash.com/photo-1581092921461-eab62e97a782?w=800&auto=format&fit=crop",
      description: "فرصت‌های شغلی برای مهندسین، تکنسین‌ها، جوشکاران و کارگران ماهر."
    },
    {
      id: "beauty",
      title: JOB_CATEGORIES.beauty,
      // Salon/Beauty
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop",
      description: "استخدام آرایشگر، ناخن‌کار، و متخصصین زیبایی در سالن‌های معتبر مسقط."
    },
    {
      id: "general",
      title: JOB_CATEGORIES.general,
      // Service industry/Hospitality
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop",
      description: "مشاغل خدماتی شامل رستوران، هتل‌داری، فروشندگی و خدمات عمومی."
    }
  ];

  return (
    <Layout>
      <div className="bg-slate-50 min-h-screen py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h1 className="text-3xl md:text-5xl font-bold text-primary mb-6">انتخاب دسته‌بندی شغلی</h1>
            <p className="text-slate-500 text-lg">
              لطفاً حوزه‌ی تخصصی خود را انتخاب کنید تا موقعیت‌های شغلی مرتبط به شما نمایش داده شود.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat, idx) => (
              <CategoryCard 
                key={cat.id}
                {...cat}
                delay={idx * 0.1}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
