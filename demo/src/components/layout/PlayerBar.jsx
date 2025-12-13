import { usePlayer } from '../../context/PlayerContext';
import PlayerControls from '../music/PlayerControls';
import ProgressBar from '../music/ProgressBar';
import VolumeControl from '../music/VolumeControl';
import { formatTime } from '../../utils/formatTime';
import { Heart } from 'lucide-react';
import './PlayerBar.css';

function PlayerBar() {
  const { currentSong, currentTime, duration } = usePlayer();

  if (!currentSong) {
    return (
      <div className="player-bar empty">
        <p>Chọn bài hát để phát</p>
      </div>
    );
  }

  return (
    <div className="player-bar">
      {/* Song Info */}
      <div className="player-song-info">
        <img 
          src={currentSong.coverUrl || '/default-cover.png'} 
          alt={currentSong.title}
          className="player-cover"
        />
        <div className="player-text">
          <h4>{currentSong.title}</h4>
          <p>{currentSong.artist}</p>
        </div>
        <button className="btn-favorite">
          <Heart size={20} />
        </button>
      </div>

      {/* Controls */}
      <div className="player-controls-section">
        <PlayerControls />
        <div className="player-progress">
          <span className="time">{formatTime(currentTime)}</span>
          <ProgressBar />
          <span className="time">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Volume */}
      <div className="player-options">
        <VolumeControl />
      </div>
    </div>
  );
}

export default PlayerBar;