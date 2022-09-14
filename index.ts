
const express = require("express")
const app = express();
const mongoose = require("mongoose") 
const dotenv = require("dotenv")

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("DB CONNECTED "))
.catch((err: any) => console.log(err))


app.get("/api/test", () => {
    console.log("test is succesfull")
})


app.listen( process.env.PORT || 3000, () => {
    console.log("backend is running")
})

