import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Download, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Success() {
  const handleDownload = () => {
    // Simulating download
    const link = document.createElement('a');
    link.href = '/app.apk';
    link.download = 'OmanJobs-App.apk';
    document.body.appendChild(link);
    // In a real app, this file would exist. For now we just pretend.
    alert("دانلود فایل اپلیکیشن آغاز شد.");
    document.body.removeChild(link);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center border border-slate-100"
        >
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-primary mb-4">درخواست شما با موفقیت ثبت شد</h1>
          <p className="text-slate-500 mb-8 leading-relaxed">
            اطلاعات شما در سیستم ثبت شد. کارشناسان ما به زودی با شما تماس خواهند گرفت.
            برای پیگیری سریع‌تر وضعیت درخواست خود، لطفا اپلیکیشن ما را نصب کنید.
          </p>
          
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 mb-8">
            <h3 className="font-bold text-primary mb-2">پیگیری وضعیت درخواست</h3>
            <p className="text-sm text-slate-500">
              تمامی مراحل بعدی از طریق اپلیکیشن قابل پیگیری است.
            </p>
          </div>

          <Button 
            onClick={handleDownload}
            size="lg" 
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-14 rounded-xl shadow-lg shadow-primary/20"
          >
            <Download className="ml-2 h-5 w-5" />
            دانلود اپلیکیشن اندروید
          </Button>
          
          <p className="mt-4 text-xs text-slate-400">
            نسخه ۱.۲.۰ | حجم: ۱۵ مگابایت
          </p>
        </motion.div>
      </div>
    </Layout>
  );
}
