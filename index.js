const express = require('express');
const imgur = require('imgur-upload-api');
const app = express();

const myClientID = 'e33995ffbe6c4c2';
imgur.setClientID(myClientID);

app.get('/imgur', (req, res) => {
  const u = req.query.url;

  if (!u) {
    return res.status(400).send('Image URL is required');
  }

  imgur.upload(u, (err, result) => {
    if (err) {
      res.status(500).send('Error: ' + err.message);
    } else {
      res.send(result);
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
