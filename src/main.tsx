import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import AppContextProvider from "./context/AppContext.tsx";

createRoot(document.getElementById("root")!).render(
  // BrowserRouter is added to provide support of react-router-dom into project
  <BrowserRouter>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </BrowserRouter>
);
