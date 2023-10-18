import ReactDOM from "react-dom/client";
import App from "./app/App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./stores/stores.ts";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
