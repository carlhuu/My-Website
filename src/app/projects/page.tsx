import Image from "next/image";
import Link from "next/link";

interface ProjectProps {
  title: string;
  url: string;
  description: string;
  image: string;
  imageLink: string;
  alt: string;
}

const Project: React.FC<ProjectProps> = ({
  title,
  url,
  description,
  image,
  imageLink,
  alt,
}) => {
  return (
    <div className="flex items-center gap-10 mb-10">
      <div className="w-[382px]">
        <h2 className="font-merriweatherBold mb-2 text-xl underline sm:text-2xl">
          <a href={url}>{title}</a>
        </h2>
        <p className="text-sm sm:text-base">{description}</p>
      </div>
      <Link href={imageLink} target="_blank" rel="noopener noreferrer">
        <div className="flex-shrink-0 w-[125px] h-[125px] relative overflow-hidden rounded-md border border-black">
          <Image
            className="object-cover"
            src={image}
            alt={alt}
            fill
            sizes="125px"
          />
        </div>
      </Link>
    </div>
  );
};

export default function Projects() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center text-base leading-relaxed sm:text-lg">
      <div className="relative flex flex-col pt-[23.5vh] max-w-[56rem] mx-auto">
        <h1 className="font-merriweatherBold mb-5 text-3xl sm:text-4xl">Projects</h1>
        <div className="description">
          <p className="mb-4 max-w-[56rem]">
            Maybe the real projects were the friends we made along the way...
          </p>
          <Project
            title="FixYourBrokeAhhJumper"
            url="https://github.com/Etienne-Sasenarine/FixYourBrokeAhhJumper"
            description="Have you ever been on the court with your homeboy and thought, “Wow, your jumper sucks”? "
            image="/assets/images/brokeahhjumper.png"
            imageLink="https://github.com/Etienne-Sasenarine/FixYourBrokeAhhJumper"
            alt="Screenshot of FixYourBrokeAhhJumper"
          ></Project>
          <Project
            title="Perfect Match"
            url="https://github.com/Perfect-Match-Org/perfect-match-web"
            description="Cornell's premier matchmaking service, used by 5,000+ Cornellians yearly"
            image="/assets/images/pm.png"
            imageLink="https://perfectmatch.ai"
            alt="Screenshot of Perfect Match"
          ></Project>
          <Project
            title="CornellGuessr"
            url="https://github.com/carlhuu/CornellGuessr"
            description="GeoGuessr's hotter, sexier, more attractive cousin"
            image="/assets/images/cornellguessr.png"
            imageLink="https://cornellguessr.vercel.app"
            alt="Screenshot of CornellGuessr"
          ></Project>
        </div>
      </div>
    </div>
  );
}
