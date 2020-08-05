import React, { useCallback, useContext, useState } from "react";
import styled from "styled-components";
import PlayerQueueItem from "./PlayerQueueItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/reducers";
import { playSong, setPlayerStatus } from "../store/reducers/playListSlice";
import PlayerContext from "../lib/context";
import { SongState } from "../utils/types";

const PlayerQueueStyled = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
  }

  &:hover {
    &::-webkit-scrollbar-thumb {
      background-color: #606060;
    }
  }
`;

const PlayerQueue = () => {
  const dispatch = useDispatch();
  const songPlayer = useContext(PlayerContext);
  const [songHovered, setSongHovered] = useState("");
  const { playerStatus, playList, selectedSong } = useSelector(
    (state: RootState) => {
      return {
        playerStatus: state.playList.status,
        playList: state.playList.playList,
        selectedSong: state.playList.selectedSong,
      };
    }
  );

  const playHandler = useCallback(
    (id: string) => {
      if (selectedSong && selectedSong.id === id) {
        if (playerStatus === "PAUSE") {
          dispatch(setPlayerStatus(SongState.Listening));
          songPlayer.replay();
          return;
        }

        if (playerStatus === "LISTENING") {
          dispatch(setPlayerStatus(SongState.Pause));
          songPlayer.pauseSong();
          return;
        }

        if (playerStatus === "IDLE") {
          dispatch(setPlayerStatus(SongState.Listening));
          dispatch(
            playSong(id, () => {
              songPlayer.playSong(id);
            })
          );
          return;
        }
      } else {
        if (playerStatus === "IDLE") {
          dispatch(setPlayerStatus(SongState.Listening));
          dispatch(
            playSong(id, () => {
              songPlayer.playSong(id);
            })
          );
          return;
        }

        if (playerStatus === "LISTENING") {
          songPlayer.pauseSong();
          dispatch(
            playSong(id, () => {
              songPlayer.playSong(id);
            })
          );
          return;
        }

        if (playerStatus === "PAUSE") {
          dispatch(setPlayerStatus(SongState.Listening));
          dispatch(
            playSong(id, () => {
              songPlayer.playSong(id);
            })
          );
          return;
        }
      }
    },
    [dispatch, playerStatus, selectedSong, songPlayer]
  );

  const mouseEnterHandler = (id: string) => {
    setSongHovered(id);
  };

  const mouseLeaveHandler = (id: string) => {
    setSongHovered("");
  };

  const getSelectedSong = (songId: string) => {
    return selectedSong ? songId === selectedSong.id : false;
  };

  const isSongHovered = (songId: string) => {
    return songId === songHovered;
  };

  return (
    <PlayerQueueStyled>
      {playList.map((song) => (
        <PlayerQueueItem
          hovered={isSongHovered(song.id)}
          playHandler={playHandler}
          mouseEnterHandler={mouseEnterHandler}
          mouseLeaveHandler={mouseLeaveHandler}
          selected={getSelectedSong(song.id)}
          key={song.id}
          id={song.id}
          albumImage={song.albumImage}
          songName={song.songName}
          artist={song.artist}
          duration={song.duration}
        />
      ))}
    </PlayerQueueStyled>
  );
};

export default PlayerQueue;
