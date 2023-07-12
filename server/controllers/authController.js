const userModel = require("../models/userModel");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    try {
        const existingUserEmail = await userModel.findOne({ email: req.body.email })

        if (existingUserEmail) {
            return res.status(200).send({
                success: false,
                message: "User with this email already registered"
            })
        }

        const existingUserName = await userModel.findOne({ username: req.body.username })

        if (existingUserName) {
            return res.status(200).send({
                success: false,
                message: "Username already registered"
            })
        }

        //hashed password
        const salt = await bcrypt.genSalt(5)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        req.body.password = hashedPassword

        //rest data
        const user = new userModel(req.body)
        await user.save();

        return res.status(200).send({
            success: true, message: "User register successfully", user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Register API",
            error
        })
    }
}

//login
const login = async (req, res) => {
    try {
        const user = await userModel.findOne({ username: req.body.username })
        if (!user) {
            return res.status(200).send({
                success: false, message: "User not found",
            })
        }

        const comparePassword = await bcrypt.compare(req.body.password, user.password)
        if (!comparePassword) {
            return res.status(200).send({
                success: false,
                message: "Invalid credentials"
            })
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
        return res.status(200).send({
            success: true, message: "Login successfully", user, token
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Login API",
            error
        })
    }
}

const currentUser = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId })
        return res.status(200).send({
            success: true, message: "User fetched successfully", user,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Login API",
            error
        })
    }
}

module.exports = { register, login, currentUser }