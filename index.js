const express = require('express');
const imgur = require('imgur-module');

const app = express();

imgur.setClientId('f9b9cfa7c0b0f67');

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Route to handle image uploading
app.get('/imgur', (req, res) => {
  const url = req.query.url ;

  if (!url) {
    return res.status(400).json({ error: 'Missing image URL' });
  }

  // Log the URL for debugging purposes
  console.log('Uploading image from URL:', url);

  imgur.uploadImgur(url)
    .then((result) => {
      // Log the Imgur API response
      console.log('Imgur API response:', result);
      res.json(result);
    })
    .catch((error) => {
      // Log the error for debugging purposes
      console.error('Error uploading image to Imgur:', error);
      res.status(500).json({ error: 'An error occurred while uploading the image' });
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
