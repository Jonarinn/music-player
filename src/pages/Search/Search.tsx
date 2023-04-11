import React, { useMemo } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { OutletContextType, Track } from "../../../types";
import { getSearch } from "../../data/functions";
import TrackThumb from "../../components/trackThumb/TrackThumb";
import "./search.scss";

const Search = () => {
  const {
    audioRef,
    play,
    setPlay,
    playButtonRef,
    queue,
    queueIndex,
    setQueue,
    setQueueIndex,
    setSong,
    search,
    searchRef,
  }: OutletContextType = useOutletContext();

  if (!search.tracks || !search) return <div></div>;

  return (
    <div>
      <section className="top__search__container">
        <article className="top__artist">
          <h2>Top Artist</h2>
          {search.tracks[0] && (
            <Link
              to={`/artists/${search.tracks[0].artist.id}`}
              className="artist__top__search"
            >
              <div className="img__container">
                <img
                  src={search.tracks[0].artist.picture_big}
                  alt="Artist Cover"
                />
                <div className="img__content">
                  <h3>{search.tracks[0].artist.name}</h3>
                  <h4>{search.tracks[0].artist.type}</h4>
                </div>
              </div>
            </Link>
          )}
        </article>
        <article className="top__songs">
          <h2>Top Songs</h2>
          <section className="top__songs__container">
            {search.tracks.slice(0, 5).map((track, i) => {
              return (
                <TrackThumb
                  num={true}
                  track={track}
                  key={i}
                  audioRef={audioRef}
                  i={i}
                  queue={queue}
                  queueIndex={queueIndex}
                  setPlay={setPlay}
                  setQueue={setQueue}
                  setQueueIndex={setQueueIndex}
                  setSong={setSong}
                  tracks={search.tracks}
                />
              );
            })}
          </section>
        </article>
      </section>
      <section className="top__songs__container">
        <h2>More Songs</h2>
        {search.tracks.slice(5).map((track, i) => {
          return (
            <TrackThumb
              num={false}
              track={track}
              key={i}
              audioRef={audioRef}
              i={i}
              queue={queue}
              queueIndex={queueIndex}
              setPlay={setPlay}
              setQueue={setQueue}
              setQueueIndex={setQueueIndex}
              setSong={setSong}
              tracks={search.tracks}
            />
          );
        })}
      </section>
    </div>
  );
};

export default Search;
