const express = require("express");
const routes = require("./routes/blogroute");
const CustomError = require("./exceptions/error_exceptions");
const handError = require("./controller/handle_error_controler");

require("dotenv").config()
require("./config/database")()
const path = require("path");
const multer = require("multer");
const { Server } = require("http");




const app = express();


app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/', express.static(path.join(__dirname, 'static')))

app.use("/api/v1",routes)


app.get("/",(req,res)=>{
    
  res.send("hello")
})



app.use(handError);

const port = process.env.PORT
console.log(`env ${process.env.PORT}`)
app.listen(port,()=>{
    console.log("server running sucessfully");
})

