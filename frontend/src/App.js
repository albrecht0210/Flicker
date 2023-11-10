import { CssBaseline, ThemeProvider } from "@mui/material";
import darkTheme from "./theme/darkTheme";
import UrlPaths from "./router";

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <UrlPaths />
    </ThemeProvider>
  );
}

export default App;
