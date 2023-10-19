import { Container } from "@mui/material";
import { Footer, Header } from "../components";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "../routers";

function App() {
  return (
    <div>
      <Header />
      <Container>
        <RouterProvider router={router}></RouterProvider>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
