"use client";

import { formatDate } from "@/lib/utils";
import { Locale } from "@/types/types";
import { Resume } from "@/validation/resume";
import { Document, Page, Text, View, StyleSheet, Font, Link } from "@react-pdf/renderer";
import { useLocale, useTranslations } from "next-intl";

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

type PDFDocumentProps = {
  data: Resume;
  t: ReturnType<typeof useTranslations>;
  locale: Locale;
};

const PDFDocument = ({ data, t, locale }: PDFDocumentProps) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 12 }}>{data.name}</Text>
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
              {data.github?.split("https://").pop()}
            </Link>
            <Text>|</Text>
            <Link src={data.linkedIn} style={styles.link}>
              {data.linkedIn?.split("https://").pop()}
            </Link>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>{t("summary")}</Text>
          <Text>{data.summary}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>{t("skills")}</Text>
          <Text>{data.skills.map((skill) => skill.text).join(", ")}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>{t("work-experience")}</Text>
          {data.experience.map((exp, i) => (
            <View key={i}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
                <View>
                  <Text style={styles.subheading}>{exp.company}</Text>
                  <Text style={styles.jobTitle}>{exp.jobTitle}</Text>
                </View>
                <View style={{ flexDirection: "column", alignItems: "flex-end" }}>
                  <Text style={styles.subheading}>
                    {formatDate(exp.startDate, locale as Locale)} -{" "}
                    {exp.currentlyWorking ? t("present") : formatDate(exp.endDate, locale as Locale)}
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
          <Text style={styles.heading}>{t("projects")}</Text>
          {data.projects.map((proj, i) => (
            <View key={i} style={{ marginBottom: 4 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={styles.projectName}>{proj.name}</Text>
                <Text style={styles.subheading}>
                  {formatDate(proj.startDate, locale as Locale)} -{" "}
                  {proj.currentlyWorking ? t("present") : formatDate(proj.endDate, locale as Locale)}
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
          <Text style={styles.heading}>{t("education")}</Text>
          {data.education.map((edu, i) => (
            <View key={i} style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
              <View>
                <Text style={styles.subheading}>{edu.institution}</Text>
                <Text style={styles.jobTitle}>{edu.degree}</Text>
              </View>
              <View style={{ flexDirection: "column", alignItems: "flex-end" }}>
                <Text style={styles.subheading}>
                  {formatDate(edu.startDate, locale as Locale)} -{" "}
                  {edu.currentlyWorking ? t("present") : formatDate(edu.endDate, locale as Locale)}
                </Text>
                {edu.gpa && (
                  <Text style={styles.location}>
                    {t("gpa")}: {edu.gpa}
                  </Text>
                )}
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default PDFDocument;
