const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const authRoutes = require("./routes/auth")
const cors = require("cors")
const categoryRoutes = require("./routes/categoryRoutes")
const productRoutes = require("./routes/productRoutes")
const path = require("path")


// configure env
dotenv.config()

// database config
connectDB()

// rest object
const app = express()

// middlewares
app.use(express.json())
app.use(morgan("dev"));
app.use(cors());
app.use(express.static(path.join(__dirname, "../build")));

// routes
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/category", categoryRoutes)
app.use("/api/v1/product", productRoutes);

// rest api
// app.get("/",(req, res)=>{
//     res.send("<h1>Welcome To E-Commerce App</h1>")
// })
app.use("*", function(req,res){
    res.sendFile(path.join(__dirname, "../build/index.html"))
})

// port
 const PORT = process.env.port || 8080;

// run listen
app.listen(PORT, () =>{
    console.log(
        `Server Running On ${process.env.DEV_MODE} mode on port ${PORT}`
    );
}); 