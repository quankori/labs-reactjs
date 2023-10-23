import { Container } from "@mui/material";
import { Footer, Header } from "../components";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "../routers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <ToastContainer limit={1} />
      <Header />
      <Container>
        <RouterProvider router={router}></RouterProvider>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
