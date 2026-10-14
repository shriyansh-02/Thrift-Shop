import React from 'react';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';

function ContactUs() {
  return (
    <div>
      <Header />
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '120px 20px 40px 20px', minHeight: '50vh', color: '#002f34' }}>
        <h1 style={{ marginTop: '0' }}>Contact Us</h1>
        <p>Need assistance? We are here to help!</p>
        <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
          <p><strong>📍 Office Address:</strong> Thrift Shop HQ, Kanpur, Uttar Pradesh, India</p>
          <p><strong>📧 Email:</strong> support@thriftshop.in</p>
          <p><strong>📞 Phone:</strong> +91 98765 43210</p>
          <p><strong>🕒 Business Hours:</strong> Monday - Saturday (9:00 AM - 6:00 PM)</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default ContactUs;