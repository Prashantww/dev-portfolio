import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../sections/Hero";
import Intro from "../../sections/Intro";

const Home = () => {
  return (
    <>
      <Hero />
      <Intro />
      <div style={{ width: "100%", height: "100vh", background: "#0a0a0a" }} />
    </>
  );
};

export default Home;
