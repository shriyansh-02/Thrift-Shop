import React from "react";
import "./about.css";
function About() {
  return (
    <>
     
      <h1 className="heading">About Us</h1>
      <p className="paragraph">Welcome to our Thrift Shop application! We are a team of passionate individuals dedicated to providing quality products/services.</p>
      <h2 className="subHeading">Our Mission</h2>
      <p className="paragraph">"Our mission at "Thrift Shop" is to promote sustainability, affordability, and community engagement 
      through the sale of gently used goods. We aim to provide our customers with access to high-quality items at affordable prices while 
      reducing waste and promoting eco-conscious consumerism. By offering a diverse selection of pre-loved Shoes,clothing, watches and household items, 
      we strive to create a welcoming space where everyone can shop sustainably and contribute to a more environmentally friendly future. Additionally,
      we are committed to giving back to the community by supporting local charities and initiatives. Together, let's build a better world, one thrifted 
      treasure at a time.".</p>
      <h2 className="subHeading">Our Team</h2>
      <ul className="list">
      <li className="listItem">Shriyansh Singh</li>
        <li className="listItem">Shreyash Gupta</li>
        <li className="listItem">Satvik Agnihotri</li>
        <li className="listItem">Vaibhav Shukla</li>
        </ul>
       
    </>
  );
}

export default About;
