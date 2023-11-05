const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require("cors");
const app = express();


let linkUrl =
  process.env.NODE_ENV === "production"
    ? "https://www.websitename.com"
    : "http://localhost:3000";

app.use(
  cors({
    origin: linkUrl,
    credentials: true,
  })
);


const port = 3001;



// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Serve the React app
app.use(express.static(path.join(__dirname, 'build')));

// Handle file uploads
app.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.file)
    if(req.file) {
        console.log(req.file.filename);
    }
    res.send('File uploaded');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
