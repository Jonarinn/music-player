import { LoaderFunctionArgs } from "react-router-dom";
import { APIController } from "./data/functions";
import { useContext } from "react";
import { TokenContext } from "./context";

const accessToken = localStorage.getItem("accessToken");

export const loadArtist = async ({ params }: LoaderFunctionArgs) => {
  const { artistId } = params;
  if (!artistId) return console.log("no artistId");
  if (!accessToken) return console.log("no token");
  return await APIController.getArtist(accessToken, artistId);
};

export const loadAlbum = async ({ params }: LoaderFunctionArgs) => {
  const { albumId } = params;
  if (!albumId) return console.log("no albumId");
  if (!accessToken) return console.log("no token");
  return {
    albumInfo: await APIController.getAlbum(accessToken, albumId),
    albumTracks: await APIController.getAlbumTracks(accessToken, albumId),
  };
};
