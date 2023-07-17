import { useContext, createContext, useState, useEffect } from "react";
import "./App.scss";
import {
  RouterProvider,
  createBrowserRouter,
  LoaderFunctionArgs,
  RouteObject,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Root from "./layouts/Root";
import Artists from "./pages/Artists/Artists";
import Artist from "./pages/Artists/Artist";
import { APIController } from "./data/functions";
import Search from "./pages/Search/Search";
import Album from "./pages/Album/Album";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import { TokenContext } from "./context";
import { loadAlbum, loadArtist } from "./loaderFunctions";

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
            loader: loadAlbum,
          },
        ],
      },
      {
        path: "artist",

        children: [
          {
            index: true,
            element: <Artists />,
          },
          {
            path: ":artistId",
            element: <Artist />,
            loader: loadArtist,
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
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccessToken = async () => {
      const token = await APIController.getToken();
      setAccessToken(token);
    };

    fetchAccessToken();
  }, []);

  useEffect(() => {
    if (!accessToken) return;
    APIController.setAccessToken(accessToken);
  }, [accessToken]);
  return (
    <TokenContext.Provider value={accessToken}>
      <RouterProvider router={router} />
    </TokenContext.Provider>
  );
}

export default App;
