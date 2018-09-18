const express = require('express');
// const expHandlebars = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

//view engine
// app.engine('handlebars', expHandlebars());
// app.set('view engine', 'handlebars');

//static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

//bodyParser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('*', (req,res)=> {
    res.sendFile(path.join(__dirname, './public/client.html'));
});

app.listen(3000, ()=> console.log('server started'));