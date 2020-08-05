import React from "react";
import "typeface-roboto";
import { ThemeProvider } from "styled-components";
import { theme } from "./style/theme";
import { GlobalStyle } from "./style/globalStyle";
import AppRouter from "./router";
import PlayerContext from "./lib/context";
import { SoundPlayer } from "./lib/howler";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider as MaterialThemeProvider } from "@material-ui/styles";

const materialTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const App = () => {
  return (
    <MaterialThemeProvider theme={materialTheme}>
      <ThemeProvider theme={theme}>
        <PlayerContext.Provider value={new SoundPlayer()}>
          <AppRouter />
          <GlobalStyle />
        </PlayerContext.Provider>
      </ThemeProvider>
    </MaterialThemeProvider>
  );
};

export default App;
