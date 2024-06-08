const express = require('express');
const imgur = require('imgur-module');

const app = express();

imgur.setClientId('f9b9cfa7c0b0f67');

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Route to handle image uploading
app.get('/imgur', async (req, res) => {
  const url = req.query.url ;

  if (!url) {
    return res.status(400).json({ error: 'Missing image URL' });
  }

  try {
    const result = await imgur.uploadImgur(url);
    res.json(result);
  } catch (error) {
    if (error.response && error.response.status === 429) {
      // Retry the request after a delay
      setTimeout(() => {
        // Retry the request
        // You may want to implement exponential backoff here
        // to prevent hitting the rate limit again immediately
        imgur.uploadImgur(url)
          .then((result) => {
            res.json(result);
          })
          .catch((error) => {
            res.status(500).json({ error: 'An error occurred while uploading the image' });
          });
      }, 5000); // Retry after 5 seconds
    } else {
      res.status(500).json({ error: 'An error occurred while uploading the image' });
    }
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
