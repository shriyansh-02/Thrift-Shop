import React, { useState, useEffect } from 'react';
import Auction from '../Components/Auction/Auction';

function AuctionPage() {
  // Define initial auction data state
  const [auctionData, setAuctionData] = useState(null);

  // Simulate fetching auction data from backend
  useEffect(() => {
    const fetchAuctionData = async () => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Sample auction data (replace with actual API call)
      const item = {
        name: 'Sample Item',
        description: 'This is a sample item description.',
        startingBid: 100,
        currentBid: 150, // Assuming this is fetched from the backend
        endTime: new Date().getTime() + (5 * 60 * 60 * 1000) // End time 5 hours from now
      };

      // Set the fetched auction data
      setAuctionData(item);
    };

    // Call fetchAuctionData function
    fetchAuctionData();
  }, []);

  return (
    <div>
      {/* Render the Auction component with auctionData as prop */}
      {auctionData && <Auction item={auctionData} />}
    </div>
  );
}

export default AuctionPage;
