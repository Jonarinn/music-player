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
import { getAlbum, getArtist } from "./data/functions";
import Search from "./pages/Search/Search";
import Album from "./pages/Album/Album";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";

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
        path: "search",
        element: <Search />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "album",
        children: [
          {
            path: ":albumId",
            element: <Album />,
            loader: async ({ params }: LoaderFunctionArgs) => {
              const { albumId } = params;
              if (!albumId) return console.log("no albumId");
              return await getAlbum(albumId);
            },
          },
        ],
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
      {
        path: "library",
        element: <div>Library</div>,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
