import React, { useState, useEffect } from "react";
import "./player.scss";
import { BsPlay, BsRepeat, BsFillPauseFill } from "react-icons/bs";
import { BiShuffle } from "react-icons/bi";
import { RxTrackPrevious, RxTrackNext } from "react-icons/rx";

interface ControlsProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  play: boolean;
  setPlay: React.Dispatch<React.SetStateAction<boolean>>;
  playButtonRef: React.RefObject<HTMLButtonElement>;
}

const Controls: React.FC<ControlsProps> = ({
  audioRef,
  play,
  setPlay,
  playButtonRef,
}) => {
  const handleToggle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setPlay(!play);
  };

  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    if (play && audio.paused) audio.play();
    else audio.pause();
  }, [play, audioRef]);

  return (
    <article className="controls">
      <button onClick={handleToggle} className="shuffle btn-toggle">
        <BiShuffle />
      </button>
      <button className="previous">
        <RxTrackPrevious />
      </button>
      <button
        ref={playButtonRef}
        onClick={handleToggle}
        className={`play btn-toggle ${play ? "active" : ""}`}
      >
        <div>{play ? <BsFillPauseFill /> : <BsPlay />}</div>
      </button>
      <button className="next">
        <RxTrackNext />
      </button>
      <button onClick={handleToggle} className="repeat btn-toggle">
        <BsRepeat />
      </button>
    </article>
  );
};

export default Controls;
