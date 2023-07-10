import React, { useEffect } from "react";
import {
  HistoryItem,
  ImageObject,
  OutletContextType,
  Queue,
  TrackObject,
} from "../../types";
import { APIController, shuffleQueue } from "../../data/functions";
import { useOutletContext } from "react-router-dom";

interface TrackThumbProps {
  track: TrackObject;
  i: number;
  queue: Queue;
  queueIndex: number;
  num?: boolean;
  setQueue: React.Dispatch<React.SetStateAction<Queue>>;
  setQueueIndex: React.Dispatch<React.SetStateAction<number>>;
  setSong: React.Dispatch<React.SetStateAction<TrackObject | null>>;
  setPlay: React.Dispatch<React.SetStateAction<boolean>>;
  audioRef: React.RefObject<HTMLAudioElement>;
  tracks: TrackObject[];
  images: ImageObject[];
  historyType: HistoryItem;
  initialHistory?: boolean;
  setSongsPlayed?: React.Dispatch<React.SetStateAction<number>>;
}

const TrackThumb: React.FC<TrackThumbProps> = ({
  i,
  track,
  num = true,
  audioRef,
  setQueue,
  setQueueIndex,
  setSong,
  tracks,
  images,
  historyType,
  initialHistory = true,
}) => {
  const { song, play } = useOutletContext() as OutletContextType;

  const handleSong = (
    e: React.MouseEvent<HTMLButtonElement>,
    track: TrackObject
  ) => {
    setQueue({
      normal: tracks.slice(tracks.indexOf(track), tracks.length),
      shuffled: shuffleQueue(
        tracks.slice(tracks.indexOf(track), tracks.length)
      ),
      priority: [],
    });
    setSong(track);
    console.log(track);

    setQueueIndex(0);
    if (!audioRef.current) return;
    audioRef.current.load();

    if (!initialHistory) return;
    APIController.setHistory(historyType)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <button
      className={`top__songs__list__item ${
        song && track.id === song.id ? "listening" : ""
      }`}
      onClick={(e) => handleSong(e, track)}
    >
      {song && track.id === song.id ? (
        <div className="number">
          <div className={`playing__icon ${play ? "playing" : ""}`}>
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
