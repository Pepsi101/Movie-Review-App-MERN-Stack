const express = require('express');
const users = require('./Controllers/users');
const profiles = require('./Controllers/profiles');
const posts = require('./Controllers/posts');
const auth = require('./Controllers/auth');
const cors = require('cors');

const connectdb = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json({ extended: false }));

connectdb();

app.get('/', (req, res) => {
  return res.send('app is running');
});

app.use('/api/auth', auth);
app.use('/api/profiles', profiles);
app.use('/api/users', users);
app.use('/api/posts', posts);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log('Server started on port ' + PORT);
});


