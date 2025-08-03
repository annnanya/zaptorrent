// backend/apiServer.js
const express = require('express');
const bodyParser = require('body-parser');
const torrentEngine = require('./torrentEngine');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());

// Add new torrent (magnet link or .torrent path)
app.post('/add', async (req, res) => {
    const { torrentId } = req.body;
    if (!torrentId) return res.status(400).json({ error: 'torrentId is required' });

    try {
        const torrent = await torrentEngine.add(torrentId);
        res.json({ message: 'Torrent added', infoHash: torrent.infoHash });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get status of a specific torrent
app.get('/status/:infoHash', (req, res) => {
    const status = torrentEngine.getStatus(req.params.infoHash);
    if (!status) return res.status(404).json({ error: 'Torrent not found' });
    res.json(status);
});

// List all active torrents
app.get('/list', (req, res) => {
    res.json(torrentEngine.listTorrents());
});

app.listen(PORT, () => {
    console.log(`🚀 Torrent API server running on http://localhost:${PORT}`);
});
