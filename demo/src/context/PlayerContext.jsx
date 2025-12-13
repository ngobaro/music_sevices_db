import { createContext, useContext, useRef, useState, useEffect } from 'react';

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const audioRef = useRef(new Audio());

  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const playSong = (song) => {
    console.log('Play song:', song);

    if (!song?.audioUrl) {
      console.error('❌ audioUrl undefined');
      return;
    }

    setCurrentSong(song);
    audioRef.current.src = song.audioUrl;

    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch(err => console.error('Play error:', err));
  };

  const pauseSong = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => setCurrentTime(audio.currentTime || 0);
    const updateDuration = () => setDuration(audio.duration || 0);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        audioRef,
        currentSong,
        isPlaying,
        currentTime,
        duration,
        playSong,
        pauseSong
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  return useContext(PlayerContext);
}
