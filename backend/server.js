require('dotenv').config();

const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const postRoutes = require('./routes/posts');
const authRoutes = require('./routes/auth');

// This allows BOTH /api/users and /api/auth to work!
app.use('/api/posts', postRoutes);
app.use('/api/users', authRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Thrift Shop Backend is running!');
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas successfully!'))
  .catch((error) => console.error('❌ MongoDB connection error:', error));

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});