import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const conditionMap = {
  "Brand New": "Brand New (Unopened/Unused)",
  "Superb": "Superb (Very less used: 1-3 times)",
  "Fair": "Fair (Majorly used)"
};

function Posts({ searchQuery = "", selectedCategory = "ALL", showMyAds = false, selectedLocation = "All India", setSelectedLocation }) {
  const history = useHistory();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("newest");

  const userString = localStorage.getItem('user');
  const currentUser = userString ? JSON.parse(userString) : null;
  const currentUserId = currentUser ? (currentUser._id || currentUser.id || currentUser.email || currentUser.name) : null;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (e, postId) => {
    e.stopPropagation();
    if (!window.confirm("Remove this listing?")) return;
    try {
      await axios.delete(`https://thrift-shop-backend-532l.onrender.com/${postId}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleCardClick = (post) => {
    localStorage.setItem('selectedPost', JSON.stringify(post));
    history.push('/view');
  };

  const filteredPosts = posts.filter((post) => {
    const conditionDesc = conditionMap[post.condition] || post.condition || "";
    const searchString = `${post.title || ""} ${post.description || ""} ${post.category || ""} ${post.subCategory || ""} ${conditionDesc}`.toLowerCase();
    const query = searchQuery.toLowerCase().trim();
    const searchWords = query.split(" ").filter(word => word.length > 0);
    const matchesSearch = !query || searchWords.every((word) => searchString.includes(word));
    
    const matchesCategory = selectedCategory === "ALL" || (post.category && post.category.toLowerCase() === selectedCategory.toLowerCase());
    
    const postLoc = (post.location || "").toLowerCase();
    const targetLoc = selectedLocation.toLowerCase();
    const matchesLocation = selectedLocation === "All India" || postLoc.includes(targetLoc);

    const isOwner = currentUser && (post.sellerId === currentUserId || post.userId === currentUserId || post.sellerName === currentUser.name);
    const matchesOwner = !showMyAds || isOwner;

    return matchesSearch && matchesCategory && matchesLocation && matchesOwner;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === "priceLow") return Number(a.price) - Number(b.price);
    if (sortBy === "priceHigh") return Number(b.price) - Number(a.price);
    return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
  });

  const getPostImage = (post) => post.imageUrl || post.image || post.url || post.photo || post.img || (Array.isArray(post.images) && post.images[0]) || "";

  return (
    <div style={{ padding: '30px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <h2 style={{ color: '#002f34', margin: 0 }}>
            {showMyAds ? 'My Listed Products' : `Recommendations in ${selectedLocation}`}
          </h2>
          
          {selectedLocation !== "All India" && (
            <button 
              onClick={() => setSelectedLocation && setSelectedLocation("All India")}
              style={{ backgroundColor: '#f0f0f0', border: '1px solid #ccc', padding: '4px 10px', borderRadius: '15px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}
            >
              ✕ Clear Location Filter
            </button>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#002f34' }}>Sort By:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid #002f34', color: '#002f34', fontWeight: 'bold', backgroundColor: '#fff', cursor: 'pointer' }}>
            <option value="newest">Newest First</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
          </select>
        </div>
      </div>

      {loading ? <p style={{ textAlign: 'center', color: '#555' }}>Loading products...</p> : sortedPosts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#555', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>No products found in {selectedLocation} {selectedCategory !== "ALL" ? `for ${selectedCategory}` : ""}</h3>
          <p>Try searching in "All India" or clear your filters.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
          {sortedPosts.map((post) => {
            const imgSrc = getPostImage(post);
            const isOwner = currentUser && (post.sellerId === currentUserId || post.userId === currentUserId || post.sellerName === currentUser.name);

            return (
              <div key={post._id} onClick={() => handleCardClick(post)} style={{ border: '1px solid #ddd', borderRadius: '6px', padding: '12px', backgroundColor: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer' }}>
                <div>
                  {/* Changed padding to 10px and objectFit to 'contain' to prevent cutting */}
                  <div style={{ width: '100%', height: '200px', backgroundColor: '#f0f0f0', borderRadius: '4px', overflow: 'hidden', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', boxSizing: 'border-box' }}>
                    {imgSrc ? <img src={imgSrc} alt={post.title || post.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} /> : <span>No Image</span>}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: '0 0 6px 0', color: '#002f34', fontSize: '20px' }}>₹ {Number(post.price).toLocaleString('en-IN')}</h3>
                    {isOwner && <button onClick={(e) => handleDelete(e, post._id)} style={{ backgroundColor: '#ffeded', color: '#d9534f', border: '1px solid #f5c2c7', borderRadius: '4px', padding: '3px 8px', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold' }}>Delete</button>}
                  </div>

                  <p style={{ margin: '0 0 4px 0', fontWeight: 'bold', color: '#333', fontSize: '15px' }}>{post.title || post.name}</p>

                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
                    {post.category && (
                      <span style={{ fontSize: '12px', backgroundColor: '#eef3f4', color: '#002f34', padding: '2px 8px', borderRadius: '10px' }}>
                        {post.category}{post.subCategory ? ` • ${post.subCategory}` : ''}
                      </span>
                    )}
                    {post.condition && (
                      <span style={{ fontSize: '12px', backgroundColor: '#fff3cd', color: '#856404', padding: '2px 8px', borderRadius: '10px', border: '1px solid #ffeeba' }}>
                        ⭐ {conditionMap[post.condition] || post.condition}
                      </span>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#777', marginTop: '12px', paddingTop: '8px', borderTop: '1px solid #f0f0f0' }}>
                  <span>{post.location || 'India'}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Posts;