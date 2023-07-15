import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase.config";
import {
  AlbumObject,
  AlbumTrackObject,
  HistoryItem,
  IncludeGroupsType,
  PlayableTrackObject,
  SearchType,
  TrackObject,
} from "../types";
import axios from "axios";

export const secondsToMinutesAndSeconds = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secondsLeft = Math.floor(seconds % 60);
  return `${minutes}:${
    secondsLeft.toString().length === 1 ? "0" + secondsLeft : secondsLeft
  }`;
};

export const shuffleQueue = (queue: PlayableTrackObject[]) => {
  const tempQueue = [...queue];
  for (let i = tempQueue.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = tempQueue[i];
    tempQueue[i] = tempQueue[j];
    tempQueue[j] = temp;
  }
  return tempQueue;
};

export const AlbumObjectToPlayableTrackObject = (
  track: AlbumTrackObject,
  albumInfo: AlbumObject
): PlayableTrackObject => {
  return {
    album: albumInfo,
    artists: track.artists,
    available_markets: track.available_markets,
    preview_url: track.preview_url,
    name: track.name,
    id: track.id,
    explicit: track.explicit,
  };
};

export const TrackObjectToPlayableTrackObject = (
  track: TrackObject
): PlayableTrackObject => {
  return {
    album: track.album,
    artists: track.artists,
    available_markets: track.available_markets,
    preview_url: track.preview_url,
    name: track.name,
    id: track.id,
    explicit: track.explicit,
  };
};

export const APIController = (() => {
  const clientId = "bbd938a1bcab45698b1073f3958b0320";
  const clientSecret = "012ce788aede478b889791f13bf4c4f2";

  // private methods
  const _getToken = async () => {
    const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + window.btoa(clientId + ":" + clientSecret),
      },
      body: "grant_type=client_credentials",
    });
    try {
      const data = await result.json();
      return data.access_token;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const _getGenres = async (token: string) => {
    const result = await fetch(
      "https://api.spotify.com/v1/browse/categories?locale=sv_US",
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );
    const data = await result.json();
    return data.categories.items;
  };

  const _getPlaylistByGenre = async (token: string, genreId: string) => {
    const limit = 10;

    const result = await fetch(
      `https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );
    const data = await result.json();
    return data.playlists.items;
  };

  const _getTracks = async (token: string, tracksEndPoint: string) => {
    const limit = 10;

    const result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    });
    const data = await result.json();
    return data.items;
  };

  const _getTrack = async (token: string, trackEndPoint: string) => {
    const result = await fetch(`${trackEndPoint}`, {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    });
    const data = await result.json();
    return data;
  };

  const _getSearch = async (
    token: string,
    search: string,
    type: SearchType[]
  ) => {
    const limit = 10;
    const result = await fetch(
      `https://api.spotify.com/v1/search?q=${search}&type=${type.join(
        "%2C"
      )}&limit=${limit}`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );
    const data = await result.json();
    return data;
  };

  const _getArtist = async (token: string, artistId: string) => {
    const result = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );
    const data = await result.json();
    return data;
  };

  const _getArtistTopTracks = async (
    token: string,
    artistId: string
  ): Promise<{ tracks: TrackObject[] }> => {
    const result = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=US`,
      { method: "GET", headers: { Authorization: "Bearer " + token } }
    );
    const data = await result.json();
    return data;
  };

  const _getAlbum = async (token: string, albumId: string) => {
    const result = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    });
    const data = await result.json();
    return data;
  };

  const _getAlbumTracks = async (token: string, albumId: string) => {
    const result = await fetch(
      `https://api.spotify.com/v1/albums/${albumId}/tracks`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );
    const data = await result.json();
    return data.items;
  };

  const _getArtistAlbums = async (
    token: string,
    artistId: string,
    include: IncludeGroupsType[]
  ): Promise<AlbumObject[] | void> => {
    const result = await axios.get(
      `https://api.spotify.com/v1/artists/${artistId}/albums`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          include_groups: include,
          limit: 4,
        },
      }
    );
    const data = await result.data;
    return data.items;
  };

  const _setHistory = async (item: HistoryItem) => {
    if (!auth.currentUser) return;
    const userRef = doc(db, "users", auth.currentUser.uid);

    const historyObject = await getDoc(userRef);
  };

  // public methods

  const _setAccessToken = (token: string) => {
    localStorage.setItem("accessToken", token);
  };

  return {
    getToken() {
      return _getToken();
    },
    getGenres(token: string) {
      return _getGenres(token);
    },
    getPlaylistByGenre(token: string, genreId: string) {
      return _getPlaylistByGenre(token, genreId);
    },
    getTracks(token: string, tracksEndPoint: string) {
      return _getTracks(token, tracksEndPoint);
    },
    getTrack(token: string, trackEndPoint: string) {
      return _getTrack(token, trackEndPoint);
    },
    getSearch(token: string, search: string, type: SearchType[]) {
      return _getSearch(token, search, type);
    },
    getArtist(token: string, artistId: string) {
      return _getArtist(token, artistId);
    },
    getArtistTopTracks(token: string, artistId: string) {
      return _getArtistTopTracks(token, artistId);
    },
    setAccessToken(token: string) {
      _setAccessToken(token);
    },
    getAlbum(token: string, albumId: string) {
      return _getAlbum(token, albumId);
    },
    getAlbumTracks(token: string, albumId: string) {
      return _getAlbumTracks(token, albumId);
    },
    setHistory(item: HistoryItem) {
      return _setHistory(item);
    },
    getArtistAlbums(
      token: string,
      artistId: string,
      include: IncludeGroupsType[]
    ) {
      return _getArtistAlbums(token, artistId, include);
    },
  };
})();
