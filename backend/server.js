const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');



const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173', // Allow only your frontend origin
    methods: ['GET', 'POST'], // Allow only GET and POST methods
    credentials: true, // Allow credentials if you need cookies or auth headers
  }));

const PORT = 5002;
const MONGO_URI = 'mongodb+srv://pundirashish154:Gytz54nqeUJ-t_y@habittrackerdata.p4wsa.mongodb.net/'; 

// Connect to MongoDB
mongoose.connect(MONGO_URI)

  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// User Model
const User = mongoose.model('User', new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  habits: [{ name: String, description: String }],
}));

// Sign-Up Route
app.post('/api/signup', async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await User.findOne({ username });
  if (existingUser) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword });

  await newUser.save();
  res.status(201).json({ message: 'User created' });
});

// Login Route
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: 'User not found' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: 'Invalid password' });

  const token = jwt.sign({ id: user._id }, 'your-jwt-secret', { expiresIn: '1h' });
  res.json({ token });
});

// Get User Data Route (for logged-in users)
app.get('/api/user', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, 'your-jwt-secret');
    const user = await User.findById(decoded.id);
    res.json(user);
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

// Update User Habits Route
app.post('/api/habits', async (req, res) => {
  const { habit } = req.body;
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, 'your-jwt-secret');
    const user = await User.findById(decoded.id);
    user.habits.push(habit);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
