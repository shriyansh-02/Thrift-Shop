import React from 'react';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';

function LegalPrivacy() {
  return (
    <div>
      <Header />
      {/* Changed padding to add 120px of solid space at the top */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '120px 20px 40px 20px', minHeight: '50vh', color: '#002f34' }}>
        <h1 style={{ marginTop: '0' }}>Legal & Privacy Information</h1>
        <div style={{ marginTop: '20px' }}>
          <h3>Terms of Service</h3>
          <p style={{ marginBottom: '15px' }}>By using Thrift Shop, you agree to post accurate information and refrain from selling prohibited, illegal, or counterfeit items. Thrift Shop acts solely as an intermediary platform connecting buyers and sellers. We are not responsible for the quality, safety, or legality of the items listed.</p>
          
          <h3>Privacy Policy</h3>
          <p>We respect your privacy. Your personal information, including email and phone numbers, is used solely to facilitate platform transactions. We do not sell your personal data to third-party marketing companies.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default LegalPrivacy;