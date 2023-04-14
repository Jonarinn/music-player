import React, { useEffect } from "react";
import { useLoaderData, useOutletContext } from "react-router-dom";
import { ArtistType, OutletContextType, Track } from "../../../types";
import "./artists.scss";
import { AiOutlineRight } from "react-icons/ai";
import { getSearch } from "../../data/functions";
import TrackThumb from "../../components/trackThumb/TrackThumb";

const Artist = () => {
  const artist = useLoaderData() as ArtistType;
  const [trackAmmount, setTrackAmmount] = React.useState<number>(5);
  const [topTracks, setTopTracks] = React.useState<Track[]>([] as Track[]);

  const {
    song,
    setSong,
    setPlay,
    playButtonRef,
    audioRef,
    queue,
    setQueue,
    setQueueIndex,
    queueIndex,
  }: OutletContextType = useOutletContext();

  useEffect(() => {
    if (!artist.name) return;
    getSearch(artist.name).then((res) => {
      setTopTracks(res);
    });
  }, [artist.name]);

  useEffect(() => {
    console.log(artist);
  }, [artist]);
  if (!artist || !artist.picture_xl || !topTracks) return <div>loading...</div>;

  return (
    <div className="artist">
      <section style={{ backgroundImage: `url(${artist.picture_xl})` }}>
        <div className="artist__banner__overlay">
          <div className="artist__banner__overlay__content">
            <h1>{artist.name}</h1>
            <h2>{Intl.NumberFormat("en-us", {}).format(artist.nb_fan)} Fans</h2>
          </div>
        </div>
      </section>

      <section className="top__songs__container">
        <h2>Top Tracks</h2>
        <div className="top__songs__list">
          {topTracks.slice(0, trackAmmount).map((track, i) => {
            return (
              <TrackThumb
                tracks={topTracks}
                audioRef={audioRef}
                setPlay={setPlay}
                setQueue={setQueue}
                setQueueIndex={setQueueIndex}
                setSong={setSong}
                i={i}
                queue={queue}
                queueIndex={queueIndex}
                track={track}
                key={i}
              />
            );
          })}
        </div>
        <div>
          <button onClick={() => setTrackAmmount(trackAmmount + 5)}>
            Show more
          </button>
        </div>
      </section>
    </div>
  );
};

export default Artist;
