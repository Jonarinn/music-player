import React from "react";
import { useLoaderData } from "react-router-dom";

const Album = () => {
  const albumData = useLoaderData();
  console.log(albumData);

  const [album, setAlbum] = React.useState<any>(null);
  return <div>Album</div>;
};

export default Album;
