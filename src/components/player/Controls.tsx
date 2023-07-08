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
  repeat: number;
  setRepeat: React.Dispatch<React.SetStateAction<number>>;
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
  repeat,
  setRepeat,
}) => {
  const [progress, setProgress] = useState<number>(0);
  const [shuffle, setShuffle] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current || !e.target.value) return;
    const audio = audioRef.current;
    const { value } = e.target;
    audio.currentTime = (parseFloat(value) / 1000) * duration;
    if (typeof parseFloat(value) !== "number") return;
    setProgress(parseFloat(value));
  };

  const handleShuffle = () => {
    setShuffle(!shuffle);
    if (repeat !== 0) setRepeat(0);
  };

  const handleRepeat = () => {
    setRepeat((repeat + 1) % 3);
    if (shuffle) setShuffle(false);
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
        <button
          onClick={handleShuffle}
          className={`shuffle btn-toggle ${shuffle ? "active" : ""}`}
        >
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
        <button
          onClick={handleRepeat}
          className={`repeat btn-toggle ${
            ["", "active", "active once"][repeat as 0 | 1 | 2]
          }`}
        >
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
