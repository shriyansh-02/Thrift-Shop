import React from 'react';
import { Link } from "react-router-dom";
import './Footer.css';

function Footer() {
  return (
    <div className="footerParentDiv">
      <div className="content">
        <div>
          <div className="heading">
            <p>POPULAR LOCATIONS</p>
          </div>
          <div className="list">
            <ul>
              <li>Kanpur</li>
              <li>Lucknow</li>
              <li>Noida</li>
              <li>Delhi</li>
              <li>Agra</li>
              <li>Varanasi</li>
              <li>Prayagraj</li>
              
            </ul>
          </div>
        </div>
        <div>

          <div className="list">
            <ul>
               <li><Link to="/about">About Us</Link></li>
               <li><Link to="/contactus">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        <div>

          <div className="list">
            <ul>
              <li>Help</li>
              <li>Sitemap</li>
              <li>Legal & Privacy information</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
