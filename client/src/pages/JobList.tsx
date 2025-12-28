import { Layout } from "@/components/Layout";
import { useJobs } from "@/hooks/use-jobs";
import { Link, useRoute } from "wouter";
import { Loader2, AlertCircle, Banknote, MapPin, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { JOB_CATEGORIES } from "@shared/schema";

export default function JobList() {
  const [, params] = useRoute("/jobs/:category");
  const categoryId = params?.category as keyof typeof JOB_CATEGORIES;
  const { data: jobs, isLoading, error } = useJobs(categoryId);
  const [searchTerm, setSearchTerm] = useState("");

  const categoryTitle = JOB_CATEGORIES[categoryId] || "همه مشاغل";

  const filteredJobs = jobs?.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    job.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="bg-slate-50 min-h-screen py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Link href="/categories" className="text-sm text-slate-500 hover:text-primary transition-colors">
                  بازگشت به دسته‌بندی‌ها
                </Link>
                <span className="text-slate-300">/</span>
                <span className="text-sm text-secondary font-medium">{categoryTitle}</span>
              </div>
              <h1 className="text-3xl font-bold text-primary">فرصت‌های شغلی {categoryTitle}</h1>
            </div>
            
            <div className="w-full md:w-96">
              <Input 
                placeholder="جستجو در شغل‌ها..." 
                className="bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Content */}
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-12 h-12 animate-spin text-primary/20" />
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center text-red-600">
              <AlertCircle className="w-8 h-8 mx-auto mb-2" />
              <p>خطا در دریافت اطلاعات. لطفا دوباره تلاش کنید.</p>
            </div>
          ) : filteredJobs?.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
              <Briefcase className="w-16 h-16 mx-auto text-slate-300 mb-4" />
              <h3 className="text-xl font-medium text-slate-600 mb-2">شغلی یافت نشد</h3>
              <p className="text-slate-400">متاسفانه در حال حاضر شغلی در این دسته موجود نیست.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredJobs?.map((job) => (
                <Card key={job.id} className="overflow-hidden hover:shadow-lg transition-all border-slate-200 group">
                  <div className="flex flex-col sm:flex-row">
                    <div className="w-full sm:w-48 h-48 sm:h-auto bg-slate-200 relative">
                      <img 
                        src={job.imageUrl} 
                        alt={job.title}
                        className="w-full h-full object-cover absolute inset-0"
                      />
                    </div>
                    <CardContent className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <Badge variant="secondary" className="bg-secondary/10 text-secondary-foreground hover:bg-secondary/20">
                          {JOB_CATEGORIES[job.category as keyof typeof JOB_CATEGORIES]}
                        </Badge>
                        <span className="text-sm text-slate-400">تازه</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-secondary transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-slate-500 text-sm mb-6 line-clamp-2">
                        {job.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-4 mb-6">
                        <div className="flex items-center text-slate-600 text-sm bg-slate-50 px-3 py-1.5 rounded-lg">
                          <Banknote className="w-4 h-4 ml-2 text-secondary" />
                          <span className="font-bold ml-1 text-primary">{job.salaryUSD}</span>
                          <span className="text-xs">دلار</span>
                        </div>
                        <div className="flex items-center text-slate-600 text-sm bg-slate-50 px-3 py-1.5 rounded-lg">
                          <MapPin className="w-4 h-4 ml-2 text-slate-400" />
                          <span>مسقط، عمان</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-xs text-slate-400 font-mono" dir="ltr">1 OMR ≈ 2.6 USD</span>
                        <Link href={`/apply/${job.id}`}>
                          <Button className="bg-primary hover:bg-primary/90 text-white shadow-md shadow-primary/20">
                            ارسال درخواست
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
