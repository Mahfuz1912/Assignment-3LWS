import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ShopProvider } from "./context/ShopContext";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ShopProvider>
      <App />
    </ShopProvider>
  </StrictMode>
);
