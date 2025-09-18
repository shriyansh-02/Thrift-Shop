import React, { useState } from "react";
import DynamicPosts from "../DynamicPosts/DynamicPosts";
import Auction from "../Auction/Auction";
import "./Banner.css";



function Banner() {
  let [category, setCategory] = useState();

  const handleAuctionClick = () => {
  window.location.href = "./Auction/Auction"; 

  console.log("Heelo");
};

  
  return (
    <div className="bannerParentDiv">
      <div className="bannerChildDiv">
        <div className="menuBar">
          <div className="categoryMenu">
            <select
              name="Category"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              {" "}
              <option value="null">ALL CATEGORIES</option>
              <option value="Summer Collection">Summer Collection</option>
              <option value="Winter Collection">Winter Collection</option>
              <option value="Shoes & Sneakers">Shoes & Sneakers</option>
              <option value="Formals">Formals</option>
              {/* <option value="Motorcycles">Women Wear's</option> */}
              <option value="Accessories">Accessories</option>
            </select>
          </div>
          <div className="otherQuickOptions">
            <span onClick={()=>setCategory("Summer Collection")} >Summer Collection</span>
            <span onClick={()=>setCategory("Winter Collection")} >Winter Collection</span>
            <span onClick={()=>setCategory("Shoes & Sneakers")} >Shoes & Sneakers</span>
            <span onClick={()=>setCategory("Formals")} >Formals</span>
            <span onClick={()=>setCategory("Accessories")} >Accessories</span>
            <span onClick={handleAuctionClick}>Auction</span> 
          </div>
        </div>
        <div className="banner">
          <img src="https://firebasestorage.googleapis.com/v0/b/olx-sijeesh-c691f.appspot.com/o/image%2FFrrontend.jpg?alt=media&token=9a211ece-32ee-4db0-a7d1-302f356c4331" alt="" />
        </div>
      </div>
     { category!=null && <DynamicPosts category={category}/>  }
    </div>
  );
}

export default Banner;
