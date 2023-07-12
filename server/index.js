const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db')

//dot config
dotenv.config()

//mongodb conncetion
connectDB();

//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(cors())

//routes
app.use("/api/v1/auth", require('./routes/authRoutes'));

//port
const PORT = process.env.PORT || 3001

//listen
app.listen(PORT, () => {
    console.log("Nodo server running on port" + process.env.PORT)
})