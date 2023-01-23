const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const cors = require('cors')
const router = require('./routes/user-routes.js')
const cookieParser = require('cookie-parser')

const app = express()
dotenv.config()
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser())
app.use(express.urlencoded({extended:false}));
app.use(express.json())

app.use("/api", router);

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("DB connected")
}).catch((err) => {
    console.log(err)
});

app.listen(process.env.PORT, console.log(`Running on port no ${process.env.PORT}`))