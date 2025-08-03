"use client";

import { Resume } from "@/validation/resume";
import { Document, Page, Text, View, StyleSheet, Font, Link } from "@react-pdf/renderer";
import { format } from "date-fns";

Font.register({
  family: "Times New Roman",
  fonts: [
    { src: "/fonts/times.ttf", fontWeight: "normal" }, // fallback to system
    { src: "/fonts/times-bold.ttf", fontWeight: "bold" },
    { src: "/fonts/times-italic.ttf", fontStyle: "italic" },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: "Times New Roman",
    lineHeight: 1.4,
  },
  header: {
    alignItems: "center",
    marginBottom: 4,
    flexDirection: "column",
  },
  section: {
    marginBottom: 4,
  },
  heading: {
    fontSize: 13,
    fontWeight: "semibold",
    marginBottom: 8,
    textTransform: "uppercase",
    borderBottomWidth: 1,
    borderBottomColor: "#ABAAAA",
    paddingBottom: 4,
  },
  subheading: {
    fontSize: 11,
    fontWeight: "bold",
  },
  projectName: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 2,
  },
  jobTitle: {
    fontSize: 11,
  },
  location: {
    fontSize: 11,
    fontStyle: "italic",
  },
  text: {
    marginBottom: 2,
  },
  info: {
    flexDirection: "row",
    gap: 4,
    marginBottom: 2,
  },
  small: {
    fontSize: 10,
    color: "black",
    textDecoration: "none",
  },
  link: {
    fontSize: 10,
    color: "#5297E4",
  },
  listItem: {
    marginLeft: 8,
    marginBottom: 2,
  },
});

const PDFDocument = ({ data }: { data: Resume }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 16 }}>{data.name}</Text>
          <Text>{data.location}</Text>
          <View style={styles.info}>
            <Link src={`mailto:${data.email}`} style={styles.small}>
              {data.email}
            </Link>
            <Text>|</Text>
            <Link src={`tel:${data.phone}`} style={styles.small}>
              {data.phone}
            </Link>
            <Text>|</Text>
            <Link src={data.github} style={styles.link}>
              {data.github}
            </Link>
            <Text>|</Text>
            <Link src={data.linkedIn} style={styles.link}>
              {data.linkedIn}
            </Link>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Summary</Text>
          <Text>{data.summary}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Skills</Text>
          <Text>{data.skills.map((skill) => skill.text).join(", ")}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Work Experience</Text>
          {data.experience.map((exp, i) => (
            <View key={i}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
                <View>
                  <Text style={styles.subheading}>{exp.company}</Text>
                  <Text style={styles.jobTitle}>{exp.jobTitle}</Text>
                </View>
                <View style={{ flexDirection: "column", alignItems: "flex-end" }}>
                  <Text style={styles.subheading}>
                    {format(exp.startDate, "MMM yyyy")} -{" "}
                    {exp.currentlyWorking ? "Present" : format(exp.endDate, "MMM yyyy")}
                  </Text>
                  <Text style={styles.location}>{exp.location}</Text>
                </View>
              </View>

              {exp.bulletPoints.map((bp, j) => (
                <Text key={j} style={styles.listItem}>
                  • {bp.text}
                </Text>
              ))}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Projects</Text>
          {data.project.map((proj, i) => (
            <View key={i} style={{ marginBottom: 4 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={styles.projectName}>{proj.name}</Text>
                <Text style={styles.subheading}>
                  {format(proj.startDate, "MMM yyyy")} -{" "}
                  {proj.currentlyWorking ? "Present" : format(proj.endDate, "MMM yyyy")}
                </Text>
              </View>
              <View>
                {proj.bulletPoints.map((bp, j) => (
                  <Text key={j} style={styles.listItem}>
                    • {bp.text}
                  </Text>
                ))}
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Education</Text>
          {data.education.map((edu, i) => (
            <View key={i} style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
              <View>
                <Text style={styles.subheading}>{edu.institution}</Text>
                <Text style={styles.jobTitle}>
                  {edu.degree} in {edu.fieldOfStudy}
                </Text>
              </View>
              <View style={{ flexDirection: "column", alignItems: "flex-end" }}>
                <Text style={styles.subheading}>
                  {format(edu.startDate, "MMM yyyy")} -{" "}
                  {edu.currentlyWorking ? "Present" : format(edu.endDate, "MMM yyyy")}
                </Text>
                {edu.gpa && <Text style={styles.location}>GPA: {edu.gpa}</Text>}
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default PDFDocument;
