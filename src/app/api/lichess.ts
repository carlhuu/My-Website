import axios from "axios";

export interface LichessGame {
  result: "win" | "loss" | "draw";
  type: string;
  opponent: string;
  timeAgo: string;
  gameUrl: string;
}

export const getLatestLichessGame = async (username: string): Promise<LichessGame | null> => {
  try {
    const response = await axios.get(
      `https://lichess.org/api/games/user/${username}?max=1&moves=false&tags=true&analyses=false`,
      {
        headers: { Accept: "application/x-ndjson" },
        responseType: "text"
      }
    );
    const lines = response.data.split("\n").filter(Boolean);
    if (lines.length === 0) return null;
    const game = JSON.parse(lines[0]);

    const userColor = game.players.white.user.name === username ? "white" : "black";
    const opponent =
      userColor === "white"
        ? game.players.black.user.name
        : game.players.white.user.name;

    let result: "win" | "loss" | "draw" = "draw";
    if (game.status === "draw") result = "draw";
    else if (game.winner === userColor) result = "win";
    else result = "loss";

    const type =
      ["atomic", "horde", "chess960", "crazyhouse", "kingofthehill", "threecheck", "antichess", "racingkings"].includes(game.variant.toLowerCase())
        ? game.variant
        : game.speed;
    const timeAgo = formatTimeAgo(new Date(game.createdAt), new Date());

    const gameUrl = `https://lichess.org/${game.id}`;
    return { result, type, opponent, timeAgo, gameUrl };
  } catch (error) {
    console.error("Error fetching Lichess game:", error);
    return null;
  }
};

function formatTimeAgo(date: Date, now: Date): string {
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"} ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} day${diffInDays === 1 ? "" : "s"} ago`;
}