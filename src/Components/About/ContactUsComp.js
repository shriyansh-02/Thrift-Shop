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

      {/* Team members with clickable email links */}
      <ul className="list">
        <li className="listItem">
          Shriyansh Singh —{" "}
          <a href="mailto:shriyanshsingh352@gmail.com" className="emailLink">
            shriyanshsingh352@gmail.com
          </a>
        </li>
        <li className="listItem">
          Shreyash Gupta —{" "}
          <a href="mailto:shreyashgupta01@gmail.com" className="emailLink">
            shreyashgupta01@gmail.com
          </a>
        </li>
        <li className="listItem">
          Satvik Agnihotri —{" "}
          <a href="mailto:satvikagni2020@gmail.com" className="emailLink">
            satvikagni2020@gmail.com
          </a>
        </li>
        <li className="listItem">
          Vaibhav Shukla —{" "}
          <a href="mailto:vaibhavshukla052003@gmail.com" className="emailLink">
            vaibhavshukla052003@gmail.com
          </a>
        </li>
      </ul>

      {/* General contact form */}
      <h2 className="subHeading">Or Send Us a Message</h2>
      <form onSubmit={sendEmail} className="contactForm">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="formInput"
        />
        <br></br>
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          className="formInput"
        />
        <br></br>
        <textarea
          name="message"
          placeholder="Your Message"
          required
          className="formTextarea"
        /><br></br>
        <button type="submit" className="formButton">
          Send
        </button>
      </form>
    </div>
  );
}

export default ContactUs;
