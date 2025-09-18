import React, { useState, useEffect } from 'react';
import './Auction1.css'; // Import CSS file for styles
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/storage'; 
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAaF2X_AV6SbP3nT4OnQjQp16BOH7D-2Qk",
  authDomain: "olx-sijeesh-c691f.firebaseapp.com",
  projectId: "olx-sijeesh-c691f",
  storageBucket: "olx-sijeesh-c691f.appspot.com",
  messagingSenderId: "1021729371366",
  appId: "1:1021729371366:web:54d9f9b29604789d973727",
  measurementId: "G-N64TBZEG2Z"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function Auction({ item }) {
  const [bidValue, setBidValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [endTime, setEndTime] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState('Auction ended');
  const [currentBid, setCurrentBid] = useState(item.currentBid);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchEndTime = async () => {
      const endTimeSnapshot = await firebase.database().ref('auctionEndTime').once('value');
      const endTime = endTimeSnapshot.val();
      setEndTime(endTime);
    };
    fetchEndTime();
  }, []);

  useEffect(() => {
    if (!endTime) return;

  const calculateTimeRemaining = () => {
  const now = new Date();
  const timeDiff = endTime - now;

  if (timeDiff <= 0) {
    setTimeRemaining('Auction ended');
  } else {
    const totalSeconds = Math.floor(timeDiff / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    // Format the time remaining
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    setTimeRemaining(formattedTime);
  }
};


    calculateTimeRemaining();

    const timer = setInterval(() => {
      calculateTimeRemaining();
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  const handleBidInputChange = (event) => {
    setBidValue(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handlePlaceBid = () => {
    // Parse the bid value as a number
    const newBidValue = parseFloat(bidValue);

    // Check if the parsed value is valid
    if (!isNaN(newBidValue)) {
      // Update the current bid with the new bid value
      setCurrentBid(newBidValue);
    }

    // Clear bid input
    setBidValue('');
  };

  return (
    <div className="container">
      <h1>{item.name}</h1>
      <img src={image ? URL.createObjectURL(image) : 'placeholder.jpg'} alt="Auction Item" />
      <p>Description: {item.description}</p>
      <p>Starting Bid: {item.startingBid}</p>
      <p>Current Bid: {currentBid}</p>
      <p>Time Remaining: {timeRemaining}</p>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={() => setShowModal(true)}>Place Bid</button>

      {/* Modal for entering bid value */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h2>Place Bid</h2>
            <label htmlFor="bidAmount">Bid Amount:</label>
            <input type="number" id="bidAmount" value={bidValue} onChange={handleBidInputChange} />
            <button onClick={handlePlaceBid}>Submit Bid</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Auction;
