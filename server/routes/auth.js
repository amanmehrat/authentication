const router = require('express').Router();
const { validateRegisterInput } = require("../utils/validation");
const User = require("../models/user");
const { Token } = require("../models/token");
const sanitize = require("mongo-sanitize");
const crypto = require("crypto");
//  Input : username, email, password via body;
//  HTTP Success : 200 and message.
//  HTTP Errors : 400,500.
router.post("/register", async (req, res) => {
    // Validate Register input
    await User.findOneAndDelete({ email: req.body.email }, function (err) {
        if (err) {
            return res.status(500)
                .send(
                    "Impossible to delete the created user. Contact support or wait 12 hours to retry."
                );
        }
        console.log("Register User Deleted")
    });
    console.log("Register User Route called")
    console.log("BODY", req.body);
    const { error } = validateRegisterInput(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    console.log(req.body);
    req.body = sanitize(req.body);
    console.log(req.body);

    //Check for existing username or email
    let user = await User.findOne({ $or: [{ email: req.body.email.toLowerCase() }, { username: req.body.username.toLowerCase() }] }, (err) => {
        if (err)
            return res.status(500).send("An unexpected error occurred");

    });
    if (user)
        return res.status(400).send({ message: "Email or username already taken. Please take new username or email." });

    // Create new user
    user = new User(req.body);
    // Hash password
    user.hashPassword();
    // save user
    user.save((err) => {
        if (err)
            return res.status(500).send({ message: "Creation of user failed, try again." });

        // create a token
        console.log(user);
        const token = new Token({
            _userId: user._id,
            token: crypto.randomBytes(16).toString("hex"),
        });
        console.log(token)
        token.save(err => {
            if (err) return res.status(500).send("An unexpected error occurred");
            console.log(token);
            res.status(200).send({ message: "A verification mail has been sent." });
        })
    }
    );
});


module.exports = router;