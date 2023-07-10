import React from "react";
import { Genre } from "../../types";
import { Link } from "react-router-dom";

type GenreThumbProps = {
  genre: Genre;
};

const GenreThumb: React.FC<GenreThumbProps> = ({ genre }) => {
  if (!genre.icons) return <div></div>;
  return (
    <Link to={`/genre/${genre.id}`} className="genre__thumb">
      <h2>{genre.name}</h2>
      <img src={genre.icons[0].url} />
    </Link>
  );
};

export default GenreThumb;
