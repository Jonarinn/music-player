import React, { useState, useEffect } from "react";
import Header from "../components/header/Header";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Player from "../components/player/Player";
import { APIController } from "../data/functions";
import { AlertType, SearchTracks, TrackObject } from "../../types";
import Sidebar from "../components/sidebar/Sidebar";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../firebase.config";
import Alert from "../components/Alert/Alert";

const Root = () => {
  const [song, setSong] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<boolean>(true);
  const [queue, setQueue] = useState<TrackObject[]>([]);
  const [queueIndex, setQueueIndex] = useState<number>(0);
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const playButtonRef = React.useRef<HTMLButtonElement>(null);
  const [play, setPlay] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [alert, setAlert] = useState<AlertType | null>(null);
  const [searchInput, setSearchInput] = useState<string>("");
  const [search, setSearch] = React.useState<SearchTracks>({} as SearchTracks);

  useEffect(() => {
    if (expanded)
      document.documentElement.style.setProperty("--main-padding", "200px");
    else document.documentElement.style.setProperty("--main-padding", "50px");
  }, [expanded]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <div className={`App ${song ? "song" : ""} `}>
      {alert && <Alert alert={alert} />}
      <Header
        searchInput={searchInput}
        setSearch={setSearch}
        user={user}
        setSearchInput={setSearchInput}
        setAlert={setAlert}
      />
      <Sidebar expanded={expanded} setExpanded={setExpanded} />
      <main>
        <Outlet
          context={{
            song: song,
            setSong: setSong,
            play: play,
            setPlay: setPlay,
            audioRef: audioRef,
            playButtonRef: playButtonRef,
            queue: queue,
            setQueue: setQueue,
            queueIndex: queueIndex,
            setQueueIndex: setQueueIndex,
            search: search,
            searchInput: searchInput,
            setAlert: setAlert,
          }}
        />
      </main>
      {song && (
        <Player
          audioRef={audioRef}
          song={song}
          setSong={setSong}
          play={play}
          setPlay={setPlay}
          playButtonRef={playButtonRef}
          queue={queue}
          queueIndex={queueIndex}
          setQueueIndex={setQueueIndex}
        />
      )}
      <Footer />
    </div>
  );
};

export default Root;
