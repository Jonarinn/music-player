import React, { useState, useEffect } from "react";
import "./player.scss";
import { BsPlay, BsRepeat, BsFillPauseFill } from "react-icons/bs";
import { BiShuffle } from "react-icons/bi";
import { RxTrackPrevious, RxTrackNext } from "react-icons/rx";

interface ControlsProps {
  audioRef: React.RefObject<HTMLAudioElement>;
}

const Controls: React.FC<ControlsProps> = ({ audioRef }) => {
  const [play, setPlay] = useState(false);

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.currentTarget.classList.toggle("active");
    if (!e.currentTarget.classList.contains("play")) return;
    setTimeout(() => {
      setPlay(!play);
    }, 100);
  };

  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    if (audio.paused) audio.play();
    else audio.pause();
  }, [play]);

  return (
    <article className="controls">
      <button onClick={handleToggle} className="shuffle btn-toggle">
        <BiShuffle />
      </button>
      <button className="previous">
        <RxTrackPrevious />
      </button>
      <button onClick={handleToggle} className="play btn-toggle">
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
