const users = require('../model/usermodel')
const jwt = require('jsonwebtoken')
const bcrypt =require('bcryptjs')
exports.register = async (req, res) => {
    console.log('inside the register funtion');
    const { userId, firstname, lastname, email, password } = req.body

    try {

        const existUser = await users.findOne({ email })
        console.log('fghbfdg');
        console.log(existUser);
        if (existUser) {
            res.status(406).json('user already exist !! please login....')
        } else {
            const handlepassword=await bcrypt.hash(password,10)
            const newUser = users({
                userId, firstname, lastname,
                email, password:handlepassword
            })
            await newUser.save()
            res.status(200).json(newUser)
        }

    } catch (err) {
        res.status(401).json(err)
        console.log(err);
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body
    try {
     
        const existingUser = await users.findOne({ email})
        if (existingUser) {
            const isMatch = await bcrypt.compare(password, existingUser.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            
            const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET)
            res.status(200).json({ token, existingUser })
        } else {
            res.status(406).json("invalid data")
        }
    } catch (err) {
        res.status(401).json(err)
    }
}


exports.allusersdetails = async (req, res) => {
    try {
        const allusers = await users.find()
console.log("inside all user");
        res.status(200).json(allusers)
    } catch (err) {
        res.status(401).json(err)
    }
}