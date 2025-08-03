import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [torrentId, setTorrentId] = useState('');
  const [torrentFile, setTorrentFile] = useState(null);
  const [torrents, setTorrents] = useState([]);
  const [message, setMessage] = useState('');

  const API_BASE = 'http://localhost:3001';

  const fetchTorrents = async () => {
    try {
      const res = await axios.get(`${API_BASE}/list`);
      setTorrents(res.data);
    } catch (err) {
      console.error('Error fetching torrents:', err.message);
    }
  };

  const handleAddTorrent = async () => {
    if (!torrentId) return;
    try {
      const res = await axios.post(`${API_BASE}/add`, { torrentId });
      setMessage(`✅ Added: ${res.data.message}`);
      setTorrentId('');
      fetchTorrents();
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to add torrent');
    }
  };

  const handleUploadFile = async () => {
    if (!torrentFile) return;
    const formData = new FormData();
    formData.append('torrentFile', torrentFile);

    try {
      const res = await axios.post(`${API_BASE}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(`✅ Uploaded: ${res.data.message}`);
      setTorrentFile(null);
      fetchTorrents();
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to upload file');
    }
  };

  useEffect(() => {
    fetchTorrents();
    const interval = setInterval(fetchTorrents, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>🧲 ZapTorrent</h1>

      <div style={{ marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Magnet link or .torrent path"
          value={torrentId}
          onChange={(e) => setTorrentId(e.target.value)}
          style={{ width: '70%', padding: 8, marginRight: 8 }}
        />
        <button onClick={handleAddTorrent} style={{ padding: '8px 16px' }}>
          Add
        </button>
      </div>

      <div style={{ marginBottom: 16 }}>
        <input
          type="file"
          accept=".torrent"
          onChange={(e) => setTorrentFile(e.target.files[0])}
        />
        <button onClick={handleUploadFile} style={{ padding: '8px 16px', marginLeft: 8 }}>
          Upload .torrent
        </button>
      </div>

      {message && <p>{message}</p>}

      <h2>Active Torrents</h2>
      <ul>
        {torrents.map((t) => (
          <li key={t.infoHash} style={{ marginBottom: 10 }}>
            <strong>{t.name}</strong><br />
            Progress: {t.progress}% {t.done ? '✅' : '⏳'}
          </li>
        ))}
      </ul>
    </div>
  );
}
