import { ReactNode } from "react";

type InfoCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

function InfoCard({ icon, title, description }: InfoCardProps) {
  return (
    <div className="bg-background flex flex-col gap-2 items-center justify-center w-full p-6 rounded-xl">
      {icon}
      <span className="text-2xl font-semibold">{title}</span>
      <span className="text-md text-center">{description}</span>
    </div>
  );
}

export default InfoCard;
