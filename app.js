const nodemail = require('nodemailer');
const express = require ('express');
var path = require('path');


const server = express ();
server.use(express.urlencoded({ extended: false }));

server.get ('/', function (req,res) {
  /** Mandando a pagina html em caso de requisição get para esta rota */
  res.sendFile(path.join(__dirname + '/views/contact.html'));
})

server.post ('/form', function (req,res) {
  const nameUser = req.body.name;
  const emailUser = req.body.email;
  const subjectUser = req.body.subject;
  const messageUser = req.body.message;

  dataForm(nameUser, emailUser, subjectUser, messageUser);
})  

server.listen(5010);

/** Função que recebe os dados do req.body e utiliza elas no nodemailer */
function dataForm (nameUser, emailUser, subjectUser, messageUser) {

/** Dados de envio, podem ser guardos em arquivos .env */
const params = {
  'email' : 'emailtst@teste.com',
'name' : 'Teste-teste'
}

/** Configuração dos dados de SMTP do servidor */
const transporter = nodemail.createTransport({
  host: "smtp.mailtrap.io", /** Teste mailtrap, utilizar servidor smtp real */
  port: 2525,
  secure: false,
  auth: {
    user: "your mailtrap USER",
    pass: "your mailtrap PASS"
  }
});

/** Dados recebidos do formulario */
const options = {
    from : params.email, 
    to: emailUser, 
    subject: params.email,
    message: `O usuário : ${nameUser}, solicitou um orçamento, para o email : ${emailUser}. Com o serviço de: ${subjectUser}. A mensagem digitada foi: ${messageUser}`
    }

transporter.sendMail(options, (error, info) =>{
    if(error) console.log(error)
    else console.log(info)
})

}



