import React from "react";
import emailjs from "emailjs-com";
import "./contactUS.css";

function ContactUs() {
  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "YOUR_SERVICE_ID",   // Replace with your EmailJS service ID
        "YOUR_TEMPLATE_ID",  // Replace with your EmailJS template ID
        e.target,
        "YOUR_PUBLIC_KEY"    // Replace with your EmailJS public key
      )
      .then(
        (result) => {
          alert("Message sent successfully!");
        },
        (error) => {
          alert("Oops! Something went wrong, please try again later.");
        }
      );
  }

  return (
    <div className="container">
      <h1 className="heading">Contact Us</h1>

      <form onSubmit={sendEmail} className="contactForm">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="formInput"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          className="formInput"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          required
          className="formTextarea"
        />
        <button type="submit" className="formButton">
          Send
        </button>
      </form>
    </div>
  );
}

export default ContactUs;
