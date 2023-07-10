export type ArtistObject = {
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string | null;
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images: ImageObject[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
};

export type ArtistSearch = {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: ArtistObject[];
};

export type SimplifiedArtist = {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
};

export type ImageObject = {
  url: string;
  height: number | null;
  width: number | null;
};

export type TrackSearch = {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: TrackObject[];
};

export type TrackObject = {
  album: AlbumObject;
  artists: ArtistObject[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIds;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_playable: boolean;
  linked_from: {};
  restrictions: Restrictions;
  name: string;
  popularity: number;
  preview_url: string | null;
};

export type AlbumTrackObject = {
  artists: SimplifiedArtist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_playable: boolean;
  linked_from: {
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  name: string;
  restrictions: Restrictions;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
};

export type AlbumObject = {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: ImageObject[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions: Restrictions;
  type: string;
  uri: string;
  copyright: CopyrightObject;
  external_ids: ExternalIds;
  genres: string[];
  label: string;
  popularity: number;
  album_group: string;
  artists: SimplifiedArtist[];
};

export type ExternalIds = {
  isrc: string;
  ean: string;
  upc: string;
};

export type CopyrightObject = {
  text: string;
  type: string;
};

export type Restrictions = {
  reason: "market" | "product" | "explicit" | string;
};

export type Genres = {
  data: Genre[];
};

export type Genre = {
  id: number;
  name: string;
  icons: { height: number; url: string; width: number }[];
  href: string;
};

export interface OutletContextType {
  song: TrackObject | null;
  setSong: React.Dispatch<React.SetStateAction<TrackObject | null>>;
  play: boolean;
  setPlay: React.Dispatch<React.SetStateAction<boolean>>;
  playButtonRef: React.RefObject<HTMLButtonElement>;
  audioRef: React.RefObject<HTMLAudioElement>;
  setQueue: React.Dispatch<React.SetStateAction<Queue>>;
  queue: Queue;
  queueIndex: number;
  setQueueIndex: React.Dispatch<React.SetStateAction<number>>;
  search: SearchTracks;
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  setAlert: React.Dispatch<React.SetStateAction<AlertType | null>>;
}

export interface SearchTracks {
  search: string;
  tracks?: TrackSearch;
  artists?: ArtistSearch;
}

export type SearchType = "artist" | "track" | "album" | "playlist";

export interface Contributors {
  name: string;
  id: number;
  link: string;
  share: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  radio: boolean;
  tracklist: string;
  type: string;
}

export interface AlertType {
  type: string;
  message: string;
}

export type Queue = {
  normal: TrackObject[];
  shuffled: TrackObject[];
  priority: TrackObject[];
};

export type HistoryItem = {
  type: "track" | "album" | "artist" | "playlist";
  id: string;
  name: string;
  image: string;
};

export type NotificationType = {
  type: "success" | "error" | "info" | "warning";
  message: string;
  title: string;
  image?: string;
  read: boolean;
};

export type IncludeGroupsType =
  | "single"
  | "appears_on"
  | "album"
  | "compilation";
