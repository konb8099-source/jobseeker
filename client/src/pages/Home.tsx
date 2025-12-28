import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, ShieldCheck, DollarSign, Briefcase } from "lucide-react";

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden bg-primary text-white">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          {/* Beautiful Oman landscape or generic architectural background */}
          <img 
            src="https://pixabay.com/get/gce191caddd0a8810ddb5f65e2ca18229bee3b958cc6ba27c79aa249758238b04a2e3ef361d95f661c726bd9324fe78d9e497d73a88c716c7d1ab918078b11735_1280.jpg" 
            alt="Oman Architecture" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/60" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center md:text-right md:pr-12 lg:pr-24">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
                آینده شغلی خود را در <span className="text-secondary">عمان</span> بسازید
              </h1>
              <p className="text-lg md:text-xl text-slate-200 mb-8 leading-relaxed max-w-2xl">
                فرصتی بی‌نظیر برای کار در محیطی بین‌المللی با حقوق دلاری، اقامت ۲ ساله و تضمین امنیت شغلی. 
                ما پل ارتباطی شما با بهترین کارفرمایان عمان هستیم.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link href="/categories">
                  <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-primary-foreground text-lg px-8 py-6 rounded-xl font-bold shadow-xl shadow-secondary/20 w-full sm:w-auto">
                    شروع کنید
                    <ArrowLeft className="mr-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/categories">
                  <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10 text-white text-lg px-8 py-6 rounded-xl backdrop-blur-sm w-full sm:w-auto">
                    مشاهده فرصت‌های شغلی
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features / Benefits */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">چرا کار در عمان؟</h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              عمان با اقتصادی رو به رشد و محیطی امن، یکی از بهترین مقاصد برای متخصصان ایرانی است.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<DollarSign className="w-8 h-8 text-secondary" />}
              title="درآمد دلاری"
              description="حقوق پایه بالا به ریال عمان (با ارزش ۲.۶ برابر دلار) و پس‌انداز ارزی عالی."
            />
            <FeatureCard 
              icon={<ShieldCheck className="w-8 h-8 text-secondary" />}
              title="اقامت ۲ ساله"
              description="دریافت اقامت قانونی ۲ ساله قابل تمدید برای شما و امکان همراهی خانواده."
            />
            <FeatureCard 
              icon={<Briefcase className="w-8 h-8 text-secondary" />}
              title="تنوع شغلی"
              description="موقعیت‌های شغلی متنوع از فنی مهندسی تا خدمات و پزشکی."
            />
            <FeatureCard 
              icon={<CheckCircle2 className="w-8 h-8 text-secondary" />}
              title="امنیت و رفاه"
              description="زندگی در یکی از امن‌ترین کشورهای منطقه با استانداردهای رفاهی بالا."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-3xl p-8 md:p-12 overflow-hidden relative shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
              <div className="absolute w-96 h-96 bg-secondary rounded-full -top-20 -left-20 blur-3xl"></div>
              <div className="absolute w-96 h-96 bg-blue-400 rounded-full bottom-0 right-0 blur-3xl"></div>
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-right">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">آماده تغییر مسیر زندگی خود هستید؟</h2>
                <p className="text-slate-300 max-w-xl text-lg">
                  همین حالا دسته‌بندی شغلی خود را انتخاب کنید و رزومه خود را ثبت نمایید.
                </p>
              </div>
              <Link href="/categories">
                <Button size="lg" className="bg-white text-primary hover:bg-slate-100 text-lg px-8 py-6 rounded-xl font-bold shadow-lg whitespace-nowrap">
                  ثبت نام رایگان
                  <ArrowLeft className="mr-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg transition-all hover:-translate-y-1">
      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-slate-100 text-secondary">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-primary mb-3">{title}</h3>
      <p className="text-slate-500 leading-relaxed text-sm">
        {description}
      </p>
    </div>
  );
}
