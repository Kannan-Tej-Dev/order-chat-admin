import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import { store } from "./app/store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <ToastContainer position="top-right" autoClose={3000} />

    <Provider store={store}>
      <BrowserRouter basename="/admin">
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);