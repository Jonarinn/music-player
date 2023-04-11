import React, { useState, useEffect } from "react";
import "./player.scss";
import { BsPlay, BsRepeat, BsFillPauseFill } from "react-icons/bs";
import { BiShuffle } from "react-icons/bi";
import { RxTrackPrevious, RxTrackNext } from "react-icons/rx";
import { Track } from "../../../types";
import { secondsToMinutesAndSeconds } from "../../data/functions";

interface ControlsProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  play: boolean;
  setPlay: React.Dispatch<React.SetStateAction<boolean>>;
  playButtonRef: React.RefObject<HTMLButtonElement>;
  handleNext: () => void;
  handlePrev: () => void;
  queue: Track[];
  queueIndex: number;
  duration: number;
  elapsed: number;
}

const Controls: React.FC<ControlsProps> = ({
  audioRef,
  play,
  setPlay,
  playButtonRef,
  handleNext,
  handlePrev,
  queue,
  queueIndex,
  duration,
  elapsed,
}) => {
  const handleToggle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e.currentTarget.classList.contains("play")) {
      setPlay(!play);
    } else {
      e.currentTarget.classList.toggle("active");
    }
  };
  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    if (play && audio.paused) audio.play();
    else audio.pause();
  }, [play, audioRef]);

  return (
    <article className="controls">
      <div className="main__controls">
        <button onClick={handleToggle} className="shuffle btn-toggle">
          <BiShuffle />
        </button>
        <button className="previous" onClick={handlePrev}>
          <RxTrackPrevious />
        </button>
        <button
          ref={playButtonRef}
          onClick={handleToggle}
          className={`play btn-toggle ${play ? "active" : ""}`}
        >
          <div>{play ? <BsFillPauseFill /> : <BsPlay />}</div>
        </button>
        <button className="next" onClick={handleNext}>
          <RxTrackNext />
        </button>
        <button onClick={handleToggle} className="repeat btn-toggle">
          <BsRepeat />
        </button>
      </div>

      <div className="progress__container">
        {duration && (
          <>
            <p>{secondsToMinutesAndSeconds(elapsed)}</p>
            <div className="progress__bar">
              <div
                className="progress__bar__fill"
                style={{ width: (elapsed / duration) * 100 + "%" }}
              ></div>
            </div>
            <p>{secondsToMinutesAndSeconds(duration)}</p>
          </>
        )}
      </div>
    </article>
  );
};

export default Controls;
