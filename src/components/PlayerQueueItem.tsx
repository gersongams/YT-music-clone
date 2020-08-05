import React from "react";
import styled from "styled-components";
import PlayerImageButton from "./PlayerImageButton";
import { BsThreeDotsVertical } from "react-icons/bs";
import { PlayerQueueItemProps } from "../utils/types";
import Typography from "@material-ui/core/Typography";

const StyledPlayerQueueItem = styled.div<PlayerQueueItemProps>`
  display: flex;
  padding: 0 8px;
  height: 56px;
  min-height: 56px;
  align-items: center;
  border-bottom: ${({ theme }) => theme.border.thickDivider};
  cursor: move;
  background: ${(props) =>
    props.selected ? "rgba(255,255,255,0.1)" : "transparent"};
`;

const StyledSongInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-self: center;
  min-width: 1px;

  div {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    line-height: 19.2px;
    -webkit-font-smoothing: antialiased;
    p {
      margin-bottom: 0;
      line-height: 1.2;
      @media (orientation: portrait) and (max-width: 900px) {
        font-size: 14px;
      }
    }
  }

  div:nth-child(1) {
    color: ${({ theme }) => theme.color.text};
    margin-bottom: 4px;
    font-weight: 500;
  }

  div:nth-child(2) {
    color: ${({ theme }) => theme.color.secondaryText};
    font-weight: 400;
  }
`;

const StyledSongMenu = styled.div`
  margin-left: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  padding: 8px;
  svg {
    color: #aaaaaa;
  }
`;

const StyledSongDuration = styled.div`
  padding-left: 8px;
  color: ${({ theme }) => theme.color.secondaryText};
`;

interface SongProps {
  id: string;
  albumImage: string;
  songName: string;
  artist: string;
  duration: string;
  selected: boolean;
  playHandler: (id: string) => void;
  mouseEnterHandler: (id: string) => void;
  mouseLeaveHandler: (id: string) => void;
  hovered?: boolean | undefined;
}

const PlayerQueueItem: React.FC<SongProps> = ({
  mouseEnterHandler,
  mouseLeaveHandler,
  playHandler,
  id,
  albumImage,
  artist,
  duration,
  songName,
  selected,
  hovered,
}: SongProps) => {
  return (
    <StyledPlayerQueueItem
      onMouseEnter={() => mouseEnterHandler(id)}
      onMouseLeave={() => mouseLeaveHandler(id)}
      selected={selected}
    >
      <PlayerImageButton
        selected={selected}
        hovered={hovered}
        playHandler={playHandler}
        id={id}
        albumImage={albumImage}
      />
      <StyledSongInfo>
        <div>
          <Typography variant="body1" gutterBottom>
            {songName}
          </Typography>
        </div>
        <div>
          <Typography variant="body1" gutterBottom>
            {artist}
          </Typography>
        </div>
      </StyledSongInfo>
      <StyledSongMenu>
        {hovered && (
          <span>
            <BsThreeDotsVertical />
          </span>
        )}
      </StyledSongMenu>
      <StyledSongDuration>{duration}</StyledSongDuration>
    </StyledPlayerQueueItem>
  );
};

export default PlayerQueueItem;
