const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const urlRoutes = require('./routes/urlRoutes');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors());
connectDB();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/url', urlRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
