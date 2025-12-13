import { useState, useEffect } from 'react';
import { getTrendingSongs } from '../services/songService';
import SongCard from '../components/music/SongCard';
import SongList from '../components/music/SongList';
import './HomePage.css';

function HomePage() {
  const [trendingSongs, setTrendingSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTrendingSongs();
  }, []);

  const loadTrendingSongs = async () => {
    try {
      // Mock data nếu chưa có backend
      const mockSongs = [
        {
          id: 1,
          title: 'Đợi',
          artist: 'Lê Hiếu',
          album: 'Single',
          duration: 245,
          coverUrl: 'https://via.placeholder.com/150',
          audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
        },
        {
          id: 2,
          title: 'Có Chắc Yêu Là Đây',
          artist: 'Sơn Tùng M-TP',
          album: 'Sky Tour',
          duration: 213,
          coverUrl: 'https://via.placeholder.com/150',
          audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
        },
        {
          id: 3,
          title: 'Nơi Này Có Anh',
          artist: 'Sơn Tùng M-TP',
          album: 'Single',
          duration: 274,
          coverUrl: 'https://via.placeholder.com/150',
          audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
        },
        {
          id: 4,
          title: 'Em Của Ngày Hôm Qua',
          artist: 'Sơn Tùng M-TP',
          album: 'Single',
          duration: 259,
          coverUrl: 'https://via.placeholder.com/150',
          audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'
        },
      ];
      
      setTrendingSongs(mockSongs);
      setLoading(false);
      
      // Khi có backend, uncomment dòng này:
      // const data = await getTrendingSongs();
      // setTrendingSongs(data);
    } catch (error) {
      console.error('Error loading songs:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Đang tải...</div>;
  }

  return (
    <div className="home-page">
      <section className="section">
        <h2>Trending Now 🔥</h2>
        <div className="song-grid">
          {trendingSongs.slice(0, 4).map(song => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Bài hát phổ biến</h2>
        <SongList songs={trendingSongs} />
      </section>
    </div>
  );
}

export default HomePage;