import { LoaderFunctionArgs } from "react-router-dom";
import { APIController } from "./data/functions";
import { useContext } from "react";
import { TokenContext } from "./context";

const accessToken = localStorage.getItem("accessToken");

export const loadArtist = async ({ params }: LoaderFunctionArgs) => {
  const { artistId } = params;
  if (!artistId || !accessToken) return null;
  try {
    return await APIController.getArtist(accessToken, artistId);
  } catch (e) {
    console.log(e);
  }
  return null;
};

export const loadAlbum = async ({ params }: LoaderFunctionArgs) => {
  const { albumId } = params;
  if (!albumId || !accessToken) return null;

  try {
    return {
      albumInfo: await APIController.getAlbum(accessToken, albumId),
      albumTracks: await APIController.getAlbumTracks(accessToken, albumId),
    };
  } catch (e) {
    console.log(e);
  }
  return null;
};
