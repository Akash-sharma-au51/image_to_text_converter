const express = require('express');
const multer = require('multer');
const Tesseract = require('tesseract.js');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 8000;

app.use(express.json());

// Corrected the path to 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use the cors middleware to enable CORS
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image provided' });
  }

  // Perform OCR using Tesseract.js
  Tesseract.recognize(req.file.buffer, 'eng', {
    logger: (info) => console.log(info),
  })
    .then(({ data: { text } }) => {
      res.json({ text });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'An error occurred during OCR' });
    });
});

app.listen(port, () => {
  console.log(`The app is running on port ${port}`);
});
