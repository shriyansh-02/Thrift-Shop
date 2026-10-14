import React, { useState } from 'react';
import Header from '../Components/Header/Header';
import Banner from '../Components/Banner/Banner'; 
import Posts from '../Components/Posts/Posts'; 
import Footer from '../Components/Footer/Footer';

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [showMyAds, setShowMyAds] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("All India"); 

  return (
    <div className="homeParentDiv">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showMyAds={showMyAds}
        setShowMyAds={setShowMyAds}
      />
      
      {/* INVISIBLE SPACER: Pushes the Banner down so the fixed Header doesn't overlap it */}
      <div style={{ height: '85px', width: '100%' }}></div>

      <Banner
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
      />
      <Posts
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        showMyAds={showMyAds}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
      />
      <Footer 
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
      />
    </div>
  );
}

export default Home;