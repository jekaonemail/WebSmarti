const router = require("express").Router();
const User = require("../models/User");
const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");

const { 
    verifyToken, 
    verifyTokenAndAuth, 
    verifyTokenAndAdmin 
} = require("./verifyToken");


// Registration
router.post("/register", async (req, res) => {
    
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJs.AES.encrypt(req.body.password, process.env.SECRET).toString(),
    });

    try{

        const findUser = await User.findOne({ username: newUser.username, email: newUser.email });
        
        if(findUser){
            return res.status(401).json('User with email or username already exists!') 
        } 

        const savedUser = await newUser.save()
        return res.status(201).json(savedUser);
    } catch(e) {
        return res.status(500).json(e);
    }
});

// Authentication
router.post("/login", async (req, res) => {
    try{

        const user = await User.findOne({username: req.body.username});

        if(!user) {
            return res.status(401).json("User not foutn");
        }

        const hashedPassword = CryptoJs.AES.decrypt(user.password, process.env.SECRET);
        const originalPassword = hashedPassword.toString(CryptoJs.enc.Utf8);

        if(originalPassword !== req.body.password){
            return res.status(401).json(`Incorrect username or password`);
        }

        const token = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        }, process.env.JWT_SECRET, { expiresIn: "3d" });

        const {password, ...otherParams} = user._doc;

        return res.status(200).json({...otherParams, token});

    } catch(e) {
        return res.status(500).json("ERROR ERROR ERROR " + e);
    }
});



// change profile password;
router.put("/update/password/:userId", verifyTokenAndAdmin, async (req, res) => {
    try{

        await User.findByIdAndUpdate(req.params.userId, {
            password: CryptoJs.AES.encrypt(req.body.password, process.env.SECRET).toString()
        });

        return res.status(200).json("Пароль змінено успішно");

    }catch (e) {
        return res.status(500).json(e);
    }
})

// change profile username;
router.put("/update/username/:userId", verifyTokenAndAdmin, async (req, res) => {
    try{

        await User.findByIdAndUpdate(req.params.userId, {
            username: req.body.username
        });

        return res.status(200).json("Нікнейм змінено!");

    }catch (e) {
        return res.status(500).json(e);
    }
})

// change profile email;
router.put("/update/email/:userId", verifyTokenAndAdmin, async (req, res) => {
    try{

        await User.findByIdAndUpdate(req.params.userId, {
            email: req.body.email
        });

        return res.status(200).json("E-Mail змінено!");

    }catch (e) {
        return res.status(500).json(e);
    }
});



// Get users
router.get("/users", verifyTokenAndAdmin, async (req, res) => {
    try{
        const users = await User.find().sort({isAdmin: -1})

        return res.status(200).json(users);
    }catch (e){
        return res.status(500).json(e);
    }
})


// remove user
router.delete('/remove/:userId', verifyTokenAndAdmin, async (req, res) => {
    try{

        await User.findByIdAndDelete(req.params.userId);
        return res.status(200).json('Користувача видалено!');

    }catch(e){
        return res.status(500).json(e);
    }
})

module.exports = router;