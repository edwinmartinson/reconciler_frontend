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
import Issues from "./pages/Issues/Issues";
import U404 from "./pages/Utility/404";
import Error from "./pages/Utility/Error";
import Dev from "./pages/Utility/Dev";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppWrapper hideHeader={false}>
        <Dev page={"Login"} />
      </AppWrapper>
    ),
    errorElement: <Error />,
  },
  {
    path: "/source",
    element: (
      <AppWrapper hideHeader={false}>
        <Source />
      </AppWrapper>
    ),
    errorElement: <Error />,
  },
  {
    path: "/issues",
    element: (
      <AppWrapper hideHeader={false}>
        <Issues />
      </AppWrapper>
    ),
    errorElement: <Error />,
  },
  {
    path: "/archive",
    element: (
      <AppWrapper hideHeader={false}>
        <Dev page={"Archive"} />
      </AppWrapper>
    ),
    errorElement: <Error />,
  },
  {
    path: "/config",
    element: (
      <AppWrapper hideHeader={false}>
        <Dev page={"Config"} />
      </AppWrapper>
    ),
    errorElement: <Error />,
  },
  {
    path: "*",
    element: (
      <AppWrapper hideHeader={false}>
        <U404 />
      </AppWrapper>
    ),
    errorElement: <Error />,
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
