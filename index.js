const multer = require('multer')
const express = require('express');
const tesseract = require("node-tesseract-ocr");

 
 
const path = require('path')
 
const app = express()
 
app.use(express.static(path.join(__dirname + '/uploads')))
 
app.set('view engine', "ejs")
 
app.use('/',require('./routes/index'));
 
app.listen(5000, () => {
    console.log("App os listening on port 5000")
})