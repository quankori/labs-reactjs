import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home";
import { Detail } from "./pages/detail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/:id",
    element: <Detail />,
  },
]);
