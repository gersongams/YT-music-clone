import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../store/reducers";
import { get } from "lodash";

const MainPanelStyled = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-bottom: 36px;
  overflow: hidden;
  img {
    width: auto;
    max-height: 100%;
  }
  @media (orientation: portrait) and (max-width: 900px) {
    margin: 0;
    overflow: initial;
    img {
      width: auto;
      height: 100%;
      max-height: 210px;
    }
  }
`;

const MainPanel = () => {
  const { selectedSong } = useSelector((state: RootState) => {
    return {
      selectedSong: state.playList.selectedSong,
    };
  });

  return (
    <MainPanelStyled>
      <img src={get(selectedSong, "albumImage", "")} alt="album-cover" />
    </MainPanelStyled>
  );
};

export default MainPanel;
