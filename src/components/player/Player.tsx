import React, { useEffect, useRef } from "react";
import { getSong } from "../../data/functions";
import Controls from "./Controls";

interface PlayerProps {
  song: string;
  audioRef: React.RefObject<HTMLAudioElement>;
  play: boolean;
  setPlay: React.Dispatch<React.SetStateAction<boolean>>;
  playButtonRef: React.RefObject<HTMLButtonElement>;
}

const Player: React.FC<PlayerProps> = ({
  song,
  audioRef,
  play,
  setPlay,
  playButtonRef,
}) => {
  useEffect(() => {
    if (!song) return;
    audioRef.current?.setAttribute("src", song);
  }, [song, audioRef]);

  const handleEnded = () => {
    console.log("ended");
  };

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.addEventListener("ended", handleEnded);
    return () => {
      audioRef.current?.removeEventListener("ended", handleEnded);
    };
  }, [audioRef]);

  return (
    <section className="player">
      <article></article>
      <Controls
        audioRef={audioRef}
        play={play}
        setPlay={setPlay}
        playButtonRef={playButtonRef}
      />
      <article></article>
      <audio onLoad={() => audioRef.current?.play()} ref={audioRef} />
    </section>
  );
};

export default Player;
