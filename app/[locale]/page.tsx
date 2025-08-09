import { use } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { createClient } from "@/utils/supabase/server";
import LoginDialog from "@/components/auth/login-dialog/login-dialog";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import {
  ChartNoAxesCombinedIcon,
  CircleAlertIcon,
  CircleCheckBigIcon,
  FileText,
  FileUpIcon,
  Languages,
} from "lucide-react";
import InfoCard from "@/components/info-card/info-card";
import HowItWorksCard from "@/components/how-it-works-card/how-it-works-card";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Home" });

  return {
    title: t("title"),
  };
}

export default function Home({ params }: { params: Promise<{ locale: string }> }) {
  const supabase = use(createClient());
  const { locale } = use(params);

  const {
    data: { user },
  } = use(supabase.auth.getUser());

  setRequestLocale(locale);
  return (
    <main className="flex flex-col items-center justify-items-center">
      <section className="flex flex-col items-center max-w-2xl mt-8 mx-auto py-14 gap-4">
        <h1 className="text-5xl font-bold text-center">Tailor Your Resume To Every Opportunity.</h1>
        <p className="text-xl text-center text-muted-foreground">
          Adaptify allows you to improve your resume, format it to the industry&apos;s standards and personalize it for
          each job application.
        </p>
        {user ? (
          <Link href="/resume">
            <Button>Start Building</Button>
          </Link>
        ) : (
          <LoginDialog />
        )}
      </section>
      <section className="bg-accent w-full py-10">
        <h2 className="text-4xl font-bold text-center mb-10">88% of qualified candidates get filtered out</h2>
        <div className="flex gap-4 max-w-7xl mx-auto mb-10">
          <InfoCard
            title="88% of rejections"
            description="Candidates are vetted out because they don't match the exact search terms"
            icon={<CircleAlertIcon className="w-16 h-16 text-destructive" />}
          />
          <InfoCard
            title="99% Adoption"
            description="Almost all companies use ATS to filter resumes before they reach the hiring manager"
            icon={<ChartNoAxesCombinedIcon className="w-16 h-16 text-chart-4" />}
          />
          <InfoCard
            title="ATS-Optimized"
            description="Adaptify helps you optimize your resume to pass the ATS filters and get noticed by recruiters"
            icon={<CircleCheckBigIcon className="w-16 h-16 text-chart-2" />}
          />
        </div>
        <div className="flex flex-col items-center gap-4 max-w-2xl mx-auto">
          <h3 className="text-3xl font-semibold text-center">Get Started Today</h3>
          <p className="text-lg text-center">
            Sign up for Adaptify and take the first step towards a more effective job search.
          </p>
          {user ? (
            <Link href="/resume">
              <Button>Start Building</Button>
            </Link>
          ) : (
            <LoginDialog />
          )}
        </div>
      </section>
      <section className="w-full py-10">
        <h2 className="text-4xl font-bold text-center mb-10">How Adaptify works</h2>
        <div className="flex gap-4 max-w-7xl mx-auto mb-10">
          <HowItWorksCard
            title="Import Your Resume"
            description="Automatically parse you resume in the correct format in either French or English"
            icon={<FileUpIcon className="w-10 h-10 text-chart-3" />}
          />
          <HowItWorksCard
            title="ATS-checked resume"
            description="Ensure your resume meets industry standard format and passes ATS filters, using the right keywords."
            icon={<CircleCheckBigIcon className="w-10 h-10 text-chart-3" />}
          />
          <HowItWorksCard
            title="Translate your resume"
            description="Translate your resume from English to French in on click. More languages coming soon!"
            icon={<Languages className="w-10 h-10 text-chart-3" />}
          />
          <HowItWorksCard
            title="Adapt Your Resume"
            description="Generate a resume tailored to the job description you provide in under a minute."
            icon={<FileText className="w-10 h-10 text-chart-3" />}
          />
        </div>
      </section>
    </main>
  );
}
