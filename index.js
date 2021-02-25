const express = require('express');
const Joi = require('joi')
const app = express();
const books = require ('./book');

app.use(express.json());
app.use("/api/books",books)
app.listen(3000,()=>{
    console.log('listening to port')
})