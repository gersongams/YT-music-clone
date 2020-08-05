import React, { useCallback, useContext } from "react";
import styled from "styled-components";
import { Slider } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PlayerContext from "../lib/context";
import { useSelector } from "react-redux";
import { RootState } from "../store/reducers";

const StyledProgressBar = styled.div`
  position: absolute;
  top: -25px;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 15px 0;
  @media (orientation: portrait) and (max-width: 900px) {
    top: -18px;
    padding: 0;
  }
`;

const YTMusicSlider = withStyles({
  root: {
    color: "#f00",
    height: 2,
  },
  thumb: {
    height: 16,
    width: 16,
    backgroundColor: "#f00",
    marginTop: -6,
    marginLeft: -8,
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

const ProgressBar = () => {
  const songPlayer = useContext(PlayerContext);
  const actualTime = useSelector(
    (state: RootState) => state.playList.actualTime
  );

  const handleChange = (event: any, newValue: any) => {
    songPlayer.seek(newValue);
  };

  const getDuration = useCallback(() => {
    const duration = songPlayer.getDuration();
    if (typeof duration === "number") {
      return duration;
    }
    return 0;
  }, [songPlayer]);

  return (
    <StyledProgressBar>
      <YTMusicSlider
        value={actualTime}
        min={0}
        step={1}
        max={getDuration()}
        onChange={(e, value) => handleChange(e, value)}
      />
    </StyledProgressBar>
  );
};

export default ProgressBar;
