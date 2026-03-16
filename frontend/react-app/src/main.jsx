import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { CurrentPageProvider } from "./contexts/CurrentPageContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CurrentPageProvider>
        <App />
      </CurrentPageProvider>
    </BrowserRouter>
  </StrictMode>
);
