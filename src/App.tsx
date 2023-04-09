import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.scss";
import {
  RouterProvider,
  createBrowserRouter,
  Params,
  LoaderFunctionArgs,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Root from "./layouts/Root";
import Artists from "./pages/Artists/Artists";
import Artist from "./pages/Artists/Artist";
import { getArtist } from "./data/functions";
import { AsyncLoader } from "../types";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "about",
        element: <h1>About</h1>,
      },
      {
        path: "artists",

        children: [
          {
            index: true,
            element: <Artists />,
          },
          {
            path: ":artistId",
            element: <Artist />,
            loader: async ({ params }: LoaderFunctionArgs) => {
              const { artistId } = params;
              if (!artistId) return console.log("no artistId");
              return await getArtist(artistId);
            },
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
