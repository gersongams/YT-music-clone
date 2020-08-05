import React from "react";
import styled from "styled-components";
import PlayerQueue from "../components/PlayerQueue";

const SidePanelStyled = styled.div`
  display: flex;
  max-width: 800px;
  margin-left: 56px;
  flex-direction: column;
  width: 36%;
  @media (orientation: portrait) and (max-width: 900px) {
    width: 100%;
    margin-left: 0;
    max-height: 100%;
    height: calc(100vh - 128px - 234px);
    margin-top: 24px;
  }
`;

const QueueHeader = styled.div`
  padding: 8px;
  border-bottom: ${({ theme }) => theme.border.normalBorder};
  h2 {
    color: ${({ theme }) => theme.color.secondaryText};
    font-size: 16px;
    font-weight: 500;
  }
`;

const SidePanel = () => {
  return (
    <SidePanelStyled>
      <QueueHeader>
        <h2>Queue</h2>
      </QueueHeader>
      <PlayerQueue />
    </SidePanelStyled>
  );
};

export default SidePanel;
