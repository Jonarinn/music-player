import React from "react";
import { Track } from "../../../types";

interface TrackThumbProps {
  track: Track;
  i: number;
  queue: Track[];
  queueIndex: number;
  num?: boolean;
  setQueue: React.Dispatch<React.SetStateAction<Track[]>>;
  setQueueIndex: React.Dispatch<React.SetStateAction<number>>;
  setSong: React.Dispatch<React.SetStateAction<string>>;
  setPlay: React.Dispatch<React.SetStateAction<boolean>>;
  audioRef: React.RefObject<HTMLAudioElement>;
  tracks: Track[];
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
}) => {
  const handleSong = (e: React.MouseEvent<HTMLButtonElement>, track: Track) => {
    setQueue(tracks.slice(tracks.indexOf(track), tracks.length));
    setQueueIndex(0);
    setSong(track.preview);
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
        <img src={track.album.cover_small} alt="Album Cover" />
        <div>
          <h3>{track.title}</h3>
          <h4>{track.artist.name}</h4>
        </div>
      </div>
    </button>
  );
};

export default TrackThumb;
