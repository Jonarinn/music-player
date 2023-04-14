import React, { useEffect, useRef, useCallback } from "react";
import { getSong } from "../../data/functions";
import Controls from "./Controls";
import { Track } from "../../../types";
import { Link } from "react-router-dom";
import { FiVolume, FiVolume1, FiVolume2, FiVolumeX } from "react-icons/fi";

interface PlayerProps {
  song: string;
  audioRef: React.RefObject<HTMLAudioElement>;
  play: boolean;
  setPlay: React.Dispatch<React.SetStateAction<boolean>>;
  playButtonRef: React.RefObject<HTMLButtonElement>;
  queue: Track[];
  queueIndex: number;
  setQueueIndex: React.Dispatch<React.SetStateAction<number>>;
}

const Player: React.FC<PlayerProps> = ({
  song,
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
    audioRef.current?.setAttribute("src", queue[queueIndex].preview);
  }, [queue, queueIndex, audioRef]);

  const handleEnded = () => {
    if (queueIndex === queue.length - 1) return;
    setQueueIndex(queueIndex + 1);
  };

  const handleNext = () => {
    if (queueIndex === queue.length - 1) return;
    setQueueIndex(queueIndex + 1);
    console.log(queueIndex);
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

  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "mediaPlayPause":
          e.preventDefault();
          playButtonRef.current?.click();
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
    [playButtonRef, handleNext, handlePrev]
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

  if (!queue) return null;

  return (
    <section className="player">
      <article>
        <img src={queue[queueIndex].album.cover_small} />
        <div>
          <Link to={`/album/${queue[queueIndex].album.id}`}>
            <h3>{queue[queueIndex].title}</h3>
          </Link>
          <Link to={`/artists/${queue[queueIndex].artist.id}`}>
            <h4>{queue[queueIndex].artist.name}</h4>
          </Link>
        </div>
      </article>
      <Controls
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
      />
    </section>
  );
};

export default Player;
