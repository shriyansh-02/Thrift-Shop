import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Header.css'; 

function Header({ searchQuery, setSearchQuery, showMyAds, setShowMyAds }) {
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [localSearch, setLocalSearch] = useState(searchQuery || "");

  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (userString) {
      try {
        const parsedUser = JSON.parse(userString);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    if (setShowMyAds) setShowMyAds(false);
    history.push('/login');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (setSearchQuery) {
      setSearchQuery(localSearch);
    } else {
      history.push(`/?search=${encodeURIComponent(localSearch)}`);
    }
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setLocalSearch(val);
    if (setSearchQuery) {
      setSearchQuery(val);
    }
  };

  const handleLogoClick = () => {
    if (setShowMyAds) setShowMyAds(false);
    if (setSearchQuery) setSearchQuery("");
    history.push('/');
  };

  const handleMyAdsToggle = () => {
    if (setShowMyAds) {
      setShowMyAds(!showMyAds);
    } else {
      history.push('/');
    }
  };

  return (
    <div className="headerParentDiv" style={{ backgroundColor: '#f8f9fa', padding: '12px 0', borderBottom: '1px solid #ddd' }}>
      <div className="headerChildDiv" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', gap: '15px', flexWrap: 'wrap' }}>
        
        {/* Brand Logo */}
        <h2 style={{ cursor: 'pointer', margin: 0, color: '#002f34' }} onClick={handleLogoClick}>
          Thrift Shop
        </h2>

        {/* Search Input & Button */}
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', flex: 1, maxWidth: '500px' }}>
          <input
            type="text"
            placeholder="Search for shoes, jackets, gadgets..."
            value={localSearch}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '9px 14px',
              border: '2px solid #002f34',
              borderRight: 'none',
              borderRadius: '4px 0 0 4px',
              outline: 'none',
              fontSize: '14px'
            }}
          />
          <button
            type="submit"
            style={{
              padding: '9px 18px',
              backgroundColor: '#002f34',
              color: 'white',
              border: '2px solid #002f34',
              borderRadius: '0 4px 4px 0',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '14px'
            }}
          >
            Search
          </button>
        </form>
        
        {/* User Auth & Sell Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontWeight: 'bold', color: '#002f34' }}>Welcome, {user.name}</span>

              {setShowMyAds && (
                <button
                  onClick={handleMyAdsToggle}
                  style={{
                    padding: '8px 14px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    backgroundColor: showMyAds ? '#002f34' : 'transparent',
                    color: showMyAds ? 'white' : '#002f34',
                    border: '1px solid #002f34',
                    borderRadius: '4px'
                  }}
                >
                  {showMyAds ? 'All Products' : 'My Listings'}
                </button>
              )}

              <button 
                onClick={handleLogout} 
                style={{ padding: '8px 14px', cursor: 'pointer', fontWeight: 'bold', backgroundColor: 'transparent', border: '1px solid #002f34', color: '#002f34', borderRadius: '4px' }}
              >
                Logout
              </button>
            </div>
          ) : (
            <div>
              <button 
                onClick={() => history.push('/login')} 
                style={{ margin: '0 10px', padding: '8px 18px', cursor: 'pointer', fontWeight: 'bold', backgroundColor: 'transparent', border: 'none', textDecoration: 'underline', color: '#002f34' }}
              >
                Login
              </button>
              <button 
                onClick={() => history.push('/signup')} 
                style={{ padding: '8px 18px', cursor: 'pointer', fontWeight: 'bold', backgroundColor: '#002f34', color: 'white', borderRadius: '4px', border: 'none' }}
              >
                Signup
              </button>
            </div>
          )}

          <button 
            onClick={() => history.push(user ? '/create' : '/login')} 
            style={{ padding: '8px 20px', cursor: 'pointer', fontWeight: 'bold', backgroundColor: '#ffce32', color: '#002f34', borderRadius: '20px', border: '2px solid #002f34' }}
          >
            + SELL
          </button>
        </div>

      </div>
    </div>
  );
}

export default Header;