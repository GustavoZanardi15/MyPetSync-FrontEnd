import Hero from "./Hero.jsx";
import Features from "./Features.jsx";
import Footer from "../shared/Footer.jsx";
import Header from "../shared/Header.jsx";
import About from "./About.jsx";
import Providers from "./Providers.jsx";

const LandingPage = () => {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Features />
      <Providers />
      <Footer />
    </>
  );
};

export default LandingPage;
