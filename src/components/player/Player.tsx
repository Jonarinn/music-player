import React, { useRef } from "react";
import Controls from "./Controls";

interface PlayerProps {
  song: string;
}

const Player: React.FC<PlayerProps> = ({ song }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  return (
    <section className="player">
      <article></article>
      <Controls audioRef={audioRef} />
      <article></article>
      <audio src={song} ref={audioRef} />
    </section>
  );
};

export default Player;
