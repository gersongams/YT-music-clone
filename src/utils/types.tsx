import { Howl } from "howler";

export interface PlayerQueueItemProps {
  selected: boolean;
}

export enum SongState {
  Listening = "LISTENING",
  Pause = "PAUSE",
  Play = "PLAY",
  Idle = "IDLE",
}

export interface PlayListState {
  isLoading: boolean;
  error: string | null;
  status: SongState;
  playList: Song[];
  selectedSong?: Song;
  duration: number;
  actualTime: number;
}

export interface Song {
  id: string;
  albumImage: string;
  songName: string;
  artist: string;
  src: string;
  duration: string;
  howl?: Howl;
}

export interface Updaters {
  updateTime: (arg0: number) => void;
  updateDuration: (arg0: number) => void;
}
