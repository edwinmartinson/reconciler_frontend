import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppContextProvider } from "./context/AppContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./assets/base.scss";
import "./assets/typography.scss";
import "./assets/table.scss";
import "./assets/fields.scss";
import "./main.scss";

import AppWrapper from "./AppWrapper";
import Home from "./pages/Home/Home";
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
    path: "/home",
    element: (
      <AppWrapper hideHeader={false}>
        <Home />
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
  </StrictMode>
);
