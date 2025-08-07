import { z } from "zod";

export const resumeSchema = z.object({
  name: z.string().min(1, "field-required"),
  email: z.string().email("invalid-email").min(1, "field-required"),
  linkedIn: z.string().url("invalid-link").optional().or(z.literal('')),
  github: z.string().url("invalid-link").optional().or(z.literal('')),
  phone: z.string().min(10, "invalid-phone"),
  location: z.string().min(1, "field-required"),
  summary: z.string().min(1, "field-required"),
  experience: z.array(
    z.object({
      jobTitle: z.string().min(1, "field-required"),
      company: z.string().min(1, "field-required"),
      startDate: z.string().min(1, "field-required"),
      endDate: z.string(),
      currentlyWorking: z.boolean().optional(),
      location: z.string().min(1, "field-required"),
      bulletPoints: z.array(z.object({
        text: z.string().min(1, "field-required"),
      })).min(1, "at-least-one-bullet-point"),
    })
  ),
  project: z.array(
    z.object({
      name: z.string().min(1, "field-required"),
      startDate: z.string().min(1, "field-required"),
      endDate: z.string(),
      currentlyWorking: z.boolean().optional(),
      bulletPoints: z.array(z.object({
        text: z.string().min(1, "field-required"),
      })).min(1, "at-least-one-bullet-point"),
    })
  ),
  skills: z.array(z.object({
    text: z.string().min(1, "field-required"),
  })).min(1, "at-least-one-bullet-point"),
  education: z.array(
    z.object({
      institution: z.string().min(1, "field-required"),
      location: z.string(),
      degree: z.string().min(1, "field-required"),
      gpa: z.string().optional(),
      startDate: z.string().min(1, "field-required"),
      endDate: z.string(),
      currentlyWorking: z.boolean().optional(),
    })
  ),
  certifications: z.array(
    z.object({
      name: z.string().min(1, "field-required"),
      description: z.string().min(1, "field-required"),
    })
  ),
  extracurriculars: z.array(
    z.object({
      name: z.string().min(1, "field-required"),
      description: z.string().min(1, "field-required"),
      startDate: z.string().min(1, "field-required"),
      endDate: z.string(),
      currentlyWorking: z.boolean().optional(),
      location: z.string().min(1, "field-required"),
      bulletPoints: z.array(z.object({
        text: z.string().min(1, "field-required"),
      })).min(1, "at-least-one-bullet-point"),
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