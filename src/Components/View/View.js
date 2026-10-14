import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const subCategoriesMap = {
  "Men": ["Shirts", "T-Shirts", "Jeans", "Pants", "Shoes", "Slides", "Flip Flops", "Watches", "Accessories", "Other"],
  "Women": ["Tops", "Dresses", "Jeans", "Pants", "Shoes", "Sandals", "Heels", "Bags", "Jewelry", "Other"],
  "Kids": ["Clothing", "Footwear", "Toys", "Accessories", "Other"],
  "Gadgets": ["Mobiles", "Laptops", "Tablets", "Audio & Headphones", "Wearables", "Other"],
  "Books": ["Fiction", "Non-Fiction", "Educational", "Comics & Mangas", "Other"]
};

const conditionMap = {
  "Brand New": "Brand New (Unopened/Unused)",
  "Superb": "Superb (Very less used: 1-3 times)",
  "Fair": "Fair (Majorly used)"
};

function View() {
  const history = useHistory();
  const [post, setPost] = useState(null);
  const [showPhone, setShowPhone] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [editTitle, setEditTitle] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editSubCategory, setEditSubCategory] = useState('');
  const [editCondition, setEditCondition] = useState('');
  const [editLocation, setEditLocation] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [saving, setSaving] = useState(false);

  const userString = localStorage.getItem('user');
  const currentUser = userString ? JSON.parse(userString) : null;
  const currentUserId = currentUser ? (currentUser._id || currentUser.id || currentUser.email || currentUser.name) : null;

  useEffect(() => {
    const savedPost = localStorage.getItem('selectedPost');
    if (savedPost) {
      try {
        const parsed = JSON.parse(savedPost);
        setPost(parsed);
        setEditTitle(parsed.title || parsed.name || '');
        setEditPrice(parsed.price || '');
        setEditCategory(parsed.category || 'Men');
        setEditSubCategory(parsed.subCategory || '');
        setEditCondition(parsed.condition || '');
        setEditLocation(parsed.location || '');
        setEditPhone(parsed.sellerPhone || '');
        setEditDescription(parsed.description || '');
      } catch (error) {}
    }
  }, []);

  if (!post) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h3 style={{ color: '#002f34' }}>No product selected</h3>
        <button onClick={() => history.push('/')} style={{ padding: '10px 20px', backgroundColor: '#002f34', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }}>Back to Home</button>
      </div>
    );
  }

  const isOwner = currentUser && (post.sellerId === currentUserId || post.userId === currentUserId || post.sellerName === currentUser.name);
  const imgSrc = post.imageUrl || post.image || post.url || post.photo || post.img || (Array.isArray(post.images) && post.images[0]) || '';

  const handleWhatsAppChat = () => {
    if (!post.sellerPhone) return alert('Seller did not provide a WhatsApp number.');
    const cleanPhone = post.sellerPhone.replace(/\D/g, '');
    const phoneWithCountry = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    const message = `Hi ${post.sellerName || 'there'}, I am interested in "${post.title || post.name}" priced at ₹${post.price} on Thrift Shop.`;
    window.open(`https://wa.me/${phoneWithCountry}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updatedFields = {
        title: editTitle, price: Number(editPrice), category: editCategory, subCategory: editSubCategory, condition: editCondition, location: editLocation, sellerPhone: editPhone, description: editDescription, sellerName: post.sellerName && post.sellerName !== 'Thrift Shop Seller' ? post.sellerName : (currentUser?.name || 'Thrift Shop Seller')
      };
      const response = await axios.put(`https://thrift-shop-backend-532l.onrender.com/${post._id}`, updatedFields);
      const updatedPostData = response.data || { ...post, ...updatedFields };
      setPost(updatedPostData);
      localStorage.setItem('selectedPost', JSON.stringify(updatedPostData));
      setIsEditing(false);
      alert('Listing updated successfully!');
    } catch (error) {
      alert('Failed to update listing.');
    } finally {
      setSaving(false);
    }
  };

  return (
    // Top margin changed to 120px here to clear the fixed header
    <div style={{ maxWidth: '1100px', margin: '120px auto 40px auto', padding: '0 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <button onClick={() => history.push('/')} style={{ padding: '8px 16px', backgroundColor: '#fff', color: '#002f34', border: '1px solid #002f34', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>← Back to Products</button>
        {isOwner && <button onClick={() => setIsEditing(!isEditing)} style={{ padding: '8px 16px', backgroundColor: isEditing ? '#eee' : '#ffce32', color: '#002f34', border: '2px solid #002f34', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>{isEditing ? 'Cancel Editing' : '✏️ Edit Listing'}</button>}
      </div>

      {isEditing ? (
        <form onSubmit={handleUpdateSubmit} style={{ maxWidth: '550px', margin: '0 auto', padding: '25px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <h2 style={{ margin: '0 0 10px 0', color: '#002f34' }}>Edit Product Details</h2>
          <div><label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#002f34' }}>Title</label><input type="text" required value={editTitle} onChange={(e) => setEditTitle(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} /></div>
          
          <div><label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#002f34' }}>Main Category</label><select required value={editCategory} onChange={(e) => { setEditCategory(e.target.value); setEditSubCategory(''); }} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}><option value="">Select Category</option>{Object.keys(subCategoriesMap).map((cat) => <option key={cat} value={cat}>{cat}</option>)}</select></div>
          
          {editCategory && subCategoriesMap[editCategory] && <div><label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#002f34' }}>Sub Category</label><select required value={editSubCategory} onChange={(e) => setEditSubCategory(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}><option value="">Select Sub Category</option>{subCategoriesMap[editCategory].map((sub) => <option key={sub} value={sub}>{sub}</option>)}</select></div>}
          
          <div>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#002f34' }}>Product Condition</label>
            <select required value={editCondition} onChange={(e) => setEditCondition(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}>
              <option value="">Select Condition</option>
              <option value="Brand New">Brand New (Unopened/Unused)</option>
              <option value="Superb">Superb (Very less used: 1-3 times)</option>
              <option value="Fair">Fair (Majorly used)</option>
            </select>
          </div>

          <div><label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#002f34' }}>Price (₹)</label><input type="number" required value={editPrice} onChange={(e) => setEditPrice(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} /></div>
          <div><label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#002f34' }}>Location</label><input type="text" required value={editLocation} onChange={(e) => setEditLocation(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} /></div>
          <div><label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#002f34' }}>Seller Mobile</label><input type="tel" required value={editPhone} onChange={(e) => setEditPhone(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} /></div>
          <div><label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#002f34' }}>Description</label><textarea rows="3" required value={editDescription} onChange={(e) => setEditDescription(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} /></div>
          <button type="submit" disabled={saving} style={{ padding: '12px', backgroundColor: '#002f34', color: 'white', fontWeight: 'bold', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '6px' }}>{saving ? 'Saving...' : 'Save Changes'}</button>
        </form>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
          <div style={{ flex: '1 1 550px' }}>
            <div style={{ width: '100%', height: '420px', backgroundColor: '#000', borderRadius: '8px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {imgSrc ? <img src={imgSrc} alt={post.title || post.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} /> : <span style={{ color: '#ccc' }}>No Image Available</span>}
            </div>
            <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff' }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#002f34' }}>Description</h3>
              <p style={{ margin: 0, color: '#444', lineHeight: '1.6', whiteSpace: 'pre-line' }}>{post.description || 'No additional description provided by the seller.'}</p>
            </div>
          </div>

          <div style={{ flex: '1 1 320px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff' }}>
              <h1 style={{ margin: '0 0 10px 0', color: '#002f34', fontSize: '30px' }}>₹ {Number(post.price).toLocaleString('en-IN')}</h1>
              <h3 style={{ margin: '0 0 10px 0', color: '#333', fontWeight: '500' }}>{post.title || post.name}</h3>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                {post.category && (
                  <span style={{ fontSize: '12px', backgroundColor: '#eef3f4', color: '#002f34', padding: '4px 10px', borderRadius: '12px', fontWeight: 'bold' }}>
                    {post.category}{post.subCategory ? ` • ${post.subCategory}` : ''}
                  </span>
                )}
                {post.condition && (
                  <span style={{ fontSize: '12px', backgroundColor: '#fff3cd', color: '#856404', padding: '4px 10px', borderRadius: '12px', fontWeight: 'bold', border: '1px solid #ffeeba' }}>
                    ⭐ {conditionMap[post.condition] || post.condition}
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#666', borderTop: '1px solid #eee', paddingTop: '12px', marginTop: '8px' }}>
                <span>📍 {post.location || 'India'}</span>
              </div>
            </div>

            <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff' }}>
              <h3 style={{ margin: '0 0 12px 0', color: '#002f34' }}>Seller Details</h3>
              <p style={{ margin: '0 0 6px 0', fontSize: '16px', fontWeight: 'bold', color: '#222' }}>👤 {post.sellerName || 'Thrift Shop Seller'}</p>
              <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: '#666' }}>Verified Community Member</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button onClick={() => setShowPhone(!showPhone)} style={{ width: '100%', padding: '12px', backgroundColor: '#002f34', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer' }}>{showPhone ? `📞 ${post.sellerPhone || 'Number not provided'}` : 'Show Phone Number'}</button>
                {post.sellerPhone && <button onClick={handleWhatsAppChat} style={{ width: '100%', padding: '12px', backgroundColor: '#25D366', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer' }}>💬 Chat on WhatsApp</button>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default View;