import React, { useContext } from "react";
import styled from "styled-components";
import {
  MdPause,
  MdPlayArrow,
  MdSkipNext,
  MdSkipPrevious,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/reducers";
import PlayerContext from "../lib/context";
import {
  playSong,
  setPlayerStatus,
  updateDuration,
  updateTime,
} from "../store/reducers/playListSlice";
import { SongState } from "../utils/types";

const StyledControlsLeft = styled.div`
  width: 292px;
  flex: none;
  display: flex;
  align-items: center;
  grid-area: start;
  color: white;
  .controls {
    display: flex;
    align-items: center;
    & > span {
      margin-left: 8px;
      padding: 8px;
      cursor: pointer;
      outline: transparent;
    }
    & > span:nth-child(1),
    span:nth-child(3) {
      svg {
        font-size: 24px;
      }
    }
    & > span:nth-child(2) {
      svg {
        font-size: 40px;
      }
    }
  }
  .timer {
    font-size: 12px;
    font-weight: 400;
    color: #aaa;
  }
  @media (orientation: portrait) and (max-width: 900px) {
    width: 112px;
    .controls {
      & > span {
        width: 32px;
        height: 32px;
        padding: 4px;
      }
      & > span:nth-child(1) {
        margin-left: 8px;
      }
      & > span:nth-child(2),
      span:nth-child(3) {
        margin: 0;
      }
      & > span:nth-child(2) {
        width: 40px;
        height: 40px;
        svg {
          font-size: 32px;
        }
      }
    }
    .timer {
      display: none;
    }
  }
`;

const ControlsLeft = () => {
  const songPlayer = useContext(PlayerContext);
  const dispatch = useDispatch();
  const { playerStatus, selectedSong } = useSelector((state: RootState) => {
    return {
      playerStatus: state.playList.status,
      selectedSong: state.playList.selectedSong,
    };
  });

  const play = () => {
    dispatch(setPlayerStatus(SongState.Listening));
    if (selectedSong) {
      if (playerStatus === "IDLE") {
        dispatch(setPlayerStatus(SongState.Listening));
        songPlayer.playSong(selectedSong.id);
        return;
      }

      if (playerStatus === "PAUSE") {
        dispatch(setPlayerStatus(SongState.Listening));
        songPlayer.replay();
        return;
      }
    }
  };

  const pauseSong = () => {
    dispatch(setPlayerStatus(SongState.Pause));
    songPlayer.pauseSong();
  };

  const goNext = () => {
    const id = songPlayer.skip("next");
    goToSong(id);
  };

  const goPrev = () => {
    const id = songPlayer.skip("prev");
    goToSong(id);
  };

  const goToSong = (id: string) => {
    dispatch(updateTime(0));
    dispatch(updateDuration(0));
    dispatch(playSong(id, () => {}));
  };

  return (
    <StyledControlsLeft>
      <div className="controls">
        <span tabIndex={0} role={"button"} onClick={goPrev}>
          <MdSkipPrevious />
        </span>
        {playerStatus === "IDLE" || playerStatus === "PAUSE" ? (
          <span tabIndex={0} role={"button"} onClick={play}>
            <MdPlayArrow />
          </span>
        ) : (
          <span tabIndex={0} role={"button"} onClick={pauseSong}>
            <MdPause />
          </span>
        )}
        <span tabIndex={0} role={"button"} onClick={goNext}>
          <MdSkipNext />
        </span>
      </div>
      <span id="timer" className="timer">
        0:00 / 0:00
      </span>
    </StyledControlsLeft>
  );
};

export default ControlsLeft;
