const mongoosee = require("mongoose");

const UserSchema = new mongoosee.Schema(
    {
        username: { type: String, required:true, unique:true },
        email: { type: String, required:true, unique:true },
        password: { type: String, required:true, unique:true },
        favProducts:{type:Array},
        isAdmin: { type: Boolean, default: false }
    },
    {timestamps: true }
);

module.exports = mongoosee.model("User", UserSchema);



