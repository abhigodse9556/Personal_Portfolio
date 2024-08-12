const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
// Set up the nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'abhiabhishek9556@gmail.com', // Replace with your Gmail
        pass: 'gwrv tedy biqu jftz',  // Replace with your Gmail password or App Password
    },
});

// Handle POST request to send email
app.post('/send', (req, res) => {
    const { name, email, phone, message } = req.body;

    const mailOptions = {
        from: email,
        to: 'abhiabhishek9556@gmail.com', // Your email where the form data will be sent
        subject: `Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Something went wrong.');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully.');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
