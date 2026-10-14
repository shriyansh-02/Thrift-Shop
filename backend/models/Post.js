const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, default: '' },
  condition: { type: String, default: 'Superb' },
  price: { type: Number, required: true },
  location: { type: String, default: 'India' },
  description: { type: String, required: true },
  imageUrl: { type: String },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sellerName: { type: String, default: 'Thrift Shop Seller' },
  sellerPhone: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);