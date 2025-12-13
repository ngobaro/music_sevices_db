import { usePlayer } from '../../context/PlayerContext';
import { formatTime } from '../../utils/formatTime';
import './PlayerBar.css';

function PlayerBar() {
  const { currentSong, isPlaying, currentTime, duration, pauseSong, playSong } = usePlayer();

  if (!currentSong) {
    return <div className="player-bar empty">Chọn bài hát để phát</div>;
  }

  return (
    <div className="player-bar">
      <img src={currentSong.coverUrl} alt="" />
      <div>
        <h4>{currentSong.title}</h4>
        <button onClick={() => isPlaying ? pauseSong() : playSong(currentSong)}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
      <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
    </div>
  );
}

export default PlayerBar;
