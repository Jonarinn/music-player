import React, { useEffect, useRef, useCallback } from "react";
import { getSong } from "../../data/functions";
import Controls from "./Controls";
import { TrackObject } from "../../../types";
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
  const [volume, setVolume] = React.useState<number>(20);
  const [duration, setDuration] = React.useState<number>(0);
  const [elapsed, setElapsed] = React.useState<number>(0);
  const [mute, setMute] = React.useState<boolean>(false);

  useEffect(() => {
    if (!queue) return;
    setSong(queue[queueIndex].preview_url);
  }, [queue, queueIndex, audioRef]);

  const handleEnded = () => {
    if (queueIndex === queue.length - 1) return;
    setQueueIndex(queueIndex + 1);
  };

  const handleNext = () => {
    if (queueIndex === queue.length - 1) return;
    setQueueIndex(queueIndex + 1);
  };

  const handlePrev = () => {
    if (queueIndex === 0) return;
    setQueueIndex(queueIndex - 1);
    console.log(queueIndex);
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
          return;
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

  useEffect(() => {
    console.log(queue);
  }, [queue]);

  useEffect(() => {
    console.log(song);
  }, [song]);

  if (!queue || !queue[queueIndex]) return null;

  return (
    <section className="player">
      <article>
        <img src={queue[queueIndex].album.images[2].url} />
        <div>
          <Link to={`/album/${queue[queueIndex].album.id}`}>
            <h3>{queue[queueIndex].name}</h3>
          </Link>
          <Link to={`/artists/${queue[queueIndex].artists[0].id}`}>
            <h4>{queue[queueIndex].artists.map((e) => e.name)}</h4>
          </Link>
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
