import React, { useEffect, useRef, useCallback, useState } from "react";
import Controls from "./Controls";
import { Queue, TrackObject } from "../../types";
import { Link } from "react-router-dom";
import { FiVolume, FiVolume1, FiVolume2, FiVolumeX } from "react-icons/fi";

interface PlayerProps {
  song: TrackObject | null;
  setSong: React.Dispatch<React.SetStateAction<TrackObject | null>>;
  audioRef: React.RefObject<HTMLAudioElement>;
  play: boolean;
  setPlay: React.Dispatch<React.SetStateAction<boolean>>;
  playButtonRef: React.RefObject<HTMLButtonElement>;
  queue: Queue;
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
  const [shuffle, setShuffle] = useState<boolean>(false);

  useEffect(() => {
    console.log("useEffect Player.tsx");

    if (!queue || !audioRef.current) return;
    if (queue.priority.length > 0) {
      setSong(queue.priority[0]);
    } else if (shuffle) {
      setSong(queue.shuffled[queueIndex]);
    } else {
      console.log("jon");

      setSong(queue.normal[queueIndex]);
    }
  }, [queue, queueIndex, audioRef, shuffle]);

  useEffect(() => {
    console.log(song);
  }, [song]);

  const handleEnded = () => {
    if (queueIndex === queue.normal.length - 1) return;
    if (checkRepeat() || checkShuffle()) return;
    setQueueIndex(queueIndex + 1);
  };

  const checkRepeat = useCallback(() => {
    if (!audioRef.current) return false;

    if (repeat === 1 || repeat === 2) {
      setQueueIndex(queueIndex);
      audioRef.current.play();
      audioRef.current.currentTime = 0;
      if (repeat === 2) {
        setRepeat(0);
      }
      return true;
    }
    return false;
  }, [repeat, queueIndex, setQueueIndex, audioRef]);

  const checkShuffle = useCallback(() => {
    if (!audioRef.current) return false;
    if (!shuffle) return false;
    const randomIndex = Math.floor(Math.random() * queue.normal.length);
    setQueueIndex(randomIndex);
    audioRef.current.play();
    audioRef.current.currentTime = 0;
    return true;
  }, [shuffle, queue, queueIndex, setQueueIndex, audioRef]);

  const handleNext = () => {
    if (queueIndex === queue.normal.length - 1) return;
    if (checkRepeat() || checkShuffle()) return;
    setQueueIndex(queueIndex + 1);
  };

  const handlePrev = () => {
    if (queueIndex === 0) return;
    if (checkRepeat() || checkShuffle()) return;

    setQueueIndex(queueIndex - 1);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setVolume(parseFloat(value));
  };

  const handleToggle = () => {
    if (!playButtonRef.current) return;
    if (play) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
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

  if (!queue || !song || !song.album.images) return null;

  return (
    <section className="player">
      <article>
        <img src={song.album.images[2].url} />
        <div>
          <Link to={`/album/${song.album.id}`}>
            <h3>{song.name}</h3>
          </Link>
          <div className="artists">
            {song.artists.map((artist, i) => (
              <Link to={`/artists/${artist.id}`} key={i}>
                <h4>
                  {artist.name}
                  {i === song.artists.length - 1 ? "" : ","}
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
        shuffle={shuffle}
        setShuffle={setShuffle}
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
        src={song.preview_url}
        onPlay={() => setPlay(true)}
        onPause={() => setPlay(false)}
      />
    </section>
  );
};

export default Player;
