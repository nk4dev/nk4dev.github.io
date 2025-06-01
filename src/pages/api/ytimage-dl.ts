import type { NextApiRequest, NextApiResponse } from 'next';

const THUMB_TYPES = [
    'maxresdefault.jpg', // w1280
    'sddefault.jpg',     // w640
    'hqdefault.jpg',     // w480
    'mqdefault.jpg',     // w320
    'default.jpg',       // w120
];

function extractVideoId(url: string): string {
    const patterns = [
        /watch\?v=([a-zA-Z0-9_-]+)/, // Normal URL
        /https:\/\/youtu\.be\/([a-zA-Z0-9_-]+)/, // Short URL
        /https:\/\/www\.youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/, // Shorts URL
        /https:\/\/www\.youtube\.com\/live\/([a-zA-Z0-9_-]+)/, // Live URL
        /shorts\/([a-zA-Z0-9_-]+)/, // Shorts video path
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }

    return 'error';
}

async function getYtThumbnail(videoId: string): Promise<string | null> {
    const loadImage = (src: string): Promise<HTMLImageElement> => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    };

    for (const type of THUMB_TYPES) {
        const fileName = `https://i.ytimg.com/vi/${videoId}/${type}`;
        try {
            const img = await loadImage(fileName);
            if (img.width > 120 || !THUMB_TYPES[THUMB_TYPES.indexOf(type) + 1]) {
                return fileName;
            }
        } catch {
            // Ignore errors and try the next thumbnail type
        }
    }

    return null;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { url } = req.body;

    if (!url || typeof url !== 'string') {
        return res.status(400).json({ error: 'Invalid URL' });
    }

    const videoId = extractVideoId(url);

    if (videoId === 'error') {
        return res.status(400).json({ error: 'Invalid YouTube URL' });
    }

    const thumbnailUrl = await getYtThumbnail(videoId);

    if (!thumbnailUrl) {
        return res.status(404).json({ error: 'Thumbnail not found' });
    }

    return res.status(200).json({ thumbnailUrl });
}
