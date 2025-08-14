import axios from 'axios';
import qs from 'qs';

export interface SpotifyArtist {
    name: string;
    external_urls: {
        spotify: string;
    };
}

export interface Track {
    name: string;
    artists: { name: string; url: string }[];
    playedAt: string;
    timeAgo: string;
    songUrl: string;
}

const id = process.env.SPOTIFY_CLIENT_ID;
const secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh = process.env.SPOTIFY_REFRESH_TOKEN;

// Get new access token using refresh token
export const getAccessToken = async (): Promise<string> => {
    const data = qs.stringify({
        grant_type: 'refresh_token',
        refresh_token: refresh
    });

    const response = await axios.post('https://accounts.spotify.com/api/token', data, {
        headers: {
            'Authorization': 'Basic ' + Buffer.from(`${id}:${secret}`).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    return response.data.access_token;
}

export const getSong = async (): Promise<Track | null> => {
    try {
        const token = await getAccessToken();

        const response = await axios.get('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.data.items.length === 0) {
            return null;
        }

        const item = response.data.items[0];
        const track = item.track;
        const playedAt = new Date(item.played_at);
        const now = new Date();

        return {
            name: track.name,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            artists: track.artists.map((a: any) => ({
                name: a.name,
                url: a.external_urls.spotify
            })),
            playedAt: item.played_at,
            timeAgo: formatTimeAgo(playedAt, now),
            songUrl: track.external_urls.spotify
        };
    } catch (error) {
        console.error('Error fetching recently played track:', error);
        return null;
    }
};

function formatTimeAgo(playedAt: Date, now: Date): string {
    const diffInSeconds = Math.floor((now.getTime() - playedAt.getTime()) / 1000);

    if (diffInSeconds < 60) {
        return `${diffInSeconds} seconds ago`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
}