const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
//import Routes
const authRoute = require('./routes/auth');
const postRoute =require('./routes/postsPoints');
dotenv.config();

mongoose.connect(
  process.env.DB_CONNECT,
{ useNewUrlParser: true },
() => console.log('Connected to DB'));

app.use(express.json());
app.use(cors());
//rotas
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/points', postRoute);

app.listen(3000, () => console.log('Server running'));