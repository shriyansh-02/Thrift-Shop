import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';

function Sitemap() {
  const history = useHistory();
  return (
    <div>
      <Header />
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '120px 20px 40px 20px', minHeight: '50vh', color: '#002f34' }}>
        <h1 style={{ marginTop: '0' }}>Sitemap</h1>
        <ul style={{ lineHeight: '2', fontSize: '18px' }}>
          <li><span onClick={() => history.push('/')} style={{ cursor: 'pointer', color: '#0066c0' }}>Home</span></li>
          <li><span onClick={() => history.push('/login')} style={{ cursor: 'pointer', color: '#0066c0' }}>Login</span></li>
          <li><span onClick={() => history.push('/signup')} style={{ cursor: 'pointer', color: '#0066c0' }}>Signup</span></li>
          <li><span onClick={() => history.push('/create')} style={{ cursor: 'pointer', color: '#0066c0' }}>Sell an Item</span></li>
          <li><span onClick={() => history.push('/about')} style={{ cursor: 'pointer', color: '#0066c0' }}>About Us</span></li>
          <li><span onClick={() => history.push('/contact')} style={{ cursor: 'pointer', color: '#0066c0' }}>Contact Us</span></li>
        </ul>
      </div>
      <Footer />
    </div>
  );
}
export default Sitemap;