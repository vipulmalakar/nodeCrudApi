const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, default: "user" },
    tokens: [{ type: String }],
}, { timestamps: true});

userSchema.methods.addToken = function(token){
    this.tokens.push(token);
    return this.save();
}

module.exports = new mongoose.model("User", userSchema);