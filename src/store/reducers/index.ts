import { combineReducers } from "@reduxjs/toolkit";

import playListReducer from "./playListSlice";

const rootReducer = combineReducers({
  playList: playListReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
