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
const myEmail = "pesquisadpdiunifor@gmail.com";
const myPassword = "pesquisadpdiunifor2020";

// Caminho completo até a pasta onde se encontram os certificados
const certificatesPath = "./src/assets/Certificados";

// Arquivo com as informações a serem utilizadas nos emails
const studentsList = JSON.parse(fs.readFileSync('./src/assets/Lista de Participantes (Teste).json'));

// Loop de envio de mensagens
for (student of studentsList) {

  mail = {
    from: myEmail,
    to: student.Email,
    subject:
      "XXV Encontro de Iniciação à Pesquisa da Universidade de Fortaleza",
    html:
      "Prezado(a) Participante,"
      + "<br><br>" +
      "Viemos, por meio deste, enviar o certificado de participação no <b>XXV ENCONTRO DE INICIAÇÃO À PESQUISA 2019, DA UNIVERSIDADE DE FORTALEZA</b>."
      + "<br><br>" +
      "Atenciosamente,"
      + "<br><br>" +
      "Diretoria de Pesquisa, Desenvolvimento e Inovação - DPDI."
      + "<br><br><br>" +
      "<a href='https://unifor.br/'>Unifor.br</a> | "
      +
      "<a href='https://www.instagram.com/uniforcomunica/?hl=pt-br'>Instagram</a> | "
      +
      "<a href='https://www.facebook.com/uniforoficial/'>Facebook</a> | "
      +
      "<a href='https://twitter.com/UniforOficial'>Twitter</a>  | "
      +
      "<a href='https://www.linkedin.com/school/university-of-fortaleza/?originalSubdomain=pt'>LinkedIn</a> | "
      +
      "<a href='https://www.unifor.br/tv-unifor'>TV Unifor</a> | "
      +
      "<a href='https://g1.globo.com/ce/ceara/especial-publicitario/unifor/ensinando-e-aprendendo/'>G1/Ensinando e Aprendendo</a>",
    attachments: findWorks(student.Trabalhos)
  };

  wrapedSendMail(mail);


}
