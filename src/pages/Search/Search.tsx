import React, { useEffect, useState, useContext } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { OutletContextType } from "../../types";
import { APIController } from "../../data/functions";
import TrackThumb from "../../components/trackThumb/TrackThumb";
import "./search.scss";
import { TokenContext } from "../../context";

const Search: React.FC = () => {
  const {
    audioRef,
    setPlay,
    queue,
    queueIndex,
    setQueue,
    setQueueIndex,
    setSong,
    search,
  }: OutletContextType = useOutletContext();

  const [genres, setGenres] = useState<string[]>([]);

  const accessToken = useContext(TokenContext);

  useEffect(() => {
    if (!accessToken) return;

    const fetchGenres = async () => {
      const genres = await APIController.getGenres(accessToken);
      setGenres(genres);
    };

    fetchGenres();
  }, [accessToken]);

  if (!search || !search.tracks) return <div></div>;

  return (
    <div>
      <section className="top__search__container">
        <article className="top__artist">
          <h2>Top Artist</h2>
          {search.artists && search.artists.items[0] && (
            <Link
              to={`/artists/${search.artists.items[0].id}`}
              className="artist__top__search"
            >
              <div className="img__container">
                <img
                  src={search.artists.items[0].images[0].url}
                  alt="Artist Cover"
                />
                <div>
                  <div className="artist__name">
                    {search.artists.items[0].name}
                  </div>
                </div>
              </div>
            </Link>
          )}
        </article>
        <article className="top__songs">
          <h2>Top Songs</h2>
          <section className="top__songs__container">
            {search && search.tracks ? (
              search.tracks.items.slice(0, 5).map((track, i) => {
                if (!search.tracks) return <></>;
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
                    images={track.album.images}
                    tracks={search.tracks.items}
                  />
                );
              })
            ) : (
              <></>
            )}
          </section>
        </article>
      </section>
      <section className="top__songs__container">
        <h2>More Songs</h2>
        {search && search.tracks ? (
          search.tracks.items.slice(5).map((track, i) => {
            if (!search.tracks) return <></>;
            return (
              <TrackThumb
                num={false}
                track={track}
                key={i}
                audioRef={audioRef}
                i={i}
                images={track.album.images}
                queue={queue}
                queueIndex={queueIndex}
                setPlay={setPlay}
                setQueue={setQueue}
                setQueueIndex={setQueueIndex}
                setSong={setSong}
                tracks={search.tracks.items}
              />
            );
          })
        ) : (
          <></>
        )}
      </section>
    </div>
  );
};

export default Search;
