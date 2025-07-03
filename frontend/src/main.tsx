import {
  RouterProvider,
} from "react-router";

import ReactDOM from "react-dom/client";
import { router } from "./router";

import { createTheme, ThemeProvider } from '@mui/system';

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      contrastText: 'white',
    },
    box: {
      backgroundColor: "rosybrown",
      small: {
        height: "min-content",
        width: "100vw",
      },
      large: {
        height: "100vh",
        width: "min-content",
      }
    }
  },
});

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(
  <ThemeProvider theme={customTheme}>
    <RouterProvider router={router} />
  </ThemeProvider>
);