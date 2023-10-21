const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, default: "admin" },
    tokens: [{ type: String }],
}, { timestamps: true});

adminSchema.methods.addToken = function(token){
    this.tokens.push(token);
    return this.save();
}

module.exports = new mongoose.model("Admin", adminSchema);