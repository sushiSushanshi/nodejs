const express= require('express');
const port=8000;
const bodyParser = require('body-parser');
const mysql = require('mysql');
const urlencoded = require('body-parser/lib/types/urlencoded');
const exphbs=require('express-handlebars');
const connection = require('mysql/lib/Connection');

require('dotenv').config();
const app=express();


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//to add static files
app.use(express.static('public'));
//setting up template engine(express-handlebars)
app.engine('hbs',exphbs.engine({extname:'.hbs'}));
app.set('view engine','hbs');

const routes = require('./servers/routes/user');
app.use('/',routes);

//to start the server
app.listen(port,(error,data)=>{
    if(error){
       return  console.log("error in running",err);
    }
    return console.log("server running successfully on port no : ",port);  
})