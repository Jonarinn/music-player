import React, { useEffect, useState } from "react";
import { useLoaderData, useOutletContext } from "react-router-dom";
import {
  AlbumObject,
  AlbumTrackObject,
  OutletContextType,
  TrackObject,
} from "../../types";
import TrackThumb from "../../components/trackThumb/TrackThumb";
import "./album.scss";

const Album = () => {
  const albumData = useLoaderData() as {
    albumInfo: AlbumObject;
    albumTracks: AlbumTrackObject[];
  };
  const [albumInfo, setAlbumInfo] = useState<AlbumObject | null>(
    albumData.albumInfo
  );
  const [albumTracks, setAlbumTracks] = useState<AlbumTrackObject[]>(
    albumData.albumTracks
  );

  const {
    audioRef,
    queue,
    queueIndex,
    setPlay,
    setQueue,
    setQueueIndex,
    setSong,
  }: OutletContextType = useOutletContext();

  if (!albumInfo || !albumTracks) return <div>Loading...</div>;

  return (
    <div className="album">
      <section className="cover">
        <img src={albumInfo.images[0].url} alt={"Album cover"} />
        <div>
          <p>{albumInfo.type[0].toUpperCase() + albumInfo.type.slice(1)}</p>
          <h1>{albumInfo.name}</h1>
          <p>{Intl.NumberFormat().format(albumInfo.popularity)} Fans</p>
        </div>
      </section>
      <section className="top__songs__container">
        <h2>Songs</h2>
        <div className="top__songs__list">
          {albumTracks &&
            albumTracks.map((track, i) => {
              return (
                <TrackThumb
                  audioRef={audioRef}
                  i={i}
                  queue={queue}
                  queueIndex={queueIndex}
                  setPlay={setPlay}
                  setQueue={setQueue}
                  setQueueIndex={setQueueIndex}
                  setSong={setSong}
                  images={albumInfo.images}
                  track={track}
                  tracks={albumTracks}
                  key={i}
                />
              );
            })}
        </div>
      </section>
    </div>
  );
};

export default Album;
