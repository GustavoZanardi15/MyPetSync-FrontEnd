import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Header from "./components/shared/Header.jsx";
import Hero from "./components/landing/Hero.jsx";
import About from "./components/landing/About.jsx";
import Features from "./components/landing/Features.jsx";
import Providers from "./components/landing/Providers.jsx";
import Footer from "./components/shared/Footer.jsx";
import Login from "./components/auth/Login.jsx";
import RegisterCompany from "./components/auth/RegisterCompany.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Header />
    <Hero />
    <About />
    <Features />
    <Providers />
    <Footer />
  </StrictMode>
);
