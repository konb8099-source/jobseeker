import { useMutation } from "@tanstack/react-query";
import { api, type InsertApplication } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useCreateApplication() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertApplication) => {
      const res = await fetch(api.applications.create.path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.applications.create.responses[400].parse(await res.json());
          throw new Error(error.message || "اطلاعات وارد شده صحیح نمی‌باشد");
        }
        throw new Error("خطا در ثبت درخواست");
      }

      return api.applications.create.responses[201].parse(await res.json());
    },
    onError: (error) => {
      toast({
        title: "خطا",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
