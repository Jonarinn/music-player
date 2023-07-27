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
import TrackThumb from "../../components/thumbnails/SmallThumb";
import { TokenContext } from "../../context";
import { FullLoader, InlineLoader } from "../../components/Loading";
import { MediumThumbnail } from "../../components/thumbnails";

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
  const [relatedArtists, setRelatedArtists] = useState<ArtistObject[] | null>(
    []
  );

  const [songsPlayed, setSongsPlayed] = useState<number>(0);
  const [artistPopularity, setArtistPopularity] = useState<number>(0);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!artist || !artist.id || !accessToken) return;
    Promise.all([
      APIController.getArtistTopTracks(accessToken, artist.id),
      APIController.getArtistAlbums(accessToken, artist.id, ["album"]),
      APIController.getRelatedArtists(accessToken, artist.id),
    ])
      .then((res) => {
        setTopTracks(res[0].tracks);
        setAlbums(res[1]);
        setRelatedArtists(res[2]);
      })
      .catch((err) => {
        setAlert({
          type: "error",
          message: "An error occured while trying to get the artist's data",
        });
      });
  }, [artist, accessToken, artistId]);

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
    if (!accessToken || !artistId) return;
    APIController.getArtist(accessToken, artistId)
      .then((res) => {
        setArtist(res);
        setLoading(false);
      })
      .catch((err) => {
        setAlert({
          type: "error",
          message: "An error occured while trying to get the artist data",
        });
      });
  }, [artist, accessToken, artistId]);

  if (!artist || !artist.images || !artist.images[0] || !topTracks || loading)
    return <FullLoader />;

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
      {!topTracks || !albums || !relatedArtists ? (
        <InlineLoader />
      ) : (
        <>
          <section className="top__songs__container">
            <div className="header-with-show-button">
              <h2>Top Tracks</h2>
              <div>
                <button
                  className="show__button"
                  onClick={() => setTrackAmmount(trackAmmount === 5 ? 10 : 5)}
                >
                  Show {trackAmmount === 5 ? "more" : "less"}
                </button>
              </div>
            </div>

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
          </section>
          <ArtistContentContainer
            header="Albums"
            items={albums}
            setLoading={setLoading}
            type="album"
          />
          <ArtistContentContainer
            items={relatedArtists}
            header="Related Artists"
            setLoading={setLoading}
            type="artist"
          />
        </>
      )}
    </div>
  );
};

type ArtistContentContainerProps = {
  items: ArtistObject[] | AlbumObject[];
  header: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  type: "artist" | "album";
};
const ArtistContentContainer: React.FC<ArtistContentContainerProps> = ({
  items,
  header,
  setLoading,
  type,
}) => {
  return (
    <section>
      <div className="header-with-show-button">
        <h2>{header}</h2>
        {items.length > 4 && (
          <div>
            <button className="show__button">Show all</button>
          </div>
        )}
      </div>

      <div className="artist__bio__container">
        {items?.slice(0, 4).map((artist, i) => (
          <MediumThumbnail
            image={artist.images[0].url}
            name={artist.name}
            type={type}
            key={artist.id}
            id={artist.id}
            setLoading={setLoading}
            i={i}
          />
        ))}
      </div>
    </section>
  );
};

export default Artist;
