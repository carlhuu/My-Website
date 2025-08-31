import axios from "axios";

export interface StravaRun {
  distanceMiles: number;
  elapsedTime: string;
  url: string;
  timeAgo?: string; 
}

const id = process.env.STRAVA_CLIENT_ID;
const secret = process.env.STRAVA_CLIENT_SECRET;
const refresh = process.env.STRAVA_REFRESH_TOKEN;

async function getAccessToken(): Promise<string> {
  const res = await axios.post("https://www.strava.com/oauth/token", null, {
    params: {
      client_id: id,
      client_secret: secret,
      refresh_token: refresh,
      grant_type: "refresh_token",
    },
  });
  return res.data.access_token;
}

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [
    h > 0 ? `${h}h` : "",
    m > 0 ? `${m}m` : "",
    s > 0 ? `${s}s` : "",
  ].filter(Boolean).join(" ");
}

export const getLatestRun = async (): Promise<StravaRun | null> => {
  const accessToken = await getAccessToken();

  let page = 1;
  while (page < 5) { 
    const response = await axios.get(
      `https://www.strava.com/api/v3/athlete/activities?per_page=20&page=${page}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    const activities = response.data;
    if (!activities.length) break; // 

    const run = activities.find((a: any) => a.type === "Run");
    if (run) {
      return {
        distanceMiles: Math.floor((run.distance / 1609.34) * 100) / 100,
        elapsedTime: formatTime(run.elapsed_time),
        url: `https://www.strava.com/activities/${run.id}`,
        timeAgo: formatTimeAgo(run.start_date),
      };
    }

    page++;
  }

  return null; // no runs found
};

function formatTimeAgo(startDate: string): string {
  const playedAt = new Date(startDate);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - playedAt.getTime()) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
}