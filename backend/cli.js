import torrentEngine from './torrentEngine.js';

const torrentId = process.argv[2];
if (!torrentId) {
    console.error('❌ Please provide a magnet link or .torrent file path.');
    process.exit(1);
}

torrentEngine.add(torrentId).then((torrent) => {
    console.log(`📥 Downloading: ${torrent.name}`);

    torrent.on('download', () => {
        const percent = (torrent.downloaded / torrent.length * 100).toFixed(2);
        process.stdout.write(`📦 Progress: ${percent}%\r`);
    });

    torrent.on('done', () => {
        console.log(`\n✅ Download complete: ${torrent.name}`);
        process.exit(0);
    });
}).catch(err => {
    console.error('❌ Failed to download:', err.message);
});
