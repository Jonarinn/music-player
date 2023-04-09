import React from "react";

export type ArtistType = {
    id: number;
    name: string;
    link: string;
    share: string;
    picture: string;
    picture_small: string;
    picture_medium: string;
    picture_big: string;
    picture_xl: string;
    nb_album: number;
    nb_fan: number;
    radio: boolean;
    tracklist: string;
    type: string;
}

export type Track = {
    id: number;
    link: string;
    duration: number;
    explicit_content_cover: number;
    explicit_content_lyrics: number;
    explicit_lyrics: boolean;
    md5_image: string;
    preview: string;
    rank: number;
    readable: boolean;
    title: string;
    title_short: string;
    title_version: string;
    type: string;
    artist: ArtistType;
    album: Album;
}

export type Album = {
    id: number;
    title: string;
    cover: string;
    cover_big: string;
    cover_medium: string;
    cover_small: string;
    cover_xl: string;
    md5_image: string;
    tracklist: string;
    type: string;
}

export interface OutletContextType {
    song: number;
    setSong: React.Dispatch<React.SetStateAction<string>>;
    play: boolean;
    setPlay: React.Dispatch<React.SetStateAction<boolean>>;
    playButtonRef: React.RefObject<HTMLButtonElement>;
    audioRef: React.RefObject<HTMLAudioElement>;
}