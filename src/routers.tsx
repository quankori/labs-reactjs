import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { Detail } from "./pages/Detail";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { path: "", element: <Home /> },
      {
        path: "/:id",
        element: <Detail />,
      },
    ],
  },
  {
    path: "404",
    element: <NotFound />,
  },
]);
