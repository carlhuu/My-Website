"use client";
import { useEffect, useState } from "react";
import Carl from "./components/creepycarl";
import { getSong, Track } from "./api/spotify";
import { getLatestLichessGame, LichessGame } from "./api/lichess";
import { getLatestRun, StravaRun } from "./api/strava";

export default function Home() {
  const [recentTrack, setRecentTrack] = useState<Track | null>(null);
  const [latestGame, setLatestGame] = useState<LichessGame | null>(null);
  const [latestRun, setLatestRun] = useState<StravaRun | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentTrack = async () => {
      try {
        const track = await getSong();
        setRecentTrack(track);
      } catch (err) {
        console.error("Failed to fetch track:", err);
        setError("Failed to load recent tracks");
      } finally {
        setLoading(false);
      }
    };

    const fetchGame = async () => {
      const game = await getLatestLichessGame("Dilligrout");
      setLatestGame(game);
    };

    const fetchRun = async () => {
      const run = await getLatestRun();
      setLatestRun(run);
    };

    fetchRecentTrack();
    fetchGame();
    fetchRun();

    // // Optional: Refresh every 1 minute
    // const interval = setInterval(fetchRecentTrack, 1 * 60 * 1000);
    // return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col m-auto relative">
        <h1 className="font-merriweatherBold text-3xl mb-4">
          Hello, I&apos;m Carl Hu!
        </h1>
        <div className="description">
          <p className="mb-2">
            I&apos;m a rising sophomore studying CS at Cornell. I&apos;m
            interested in web and app development. <br />
            Outside of coding, I like playing tennis, viola, and going to the
            gym.
          </p>
          <p className="mb-3">I recently...</p>
        </div>
        <div className="max-w-[450px]">
          <ul className="api text-sm space-y-3">
            <li>
              <span className="mr-[12.8px] text-[#cccccc]">{">"}</span>
              {loading ? (
                "Loading song..."
              ) : error ? (
                <span className="text-red-500">{error}</span>
              ) : recentTrack ? (
                <>
                  listened to{" "}
                  <a
                    href={recentTrack.songUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    {recentTrack.name}
                  </a>{" "}
                  by{" "}
                  {recentTrack.artists.map((artist, idx) => (
                    <span key={artist.url}>
                      <a
                        href={artist.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        {artist.name}
                      </a>
                      {idx < recentTrack.artists.length - 1 && ", "}
                    </span>
                  ))}{" "}
                  ({recentTrack.timeAgo})
                </>
              ) : (
                "No recent tracks"
              )}
            </li>
            <li>
              <span className="mr-[12.8px] text-[#cccccc] text-opacity-0">
                {">"}
              </span>
              {latestGame ? (
                <>
                  {latestGame.result === "win"
                    ? "won"
                    : latestGame.result === "loss"
                    ? "lost"
                    : "drew"}{" "}
                  a{" "}
                  <a
                    href={latestGame.gameUrl}
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
                    ].includes(latestGame.type.toLowerCase())
                      ? `${latestGame.type
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())
                          .trim()} game`
                      : `${latestGame.type} game`}
                  </a>{" "}
                  against{" "}
                  <a
                    href={`https://lichess.org/@/${latestGame.opponent}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    {latestGame.opponent}
                  </a>{" "}
                  ({latestGame.timeAgo})
                </>
              ) : (
                "Loading game..."
              )}
            </li>
            <li>
              <span className="mr-[12.8px] text-[#cccccc]">{">"}</span>
              {latestRun ? (
                <>
                  ran{" "}
                  <a
                    href={latestRun.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    {latestRun.distanceMiles} miles
                  </a>{" "}
                  in {latestRun.elapsedTime}
                  {" "}
                  ({latestRun.timeAgo})
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
              <button className="border border-[#56a8ff] bg-[#56a8ff] cursor-pointer mr-3 p-2 px-7 text-white">
                GitHub
              </button>
            </a>
            <a
              href="https://linkedin.com/in/carl-hu"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="border cursor-pointer mr-3 p-2 px-6 text-[#56a8ff]">
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
