# Facebook Video Downloader

A web-based tool for downloading videos from Facebook with support for multiple quality options.

## Features

- 🎬 Download Facebook videos in multiple qualities (360p, 720p, 1080p)
- 🚀 Fast and simple interface
- 📱 Responsive design
- 🔄 Real-time video information fetching
- 💾 Automatic quality detection

## Requirements

- Node.js 16+
- `yt-dlp` (for video extraction)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Install yt-dlp (optional, for best results):
```bash
# macOS
brew install yt-dlp

# Ubuntu/Debian
sudo apt-get install yt-dlp

# Or install via pip
pip install yt-dlp
```

## Usage

Start the server:
```bash
npm start
```

The tool will be available at `http://localhost:3000`

## How It Works

1. **Fetch**: Paste a Facebook video URL and click "Fetch"
2. **Select Quality**: Choose your preferred video quality
3. **Download**: Click the download button to start downloading

## API Endpoints

### POST `/api/fetch`
Fetch video information from a Facebook URL.

**Request:**
```json
{
  "url": "https://www.facebook.com/watch/?v=..."
}
```

**Response:**
```json
{
  "success": true,
  "video": {
    "title": "Video Title",
    "thumbnail": "image_url",
    "duration": 120,
    "formats": [
      {
        "id": "22",
        "quality": "720p",
        "size": "45.2MB"
      }
    ]
  }
}
```

### POST `/api/download`
Download a video in a specific format.

**Request:**
```json
{
  "url": "https://www.facebook.com/watch/?v=...",
  "formatId": "22"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Download started"
}
```

## Supported URL Formats

- `facebook.com/watch/?v=...`
- `facebook.com/username/videos/...`
- `m.facebook.com/...`
- `fb.watch/...`

## Troubleshooting

### "yt-dlp not found"
Install yt-dlp using pip: `pip install yt-dlp`

### "Invalid Facebook URL"
Ensure the URL is a valid Facebook video link from the supported formats above.

### Download failing
- Check internet connection
- Verify the video is publicly accessible
- Ensure yt-dlp is up to date: `yt-dlp -U`

## Configuration

Set the port via environment variable:
```bash
PORT=8080 npm start
```

## License

MIT
