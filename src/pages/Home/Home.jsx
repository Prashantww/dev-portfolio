import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../sections/Hero";
import Intro from "../../sections/Intro";
import FeaturedWork from "../../sections/FeaturedWork/FeaturedWork";

const Home = () => {
  return (
    <>
      <Hero />
      <Intro />
      <FeaturedWork />
      <div style={{ width: "100%", height: "100vh", background: "#ffffff" }} />
    </>
  );
};

export default Home;
