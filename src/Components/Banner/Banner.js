import React from 'react';
import './Banner.css'; 

function Banner({ selectedCategory, setSelectedCategory, selectedLocation, setSelectedLocation }) {
  const categories = ["ALL", "Men", "Women", "Kids", "Gadgets", "Books"];
  // Matched exactly to your Footer locations
  const popularLocations = ["All India", "Kanpur", "Lucknow", "Noida", "Delhi", "Agra", "Varanasi", "Prayagraj"];

  return (
    <div className="bannerParentDiv" style={{ borderBottom: '1px solid #ddd', backgroundColor: '#fff', padding: '10px 0' }}>
      <div className="bannerChildDiv" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        {/* Popular Locations Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflowX: 'auto', whiteSpace: 'nowrap' }}>
          <span style={{ fontWeight: 'bold', color: '#002f34', fontSize: '14px', marginRight: '5px' }}>📍 Popular Locations:</span>
          {popularLocations.map((loc) => (
            <span
              key={loc}
              onClick={() => setSelectedLocation && setSelectedLocation(loc)}
              style={{
                cursor: 'pointer',
                fontSize: '13px',
                color: selectedLocation === loc ? '#fff' : '#002f34',
                backgroundColor: selectedLocation === loc ? '#002f34' : '#eef3f4',
                padding: '4px 14px',
                borderRadius: '16px',
                fontWeight: selectedLocation === loc ? 'bold' : 'normal',
                transition: 'all 0.2s ease'
              }}
            >
              {loc}
            </span>
          ))}
        </div>

        {/* Category Tabs */}
        <div className="menu" style={{ display: 'flex', gap: '20px', overflowX: 'auto', whiteSpace: 'nowrap', paddingTop: '5px' }}>
          {categories.map((cat) => (
            <span
              key={cat}
              onClick={() => setSelectedCategory && setSelectedCategory(cat)}
              style={{
                cursor: 'pointer',
                fontWeight: selectedCategory === cat ? 'bold' : 'normal',
                color: selectedCategory === cat ? '#002f34' : '#555',
                borderBottom: selectedCategory === cat ? '3px solid #002f34' : '3px solid transparent',
                paddingBottom: '5px',
                fontSize: '15px'
              }}
            >
              {cat === "ALL" ? "All Categories" : cat}
            </span>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Banner;