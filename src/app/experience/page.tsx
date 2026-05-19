import Image from "next/image";
import Link from "next/link";

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string;
  logo?: string;
}

const ExperienceCard: React.FC<ExperienceItem> = ({ title, company, period, description, logo }) => {
  return (
    <div className="flex items-center gap-10 mb-10">
      <div className="w-[380px]">
        <h2 className="font-merriweatherBold mb-2 text-xl sm:text-2xl">{title}</h2>
        <p className="text-sm sm:text-base mb-1">{company}</p>
        <p className="text-sm sm:text-base mb-1">{period}</p>
        <p className="text-sm sm:text-base">{description}</p>
      </div>
      {logo ? (
        <div className="flex-shrink-0 w-[125px] h-[125px] relative overflow-hidden rounded-md border border-black">
          <Image src={logo} alt={`${company} logo`} fill className="object-cover" sizes="125px"/>
        </div>
      ) : null}
    </div>
  );
};

export default function Experience() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center text-base leading-relaxed sm:text-lg">
      <div className="relative flex flex-col pt-[26vh] max-w-[56rem] mx-auto">
        <h1 className="font-merriweatherBold mb-5 text-3xl sm:text-4xl">Experience</h1>
        <div className="description">
          <p className="mb-4 max-w-[56rem]">Holla at ya boi</p>
          <ExperienceCard
            title="Engineering Summer Analyst"
            company="Goldman Sachs"
            period="June 2026 - August 2026"
            description="CPM Engineering"
            logo="/assets/images/goldman_sachs_logo.jfif"
          />
          <ExperienceCard
            title="Developer"
            company="Hack4Impact"
            period="September 2025 - Present"
            description="Internal Member Archive + Hudson Valley Textile Project"
            logo="/assets/images/hack4impact_logo.jfif"
          />
          <ExperienceCard
            title="Software Engineering Intern"
            company="OurFreedom.ai"
            period="July 2025 - August 2025"
            description="User-Facing Pages"
            logo="/assets/images/ourfreedom.ai_logo.jfif"

          />
        </div>
      </div>
    </div>
  );
}