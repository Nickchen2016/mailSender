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

app.post('/send', (req,res)=>{
    console.log('*******', req.body)
    const output = `
    <p>Your have a new message</p>
    <h3>Details</3>
    <p>Email: ${req.body.email}</p>
    <p>Message: ${req.body.message}</p>
    `;

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'fullstack.nick@gmail.com', // generated ethereal user
            pass: 'Welcome0820' // generated ethereal password
        },
        tls:{
            rejectUnauthorized: false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Nodemailer contact" <fullstack.nick@gmail.com>', // sender address
        to: 'fullstack.nick@gmail.com', // list of receivers
        subject: 'Hello World', // Subject line
        text: 'Hello world?!!!!!!', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);

        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.render('contact', {msg:'Email has been send'})
    });
})

app.listen(3000, ()=> console.log('server started'));