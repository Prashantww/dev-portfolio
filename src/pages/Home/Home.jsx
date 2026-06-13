import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../sections/Hero";
import Intro from "../../sections/Intro";
import FeaturedWork from "../../sections/FeaturedWork/FeaturedWork";
import About from "../../sections/About/About";

const Home = () => {
  return (
    <>
      <Hero />
      <Intro />
      <FeaturedWork />
      <About />
      <div style={{ width: "100%", height: "100vh", background: "#000000" }} />
    </>
  );
};

export default Home;
