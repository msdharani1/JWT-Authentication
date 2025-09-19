const User = require("../models/userModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "username and password required" });
        }
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "username is already taken" });
        }
        let pass = password.toString();
        const hashedPassword = await bcrypt.hash(pass, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        return res.status(201).json({ message: "User registered successfully" })
    } catch (error) {
        console.log("Register faild");
        res.status(500).json({ message: "Internal Server error" });
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Invalid user" })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid){
            return res.status(400).json({message: "Invalid Credential!!!"})
        }

        let token = jwt.sign({id:user._id, username: user.username}, process.env.JWT_SECRET, {expiresIn: "1h"})
        res.cookie("token", token, {httpOnly: true})
        res.status(200).json({message: "Login success!!!", token: token})

    } catch (error) {
        console.log("Login faild");
        res.status(500).json({ message: "Internal Server error" });
    }
}