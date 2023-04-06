import React, { useState, useEffect } from "react";
import Header from "../components/header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Player from "../components/player/Player";
import { getArtists, getSong } from "../data/functions";

const Root = () => {
  const [song, setSong] = useState<number | null>(916424);
  useEffect(() => {
    const app = document.querySelector(".App");
    if (song) app?.classList.add("song");
    else app?.classList.remove("song");
    if (!song) return;
    const audio = document.querySelector("audio");

    getSong(song).then((res) => {
      if (!res) return;
      audio?.setAttribute("src", res.preview);
    });
  }, [song]);

  useEffect(() => {
    // getArtists("eminem").then((res) => console.log(res));
  }, []);
  return (
    <div className="App">
      <Header />
      <main>
        <Outlet context={{ song: song }} />
      </main>
      {song && <Player song={song} />}
      <Footer />
    </div>
  );
};

export default Root;
