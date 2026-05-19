interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string;
  logo?: string;
}

const ExperienceCard: React.FC<ExperienceItem> = ({ title, company, period, description, logo }) => {
  return (
    <div className="flex items-center gap-8 mb-8">
      <div className="w-[340px]">
        <h2 className="font-merriweatherBold mb-2 text-lg sm:text-xl">{title}</h2>
        <p className="text-xs sm:text-sm mb-1">{company}</p>
        <p className="text-xs sm:text-sm mb-1">{period}</p>
        <p className="text-xs sm:text-sm">{description}</p>
      </div>
      {logo ? (
        <div className="flex-shrink-0 w-[110px] h-[110px] relative overflow-hidden rounded-md border border-black">
          <img
            src={logo}
            alt={`${company} logo`}
            className="h-full w-full object-cover"
          />
        </div>
      ) : null}
    </div>
  );
};

export default function Experience() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center text-sm leading-relaxed sm:text-base">
      <div className="relative flex flex-col pt-[26vh] max-w-[50rem] mx-auto">
        <h1 className="font-merriweatherBold mb-4 text-2xl sm:text-3xl">Experience</h1>
        <div className="description">
          <p className="mb-4 max-w-[50rem]">Holla at ya boi</p>
          <ExperienceCard
            title="Engineering Summer Analyst"
            company="Goldman Sachs"
            period="June 2026 - August 2026"
            description="CPM Engineering"
            logo="/assets/images/goldman_sachs_logo.jpg"
          />
          <ExperienceCard
            title="Developer"
            company="Hack4Impact"
            period="September 2025 - Present"
            description="Internal Member Archive + Hudson Valley Textile Project"
            logo="/assets/images/hack4impact_logo.jpg"
          />
          <ExperienceCard
            title="Software Engineering Intern"
            company="OurFreedom.ai"
            period="July 2025 - August 2025"
            description="User-Facing Pages"
            logo="/assets/images/ourfreedom.ai_logo.jpg"
          />
        </div>
      </div>
    </div>
  );
}