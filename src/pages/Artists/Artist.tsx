import React, { useEffect, useContext } from "react";
import { useLoaderData, useOutletContext } from "react-router-dom";
import { ArtistObject, OutletContextType, TrackObject } from "../../../types";
import "./artists.scss";
import { AiOutlineRight } from "react-icons/ai";
import { APIController } from "../../data/functions";
import TrackThumb from "../../components/trackThumb/TrackThumb";
import { TokenContext } from "../../context";

const Artist = () => {
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

  const accessToken = useContext(TokenContext);

  const artist = useLoaderData() as ArtistObject;
  const [trackAmmount, setTrackAmmount] = React.useState<5 | 10>(5);
  const [topTracks, setTopTracks] = React.useState<TrackObject[]>(
    [] as TrackObject[]
  );

  const [artistPopularity, setArtistPopularity] = React.useState<number>(0);

  useEffect(() => {
    if (!artist.name || !accessToken) return;
    APIController.getArtistTopTracks(accessToken, artist.id).then((res) => {
      setTopTracks(res.tracks);
    });
  }, [artist.name, accessToken]);

  useEffect(() => {
    if (trackAmmount === 5)
      document.documentElement.style.setProperty("--top-songs-height", "375px");
    else
      document.documentElement.style.setProperty("--top-songs-height", "750px");
  }, [trackAmmount]);

  useEffect(() => {
    setArtistPopularity(artist.popularity);
  }, [artist.popularity]);

  if (!artist || !artist.images[0] || !topTracks) return <div>loading...</div>;

  return (
    <div className="artist">
      <section className="artist__info">
        <div className="artist__info__image">
          <img src={artist.images[0].url} alt="Artist Banner" />
        </div>
        <div className="artist__info__text">
          <h1>{artist.name}</h1>
          <div className="popularity">
            <h2>Popularity score:</h2>
            <div className="wrapper">
              0
              <div className="popularity__bar">
                <div
                  style={{ width: artistPopularity + "%" }}
                  className="popularity__bar__progress"
                ></div>
                <p>{artist.popularity}</p>
              </div>
              100
            </div>
          </div>

          <h2>
            {Intl.NumberFormat("en-us", {}).format(artist.followers.total)}{" "}
            Followers
          </h2>
        </div>
      </section>

      <section className="top__songs__container">
        <h2>Top Tracks</h2>
        <div className="top__songs__list">
          <div className="top__songs__list__wrapper">
            {topTracks.map((track, i) => {
              return (
                <TrackThumb
                  tracks={topTracks}
                  audioRef={audioRef}
                  setPlay={setPlay}
                  setQueue={setQueue}
                  setQueueIndex={setQueueIndex}
                  setSong={setSong}
                  i={i}
                  images={track.album.images}
                  queue={queue}
                  queueIndex={queueIndex}
                  track={track}
                  key={i}
                />
              );
            })}
          </div>
        </div>

        <div>
          <button
            className="show__button"
            onClick={() => setTrackAmmount(trackAmmount === 5 ? 10 : 5)}
          >
            Show {trackAmmount === 5 ? "more" : "less"}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Artist;
