const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'montagesk628@gmail.com',
    pass: 'fjtemfnxdlxfrmhx',
  },
});

const verificationCodes = {};

function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

app.post('/api/send-verification-code', (req, res) => {
  const { email } = req.body;
  const verificationCode = generateVerificationCode();

  verificationCodes[email] = verificationCode;

  const mailOptions = {
    from: 'megatelecom',
    to: email,
    subject: 'Código de Verificação - Megatelecom - João Victor Ataides A.',
    text: `Seu código de verificação é: ${verificationCode}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Erro ao enviar o email:', error);
      res.status(500).json({ message: 'Erro ao enviar o email.' });
    } else {
      console.log('Email enviado:', info.response);
      res.json({ message: 'Código de verificação enviado com sucesso!', codigo: verificationCode });
    }
  });
});

app.post('/api/verify-code', (req, res) => {
  const { email, code } = req.body;

  console.log('Código armazenado:', verificationCodes[email]); 
  console.log('Código recebido:', code); 

  if (
    verificationCodes[email] &&
    verificationCodes[email].toString().trim() === code.toString().trim()
  ) {
    delete verificationCodes[email];
    res.json({ message: 'Código de verificação válido!' });
  } else {
    res.status(400).json({ message: 'Código de verificação inválido ou expirado.' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
