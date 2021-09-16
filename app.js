const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');


var app = express();

/**Cors configuration*/
app.use(cors());

/**Body parser configuration*/
app.use(bodyParser.json())

/**Imported database*/
let db = require('./config/database');

/**Express fileupload  configuration with limits*/
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

/**Routes configuration*/
app.use(require('./routes'));



app.listen(3000,()=>{
    console.log("app is running on port number 3000");
})