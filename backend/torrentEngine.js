import WebTorrent from 'webtorrent';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

class TorrentEngine {
    constructor(downloadDir = path.join(__dirname, '../downloads')) {
        this.client = new WebTorrent();
        this.downloadDir = downloadDir;
        this.torrents = {}; // Store active torrents by infoHash
    }

    add(torrentId) {
        return new Promise((resolve, reject) => {
            const torrent = this.client.add(torrentId, { path: this.downloadDir });

            torrent.on('error', reject);
            torrent.on('ready', () => {
                this.torrents[torrent.infoHash] = torrent;
                resolve(torrent);
            });
        });
    }

    getStatus(infoHash) {
        const torrent = this.torrents[infoHash];
        if (!torrent) return null;

        const totalPeers = torrent.numPeers;

        return {
            name: torrent.name,
            downloaded: torrent.downloaded,
            total: torrent.length,
            progress: (torrent.downloaded / torrent.length * 100).toFixed(2),
            downloadSpeed: torrent.downloadSpeed,
            timeRemaining: torrent.timeRemaining,
            done: torrent.done,
            peers: totalPeers,
            seeders: torrent.done ? 0 : totalPeers, // crude estimate
            leechers: torrent.done ? totalPeers : 0, // crude estimate
        };
    }

    listTorrents() {
        return Object.values(this.torrents).map(t => ({
            name: t.name,
            infoHash: t.infoHash,
            progress: (t.downloaded / t.length * 100).toFixed(2),
            done: t.done,
        }));
    }
}

export default new TorrentEngine();
