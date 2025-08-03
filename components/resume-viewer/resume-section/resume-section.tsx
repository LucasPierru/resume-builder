import { Separator } from "@/components/ui/separator";

const ResumeSection = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <section className="mb-1">
      <h2 className="font-semibold text-lg">{title}</h2>
      <Separator className="my-1 bg-[#ABAAAA] h-[1px]" />
      {children}
    </section>
  );
};
export default ResumeSection;
