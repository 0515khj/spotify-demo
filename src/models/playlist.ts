import type { SimplifiedAlbum } from "./album";
import type { ApiResponse } from "./apiResponse";
import type { Artist } from "./artist";
import type { ExternalUrls, Followers, Image, Owner, Restriction } from "./commonType";


export interface GetCurrentUserPlaylistRequest {
    limit?:number;
    offset?:number
}

export type GetCurrentUserPlaylistResponse = ApiResponse<SimplifiedPlaylist>

export interface BasePlaylist {
    collaborative?:boolean;
    description?:string | null;
    external_urls?:ExternalUrls;
    href?:string;
    id?:string;
    images?:Image[]
    name?:string;
    owner:Owner;
    public?:boolean;
    snapshot_id?:string;
    type?:"playlist";
    uri?:string;
}
export interface SimplifiedPlaylist extends BasePlaylist {
    tracks?:{
        href:string;
        total:number;
    };
}

export interface Playlist extends BasePlaylist {
   tracks:ApiResponse<PlaylistTrack>
   followers:Followers;
}

export interface GetPlaylistRequest {
    playlist_id:string;
    market?:string;
    fields?:string;
    additional_types?:string;

}

export interface GetPlaylistItemsRequest extends GetPlaylistRequest {
  offset?:number,
  limit?:number
}

export interface PlaylistTrack {
    added_at?:string | null;
    added_by?:{
        external_urls?:ExternalUrls;
        followers?:Followers;
        href?:string;
        id?:string;
        type?:string;
        uri?:string;
    } | null;
    is_local?:boolean;
    track:Track | Episode;
}

export type GetPlaylistItemsResponse = ApiResponse<PlaylistTrack>

export interface PlaylistTrack {
  added_at?:string | null;
  added_by?: {
    external_urls? : ExternalUrls;
    followers?:Followers;
    href?:string;
    id?:string;
    type?:string;
    uri?:string;
  } | null;
  is_local?:boolean;
  track: Track | Episode;
}

export interface Track {
  album?: SimplifiedAlbum;
  artists?: Artist[];
  available_markets?: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids?: Record<string, string>;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_playable?: boolean;
  linked_from?:Track;
  // linked_from?:{
  //       href?: string;
  //       id?: string;
  //       uri?: string;
  //     } | null;
  restrictions?: Restriction | null;
  name: string;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  type: "track";
  uri: string;
  is_local?: boolean;
}

export interface Episode {
  audio_preview_url: string | null;
  description: string;
  html_description: string;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  is_externally_hosted: boolean;
  is_playable: boolean;
  languages: string[];
  name: string;
  release_date: string;
  release_date_precision: "year" | "month" | "day";
  resume_point?: {
    fully_played: boolean;
    resume_position_ms: number;
  };
  type: "episode";
  uri: string;
  restrictions?: Restriction | null;
  show: {
    id: string;
    name: string;
    href: string;
    uri: string;
    images?: Image[];
    external_urls?: ExternalUrls;
  };
}


export interface CreatePlaylistRequest {
  name:string;
  playlistPublic?:boolean;
  collaborative?:boolean;
  description?:string;
}