import { Link, useLocation } from "wouter";
import { Menu, X, Globe, Phone } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-slate-200">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-xl">
                O
              </div>
              <span className="font-bold text-xl text-primary hidden sm:block">
                استخدام عمان
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className={`text-sm font-medium hover:text-secondary transition-colors ${location === '/' ? 'text-secondary' : 'text-slate-600'}`}>
              خانه
            </Link>
            <Link href="/categories" className={`text-sm font-medium hover:text-secondary transition-colors ${location === '/categories' ? 'text-secondary' : 'text-slate-600'}`}>
              فرصت‌های شغلی
            </Link>
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-secondary transition-colors">
              درباره ما
            </a>
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-secondary transition-colors">
              تماس با ما
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-slate-600 hidden sm:flex">
              <Globe className="h-5 w-5" />
            </Button>
            <Link href="/categories">
              <Button className="bg-secondary hover:bg-secondary/90 text-primary-foreground font-bold shadow-lg shadow-secondary/20">
                ثبت نام کنید
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white p-4 space-y-4 shadow-lg animate-in slide-in-from-top-2">
            <Link href="/" className="block py-2 text-slate-600 hover:text-primary" onClick={() => setIsMenuOpen(false)}>
              خانه
            </Link>
            <Link href="/categories" className="block py-2 text-slate-600 hover:text-primary" onClick={() => setIsMenuOpen(false)}>
              فرصت‌های شغلی
            </Link>
            <a href="#" className="block py-2 text-slate-600 hover:text-primary">
              درباره ما
            </a>
            <div className="pt-2">
              <Link href="/categories">
                <Button className="w-full bg-primary text-white">
                  شروع ثبت نام
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-primary text-slate-200 py-12 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white mb-4">استخدام عمان</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                معتبرترین پلتفرم کاریابی و اعزام نیروی کار متخصص به کشور عمان با مجوز رسمی.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">دسترسی سریع</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/" className="hover:text-secondary">خانه</Link></li>
                <li><Link href="/categories" className="hover:text-secondary">مشاغل</Link></li>
                <li><a href="#" className="hover:text-secondary">شرایط و قوانین</a></li>
                <li><a href="#" className="hover:text-secondary">سوالات متداول</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">دسته‌بندی‌ها</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/jobs/technical" className="hover:text-secondary">فنی و مهندسی</Link></li>
                <li><Link href="/jobs/admin" className="hover:text-secondary">اداری و دفتری</Link></li>
                <li><Link href="/jobs/beauty" className="hover:text-secondary">زیبایی و سلامت</Link></li>
                <li><Link href="/jobs/general" className="hover:text-secondary">خدمات عمومی</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">تماس با ما</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-secondary" />
                  <span>۰۲۱-۱۲۳۴۵۶۷۸</span>
                </li>
                <li className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-secondary" />
                  <span>info@omanjobs.ir</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
            © ۲۰۲۴ تمامی حقوق محفوظ است.
          </div>
        </div>
      </footer>
    </div>
  );
}
