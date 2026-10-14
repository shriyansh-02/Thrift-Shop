import React, { useState, Fragment } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Header from "../Header/Header";

const subCategoriesMap = {
  "Men": ["Shirts", "T-Shirts", "Jeans", "Pants", "Shoes", "Slides", "Flip Flops", "Watches", "Accessories", "Other"],
  "Women": ["Tops", "Dresses", "Jeans", "Pants", "Shoes", "Sandals", "Heels", "Bags", "Jewelry", "Other"],
  "Kids": ["Clothing", "Footwear", "Toys", "Accessories", "Other"],
  "Gadgets": ["Mobiles", "Laptops", "Tablets", "Audio & Headphones", "Wearables", "Other"],
  "Books": ["Fiction", "Non-Fiction", "Educational", "Comics & Mangas", "Other"]
};

const Create = () => {
  const history = useHistory();
  const userString = localStorage.getItem("user");
  const savedUser = userString ? JSON.parse(userString) : null;

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("Kanpur, Uttar Pradesh");
  const [sellerPhone, setSellerPhone] = useState(savedUser?.phone || "");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setSubCategory(""); 
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");

    if (!savedUser) {
      alert("Please login first!");
      history.push("/login");
      return;
    }

    try {
      const postData = {
        title: name,
        category,
        subCategory,
        condition,
        price: Number(price),
        location,
        description,
        imageUrl: image,
        sellerId: savedUser._id || savedUser.id,
        sellerName: savedUser.name || "Thrift Shop Seller",
        sellerPhone
      };

      await axios.post("http://localhost:5000/api/posts", postData, {
        headers: { Authorization: token ? `Bearer ${token}` : "" }
      });

      alert("Product listed successfully!");
      history.push("/");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <Header />
      <div style={{ maxWidth: "500px", margin: "40px auto", padding: "25px", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
        <h2 style={{ color: "#002f34", marginBottom: "20px", textAlign: "center" }}>Sell Your Product</h2>
        
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <div>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px", color: "#002f34" }}>Product Title</label>
            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", boxSizing: "border-box" }} />
          </div>

          <div>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px", color: "#002f34" }}>Main Category</label>
            <select required value={category} onChange={handleCategoryChange} style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", boxSizing: "border-box" }}>
              <option value="">Select Category</option>
              {Object.keys(subCategoriesMap).map((cat) => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          {category && subCategoriesMap[category] && (
            <div>
              <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px", color: "#002f34" }}>Sub Category</label>
              <select required value={subCategory} onChange={(e) => setSubCategory(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", boxSizing: "border-box" }}>
                <option value="">Select Sub Category</option>
                {subCategoriesMap[category].map((sub) => <option key={sub} value={sub}>{sub}</option>)}
              </select>
            </div>
          )}

          <div>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px", color: "#002f34" }}>Product Condition</label>
            <select required value={condition} onChange={(e) => setCondition(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", boxSizing: "border-box" }}>
              <option value="">Select Condition</option>
              <option value="Brand New">Brand New (Unopened/Unused)</option>
              <option value="Superb">Superb (Very less used: 1-3 times)</option>
              <option value="Fair">Fair (Majorly used)</option>
            </select>
          </div>

          <div>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px", color: "#002f34" }}>Price (₹)</label>
            <input type="number" required value={price} onChange={(e) => setPrice(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", boxSizing: "border-box" }} />
          </div>

          <div>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px", color: "#002f34" }}>Location</label>
            <input type="text" required value={location} onChange={(e) => setLocation(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", boxSizing: "border-box" }} />
          </div>

          <div>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px", color: "#002f34" }}>Seller Mobile / WhatsApp</label>
            <input type="tel" required value={sellerPhone} onChange={(e) => setSellerPhone(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", boxSizing: "border-box" }} />
          </div>

          <div>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px", color: "#002f34" }}>Description</label>
            <textarea rows="3" required value={description} onChange={(e) => setDescription(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", boxSizing: "border-box" }} />
          </div>

          <div>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px", color: "#002f34" }}>Product Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} style={{ marginBottom: "10px" }} />
            {image && <div style={{ marginTop: "10px", textAlign: "center" }}><img src={image} alt="Preview" style={{ width: "180px", height: "180px", objectFit: "cover", borderRadius: "6px", border: "1px solid #ddd" }} /></div>}
          </div>

          <button type="submit" disabled={loading} style={{ padding: "12px", backgroundColor: "#002f34", color: "white", fontWeight: "bold", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "16px", marginTop: "10px" }}>
            {loading ? "Posting..." : "Post Now"}
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default Create;