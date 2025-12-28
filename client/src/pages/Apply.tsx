import { Layout } from "@/components/Layout";
import { useJob } from "@/hooks/use-jobs";
import { useCreateApplication } from "@/hooks/use-applications";
import { useRoute, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertApplicationSchema, type InsertApplication } from "@shared/schema";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ArrowLeft, Building, Banknote } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// Schema refinement for client-side form
const formSchema = insertApplicationSchema.extend({
  mobile: z.string().min(10, "شماره موبایل باید حداقل ۱۰ رقم باشد"),
  nationalId: z.string().min(10, "کد ملی باید ۱۰ رقم باشد"),
  birthDate: z.string().min(1, "تاریخ تولد الزامی است"),
});

type FormValues = z.infer<typeof formSchema>;

export default function Apply() {
  const [, params] = useRoute("/apply/:jobId");
  const jobId = parseInt(params?.jobId || "0");
  const [, setLocation] = useLocation();

  const { data: job, isLoading: jobLoading } = useJob(jobId);
  const { mutate: createApplication, isPending: isSubmitting } = useCreateApplication();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobId,
      fullName: "",
      mobile: "",
      nationalId: "",
      birthDate: "",
      gender: "male",
      militaryStatus: "",
      emergencyContact: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    // Force jobId to be correct
    data.jobId = jobId;
    
    createApplication(data, {
      onSuccess: () => {
        setLocation("/success");
      },
    });
  };

  const selectedGender = form.watch("gender");

  if (jobLoading) return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    </Layout>
  );

  if (!job) return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center">
        <p>شغل مورد نظر یافت نشد</p>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <div className="bg-slate-50 min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Job Summary Card */}
          <div className="mb-8">
            <Card className="bg-primary text-white border-none shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
                    <div className="flex items-center gap-4 text-slate-300 text-sm">
                      <span className="flex items-center gap-1">
                        <Building className="w-4 h-4" />
                        مسقط، عمان
                      </span>
                      <span className="flex items-center gap-1 text-secondary">
                        <Banknote className="w-4 h-4" />
                        {job.salaryUSD} دلار
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-slate-200 text-sm leading-relaxed border-t border-white/10 pt-4">
                  {job.description}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-lg border-slate-200">
            <CardHeader className="border-b border-slate-100 bg-white rounded-t-xl pb-6">
              <CardTitle className="text-xl font-bold text-primary">فرم درخواست همکاری</CardTitle>
            </CardHeader>
            <CardContent className="p-8 bg-white">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>نام و نام خانوادگی</FormLabel>
                        <FormControl>
                          <Input placeholder="مثال: علی محمدی" {...field} className="bg-slate-50" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="mobile"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>شماره موبایل</FormLabel>
                          <FormControl>
                            <Input placeholder="مثال: 09123456789" {...field} className="bg-slate-50" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="birthDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>تاریخ تولد (روز/ماه/سال)</FormLabel>
                          <FormControl>
                            <Input placeholder="1370/01/01" {...field} className="bg-slate-50" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="nationalId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>کد ملی</FormLabel>
                          <FormControl>
                            <Input placeholder="ده رقم کد ملی" {...field} className="bg-slate-50" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="emergencyContact"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>شماره تماس اضطراری</FormLabel>
                          <FormControl>
                            <Input placeholder="شماره یکی از بستگان" {...field} value={field.value || ''} className="bg-slate-50" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>جنسیت</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:gap-6"
                          >
                            <FormItem className="flex items-center space-x-3 space-x-reverse space-y-0">
                              <FormControl>
                                <RadioGroupItem value="male" />
                              </FormControl>
                              <FormLabel className="font-normal text-slate-700">
                                مرد
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-x-reverse space-y-0">
                              <FormControl>
                                <RadioGroupItem value="female" />
                              </FormControl>
                              <FormLabel className="font-normal text-slate-700">
                                زن
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {selectedGender === 'male' && (
                    <FormField
                      control={form.control}
                      name="militaryStatus"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>وضعیت نظام وظیفه</FormLabel>
                          <FormControl>
                            <Input placeholder="پایان خدمت / معافیت" {...field} value={field.value || ''} className="bg-slate-50" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <div className="pt-6">
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full bg-secondary hover:bg-secondary/90 text-primary-foreground font-bold text-lg h-14"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                          در حال ثبت...
                        </>
                      ) : (
                        "ثبت نهایی درخواست"
                      )}
                    </Button>
                  </div>

                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
