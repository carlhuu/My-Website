import Carl from "./components/creepycarl";
import { getSong, Track } from "./api/spotify";
import { getLatestLichessGame, LichessGame } from "./api/lichess";
import { getLatestRun, StravaRun } from "./api/strava";

export default async function Home() {
  const [song, lichess, run] = await Promise.all([
    getSong().catch(() => null),
    getLatestLichessGame("Dilligrout").catch(() => null),
    getLatestRun().catch(() => null),
  ]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center text-base leading-relaxed sm:text-lg">
      <div className="relative flex flex-col w-full max-w-[52rem] m-auto">
        <h1 className="font-merriweatherBold mb-5 text-3xl sm:text-4xl">
          Hello, I&apos;m Carl Hu!
        </h1>
        <div className="description">
            <p className="mb-3 max-w-[52rem]">
            I'm a junior studying CS at Cornell. I'm interested in consumer-facing products and quantitative software engineering. This summer, I'll be at Goldman Sachs as an Engineering Summer Analyst on the{" "}
            <a
              href="https://www.goldmansachs.com/careers/our-firm/corporate-planning-and-management"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              CPM Engineering
            </a>
            {" "}team. Outside of coding, I like playing tennis, viola, and going to the gym.
          </p>
          <p className="mb-4">I recently...</p>
        </div>
        <div className="max-w-[40rem] sm:max-w-[48rem]">
          <ul className="api space-y-3 text-sm sm:text-base">
            <li>
              <span className="mr-[12.8px] text-[#cccccc]">{">"}</span>
              {song ? (
                <>
                  listened to{" "}
                  <a
                    href={song.songUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    {song.name}
                  </a>{" "}
                  by{" "}
                  {song.artists.map((artist, idx) => (
                    <span key={artist.url}>
                      <a
                        href={artist.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        {artist.name}
                      </a>
                      {idx < song.artists.length - 1 && ", "}
                    </span>
                  ))}{" "}
                  ({song.timeAgo})
                </>
              ) : (
                "No recent tracks"
              )}
            </li>
            <li>
              <span className="mr-[12.8px] text-[#cccccc] text-opacity-0">
                {">"}
              </span>
              {lichess ? (
                <>
                  {lichess.result === "win"
                    ? "won"
                    : lichess.result === "loss"
                    ? "lost"
                    : "drew"}{" "}
                  a{" "}
                  <a
                    href={lichess.gameUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    {[
                      "atomic",
                      "horde",
                      "chess960",
                      "crazyhouse",
                      "kingofthehill",
                      "threecheck",
                      "antichess",
                      "racingkings",
                      "bughouse",
                    ].includes(lichess.type.toLowerCase())
                      ? `${lichess.type
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())
                          .trim()} game`
                      : `${lichess.type} game`}
                  </a>{" "}
                  against{" "}
                  <a
                    href={`https://lichess.org/@/${lichess.opponent}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    {lichess.opponent}
                  </a>{" "}
                  ({lichess.timeAgo})
                </>
              ) : (
                "Loading game..."
              )}
            </li>
            <li>
              <span className="mr-[12.8px] text-[#cccccc]">{">"}</span>
              {run ? (
                <>
                  ran{" "}
                  <a
                    href={run.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    {run.distanceMiles} miles
                  </a>{" "}
                  in {run.elapsedTime}
                  {" "}
                  ({run.timeAgo})
                </>
              ) : (
                "Loading run..."
              )}
            </li>
          </ul>
        </div>
        <p className="description mt-6 mb-7">
          Feel free to{" "}
          <a className="email" href="mailto:cjh353@cornell.edu">
            reach out
          </a>
          ! 🤗
        </p>
        <div className="description">
          <div className="flex">
            <a
              href="https://github.com/carlhuu"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="border border-[#56a8ff] bg-[#56a8ff] cursor-pointer mr-3 px-7 py-2.5 text-sm text-white sm:px-8 sm:py-3 sm:text-base">
                GitHub
              </button>
            </a>
            <a
              href="https://linkedin.com/in/carl-hu"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="border cursor-pointer mr-3 px-6 py-2.5 text-sm text-[#56a8ff] sm:px-7 sm:py-3 sm:text-base">
                LinkedIn
              </button>
            </a>
          </div>
        </div>{" "}
        <div className="absolute right-0 bottom-0 w-[250px] h-[250px]">
          <Carl />
        </div>
      </div>
    </div>
  );
}
