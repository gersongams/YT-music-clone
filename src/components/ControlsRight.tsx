import React, { useContext, useState } from "react";
import styled from "styled-components";
import {
  MdArrowDropDown,
  MdRepeat,
  MdShuffle,
  MdVolumeMute,
  MdVolumeUp,
} from "react-icons/md";
import { Slider } from "@material-ui/core";
import PlayerContext from "../lib/context";
import { withStyles } from "@material-ui/core/styles";
import { usePrevious } from "../hooks/usePrevious";

const StyledControlsRight = styled.div`
  width: 292px;
  flex: none;
  display: flex;
  align-items: center;
  grid-area: end;
  justify-self: end;
  position: relative;
  justify-content: flex-end;
  margin: 0 16px 0 0;
  .controls {
    display: flex;
    align-items: center;
    & > span {
      margin-right: 8px;
      padding: 8px;
      & > svg {
        font-size: 24px;
        fill: ${({ theme }) => theme.color.controlColor};
      }
    }
  }
  .toggle-player {
    display: flex;
    align-items: center;
    padding: 8px;
    svg {
      font-size: 32px;
      fill: ${({ theme }) => theme.color.text};
    }
  }
  @media (orientation: portrait) and (max-width: 900px) {
    width: 56px;
    margin: 0;
    .controls {
      display: none;
    }
  }
`;

const VolumeContainer = styled.div`
  width: 100px;
  padding: 0 16px;
`;

const VolumeSlider = withStyles({
  root: {
    color: "white",
    height: 2,
  },
  thumb: {
    height: 12,
    width: 12,
    backgroundColor: "white",
    marginTop: -6,
    marginLeft: -6,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  track: {
    height: 2,
    borderRadius: 0,
  },
  rail: {
    height: 2,
    borderRadius: 0,
    backgroundColor: "#bfbfbf",
  },
})(Slider);

interface ControlsProps {
  playerBarHovered?: boolean | undefined;
}

const ControlsRight: React.FC<ControlsProps> = ({ playerBarHovered }) => {
  const songPlayer = useContext(PlayerContext);
  const [volumeHovered, setVolumeHovered] = useState(false);
  const [volume, setVolume] = useState(50);
  const prevVolume = usePrevious(volume);

  const mouseEnterHandler = () => {
    setVolumeHovered(true);
  };

  const muteSound = () => {
    setVolume(0);
    songPlayer.setVolume(0);
  };

  const unMute = () => {
    const previousVolume = prevVolume || 50;
    setVolume(previousVolume);
    songPlayer.setVolume(previousVolume);
  };

  const handleVolumeChange = (event: any, newValue: any) => {
    setVolume(newValue);
    songPlayer.setVolume(newValue);
  };

  return (
    <StyledControlsRight>
      <div className="controls">
        {playerBarHovered && volumeHovered ? (
          <VolumeContainer>
            <VolumeSlider
              onChange={(e, value) => handleVolumeChange(e, value)}
              min={0}
              max={100}
              step={1}
              value={volume}
            />
          </VolumeContainer>
        ) : null}
        {volume === 0 ? (
          <span
            style={{ cursor: "pointer" }}
            onClick={unMute}
            onMouseEnter={mouseEnterHandler}
          >
            <MdVolumeMute />
          </span>
        ) : (
          <span
            style={{ cursor: "pointer" }}
            onClick={muteSound}
            onMouseEnter={mouseEnterHandler}
          >
            <MdVolumeUp />
          </span>
        )}
        <span style={{ cursor: "not-allowed" }}>
          <MdRepeat />
        </span>
        <span style={{ cursor: "not-allowed" }}>
          <MdShuffle />
        </span>
      </div>
      <span style={{ cursor: "not-allowed" }} className="toggle-player">
        <MdArrowDropDown />
      </span>
    </StyledControlsRight>
  );
};

export default ControlsRight;
