const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.js');
const app = express();
const PORT = process.env.PORT || 5000;

require('dotenv').config();


// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend's URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/auth', authRoutes);

// Generic error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => console.log(`SERVER RUNNING ON ${PORT}`));

