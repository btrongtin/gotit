import express from "express";
const router = express.Router();
import argon2 from "argon2";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import verifyToken from "../middlewares/auth.js";

// @route GET api/auth
// @desc Check if user is logged in
// @access Public
router.get("/login", async (req, res) => {
    console.log("HELLO GET api/auth/login");
    res.send("YES THIS IS GET LOGIN");
});
router.post("/hoho", verifyToken, async (req, res) => {
    console.log("REQ.BODY: ", req.body);
    // console.log("REQ: ", req);
    console.log("REQ.HEADER: ", req.header);
    console.log("REQ.HEADERS: ", req.headers);
});
router.get("/", async (req, res) => {
    try {
        const user = await User.findOne({ uid: req.uid });
        if (!user)
            return res
                .status(400)
                .json({ success: false, message: "User not found" });
        res.json({ success: true, user });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

//@route POST api/auth/register
//@desc Register user
//@access Public
// router.post("/register", async (req, res) => {
//     const { username, password } = req.body;

//     if (!username || !password)
//         return res
//             .status(400)
//             .json({ success: false, message: "Missing username or password" });

//     try {
//         const user = await User.findOne({ username });

//         if (user)
//             return res.status(400).json({
//                 success: false,
//                 message: "Username has already taken",
//             });

//         // all good
//         const hashedPassword = await argon2.hash(password);
//         const newUser = new User({ username, password: hashedPassword });
//         await newUser.save();

//         //return token
//         const accessToken = jwt.sign(
//             {
//                 userId: newUser._id,
//             },
//             process.env.ACCESS_TOKEN_SECRET
//         );

//         res.json({
//             success: true,
//             message: "User created successfully",
//             accessToken,
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             success: false,
//             message: "Internal server error",
//         });
//     }
// });

// @route POST api/auth/login
// @desc Login user
// @access Public
router.post("/login", verifyToken, async (req, res) => {
    const foundUser = await User.findOne({ uid: req.uid });
    if (!foundUser) {
        const newUser = new User({
            uid: req.uid,
            name: req.body.name,
            email: req.body.email
        });
        await newUser.save();
        return res.json(newUser);
    }
    return res.json(foundUser);
});

export default router;
