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
    <div className="flex items-start justify-between w-full gap-6 mb-10">
      <div className="max-w-md">
        <h2 className="font-merriweatherBold text-2xl mb-2 underline">
          <a href={url}>{title}</a>
        </h2>
        <p>{description}</p>
      </div>
      <Link href={imageLink} target="_blank" rel="noopener noreferrer">
        <div className="flex-shrink-0">
          <Image
            className="rounded-md border border-black object-cover"
            src={image}
            alt={alt}
            height={125}
            width={125}
          />
        </div>
      </Link>
    </div>
  );
};

export default function Projects() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col m-auto mt-[197px]">
        <h1 className="font-merriweatherBold text-3xl mb-4 flex">Projects</h1>
        <div className="description content-center">
          <p className="flex mb-10">
            Maybe the real projects were the friends we made along the way...
          </p>
          <Project
            title="Perfect Match"
            url="https://github.com/Perfect-Match-Org/perfect-match-web"
            description="Web developer for Cornell's premier matchmaking service, used by 5,000+ Cornellians yearly"
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
