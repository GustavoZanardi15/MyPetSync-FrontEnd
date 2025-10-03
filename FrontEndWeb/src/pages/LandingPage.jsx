import SharedHeader from "../components/shared/SharedHeader";
import Hero from "../components/landing/Hero";
import About from "../components/landing/About";
import Features from "../components/landing/Features";
import Providers from "../components/landing/Providers";
import Footer from "../components/shared/Footer";

const LandingPage = () => {
  return (
    <>
      <SharedHeader />
      <Hero />
      <About />
      <Features />
      <Providers />
      <Footer />
    </>
  );
};

export default LandingPage;
