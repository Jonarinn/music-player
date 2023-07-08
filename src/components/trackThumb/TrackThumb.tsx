import React, { useEffect } from "react";
import {
  ImageObject,
  OutletContextType,
  Queue,
  TrackObject,
} from "../../types";
import { shuffleQueue } from "../../data/functions";
import { useOutletContext } from "react-router-dom";

interface TrackThumbProps {
  track: TrackObject;
  i: number;
  queue: Queue;
  queueIndex: number;
  num?: boolean;
  setQueue: React.Dispatch<React.SetStateAction<Queue>>;
  setQueueIndex: React.Dispatch<React.SetStateAction<number>>;
  setSong: React.Dispatch<React.SetStateAction<TrackObject>>;
  setPlay: React.Dispatch<React.SetStateAction<boolean>>;
  audioRef: React.RefObject<HTMLAudioElement>;
  tracks: TrackObject[];
  images: ImageObject[];
  song: TrackObject | null;
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
  const { song } = useOutletContext() as OutletContextType;

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
    setQueueIndex(0);
    if (!audioRef.current) return;
    audioRef.current.play();
  };

  useEffect(() => {
    console.log(queue);
  }, [queue]);

  return (
    <button
      className={`top__songs__list__item ${
        song && track.id === song.id ? "listening" : ""
      }`}
      onClick={(e) => handleSong(e, track)}
    >
      {song && track.id === song.id ? (
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
