const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
// Use a strong key in production
const JWT_SECRET = 'my_name_hemanth';  


//this is mongoose connection string
mongoose.connect('mongodb+srv://hemanthms186:kxvsU46y8y5nrffI@cluster0.cijmycz.mongodb.net/tr-exam?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });


//this is model schema of user
const userSchema = new mongoose.Schema({
    userId:String,
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String
});
const Users = mongoose.model('Users', userSchema);


//this is the router of signup +signup contoll i add here
app.post('/register', async (req, res) => {
    const {userId, firstName, lastName, email, password } = req.body;
    //bcrypt is used for secure the user password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new Users({userId, firstName, lastName, email, password: hashedPassword });

    try {
        await user.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(400).send('Error registering user');
    }
});
//this is login router ,+contoller
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });

    if (!user) {
        return res.status(400).send('Invalid email');
    }
//bcrypt is used for secure the user password
    const Password_Valid = await bcrypt.compare(password, user.password);
    if (!Password_Valid) {
        return res.status(400).send('Invalid email or password');
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.send({ token });
});

const auth = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).send('Authentication failed');
    }
};

app.get('/users', auth, async (req, res) => {
    const users = await Users.find({}, '-password');
    res.send(users);
});

app.get('/users/:id', auth, async (req, res) => {
    const user = await Users.findById(req.params.id, '-password');
    if (!user) {
        return res.status(404).send('User not found');
    }
    res.send(user);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});