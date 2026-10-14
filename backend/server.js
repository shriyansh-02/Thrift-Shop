// 1. Load environment variables FIRST
require('dotenv').config();

// 2. DNS configuration (Helps resolve MongoDB Atlas connection issues on some ISPs)
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// 3. Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// 4. Import Routes
const postRoutes = require('./routes/posts');
const authRoutes = require('./routes/auth'); 

// 5. Use Routes
app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes); 

// 6. Basic test route (To check if the API is awake)
app.get('/', (req, res) => {
  res.send('Thrift Shop Backend is running!');
});

// 7. Database Connection
// I removed the localhost fallback here so we know with 100% certainty 
// that it is connecting to your cloud Atlas database from the .env file.
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas successfully!'))
  .catch((error) => console.error('❌ MongoDB connection error:', error));

// 8. Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});