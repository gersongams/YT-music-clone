import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../store/reducers";
import { get } from "lodash";
import IconButton from "@material-ui/core/IconButton";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbDownOutlinedIcon from "@material-ui/icons/ThumbDownOutlined";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";

const StyledControlsMiddle = styled.div`
  grid-area: middle;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    height: 40px;
    width: auto;
  }
  @media (orientation: portrait) and (max-width: 900px) {
    justify-content: flex-start;
    img {
      display: none;
    }
  }
`;

const SongInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 8px 0 16px;

  div {
    font-size: 16px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  div:nth-child(1) {
    font-weight: 500;
    color: ${({ theme }) => theme.color.text};
  }

  div:nth-child(2) {
    font-weight: 400;
    color: ${({ theme }) => theme.color.secondaryText};
  }

  @media (orientation: portrait) and (max-width: 900px) {
    margin: 0 8px 0 8px;
    div {
      font-size: 14px;
    }
  }
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    svg {
      //color: white;
      color: ${({ theme }) => theme.color.secondaryText};
    }
  }
  @media (orientation: portrait) and (max-width: 900px) {
    display: none;
  }
`;

const SongMenu = styled.div`
  span {
    svg {
      color: ${({ theme }) => theme.color.secondaryText};
    }
  }
`;

const ControlsMiddle = () => {
  const { selectedSong } = useSelector((state: RootState) => {
    return {
      selectedSong: state.playList.selectedSong,
    };
  });

  return (
    <StyledControlsMiddle>
      <img src={get(selectedSong, "albumImage", "")} alt="album-cover" />
      <SongInfo>
        <div>{get(selectedSong, "songName", "")}</div>
        <div>{get(selectedSong, "artist", "")}</div>
      </SongInfo>
      <ActionButtons>
        <span>
          <IconButton>
            {1 ? <ThumbDownOutlinedIcon /> : <ThumbDownAltIcon />}
          </IconButton>
        </span>
        <span>
          <IconButton>
            {1 ? <ThumbUpAltOutlinedIcon /> : <ThumbUpAltIcon />}
          </IconButton>
        </span>
      </ActionButtons>
      <SongMenu>
        <span>
          <IconButton>
            <MoreVertOutlinedIcon />
          </IconButton>
        </span>
      </SongMenu>
    </StyledControlsMiddle>
  );
};

export default ControlsMiddle;
