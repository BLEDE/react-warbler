const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    // HASH PASSWORD, NO PLAINTEXT
    password: {
        type: String,
        required: true,
    },
    profileImageUrl: {
        type: String
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    }]
});

userSchema.pre("save", async function(next) {
    try {
        if (!this.isModified("password")) {
            return next();
        }
        // hash pass using bcrypt, await bc its async, 13 is a "salt" extra variable to the encryption
        let hashedPassword = await bcrypt.hash(this.password, 13);
        this.password = hashedPassword
        return next();
    } catch (err) {
        return next(err);
    }
});

userSchema.methods.comparePassword = async function (candidatePassword, next) {
    try {
        let isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch; // will be true/false bool
    } catch (err) {
        return next(err);
    }
}

// to make a Schema declare it proper "User", and then the schema itself
const User = mongoose.model("User", userSchema);

module.exports = User;