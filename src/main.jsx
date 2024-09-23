import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppContextProvider } from "./context/AppContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./assets/base.scss";
import "./assets/typography.scss";
import "./assets/layout.scss";
import "./assets/components.scss";

import AppWrapper from "./components/AppWrapper";
import Manual from "./pages/Manual";
import U404 from "./pages/404";
import Error from "./pages/Error";
import Dev from "./pages/Dev";
import Trans from "./pages/Trans";
import Dashboard from "./pages/Dashboard";

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
    path: "/dashboard",
    element: (
      <AppWrapper hideHeader={false}>
        <Dashboard />
      </AppWrapper>
    ),
    errorElement: <Error />,
  },
  {
    path: "/pending",
    element: (
      <AppWrapper hideHeader={false}>
        <Trans key={"pending"} transState={"source"} />
      </AppWrapper>
    ),
    errorElement: <Error />,
  },
  {
    path: "/outstanding",
    element: (
      <AppWrapper hideHeader={false}>
        <Manual />
      </AppWrapper>
    ),
    errorElement: <Error />,
  },
  {
    path: "/reconciled",
    element: (
      <AppWrapper hideHeader={false}>
        <Trans key={"reconciled"} transState={"archive"} />
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
    path: "/report",
    element: (
      <AppWrapper hideHeader={false}>
        <Dev page={"Report"} />
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
