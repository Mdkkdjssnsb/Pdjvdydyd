const express = require('express');
const imgur = require('imgur-module');

const app = express();

imgur.setClientId('e33995ffbe6c4c2');

// Middleware to parse JSON bodies
app.use(express.json());

// Route to handle image uploading
app.post('/imgur', (req, res) => {
  const url = req.body.url;

  if (!url) {
    return res.status(400).json({ error: 'Missing image URL' });
  }

  imgur.uploadImgur(url)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred while uploading the image' });
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
