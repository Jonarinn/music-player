import React, { useEffect, useState } from "react";
import { useLoaderData, useOutletContext } from "react-router-dom";
import {
  AlbumObject,
  AlbumTrackObject,
  OutletContextType,
  TrackObject,
} from "../../types";
import TrackThumb from "../../components/thumbnails/SmallThumb";
import "./album.scss";
import { AlbumObjectToPlayableTrackObject } from "../../data/functions";
import { FullLoader } from "../../components/Loading";

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

  if (!albumInfo || !albumTracks) return <FullLoader />;

  return (
    <div className="album">
      <section className="cover">
        <img
          src={albumInfo.images[0].url}
          alt={"Album cover"}
          className="album-image"
        />
        <div>
          <p>{albumInfo.type[0].toUpperCase() + albumInfo.type.slice(1)}</p>
          <h1>{albumInfo.name}</h1>
          <p>{Intl.NumberFormat().format(albumInfo.popularity)} Fans</p>
        </div>
      </section>
      <section className="top__songs__container">
        <h2>Songs</h2>
        <div>
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
                  track={AlbumObjectToPlayableTrackObject(track, albumInfo)}
                  tracks={albumTracks.map((albumTrack) => {
                    return AlbumObjectToPlayableTrackObject(
                      albumTrack,
                      albumInfo
                    );
                  })}
                  key={track.id}
                  type="album"
                  historyType={{
                    type: "album",
                    id: albumInfo.id,
                    name: albumInfo.name,
                    image: albumInfo.images[0].url,
                  }}
                />
              );
            })}
        </div>
      </section>
    </div>
  );
};

export default Album;
