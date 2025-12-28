import { pgTable, text, serial, integer, boolean, timestamp, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(), // 'admin', 'technical', 'beauty', 'general'
  description: text("description").notNull(),
  salaryUSD: integer("salary_usd").notNull(),
  imageUrl: text("image_url").notNull(),
});

export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  jobId: integer("job_id").notNull(),
  fullName: text("full_name").notNull(),
  mobile: text("mobile").notNull(),
  birthDate: text("birth_date").notNull(), // Storing as text for Jalali date string or standardized format
  nationalId: text("national_id").notNull(),
  gender: text("gender").notNull(), // 'male', 'female'
  militaryStatus: text("military_status"), // Optional, for men
  emergencyContact: text("emergency_contact"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertApplicationSchema = createInsertSchema(applications).omit({ 
  id: true, 
  createdAt: true 
});

export type Job = typeof jobs.$inferSelect;
export type Application = typeof applications.$inferSelect;
export type InsertApplication = z.infer<typeof insertApplicationSchema>;

export const JOB_CATEGORIES = {
  admin: "مشاغل اداری",
  technical: "مشاغل فنی و مهارتی",
  beauty: "خدمات زیبایی و ناخن",
  general: "خدمات عمومی",
} as const;
