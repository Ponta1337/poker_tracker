import React, { useEffect } from "react";
import "./Contact.css";

function Contact() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="contact-container">
      <h4>Email: pontus.animmer@gmail.com</h4>
    </div>
  );
}

export default Contact;
