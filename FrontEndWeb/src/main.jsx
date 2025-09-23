import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Header from "./components/shared/Header.jsx";
import Hero from "./components/landing/Hero.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Header />
    <Hero />
  </StrictMode>
);
