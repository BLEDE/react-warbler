const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signin = async function (req, res, next) {
    try {
        // find user
        let user = await db.User.findOne({
            email: req.body.email
        });
        let { id, username, profileImageUrl } = user;
        let isMatch = await user.comparePassword(req.body.password);
        if (isMatch) {
            let token = jwt.sign(
                {
                    id,
                    username,
                    profileImageUrl
                },
                process.env.SECRET_KEY
            );
            return res.status(200).json({
                id,
                username,
                profileImageUrl,
                token
            });
        } else {
            return next({
                status: 400,
                message: "Invalid Email/Password."
            });
        }
    } catch (e) {
        return next({
            status: 400,
            message: "Invalid Email/Password."
        });
    }
    // check if password matches what was sent to server
    // if all true, log in
};

exports.signup = async function (req, res, next) {
    try {
        let user = await db.User.create(req.body);
        let { id, username, profileImageUrl } = user;
        let token = jwt.sign({
            id,
            username,
            profileImageUrl
        },
        // sign a token
        process.env.SECRET_KEY
    );
        return res.status(200).json({
            id,
            username,
            profileImageUrl,
            token
        });
        //create a user
        // create a token (signing a token)
        //process.env.(environment var named in env)
    } catch (err) {
        // 11000 is validation failed
        if (err.code === 11000) {
            err.message = "Sorry, email or username not available."
        }
        return next({
            status: 400,
            message: err.message
        })
        // see what kind of error
        // if certain error res w/ username/email taken || 400
    }
};