import React, { useEffect } from "react";
import { useLoaderData, useOutletContext } from "react-router-dom";
import { ArtistType, OutletContextType, Track } from "../../../types";
import "./artists.scss";
import { AiOutlineRight } from "react-icons/ai";
import { getSearch } from "../../data/functions";

const Artist = () => {
  const artist = useLoaderData() as ArtistType;
  const bannerRef = React.useRef<HTMLDivElement>(null);
  const [trackAmmount, setTrackAmmount] = React.useState<number>(5);
  const [topTracks, setTopTracks] = React.useState<Track[]>([] as Track[]);

  const { song, setSong, setPlay, playButtonRef, audioRef }: OutletContextType =
    useOutletContext();

  useEffect(() => {
    console.log(artist);

    if (!bannerRef.current) return;
    bannerRef.current.style.backgroundImage = `url(${artist.picture_xl})`;
  }, [artist]);

  useEffect(() => {
    if (!artist) return;

    getSearch(artist.name).then((res) => {
      setTopTracks(res);
    });
  }, []);

  const hadnleSong = (
    e: React.MouseEvent<HTMLButtonElement>,
    track: string
  ) => {
    setSong(track);
    setPlay(true);
    audioRef.current?.load();

    audioRef.current?.play();
  };
  if (!artist) return <div>loading...</div>;

  return (
    <div className="artist">
      <section ref={bannerRef}>
        <div className="artist__banner__overlay">
          <div className="artist__banner__overlay__content">
            <h1>{artist.name}</h1>
            <h2>{Intl.NumberFormat("en-us", {}).format(artist.nb_fan)} Fans</h2>
          </div>
        </div>
      </section>
      <section className="query__container">
        <button className="query__btn">
          Albums
          <AiOutlineRight />
        </button>
        <button className="query__btn">
          Songs
          <AiOutlineRight />
        </button>
      </section>
      <section className="top__songs__container">
        <h2>Top Tracks</h2>
        <div className="top__songs__list">
          {topTracks.slice(0, trackAmmount).map((track, i) => {
            return (
              <button
                className="top__songs__list__item"
                key={i}
                onClick={(e) => hadnleSong(e, track.preview)}
              >
                <div className="number">{i + 1}</div>
                <div className="main__info">
                  <img src={track.album.cover_small} alt="Album Cover" />
                  <div>
                    <h3>{track.title}</h3>
                    <h4>{track.artist.name}</h4>
                  </div>
                </div>
              </button>
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
