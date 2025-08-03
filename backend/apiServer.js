import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import torrentEngine from './torrentEngine.js';
import multer from 'multer';



const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());
const upload = multer({ dest: 'uploads/' }); // will store uploaded files here

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

// Upload .torrent file
app.post('/upload', upload.single('torrentFile'), async (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    try {
        const filePath = req.file.path; // Temp path of uploaded file
        const torrent = await torrentEngine.add(filePath);
        res.json({ message: 'Torrent file added', infoHash: torrent.infoHash });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.listen(PORT, () => {
    console.log(`🚀 Torrent API server running at http://localhost:${PORT}`);
});
