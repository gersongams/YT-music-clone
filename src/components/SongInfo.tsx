import React from "react";
import styled from "styled-components";

const StyledSongInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

interface SongInfoProps {
  id: string;
  artist: string;
  songName: string;
}

const SongInfo: React.FC<SongInfoProps> = ({
  id,
  artist,
  songName,
}: SongInfoProps) => {
  return (
    <StyledSongInfo>
      <div>{artist}</div>
      <div>{songName}</div>
    </StyledSongInfo>
  );
};

export default SongInfo;
