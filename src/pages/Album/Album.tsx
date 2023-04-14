import React, { useEffect, useMemo } from "react";
import { useLoaderData, useOutletContext } from "react-router-dom";
import { AlbumType, OutletContextType } from "../../../types";
import TrackThumb from "../../components/trackThumb/TrackThumb";
import "./album.scss";

const Album = () => {
  const albumData = useLoaderData() as AlbumType;
  const [album, setAlbum] = React.useState<AlbumType | null>(null);

  const {
    audioRef,
    queue,
    queueIndex,
    setPlay,
    setQueue,
    setQueueIndex,
    setSong,
  }: OutletContextType = useOutletContext();

  useEffect(() => {
    console.log(albumData);
    if (albumData) {
      setAlbum(albumData);
    }
  }, [albumData]);

  if (!album || !album.tracks) return <div>Loading...</div>;

  return (
    <div className="album">
      <section className="cover">
        <img src={album.cover_big} alt={"Album cover"} />
        <div>
          <p>
            {album.record_type[0].toUpperCase() + album.record_type.slice(1)}
          </p>
          <h1>{album.title}</h1>
          <p>{Intl.NumberFormat().format(album.fans)} Fans</p>
        </div>
      </section>
      <section className="top__songs__container">
        <h2>Songs</h2>
        <div className="top__songs__list">
          {album.tracks &&
            album.tracks.data.map((track, i) => {
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
                  track={track}
                  tracks={album.tracks.data}
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
