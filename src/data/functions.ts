import axios from "axios";
import { ArtistType } from "../../types";

export const getSearch = async (query: string) => {
  const params = {
    q: query,
  };
  const options = {
    mathod: "GET",
    url: "https://deezerdevs-deezer.p.rapidapi.com/search",
    params: params,
    headers: {
      "X-RapidAPI-Key": "15cfc5d4d3mshb1145f9bcbaecb2p1d3e96jsn45109b2f6d80",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };
  const response = await axios.request(options);
  return response.data.data;
};

export const getSong = async (songId: number) => {
  const options = {
    mathod: "GET",
    url: `https://deezerdevs-deezer.p.rapidapi.com/track/${songId}`,
    headers: {
      "X-RapidAPI-Key": "15cfc5d4d3mshb1145f9bcbaecb2p1d3e96jsn45109b2f6d80",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };
  const response = await axios.request(options);
  return response.data;
};

export const getArtist = async (artistId: string): Promise<ArtistType> => {
  const options = {
    mathod: "GET",
    url: `https://deezerdevs-deezer.p.rapidapi.com/artist/${artistId}`,
    headers: {
      "X-RapidAPI-Key": "15cfc5d4d3mshb1145f9bcbaecb2p1d3e96jsn45109b2f6d80",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };
  const response = await axios.request(options);
  return response.data;
}
