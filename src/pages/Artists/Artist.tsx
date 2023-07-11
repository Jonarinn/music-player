import React, { useEffect, useContext, useState } from "react";
import { useLoaderData, useOutletContext, useParams } from "react-router-dom";
import {
  AlbumObject,
  ArtistObject,
  OutletContextType,
  TrackObject,
} from "../../types";
import "./artists.scss";
import { APIController } from "../../data/functions";
import TrackThumb from "../../components/trackThumb/TrackThumb";
import { TokenContext } from "../../context";

const ArtistAlbums: React.FC = () => {
  return <div></div>;
};

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
    setAlert,
  }: OutletContextType = useOutletContext();

  const accessToken = useContext(TokenContext);

  const artistData = useLoaderData() as ArtistObject;
  const { artistId } = useParams();

  const [artist, setArtist] = useState<ArtistObject | null>(artistData);
  const [trackAmmount, setTrackAmmount] = useState<5 | 10>(5);
  const [topTracks, setTopTracks] = useState<TrackObject[]>(
    [] as TrackObject[]
  );
  const [albums, setAlbums] = useState<AlbumObject[]>([]);

  const [songsPlayed, setSongsPlayed] = useState<number>(0);
  const [artistPopularity, setArtistPopularity] = useState<number>(0);

  useEffect(() => {
    if (!artist || !artist.id || !accessToken) return;
    APIController.getArtistTopTracks(accessToken, artist.id)
      .then((res) => {
        setTopTracks(res.tracks);
      })
      .catch((err) => {
        setAlert({
          type: "error",
          message:
            "An error occured while trying to get the artist's top tracks",
        });
      });
  }, [artist, accessToken]);

  useEffect(() => {
    if (!artist || !artist.id || !accessToken) return;
    const results = fetch(
      "https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg/albums",
      {
        method: "GET",
        headers: { Authorization: "Bearer " + accessToken },
      }
    ).then((res) => {
      console.log(res);
    });
    setTimeout(() => {
      console.log(results);
    }, 1000);
  }, [artist, accessToken]);

  useEffect(() => {
    if (trackAmmount === 5)
      document.documentElement.style.setProperty("--top-songs-height", "375px");
    else
      document.documentElement.style.setProperty("--top-songs-height", "750px");
  }, [trackAmmount]);

  useEffect(() => {
    if (!artist || !artist.popularity) return;
    setArtistPopularity(artist.popularity);
  }, [artist]);

  useEffect(() => {
    if (artist || !accessToken || !artistId) return;
    APIController.getArtist(accessToken, artistId)
      .then((res) => {
        setArtist(res);
      })
      .catch((err) => {
        setAlert({
          type: "error",
          message: "An error occured while trying to get the artist data",
        });
      });
  }, [artist]);

  if (!artist || !artist.images || !artist.images[0] || !topTracks)
    return <div>loading...</div>;

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
                  historyType={{
                    type: "artist",
                    id: artist.id,
                    name: artist.name,
                    image: artist.images[0].url,
                  }}
                  setSongsPlayed={setSongsPlayed}
                  initialHistory={songsPlayed === 0}
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
      <ArtistAlbums />
    </div>
  );
};

export default Artist;
