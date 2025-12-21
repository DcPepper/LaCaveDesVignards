import {
  RouterProvider,
} from "react-router";

import ReactDOM from "react-dom/client";
import { router } from "./router";

import { createTheme, ThemeProvider } from '@mui/material/styles';

// #960d34
//rgb(230, 155, 165)
// #250e62
// #0c3279
// #fff3ec
// #ffffff

// #1976d2
// #42a5f5
// #1565c0

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#0c3279',
      dark: '#250e62',
      light: '#fff3ec',
    },
    secondary: {
      main: '#d70926',
      dark: '#960d34',
      light: 'rgb(230, 155, 165)',
    },
    text: {
      primary: '#ffffff',
    },
  },
});

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(
  <ThemeProvider theme={customTheme}>
    <RouterProvider router={router} />
  </ThemeProvider>
);