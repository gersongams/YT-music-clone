import React from "react";
import styled from "styled-components";
import { MdPause, MdPlayArrow, MdVolumeUp } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "../store/reducers";

export interface StyledPlayerImageButtonProps {
  hovered?: boolean | undefined;
  selected: boolean;
}

const StyledPlayerImageButton = styled.div<StyledPlayerImageButtonProps>`
  display: flex;
  width: 32px;
  height: 32px;
  margin-right: 16px;
  cursor: pointer;
  position: relative;
  img {
    width: 100%;
    height: auto;
  }
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: ${(props) =>
      props.hovered || props.selected ? "rgba(0,0,0,0.5)" : "transparent"};
  }
  .status-icon {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  img:after {
    content: "";
    display: block;
    height: 100%;
    width: 100%;
    opacity: 0;
    background: rgba(0, 0, 0, 0.5);
    -moz-transition: all 1s;
    -webkit-transition: all 1s;
    transition: all 1s;
  }

  img:hover:after {
    opacity: 1;
  }
`;

interface PlayerImageButtonProps {
  id: string;
  albumImage: string;
  playHandler: (id: string) => void;
  hovered?: boolean | undefined;
  selected: boolean;
}

const PlayerImageButton: React.FC<PlayerImageButtonProps> = ({
  selected,
  hovered,
  id,
  albumImage,
  playHandler,
}: PlayerImageButtonProps) => {
  const { playerStatus } = useSelector((state: RootState) => {
    return {
      playerStatus: state.playList.status,
    };
  });

  const renderState = () => {
    if (selected && hovered && playerStatus === "LISTENING") {
      return (
        <>
          <MdPause style={{ color: "white", fontSize: 24 }} />
        </>
      );
    }
    if (selected && playerStatus === "LISTENING") {
      return (
        <>
          <MdVolumeUp style={{ color: "white", fontSize: 24 }} />
        </>
      );
    }
    if (
      (hovered || selected) &&
      (playerStatus === "LISTENING" ||
        playerStatus === "PAUSE" ||
        playerStatus === "IDLE")
    ) {
      return (
        <>
          <MdPlayArrow style={{ color: "white", fontSize: 24 }} />
        </>
      );
    }
  };

  return (
    <StyledPlayerImageButton
      selected={selected}
      hovered={hovered}
      onClick={() => playHandler(id)}
    >
      <img src={albumImage} alt="" />
      <div className="overlay" />
      <span className="status-icon">{renderState()}</span>
    </StyledPlayerImageButton>
  );
};

export default PlayerImageButton;
