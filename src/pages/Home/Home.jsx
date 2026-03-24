import React from "react";
import Hero from "../../sections/Hero";
import Intro from "../../sections/Intro";

const Home = () => {
  return (
    <>
      <section data-theme="dark" style={{ background: "#0a0a0a" }}>
        <Hero />
      </section>
      <section data-theme="light" style={{ background: "#f5f5f5" }}>
        <Intro />
      </section>
    </>
  );
};

export default Home;
