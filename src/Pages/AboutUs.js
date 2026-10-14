import React from 'react';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';

function AboutUs() {
  return (
    <div>
      <Header />
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '120px 20px 40px 20px', minHeight: '50vh', color: '#002f34' }}>
        <h1 style={{ marginTop: '0' }}>About Thrift Shop</h1>
        <p style={{ lineHeight: '1.8' }}>Welcome to Thrift Shop, your trusted community marketplace! Founded with a vision to promote sustainable consumption, we provide a seamless platform for buyers and sellers across India to connect. Whether you are looking to declutter your home or find amazing deals on pre-loved fashion, gadgets, and books, Thrift Shop ensures a safe, direct, and hassle-free experience.</p>
      </div>
      <Footer />
    </div>
  );
}
export default AboutUs;