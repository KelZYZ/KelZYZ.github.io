const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up storage for uploaded images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Save uploaded images to the 'uploads' folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to filename to avoid overwriting
    }
});

// Set up multer for handling file uploads
const upload = multer({ storage: storage });

// Define route for uploading images
app.post('/api/upload', upload.single('imageFile'), (req, res) => {
    // Assuming you have a MongoDB setup
    // You would typically save the image path and caption to your database here
    const imageUrl = req.file.path; // Path to the uploaded image
    const caption = req.body.caption; // Caption provided by the user
    // Save imageUrl and caption to your database
    res.json({ success: true, imageUrl: imageUrl, caption: caption });
});

// Serve uploaded images statically
app.use('/uploads', express.static('uploads'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
