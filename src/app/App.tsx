import { Container } from "@mui/material";
import { Footer, Header } from "../components";
import "./App.css";
import { Home } from "../pages/Home";

function App() {
  return (
    <div>
      <Header />
      <Container>
        <Home />
      </Container>
      <Footer />
    </div>
  );
}

export default App;
