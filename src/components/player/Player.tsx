import React, { useEffect, useRef, useCallback, useState } from "react";
import Controls from "./Controls";
import { TrackObject } from "../../types";
import { Link } from "react-router-dom";
import { FiVolume, FiVolume1, FiVolume2, FiVolumeX } from "react-icons/fi";

interface PlayerProps {
  song: string;
  setSong: React.Dispatch<React.SetStateAction<string | null>>;
  audioRef: React.RefObject<HTMLAudioElement>;
  play: boolean;
  setPlay: React.Dispatch<React.SetStateAction<boolean>>;
  playButtonRef: React.RefObject<HTMLButtonElement>;
  queue: TrackObject[];
  queueIndex: number;
  setQueueIndex: React.Dispatch<React.SetStateAction<number>>;
}

const Player: React.FC<PlayerProps> = ({
  song,
  setSong,
  audioRef,
  play,
  setPlay,
  playButtonRef,
  queue,
  queueIndex,
  setQueueIndex,
}) => {
  const [volume, setVolume] = useState<number>(20);
  const [duration, setDuration] = useState<number>(0);
  const [elapsed, setElapsed] = useState<number>(0);
  const [mute, setMute] = useState<boolean>(false);
  const [repeat, setRepeat] = useState<number>(0);

  useEffect(() => {
    if (!queue) return;
    setSong(queue[queueIndex].preview_url);
  }, [queue, queueIndex, audioRef]);

  const handleEnded = () => {
    if (queueIndex === queue.length - 1) return;
    if (checkRepeat()) return;
    setQueueIndex(queueIndex + 1);
  };

  const checkRepeat = useCallback(() => {
    if (repeat === 1 || repeat === 2) {
      setQueueIndex(queueIndex);
      audioRef.current?.play();
      setPlay(true);
      if (repeat === 2) {
        setRepeat(0);
      }
      return true;
    }
    return false;
  }, [repeat, queueIndex, setQueueIndex, audioRef]);

  const handleNext = () => {
    if (queueIndex === queue.length - 1) return;
    checkRepeat();
    setQueueIndex(queueIndex + 1);
  };

  const handlePrev = () => {
    if (queueIndex === 0) return;
    setQueueIndex(queueIndex - 1);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setVolume(parseFloat(value));
  };

  const handleToggle = () => {
    if (!playButtonRef.current) return;
    if (playButtonRef.current.classList.contains("play")) {
      setPlay(!play);
    } else {
      playButtonRef.current.classList.toggle("active");
    }
  };

  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "mediaPlayPause":
          e.preventDefault();
          handleToggle();
          break;
        case "mediaTrackNext":
          handleNext();
          break;
        case "mediaTrackPrevious":
          handlePrev();
          break;
        default:
          console.log(e.key);
      }
    },
    [playButtonRef, handleNext, handlePrev, handleToggle, play, setPlay]
  );

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume / 250;
  }, [volume, audioRef]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [queueIndex, queue, handleKeydown]);

  if (!queue || !queue[queueIndex]) return null;

  return (
    <section className="player">
      <article>
        <img src={queue[queueIndex].album.images[2].url} />
        <div>
          <Link to={`/album/${queue[queueIndex].album.id}`}>
            <h3>{queue[queueIndex].name}</h3>
          </Link>
          <div className="artists">
            {queue[queueIndex].artists.map((artist, i) => (
              <Link to={`/artists/${artist.id}`} key={i}>
                <h4>
                  {artist.name}
                  {i === queue[queueIndex].artists.length - 1 ? "" : ","}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      </article>
      <Controls
        handleToggle={handleToggle}
        audioRef={audioRef}
        play={play}
        setPlay={setPlay}
        playButtonRef={playButtonRef}
        handleNext={handleNext}
        handlePrev={handlePrev}
        queue={queue}
        queueIndex={queueIndex}
        duration={duration}
        elapsed={elapsed}
        repeat={repeat}
        setRepeat={setRepeat}
      />
      <article className="volume">
        <button className="volume__btn" onClick={() => setMute(!mute)}>
          {mute ? (
            <FiVolumeX />
          ) : volume === 0 ? (
            <FiVolume />
          ) : volume < 50 ? (
            <FiVolume1 />
          ) : (
            <FiVolume2 />
          )}
        </button>
        <input
          type="range"
          value={mute ? 0 : volume}
          onChange={handleVolumeChange}
          min={0}
          max={100}
        />
      </article>
      <audio
        onTimeUpdate={(e) => setElapsed(e.currentTarget.currentTime)}
        muted={mute}
        onEnded={handleEnded}
        onLoadedData={() => audioRef.current?.play()}
        ref={audioRef}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        src={song}
      />
    </section>
  );
};

export default Player;
