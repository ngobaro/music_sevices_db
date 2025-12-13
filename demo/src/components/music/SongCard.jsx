import { Play } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';
import './SongCard.css';

function SongCard({ song }) {
  const { playSong, currentSong, isPlaying } = usePlayer();
  
  const isCurrentSong = currentSong?.id === song.id;

  const handlePlay = () => {
    playSong(song);
  };

  return (
    <div className={`song-card ${isCurrentSong ? 'playing' : ''}`}>
      <div className="song-card-cover">
        <img src={song.coverUrl || '/default-cover.png'} alt={song.title} />
        <button className="play-overlay" onClick={handlePlay}>
          <Play size={32} />
        </button>
      </div>
      <div className="song-card-info">
        <h3>{song.title}</h3>
        <p>{song.artist}</p>
      </div>
    </div>
  );
}

export default SongCard;
