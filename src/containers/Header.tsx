import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import LogoMobile from "../assets/logo-mobile.webp";
import HomeIcon from "@material-ui/icons/Home";
import ExploreIcon from "@material-ui/icons/Explore";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import SearchIcon from "@material-ui/icons/Search";
import Avatar from "@material-ui/core/Avatar";

const StyledHeader = styled.header`
  height: 64px;
  padding: 8px 32px 8px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.color.headerBackground};

  .logo {
    img {
      display: block;
      height: 24px;
    }
  }
`;

const StyledNav = styled.nav`
  display: flex;
  ul {
    display: flex;
    list-style: none;
  }
  li {
    margin: 0 24px;
    display: flex;
    align-items: center;
    &:last-child {
      margin: 0;
    }
  }
  .icon {
    padding: 12px 16px;
    display: none;
    svg {
      color: #ffffff80;
    }
    &--visible {
      display: flex;
    }
  }
  a {
    color: ${({ theme }) => theme.color.grayText};
    font-size: ${({ theme }) => theme.fontSize.navFontSize};
    text-decoration: none;
    display: flex;
    align-items: center;
    &:hover {
      color: ${({ theme }) => theme.color.text};
    }
  }
  @media (orientation: portrait) and (max-width: 900px) {
    li {
      margin: 0;
    }
    .icon {
      display: flex;
      padding: 0;
      margin: 0 16px;
    }
    a {
      .linkText {
        display: none;
      }
    }
  }
`;

const Header = () => {
  return (
    <StyledHeader>
      <div className="logo">
        <picture>
          <source media={"(max-width: 900px)"} srcSet={LogoMobile} />
          <img alt="logo" src={Logo} />
        </picture>
      </div>
      <StyledNav>
        <ul>
          <li>
            <Link to="/">
              <span className="icon">
                <HomeIcon />
              </span>
              <span className="linkText">Home</span>
            </Link>
          </li>
          <li>
            <Link to="#">
              <span className="icon">
                <ExploreIcon />
              </span>
              <span className="linkText">Explore</span>
            </Link>
          </li>
          <li>
            <Link to="#">
              <span className="icon">
                <LibraryMusicIcon />
              </span>
              <span className="linkText">Library</span>
            </Link>
          </li>
          <li>
            <Link to="#">
              <span className="icon icon--visible">
                <SearchIcon />
              </span>
              <span className="linkText">Search</span>
            </Link>
          </li>
        </ul>
      </StyledNav>
      <div>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      </div>
    </StyledHeader>
  );
};

export default Header;
