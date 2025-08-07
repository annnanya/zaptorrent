
# 🧲 ZapTorrent

**ZapTorrent** is a full-stack torrent client built with **WebTorrent**, **Express**, and **Next.js**. It allows users to manage torrent downloads via a clean, interactive web interface or a simple CLI. Upload `.torrent` files, add magnet links, view torrent progress in real-time, and remove torrents — all from your browser.

---

## 🌐 Features

### ✅ Frontend (Next.js)

* Upload `.torrent` files or enter magnet links
* Real-time torrent status updates (progress, peers, seeders/leechers)
* Remove torrents with optional file deletion
* Responsive, minimal UI

### ⚙️ Backend (Node.js + Express)

* Add torrent via API (`magnet` or `.torrent`)
* Upload `.torrent` file using `multer`
* Get status of individual torrents
* List all active torrents
* Remove torrents (with optional file deletion)
* CLI support for terminal-based torrent downloads

---

## 📁 Project Structure

```
annnanya-zaptorrent/
├── backend/            # Node.js + Express API server
│   ├── apiServer.js    # Main API endpoints for torrent handling
│   ├── cli.js          # Command-line tool for downloading torrents
│   └── torrentEngine.js# Torrent engine logic using WebTorrent
├── frontend/           # Next.js frontend app
│   ├── pages/          # React pages and API routes
│   ├── styles/         # Global and module CSS
│   ├── public/         # Static assets
│   └── ...             # Configs, README, etc.
├── package.json        # Project scripts and shared deps
```

---

## 🚀 Getting Started

### Prerequisites

* Node.js ≥ 18
* npm, pnpm, yarn, or bun (choose one)

### 1. Install dependencies

From the root directory:

```bash
npm install
```

Also install frontend dependencies:

```bash
cd frontend
npm install
```

### 2. Start Backend Server

```bash
npm run start
```

This runs the Express API server at:
📡 `http://localhost:3001`

### 3. Start Frontend (Next.js)

```bash
cd frontend
npm run dev
```

Access the frontend at:
🖥️ `http://localhost:3000`

---

## 🛠 CLI Usage

You can also download torrents via CLI:

```bash
npm run cli "magnet:?xt=urn:btih:..."
```

or:

```bash
node backend/cli.js path/to/file.torrent
```

---

## 📡 API Endpoints

| Method | Endpoint            | Description                               |
| ------ | ------------------- | ----------------------------------------- |
| POST   | `/add`              | Add torrent by magnet link or path        |
| GET    | `/status/:infoHash` | Get status of a torrent                   |
| GET    | `/list`             | List all active torrents                  |
| POST   | `/upload`           | Upload a `.torrent` file                  |
| POST   | `/remove`           | Remove a torrent (optional file deletion) |

---

## 🧠 How It Works

* Uses [WebTorrent](https://webtorrent.io/) for P2P torrenting.
* Backend manages torrent lifecycle and stores active torrents in-memory.
* Frontend polls the backend every 5 seconds for live updates.
* Torrents are stored in the `downloads/` directory.

---

## 📸 UI Preview

> Here's what the web UI lets you do:

* Paste magnet links or upload `.torrent` files
* Monitor download progress live
* Remove torrents at any time
* Responsive and minimal interface

---

## 📦 Dependencies

**Backend**

* `webtorrent`
* `express`
* `cors`
* `multer`

**Frontend**

* `next`
* `react`
* `axios`

---

## 🚧 Future Improvements

* Persistent torrent tracking across restarts
* Download stats/logs
* Authentication & user access
* Mobile-friendly UI redesign
* Docker support

---

## 📝 License

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).

---

## 👤 Author

Built with ❤️ by [annnanya](https://github.com/annnanya)

---
