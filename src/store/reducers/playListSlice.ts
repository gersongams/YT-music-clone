import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../index";
import { PLAYLIST } from "../../lib/playList";
import { head } from "lodash";
import { PlayListState, SongState } from "../../utils/types";

const playListInitialState: PlayListState = {
  isLoading: false,
  error: null,
  status: SongState.Idle,
  selectedSong: head(PLAYLIST),
  playList: PLAYLIST,
  duration: 0,
  actualTime: 0,
};

const playlist = createSlice({
  name: "playlist",
  initialState: playListInitialState,
  reducers: {
    getPlaylistStart(state: PlayListState) {
      state.isLoading = true;
    },
    getPlaylistFailure(state: PlayListState, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setPlayerStatus(state: PlayListState, action: PayloadAction<SongState>) {
      state.status = action.payload;
    },
    setPlaySong(state: PlayListState, action: PayloadAction<string>) {
      state.selectedSong = state.playList.find(
        (song) => song.id === action.payload
      );
    },
    setDuration(state: PlayListState, action: PayloadAction<number>) {
      state.duration = action.payload;
    },
    setActualTime(state: PlayListState, action: PayloadAction<number>) {
      state.actualTime = action.payload;
    },
  },
});

export const {
  getPlaylistStart,
  getPlaylistFailure,
  setPlayerStatus,
  setPlaySong,
  setDuration,
  setActualTime,
} = playlist.actions;

export default playlist.reducer;

export const fetchPlaylist = (): AppThunk => async (dispatch) => {
  try {
    dispatch(getPlaylistStart());
  } catch (err) {
    dispatch(getPlaylistFailure(err.toString()));
  }
};

export const playSong = (id: string, callback: () => void): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(setPlaySong(id));
    callback();
  } catch (err) {
    dispatch(getPlaylistFailure(err.toString()));
  }
};

export const updateDuration = (duration: number): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(setDuration(duration));
  } catch (err) {
    dispatch(getPlaylistFailure(err.toString()));
  }
};

export const updateTime = (time: number): AppThunk => async (dispatch) => {
  try {
    dispatch(setActualTime(time));
  } catch (err) {
    dispatch(getPlaylistFailure(err.toString()));
  }
};
