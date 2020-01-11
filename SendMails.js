// FERRAMENTA PARA ENVIAR EMAILS AUTOMATICAMENTE

// -----------------------------------------------------------------------------------------------------------
// Código não modificável

// Importações
const http = require("http");
const fs = require("fs");
const nodemailer = require("nodemailer");

let lastSuccessfulEmail;

// Criação do servidor
let port = 8081;
let app = http.createServer((req, res) => {});
app.listen(port, "127.0.0.1");
console.log("Node server running on port " + port);

// Função que envia mensagem
async function wrapedSendMail(mailOptions) {
  return new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: myEmail,
        pass: myPassword
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log("error is " + error);
        resolve(false);
      } else {
        emailCounter++;
        console.log("\nEmail enviado para " + mailOptions.to + ".\n" + emailCounter + " de " + studentsList.length);
        resolve(true);
      }
    });
  });
};

// Função que identifica os trabalhos do aluno
function findWorks(worksArrayObject) {
  let certificatesList = [];

  for(object of worksArrayObject) {
    certificatesList.push({
      path: certificatesPath + '/Certificado ' + object.Numero + '.pdf'
    });
  }

  return certificatesList;
};

let mail;

var emailCounter = 0;

// -----------------------------------------------------------------------------------------------------------
// Código modificável

// Email e senha da conta que vai enviar as mensagens
const myEmail = "xxxxxxxxx";
const myPassword = "xxxxxxxxxx";

// Caminho completo até a pasta onde se encontram os certificados
const certificatesPath = "C:/Users/Samsung/Downloads";

// Arquivo com as informações a serem utilizadas nos emails
const studentsList = JSON.parse(fs.readFileSync('./src/assets/Lista de Participantes (Teste).json'));

// Flags para casos que mudem a mensagem
let multipleWorks = true;

// Loop de envio de mensagens
for (student of studentsList) {

  mail = {
    from: "Unifor",
    to: student.Email,
    subject:
      "XXV Encontro de Iniciação à Pesquisa da Universidade de Fortaleza",
    html:
      "Olá, " +
      student.Nome +
      ".<br>Aqui estão os seus certificados do <b>XXV Encontro de Iniciação à Pesquisa da Universidade de Fortaleza</b>.<br><br>Caso haja algum problema ou uma dúvida, contate a central de suporte.",
    attachments: findWorks(student.Trabalhos)
  };

  wrapedSendMail(mail);


}
