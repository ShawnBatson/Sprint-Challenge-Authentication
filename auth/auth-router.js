const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../database/users/users_model");
const restrict = require("./authenticate-middleware");

const router = express.Router();

router.post("/register", async (req, res, next) => {
    try {
        const { username } = req.body;
        const user = await Users.findBy({ username }).first;

        if (user) {
            return res.status(409).json({ message: "Username already taken" });
        }

        res.status(201).json(await Users.add(req.body));
    } catch (err) {
        next(err);
    }
});

router.post("/login", async (req, res, next) => {
    const authError = {
        message: "Invalid Credentials",
    };

    try {
        const user = await Users.findBy({
            username: req.body.username,
        });

        if (!user) {
            return res.status(401).json("this is in  login post", authError);
        }

        const passwordValid = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!passwordValid) {
            return res.status(401).json(authError);
        }

        const tokenPayload = {
            userId: user.userId,
            userRole: "admin",
        };

        token = jwt.sign(tokenPayload, "secret and safe");

        res.cookie("token", jwt.sign(tokenPayload, "secret and safe"));

        res.json({
            message: `Welcome ${username}`,
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
