import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppContextProvider } from "./context/AppContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./assets/base.scss";
import "./assets/typography.scss";
import "./assets/layout.scss";
import "./assets/components.scss";

import AppWrapper from "./AppWrapper";
import Source from "./pages/Source/Source";
import Auth from "./pages/Auth/Auth";
import Issues from "./pages/Issues/Issues";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppWrapper hideHeader={true}>
        <Auth />
      </AppWrapper>
    ),
  },
  {
    path: "/source",
    element: (
      <AppWrapper hideHeader={false}>
        <Source />
      </AppWrapper>
    ),
  },
  {
    path: "/issues",
    element: (
      <AppWrapper hideHeader={false}>
        <Issues />
      </AppWrapper>
    ),
  },
]);

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <AppContextProvider>
      <RouterProvider router={router} />
    </AppContextProvider>
  </StrictMode>,
);
