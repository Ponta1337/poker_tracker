import React, { useEffect } from "react";
import "./About.css";

function About() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="about-container">
      <p>
        The main idea is to provide a social media platform for poker players.{" "}
      </p>
      <p>Keep track and share your results with friends!</p>
    </div>
  );
}

export default About;
