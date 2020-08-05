export const theme = {
  fontFamily: "'Roboto', sans-serif",
  color: {
    background: "#000000",
    text: "#ffffff",
    secondaryText: "#AAAAAA",
    grayText: "#ffffff80",
    scrollbar: "#5f5f5f",
    headerBackground: "#1d1d1d",
    playerColor: "#212121",
    controlColor: "#909090",
  },
  spacing: {
    xs: "8px",
    g: "22px",
    l: "32px",
    xl: "56px",
  },
  fontSize: {
    navFontSize: "20px",
    normal: "14px",
    small: "12px",
  },
  border: {
    normalBorder: "1px solid rgba(255,255,255,0.3)",
    thickDivider: "1px solid rgba(255,255,255,0.1)",
  },
};

export type ThemeType = typeof theme;
