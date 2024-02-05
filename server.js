const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://user1:user@cluster0.8cvlw0t.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, "connection error"));

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
})

const User = mongoose.model('user',userSchema);

app.listen(3000, () => console.log('Server is running'))


/* crud */
app.post('/users', async (req, res) => {
    const newUser = new User(req.body);
    const result = await newUser.save();
    res.json(result);
})

app.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
})

app.post('/user/:id', async (req, res) => {
    const updatedUser = req.body;
    const result = await User.updateOne({_id: req.params.id}, updatedUser);
    res.json(result); 
})

app.delete('/user/:id', async (req, res)  => {
    const result = await User.deleteOne({_id: req.params.id});
    res.json(result);
})