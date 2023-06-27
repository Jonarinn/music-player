import React, { useState, useEffect } from "react";
import "./player.scss";
import { BsPlay, BsRepeat, BsFillPauseFill } from "react-icons/bs";
import { BiShuffle } from "react-icons/bi";
import { RxTrackPrevious, RxTrackNext } from "react-icons/rx";
import { TrackObject } from "../../../types";
import { secondsToMinutesAndSeconds } from "../../data/functions";

interface ControlsProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  play: boolean;
  setPlay: React.Dispatch<React.SetStateAction<boolean>>;
  playButtonRef: React.RefObject<HTMLButtonElement>;
  handleNext: () => void;
  handlePrev: () => void;
  queue: TrackObject[];
  queueIndex: number;
  duration: number;
  elapsed: number;
  handleToggle: () => void;
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
  handleToggle,
}) => {
  const [progress, setProgress] = useState<number>(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current || !e.target.value) return;
    const audio = audioRef.current;
    const { value } = e.target;
    audio.currentTime = (parseFloat(value) / 1000) * duration;
    if (typeof parseFloat(value) !== "number") return;
    setProgress(parseFloat(value));
  };

  useEffect(() => {
    if (!duration) return;
    setProgress((elapsed / duration) * 1000);
  }, [elapsed, duration]);

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
        <p>{secondsToMinutesAndSeconds(elapsed)}</p>
        <div>
          <div>
            <div
              style={{ width: `${progress / 10}%` }}
              className="progress"
            ></div>
          </div>
          <input
            min={0}
            max={1000}
            type={"range"}
            value={progress}
            onChange={handleChange}
          />
        </div>

        <p>{secondsToMinutesAndSeconds(duration)}</p>
      </div>
    </article>
  );
};

export default Controls;
