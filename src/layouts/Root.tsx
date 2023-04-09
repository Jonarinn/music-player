import React, { useState, useEffect } from "react";
import Header from "../components/header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Player from "../components/player/Player";
import { getSearch } from "../data/functions";

const Root = () => {
  const [song, setSong] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<boolean>(true);
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const playButtonRef = React.useRef<HTMLButtonElement>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    // getSearch("21 savage").then((res) => console.log(res));
  }, []);

  useEffect(() => {
    if (expanded) {
      document.documentElement.style.setProperty("--main-padding", "200px");
    } else {
      document.documentElement.style.setProperty("--main-padding", "50px");
    }
  }, [expanded]);

  return (
    <div className={`App ${song ? "song" : ""} `}>
      <Header />
      <main>
        <Outlet
          context={{
            song: song,
            setSong: setSong,
            play: play,
            setPlay: setPlay,
            audioRef: audioRef,
            playButtonRef: playButtonRef,
          }}
        />
      </main>
      {song && (
        <Player
          audioRef={audioRef}
          song={song}
          play={play}
          setPlay={setPlay}
          playButtonRef={playButtonRef}
        />
      )}
      <Footer />
    </div>
  );
};

export default Root;
