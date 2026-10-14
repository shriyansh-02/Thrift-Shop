import React from 'react';
import { useHistory } from 'react-router-dom';

function Footer({ selectedLocation, setSelectedLocation }) {
  const history = useHistory();
  const popularLocations = ["Kanpur", "Lucknow", "Noida", "Delhi", "Agra", "Varanasi", "Prayagraj", "All India"];

  const handleLocationClick = (loc) => {
    if (setSelectedLocation) {
      setSelectedLocation(loc);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navigateTo = (path) => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    history.push(path);
  };

  return (
    <div style={{ backgroundColor: '#eef3f4', padding: '40px 20px', marginTop: '40px', borderTop: '1px solid #ddd' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', maxWidth: '1200px', margin: '0 auto', gap: '20px' }}>
        
        {/* Popular Locations Column */}
        <div style={{ minWidth: '200px' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '15px', color: '#002f34', fontSize: '18px' }}>
            POPULAR LOCATIONS
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {popularLocations.map((loc) => (
              <span
                key={loc}
                onClick={() => handleLocationClick(loc)}
                style={{
                  color: selectedLocation === loc ? '#002f34' : '#555',
                  fontSize: '14px',
                  cursor: 'pointer',
                  fontWeight: selectedLocation === loc ? 'bold' : 'normal',
                  textDecoration: selectedLocation === loc ? 'underline' : 'none'
                }}
              >
                • {loc}
              </span>
            ))}
          </div>
        </div>

        {/* Links Column 1 */}
        <div style={{ minWidth: '200px', marginTop: '33px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span onClick={() => navigateTo('/about')} style={{ color: '#0066c0', fontSize: '14px', cursor: 'pointer' }}>• About Us</span>
            <span onClick={() => navigateTo('/contact')} style={{ color: '#0066c0', fontSize: '14px', cursor: 'pointer' }}>• Contact Us</span>
          </div>
        </div>

        {/* Links Column 2 */}
        <div style={{ minWidth: '200px', marginTop: '33px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span onClick={() => navigateTo('/help')} style={{ color: '#555', fontSize: '14px', cursor: 'pointer' }}>• Help</span>
            <span onClick={() => navigateTo('/sitemap')} style={{ color: '#555', fontSize: '14px', cursor: 'pointer' }}>• Sitemap</span>
            <span onClick={() => navigateTo('/legal')} style={{ color: '#555', fontSize: '14px', cursor: 'pointer' }}>• Legal & Privacy information</span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Footer;