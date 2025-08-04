const mongoose = require('mongoose');

// Use environment variable for MongoDB connection or fallback to local
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/CrudEjs';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const userSchema = mongoose.Schema({
    name: String,
    email: String, 
    image: String
})

module.exports = mongoose.model('user', userSchema);