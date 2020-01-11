// app.js

const http = require('http');

const fs = require('fs');

const nodemailer = require('nodemailer');

// Create an instance of the http server to handle HTTP requests
let app = http.createServer((req, res) => {
  // Set a response type of plain text for the response
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  // Send back a response and end the connection
  res.end('Sending Mails!\n');
});

// Start the server on port 8081
app.listen(8081, '127.0.0.1');
console.log('Node server running on port 8081');

// -----------------------------------------------------------------------------------------------------------
// Configurations for E-mails

const myEmail = 'divaldojr9@gmail.com';
const myPassword = 'xxxxxxxxxx';

const path = 'C:/Users/Samsung/Downloads/Certificado 2.pdf';

let transport;
let mailOptions;

transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: myEmail,
    pass: myPassword
  },
  tls: {
    rejectUnauthorized: false
  }
});

mailOptions = {
  from: 'Unifor',
  to: 'divaldojr9@gmail.com',
  subject: 'XXV Encontro de Iniciação à Pesquisa da Universidade de Fortaleza',
  html:
    'Aqui estão os certificados do <b>XXV Encontro de Iniciação à Pesquisa da Universidade de Fortaleza</b>.<br><br>Caso haja algum problema ou uma dúvida, contate a central de suporte.'
};

transport.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log('Message sent: %s', info.messageId);
});
