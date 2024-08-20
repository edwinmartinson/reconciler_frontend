import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppContextProvider } from "./context/AppContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./assets/base.scss";
import "./assets/typography.scss";
import "./main.scss";

import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Home />
      </>
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
