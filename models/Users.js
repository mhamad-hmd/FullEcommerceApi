var mongoosee = require("mongoose");
var UserSchema = new mongoosee.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    isAdmin: { type: Boolean, "default": false }
}, { timestamps: true });
module.exports = mongoosee.model("User", UserSchema);
