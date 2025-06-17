const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const videoRoutes = require('./routes/video');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/generate', videoRoutes);
app.use('/videos', express.static(path.join(__dirname, '..', 'videos')));


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
