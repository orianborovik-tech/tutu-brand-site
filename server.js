import express from 'express';
import cors from 'cors';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const execPromise = promisify(exec);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Validate Facebook URL
function validateFacebookUrl(url) {
    const patterns = [
        /facebook\.com\/.*\/videos\//,
        /facebook\.com\/watch/,
        /fb\.watch/,
        /m\.facebook\.com/
    ];
    return patterns.some(p => p.test(url));
}

// Check if yt-dlp is available
async function checkYtDlp() {
    try {
        await execPromise('yt-dlp --version');
        return true;
    } catch {
        return false;
    }
}

// Fetch video info and formats using yt-dlp
async function fetchVideoWithYtDlp(url) {
    try {
        const { stdout } = await execPromise(
            `yt-dlp -j --no-warnings "${url}"`,
            { maxBuffer: 10 * 1024 * 1024 }
        );

        const data = JSON.parse(stdout);

        const formats = [];
        const seenQualities = new Set();

        if (data.formats) {
            data.formats
                .filter(f => f.vcodec !== 'none' && f.acodec !== 'none')
                .sort((a, b) => (b.height || 0) - (a.height || 0))
                .forEach(f => {
                    const quality = f.height ? `${f.height}p` : 'Unknown';
                    if (!seenQualities.has(quality) && formats.length < 3) {
                        seenQualities.add(quality);
                        formats.push({
                            format_id: f.format_id,
                            quality: quality,
                            height: f.height,
                            filesize: f.filesize
                        });
                    }
                });
        }

        return {
            title: data.title || 'Facebook Video',
            thumbnail: data.thumbnail || '',
            duration: data.duration || 0,
            formats: formats.length > 0 ? formats : [{ format_id: 'best', quality: 'Best', height: 0, filesize: null }]
        };
    } catch (error) {
        throw new Error(`Failed to fetch video: ${error.message}`);
    }
}

// Fallback: use external API for video info
async function fetchVideoWithAPI(url) {
    try {
        // This is a placeholder - you would integrate with an actual API service
        // For now, we return mock data
        return {
            title: 'Facebook Video',
            thumbnail: '',
            duration: 0,
            formats: [
                { format_id: '720', quality: '720p', height: 720, filesize: 45 * 1024 * 1024 },
                { format_id: '360', quality: '360p', height: 360, filesize: 15 * 1024 * 1024 }
            ]
        };
    } catch (error) {
        throw new Error(`API error: ${error.message}`);
    }
}

// API endpoint: fetch video info
app.post('/api/fetch', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    if (!validateFacebookUrl(url)) {
        return res.status(400).json({ error: 'Invalid Facebook URL' });
    }

    try {
        const ytDlpAvailable = await checkYtDlp();

        let videoInfo;
        if (ytDlpAvailable) {
            videoInfo = await fetchVideoWithYtDlp(url);
        } else {
            videoInfo = await fetchVideoWithAPI(url);
        }

        res.json({
            success: true,
            video: {
                title: videoInfo.title,
                thumbnail: videoInfo.thumbnail,
                duration: videoInfo.duration,
                formats: videoInfo.formats.map(f => ({
                    id: f.format_id,
                    quality: f.quality,
                    size: f.filesize ? `${(f.filesize / (1024 * 1024)).toFixed(1)}MB` : 'Unknown'
                }))
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// API endpoint: download video
app.post('/api/download', async (req, res) => {
    const { url, formatId } = req.body;

    if (!url || !formatId) {
        return res.status(400).json({ error: 'URL and format ID are required' });
    }

    if (!validateFacebookUrl(url)) {
        return res.status(400).json({ error: 'Invalid Facebook URL' });
    }

    try {
        const ytDlpAvailable = await checkYtDlp();

        if (!ytDlpAvailable) {
            return res.status(500).json({ error: 'Download service not available' });
        }

        // Create output path
        const outputDir = path.join(__dirname, 'downloads');
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const outputTemplate = path.join(outputDir, '%(title)s.%(ext)s');

        // Download video
        const command = `yt-dlp -f "${formatId}" -o "${outputTemplate}" "${url}"`;
        await execPromise(command, { maxBuffer: 10 * 1024 * 1024 });

        res.json({ success: true, message: 'Download started' });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Serve the frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'facebook-downloader.html'));
});

app.listen(PORT, () => {
    console.log(`Facebook Video Downloader running at http://localhost:${PORT}`);
});
