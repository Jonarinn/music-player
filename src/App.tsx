import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.scss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import Root from "./layouts/Root";
import Artists from "./pages/Artists/Artists";
import Artist from "./pages/Artists/Artist";

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
        element: <Artists />,
        children: [
          {
            path: ":id",
            element: <Artist />,
          },
        ],
      },
    ],
  },
]);

function App() {
  const [count, setCount] = useState(0);

  return <RouterProvider router={router} />;
}

export default App;
