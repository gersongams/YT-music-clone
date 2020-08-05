import React, { useCallback, useContext, useEffect } from "react";
import MainPanel from "../containers/MainPanel";
import SidePanel from "../containers/SidePanel";
import styled from "styled-components";
import PlayerBar from "../containers/PlayerBar";
import { useDispatch, useSelector } from "react-redux";
import PlayerContext from "../lib/context";
import { RootState } from "../store/reducers";
import { updateDuration, updateTime } from "../store/reducers/playListSlice";

const PlayerPageStyled = styled.main`
  display: flex;
  width: 100vw;
  height: calc(100vh - 136px);
  padding: 40px 56px 0 56px;
  @media (orientation: portrait) and (max-width: 900px) {
    flex-direction: column;
    height: calc(100vh - 128px);
    padding: 0;
  }
`;

const PlayerPage = () => {
  const dispatch = useDispatch();
  const songPlayer = useContext(PlayerContext);
  const { playList } = useSelector((state: RootState) => {
    return {
      playList: state.playList.playList,
    };
  });

  const handleUpdateTime = useCallback(
    (time: number) => {
      dispatch(updateTime(time));
    },
    [dispatch]
  );

  const handleUpdateDuration = useCallback(
    (duration: number) => {
      dispatch(updateDuration(duration));
    },
    [dispatch]
  );

  useEffect(() => {
    songPlayer.setPlaylist(playList);
    songPlayer.setUpdaterFunction({
      updateTime: handleUpdateTime,
      updateDuration: handleUpdateDuration,
    });
  }, [handleUpdateDuration, handleUpdateTime, playList, songPlayer]);

  return (
    <PlayerPageStyled>
      <MainPanel />
      <SidePanel />
      <PlayerBar />
    </PlayerPageStyled>
  );
};

export default PlayerPage;
