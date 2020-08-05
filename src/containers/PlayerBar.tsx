import React, { useState } from "react";
import styled from "styled-components";
import ControlsLeft from "../components/ControlsLeft";
import ControlsMiddle from "../components/ControlsMiddle";
import ControlsRight from "../components/ControlsRight";
import ProgressBar from "../components/ProgressBar";

const StyledPlayerBar = styled.div`
  width: 100vw;
  height: 72px;
  position: fixed;
  bottom: 0;
  left: 0;
  display: grid;
  grid-template-columns: 0fr 1fr 0fr;
  grid-template-areas: "start middle end";
  background-color: ${({ theme }) => theme.color.playerColor};
  @media (orientation: portrait) and (max-width: 900px) {
    height: 64px;
    width: 100%;
  }
`;

const PlayerBar = () => {
  const [playerBarHovered, setPlayerBarHovered] = useState(false);

  const mouseEnterHandler = () => {
    setPlayerBarHovered(true);
  };

  const mouseLeaveHandler = () => {
    setPlayerBarHovered(false);
  };

  return (
    <StyledPlayerBar
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <ControlsLeft />
      <ControlsMiddle />
      <ControlsRight playerBarHovered={playerBarHovered} />
      <ProgressBar />
    </StyledPlayerBar>
  );
};

export default PlayerBar;
