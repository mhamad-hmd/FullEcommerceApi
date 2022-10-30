const mongoosee = require("mongoose");

const UserSchema = new mongoosee.Schema(
    {
        name: {type: String, required:true,},
        lastName: {type: String, required:true,},
        username: { type: String, required:true, unique:true },
        email: { type: String, required:true, unique:true },
        password: { type: String, required:true, unique:true },
        favProducts:{type:Array},
        imageUrl:{type:String},
        isAdmin: { type: Boolean, default: false }
    },
    {timestamps: true }
);

module.exports = mongoosee.model("User", UserSchema);



