import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/api/trending-songs', async (req, res) => {
  try {
    const DEEZER_API = 'https://api.deezer.com/chart';

    const [page1, page2, page3, page4, page5, page6] = await Promise.all([
      fetch(`${DEEZER_API}?index=0`).then(res => res.json()),
      fetch(`${DEEZER_API}?index=10`).then(res => res.json()),
      fetch(`${DEEZER_API}?index=20`).then(res => res.json()),
      fetch(`${DEEZER_API}?index=30`).then(res => res.json()),
      fetch(`${DEEZER_API}?index=40`).then(res => res.json()),
      fetch(`${DEEZER_API}?index=50`).then(res => res.json())
    ]);

    const combinedTracks = [
      ...(page1?.tracks?.data || []),
      ...(page2?.tracks?.data || []),
      ...(page3?.tracks?.data || []),
      ...(page4?.tracks?.data || []),
      ...(page5?.tracks?.data || []),
      ...(page6?.tracks?.data || [])
    ];

    const uniqueTracks = Array.from(
      new Map(combinedTracks.map(track => [track.id, track])).values()
    );

    const songs = uniqueTracks.map(track => ({
      id: track.id,
      type: 'song',
      title: track.title,
      description: track.artist?.name || '',
      image: track.album?.cover_medium || '',
      url: track.link,
    }));

    res.json(songs);
  } catch (error) {
    console.error('Error fetching Deezer songs:', error);
    res.status(500).json({ error: 'Failed to fetch songs' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
