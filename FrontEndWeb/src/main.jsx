import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Header from "./components/shared/Header.jsx";
import Hero from "./components/landing/Hero.jsx";
import About from "./components/landing/About.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Header />
    <Hero />
    <About />
  </StrictMode>
);
