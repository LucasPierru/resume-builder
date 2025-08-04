import { z } from "zod";

export const resumeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  linkedIn: z.string().url("Invalid LinkedIn URL").optional().or(z.literal('')),
  github: z.string().url("Invalid GitHub URL").optional().or(z.literal('')),
  phone: z.string().min(10, "Invalid phone number"),
  location: z.string().min(1, "Location is required"),
  summary: z.string().min(1, "Summary is required"),
  experience: z.array(
    z.object({
      jobTitle: z.string().min(1, "Job title is required"),
      company: z.string().min(1, "Company name is required"),
      startDate: z.string().min(1, "Start date is required"),
      endDate: z.string(),
      currentlyWorking: z.boolean().optional(),
      location: z.string().min(1, "Location is required"),
      bulletPoints: z.array(z.object({
        text: z.string().min(1, "Bullet point cannot be empty"),
      })).min(1, "At least one bullet point is required"),
    })
  ),
  project: z.array(
    z.object({
      name: z.string().min(1, "Project name is required"),
      startDate: z.string().min(1, "Start date is required"),
      endDate: z.string(),
      currentlyWorking: z.boolean().optional(),
      bulletPoints: z.array(z.object({
        text: z.string().min(1, "Bullet point cannot be empty"),
      })).min(1, "At least one bullet point is required"),
    })
  ),
  skills: z.array(z.object({
    text: z.string().min(1, "Bullet point cannot be empty"),
  })).min(1, "At least one bullet point is required"),
  education: z.array(
    z.object({
      institution: z.string().min(1, "Institution is required"),
      location: z.string(),
      degree: z.string().min(1, "Degree is required"),
      gpa: z.string().optional(),
      startDate: z.string().min(1, "Start date is required"),
      endDate: z.string(),
      currentlyWorking: z.boolean().optional(),
    })
  ),
  certifications: z.array(
    z.object({
      name: z.string().min(1, "Certification name is required"),
      description: z.string().min(1, "Description is required"),
    })
  ),
  extracurriculars: z.array(
    z.object({
      name: z.string().min(1, "Extra-curricular activity name is required"),
      description: z.string().min(1, "Description is required"),
      startDate: z.string().min(1, "Start date is required"),
      endDate: z.string(),
      currentlyWorking: z.boolean().optional(),
      location: z.string().min(1, "Location is required"),
      bulletPoints: z.array(z.object({
        text: z.string().min(1, "Bullet point cannot be empty"),
      })).min(1, "At least one bullet point is required"),
    })
  ),
})

export type Resume = z.infer<typeof resumeSchema>;

export const defaultExperience = {
  company: "",
  jobTitle: "",
  startDate: "",
  endDate: "",
  currentlyWorking: false,
  location: "",
  bulletPoints: [],
}

export const defaultProject = {
  name: "",
  location: "",
  startDate: "",
  endDate: "",
  currentlyWorking: false,
  bulletPoints: [],
}

export const defaultEducation = {
  institution: "",
  location: "",
  startDate: "",
  endDate: "",
  degree: "",
  fieldOfStudy: "",
  currentlyWorking: false,
  gpa: "",
}

export const defaultCertification = {
  name: "",
  description: "",
}

export const defaultExtracurricular = {
  name: "",
  description: "",
  startDate: "",
  endDate: "",
  currentlyWorking: false,
  location: "",
  bulletPoints: [],
}