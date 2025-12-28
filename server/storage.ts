import { type Job, type Application, type InsertApplication } from "@shared/schema";

export interface IStorage {
  // Jobs
  getJobs(category?: string): Promise<Job[]>;
  getJob(id: number): Promise<Job | undefined>;
  
  // Applications
  createApplication(app: InsertApplication): Promise<Application>;
}

export class MemStorage implements IStorage {
  private jobs: Map<number, Job>;
  private applications: Map<number, Application>;
  private appIdCounter = 1;

  constructor() {
    this.jobs = new Map();
    this.applications = new Map();
    this.seedJobs();
  }

  private seedJobs() {
    // 1. High-Paying & Specialist (Category: specialist)
    const specialistImg = "/attached_assets/generated_images/senior_project_manager_in_office.png";
    this.addJob({ id: 12, title: "پزشک متخصص / جراح", category: "specialist", salaryUSD: 14300, description: "پزشک متخصص با سابقه در بیمارستان‌های معتبر مسقط (حقوق: ۳۰۰۰ - ۸۰۰۰ ریال عمان)", imageUrl: "/attached_assets/generated_images/specialist_surgeon_in_muscat_hospital.png" });
    this.addJob({ id: 13, title: "مهندس نفت و گاز", category: "specialist", salaryUSD: 11000, description: "مهندس متخصص در صنایع نفت و گاز عمان (حقوق: ۲۵۰۰ - ۶۰۰۰ ریال عمان)", imageUrl: "/attached_assets/generated_images/oil_and_gas_engineer_in_oman.png" });
    this.addJob({ id: 14, title: "مدیر پروژه / مدیر ارشد", category: "specialist", salaryUSD: 9100, description: "مدیریت پروژه‌های بزرگ ساختمانی و صنعتی (حقوق: ۲۰۰۰ - ۵۰۰۰ ریال عمان)", imageUrl: "/attached_assets/generated_images/senior_project_manager_in_office.png" });
    this.addJob({ id: 15, title: "متخصص IT ارشد", category: "specialist", salaryUSD: 7150, description: "توسعه نرم‌افزار، شبکه و امنیت سایبری (حقوق: ۱۵۰۰ - ۴۰۰۰ ریال عمان)", imageUrl: "/attached_assets/generated_images/senior_it_specialist_in_server_room.png" });
    this.addJob({ id: 16, title: "وکیل حرفه‌ای", category: "specialist", salaryUSD: 10400, description: "مشاور حقوقی و وکیل بین‌المللی (حقوق: ۲۵۰۰ - ۵۵۰۰ ریال عمان)", imageUrl: "/attached_assets/generated_images/professional_lawyer_in_muscat_office.png" });
    this.addJob({ id: 17, title: "مهندس عمران / معمار", category: "specialist", salaryUSD: 7540, description: "طراحی و نظارت بر پروژه‌های عمرانی (حقوق: ۱۸۰۰ - ۴۰۰۰ ریال عمان)", imageUrl: "/attached_assets/generated_images/civil_engineer_on_oman_site.png" });
    this.addJob({ id: 18, title: "استاد دانشگاه", category: "specialist", salaryUSD: 5460, description: "تدریس در دانشگاه‌های معتبر عمان (حقوق: ۱۲۰۰ - ۳۰۰۰ ریال عمان)", imageUrl: "/attached_assets/generated_images/university_professor_in_muscat_campus.png" });

    // 2. Technical & Skill (Category: technical)
    const techImg = "/attached_assets/generated_images/skilled_technical_workers_in_workshop.png";
    this.addJob({ id: 4, title: "MDF کار", category: "technical", salaryUSD: 1040, description: "ساخت و نصب مصنوعات MDF (حقوق: ۳۰۰ - ۵۰۰ ریال عمان)", imageUrl: "/attached_assets/generated_images/mdf_worker_in_oman_workshop.png" });
    this.addJob({ id: 5, title: "کابینت کار", category: "technical", salaryUSD: 1105, description: "طراحی و اجرای کابینت (حقوق: ۳۰۰ - ۵۵۰ ریال عمان)", imageUrl: "/attached_assets/generated_images/cabinet_maker_workshop.png" });
    this.addJob({ id: 19, title: "نجار حرفه‌ای", category: "technical", salaryUSD: 1014, description: "نجاری و ساخت مصنوعات چوبی (حقوق: ۲۸۰ - ۵۰۰ ریال عمان)", imageUrl: "/attached_assets/generated_images/skilled_technical_workers_in_workshop.png" });
    this.addJob({ id: 6, title: "برق‌کار صنعتی / ساختمانی", category: "technical", salaryUSD: 1950, description: "سیم‌کشی و تعمیرات تخصصی (حقوق: ۵۰۰ - ۱۰۰۰ ریال عمان)", imageUrl: "/attached_assets/generated_images/professional_electrician_at_work.png" });
    this.addJob({ id: 7, title: "تکنسین خدمات", category: "technical", salaryUSD: 1755, description: "تاسیسات و تعمیرات (حقوق: ۴۵۰ - ۹۰۰ ریال عمان)", imageUrl: "/attached_assets/generated_images/service_technician_at_work.png" });
    this.addJob({ id: 11, title: "راننده حرفه‌ای", category: "technical", salaryUSD: 1560, description: "رانندگی شرکتی یا شخصی (حقوق: ۴۰۰ - ۸۰۰ ریال عمان)", imageUrl: "/attached_assets/generated_images/professional_driver_in_muscat.png" });

    // 3. Beauty & Salon (Category: beauty)
    const beautyImg = "/attached_assets/generated_images/high-end_beauty_salon_interior.png";
    this.addJob({ id: 8, title: "ناخن‌کار حرفه‌ای", category: "beauty", salaryUSD: 1365, description: "خدمات تخصصی ناخن (حقوق: ۳۵۰ - ۷۰۰ ریال عمان)", imageUrl: "/attached_assets/generated_images/nail_technician_in_luxury_spa.png" });
    this.addJob({ id: 9, title: "خدمات زیبایی", category: "beauty", salaryUSD: 1170, description: "فیشیال، پدیکور، اپیلاسیون (حقوق: ۳۰۰ - ۶۰۰ ریال عمان)", imageUrl: "/attached_assets/generated_images/beauty_service_professional.png" });
    this.addJob({ id: 20, title: "آرایشگر زن", category: "beauty", salaryUSD: 1690, description: "خدمات کامل آرایشی (حقوق: ۴۰۰ - ۹۰۰ ریال عمان)", imageUrl: "/attached_assets/generated_images/high-end_beauty_salon_interior.png" });

    // 4. Admin & Financial (Category: admin)
    const adminImg = "/attached_assets/generated_images/professional_office_environment_in_oman.png";
    this.addJob({ id: 1, title: "حسابدار", category: "admin", salaryUSD: 3380, description: "امور مالی و حسابداری (حقوق: ۸۰۰ - ۱۸۰۰ ریال عمان)", imageUrl: "/attached_assets/generated_images/accountant_in_professional_office.png" });
    this.addJob({ id: 21, title: "حسابدار ارشد", category: "admin", salaryUSD: 6110, description: "تحلیلگر مالی و حسابداری ارشد (حقوق: ۱۲۰۰ - ۳۵۰۰ ریال عمان)", imageUrl: "/attached_assets/generated_images/senior_financial_analyst_office.png" });
    this.addJob({ id: 2, title: "منشی / کارمند اداری", category: "admin", salaryUSD: 1430, description: "هماهنگی و امور اداری (حقوق: ۴۰۰ - ۷۰۰ ریال عمان)", imageUrl: "/attached_assets/generated_images/professional_receptionist_in_muscat_office.png" });

    // 5. General & Services (Category: general)
    const generalImg = "/attached_assets/generated_images/general_labor_and_drivers_in_oman.png";
    this.addJob({ id: 10, title: "کارگر ساده", category: "general", salaryUSD: 845, description: "کارگر ساده جهت پروژه‌های مختلف (حقوق: ۲۵۰ - ۴۰۰ ریال عمان)", imageUrl: "/attached_assets/generated_images/general_worker_in_oman_construction.png" });
    this.addJob({ id: 22, title: "خدمات هتل / رستوران", category: "general", salaryUSD: 1365, description: "پذیرایی و خدمات هتلی (حقوق: ۳۵۰ - ۷۰۰ ریال عمان)", imageUrl: "/attached_assets/generated_images/hotel_and_restaurant_staff_in_oman.png" });
    this.addJob({ id: 23, title: "انباردار", category: "general", salaryUSD: 1040, description: "مدیریت انبار و کالا (حقوق: ۳۰۰ - ۵۰۰ ریال عمان)", imageUrl: "/attached_assets/generated_images/warehouse_manager_in_muscat_facility.png" });
    this.addJob({ id: 24, title: "نیروی خدماتی", category: "general", salaryUSD: 949, description: "امور خدماتی و نظافتی (حقوق: ۲۸۰ - ۴۵۰ ریال عمان)", imageUrl: "/attached_assets/generated_images/general_labor_and_drivers_in_oman.png" });
  }

  private addJob(job: Job) {
    this.jobs.set(job.id, job);
  }

  async getJobs(category?: string): Promise<Job[]> {
    const allJobs = Array.from(this.jobs.values());
    if (category) {
      return allJobs.filter(job => job.category === category);
    }
    return allJobs;
  }

  async getJob(id: number): Promise<Job | undefined> {
    return this.jobs.get(id);
  }

  async createApplication(app: InsertApplication): Promise<Application> {
    const id = this.appIdCounter++;
    const newApp: Application = { ...app, id, createdAt: new Date() };
    this.applications.set(id, newApp);
    return newApp;
  }
}

export const storage = new MemStorage();
