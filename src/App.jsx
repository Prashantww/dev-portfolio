import Lenis from "lenis";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  useEffect(() => {
    const lenis = new Lenis();

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
