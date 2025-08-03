import ResumeForm from "@/components/resume-form/resume-form";
import { Resume } from "@/validation/resume";
import ResumeViewer from "@/components/resume-viewer/resume-viewer";
import React from "react";

function ResumePage() {
  const defaultValues = {
    name: "",
    email: "",
    linkedIn: "",
    github: "",
    phone: "",
    location: "",
    summary: "",
    experience: [],
    project: [],
    skills: [],
    education: [],
    certifications: [],
    extracurriculars: [],
  };

  const defaultMock: Resume = {
    name: "Lucas Pierru",
    email: "lucaspierru7@gmail.com",
    linkedIn: "https://www.linkedin.com/in/lucaspierru/",
    github: "https://github.com/lucaspierru",
    phone: "+1 (514) 249-4751",
    location: "Montréal, Qc",
    summary:
      "Full stack software engineer with strong proficiency in JavaScript/TypeScript, experienced in building real-time web platforms and interactive data dashboards. Skilled in both frontend (Next.js/React, Tailwind) and backend (Node.js, Express) development, with experience in WebSockets, REST APIs, and Docker-based deployments. Passionate about writing clean, performant, and scalable code",
    experience: [
      {
        company: "XpertSource.com",
        jobTitle: "Software Engineer",
        location: "Montréal, Qc",
        startDate: "2022-09-01",
        endDate: "2024-03-16",
        currentlyWorking: false,
        bulletPoints: [
          {
            text: "Spearheaded the development of XpertSource.com, leveraging Next.js and Typescript to enhance performance by 50% and improve developer experience.",
          },
          {
            text: "Delivered 10+ new features including a client dashboard, redesigned pages, and a mortgage calculator, improving our customer service.",
          },
          {
            text: "Implemented a real-time chat system using WebSockets, enhancing user engagement and support response times.",
          },
          {
            text: "Optimized application performance by implementing lazy loading and code splitting techniques.",
          },
        ],
      },
    ],
    project: [
      {
        name: "Messaging application",
        startDate: "2025-06-01",
        endDate: "2025-08-01",
        currentlyWorking: true,
        bulletPoints: [
          {
            text: "Built core frontend pages including the conversations and authentication pages using React.js, TypeScript, Zustand, Tailwind CSS and Shadcn for good client interactivity.",
          },
          {
            text: "Designed the database schemas, set up the HTTP server with Express.js, and handled the necessary requests to send, receive and persist messages using socket.io and MongoDB for real-time communication.",
          },
        ],
      },
      {
        name: "Messaging application",
        startDate: "2025-06-01",
        endDate: "2025-08-01",
        currentlyWorking: true,
        bulletPoints: [
          {
            text: "Built core frontend pages including the conversations and authentication pages using React.js, TypeScript, Zustand, Tailwind CSS and Shadcn for good client interactivity.",
          },
          {
            text: "Designed the database schemas, set up the HTTP server with Express.js, and handled the necessary requests to send, receive and persist messages using socket.io and MongoDB for real-time communication.",
          },
        ],
      },
      {
        name: "Messaging application",
        startDate: "2025-06-01",
        endDate: "2025-08-01",
        currentlyWorking: true,
        bulletPoints: [
          {
            text: "Built core frontend pages including the conversations and authentication pages using React.js, TypeScript, Zustand, Tailwind CSS and Shadcn for good client interactivity.",
          },
          {
            text: "Designed the database schemas, set up the HTTP server with Express.js, and handled the necessary requests to send, receive and persist messages using socket.io and MongoDB for real-time communication.",
          },
        ],
      },
    ],
    skills: [
      { text: "JavaScript" },
      { text: "React" },
      { text: "Node.js" },
      { text: "CSS" },
      { text: "HTML" },
      { text: "Tailwind CSS" },
      { text: "Next.js" },
      { text: "TypeScript" },
      { text: "Docker" },
      { text: "WebSockets" },
      { text: "REST APIs" },
      { text: "Express.js" },
      { text: "Git" },
      { text: "Agile Methodologies" },
      { text: "Problem Solving" },
      { text: "Communication" },
      { text: "Team Collaboration" },
    ],
    education: [
      {
        institution: "École de Technologie Supérieure",
        location: "Montréal, Qc",
        degree: "Bachelor’s of Engineering",
        fieldOfStudy: "Automated production",
        startDate: "2018-09-01",
        endDate: "2022-05-01",
        currentlyWorking: false,
        gpa: "3.7/4.3",
      },
      {
        institution: "École de Technologie Supérieure",
        location: "Montréal, Qc",
        degree: "Master’s",
        fieldOfStudy: "Software Engineering",
        startDate: "2018-09-01",
        endDate: "2022-05-01",
        currentlyWorking: true,
      },
    ],
    certifications: [],
    extracurriculars: [],
  };

  return (
    <div className="max-w-7xl mx-auto h-full mt-14 p-4">
      <h1 className="text-foreground font-semibold text-2xl mb-4">Resume</h1>
      <ResumeViewer data={defaultMock} />
      <ResumeForm defaultValues={defaultMock} />
    </div>
  );
}

export default ResumePage;
