import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [torrentId, setTorrentId] = useState('');
  const [torrents, setTorrents] = useState([]);
  const [message, setMessage] = useState('');

  const API_BASE = 'http://localhost:3001'; // backend API

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

  useEffect(() => {
    fetchTorrents();
    const interval = setInterval(fetchTorrents, 5000); // poll every 5 sec
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>🧲 ZapTorrent</h1>

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
