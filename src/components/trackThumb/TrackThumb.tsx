import React from "react";
import { ImageObject, TrackObject } from "../../../types";

interface TrackThumbProps {
  track: TrackObject;
  i: number;
  queue: TrackObject[];
  queueIndex: number;
  num?: boolean;
  setQueue: React.Dispatch<React.SetStateAction<TrackObject[]>>;
  setQueueIndex: React.Dispatch<React.SetStateAction<number>>;
  setSong: React.Dispatch<React.SetStateAction<string>>;
  setPlay: React.Dispatch<React.SetStateAction<boolean>>;
  audioRef: React.RefObject<HTMLAudioElement>;
  tracks: TrackObject[];
  images: ImageObject[];
}

const TrackThumb: React.FC<TrackThumbProps> = ({
  i,
  queue,
  queueIndex,
  track,
  num = true,
  audioRef,
  setPlay,
  setQueue,
  setQueueIndex,
  setSong,
  tracks,
  images,
}) => {
  const handleSong = (
    e: React.MouseEvent<HTMLButtonElement>,
    track: TrackObject
  ) => {
    setQueue(tracks.slice(tracks.indexOf(track), tracks.length));
    setQueueIndex(0);
    console.log(track.preview_url);

    setSong(track.preview_url);
    setPlay(true);
    audioRef.current?.load();
  };

  return (
    <button
      className={`top__songs__list__item ${
        queue[queueIndex] && track.id === queue[queueIndex].id
          ? "listening"
          : ""
      }`}
      onClick={(e) => handleSong(e, track)}
    >
      {queue[queueIndex] && track.id === queue[queueIndex].id ? (
        <div className="number">
          <div className="playing__icon ">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        num && <div className="number">{i + 1}</div>
      )}

      <div className="main__info">
        <img src={images[2].url} alt="Album Cover" />
        <div>
          <h3>{track.name}</h3>
          <h4>{track.artists[0].name}</h4>
        </div>
      </div>
    </button>
  );
};

export default TrackThumb;
