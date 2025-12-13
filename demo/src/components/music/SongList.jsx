import { Play, Heart, MoreVertical } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';
import { formatTime } from '../../utils/formatTime';
import './SongList.css';

function SongList({ songs }) {
  const { playSong, playQueue, currentSong } = usePlayer();

  const handlePlaySong = (song, index) => {
    playQueue(songs, index);
  };

  return (
    <div className="song-list">
      <div className="song-list-header">
        <span className="col-number">#</span>
        <span className="col-title">Tiêu đề</span>
        <span className="col-album">Album</span>
        <span className="col-duration">Thời lượng</span>
        <span className="col-actions"></span>
      </div>
      
      {songs.map((song, index) => {
        const isCurrentSong = currentSong?.id === song.id;
        
        return (
          <div 
            key={song.id} 
            className={`song-list-item ${isCurrentSong ? 'playing' : ''}`}
          >
            <span className="col-number">
              {isCurrentSong ? '🎵' : index + 1}
            </span>
            
            <div className="col-title">
              <img src={song.coverUrl || '/default-cover.png'} alt={song.title} />
              <div>
                <h4>{song.title}</h4>
                <p>{song.artist}</p>
              </div>
            </div>
            
            <span className="col-album">{song.album || 'Single'}</span>
            <span className="col-duration">{formatTime(song.duration)}</span>
            
            <div className="col-actions">
              <button 
                className="btn-action"
                onClick={() => handlePlaySong(song, index)}
              >
                <Play size={18} />
              </button>
              <button className="btn-action">
                <Heart size={18} />
              </button>
              <button className="btn-action">
                <MoreVertical size={18} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SongList;