import React from 'react';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';

function Help() {
  return (
    <div>
      <Header />
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '120px 20px 40px 20px', minHeight: '50vh', color: '#002f34' }}>
        <h1 style={{ marginTop: '0' }}>Help & FAQs</h1>
        <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h3>How do I buy an item?</h3>
            <p>Browse products, click on the item you like, and use the "Show Phone Number" or "Chat on WhatsApp" button to directly contact the seller and negotiate.</p>
          </div>
          <div>
            <h3>How do I sell an item?</h3>
            <p>Create an account, click the "+ SELL" button at the top right, fill in your product details, upload an image, and post it live instantly.</p>
          </div>
          <div>
            <h3>Is my phone number secure?</h3>
            <p>Only verified users who click to reveal your number can see it. We recommend using WhatsApp for safe communication.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Help;