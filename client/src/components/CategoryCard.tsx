import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

interface CategoryCardProps {
  id: string;
  title: string;
  image: string;
  description: string;
  delay?: number;
}

export function CategoryCard({ id, title, image, description, delay = 0 }: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100"
    >
      <Link href={`/jobs/${id}`} className="block h-full">
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div className="absolute bottom-4 right-4 z-20">
            <h3 className="text-xl font-bold text-white">{title}</h3>
          </div>
        </div>
        
        <div className="p-6 relative">
          <p className="text-slate-600 text-sm mb-4 line-clamp-2">
            {description}
          </p>
          <div className="flex items-center text-primary font-medium text-sm group-hover:text-secondary transition-colors">
            مشاهده فرصت‌ها
            <ArrowLeft className="mr-2 h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
