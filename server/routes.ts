import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Get all jobs or filter by category
  app.get(api.jobs.list.path, async (req, res) => {
    const category = req.query.category as string | undefined;
    const jobs = await storage.getJobs(category);
    res.json(jobs);
  });

  // Get single job
  app.get(api.jobs.get.path, async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }
    const job = await storage.getJob(id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.json(job);
  });

  // Submit application
  app.post(api.applications.create.path, async (req, res) => {
    try {
      const input = api.applications.create.input.parse(req.body);
      const app = await storage.createApplication(input);
      res.status(201).json({ success: true, id: app.id });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  return httpServer;
}
