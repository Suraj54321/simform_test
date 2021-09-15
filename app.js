const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

var app = express();

app.use(cors());

app.use(bodyParser.json())

let db = require('./config/database');

app.use(require('./routes'));

app.listen(3000,()=>{
    console.log("app is running on port number 3000");
})