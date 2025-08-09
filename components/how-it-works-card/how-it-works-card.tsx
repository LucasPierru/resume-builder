import React, { ReactNode } from "react";

type HowItWorksCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

function HowItWorksCard({ icon, title, description }: HowItWorksCardProps) {
  return (
    <div className="flex flex-col gap-2 items-center justify-start w-full p-6 rounded-x">
      {icon}
      <h3 className="text-2xl font-semibold text-center">{title}</h3>
      <p className="text-md text-center">{description}</p>
    </div>
  );
}

export default HowItWorksCard;
