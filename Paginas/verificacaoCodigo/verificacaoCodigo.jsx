import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './Cadastro.css';

function VerificacaoCodigo() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const email = location.state?.email || '';
  const [codigoVerificacao, setCodigoVerificacao] = useState('');
  const [message, setMessage] = useState('');

  const handleEnviarCodigo = async () => {
    if (!email) {
      setMessage('Por favor, insira seu email.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/send-verification-code', { email });
      setMessage('Código de verificação enviado! Verifique seu e-mail.');
      console.log('Código enviado:', response.data.codigo); 
    } catch (error) {
      console.error('Erro ao enviar o código de verificação:', error);
      setMessage('Erro ao enviar o código de verificação. Por favor, tente novamente.');
    }
  };

  const handleVerificarCodigo = async () => {
    if (!codigoVerificacao) {
      setMessage('Por favor, insira o código de verificação.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/verify-code', { email, code: codigoVerificacao });
      if (response.data.message === 'Código de verificação válido!') {
        setMessage('Código verificado com sucesso!');
        setTimeout(() => navigate('/Login'), 1000);
      } else {
        setMessage('Código incorreto, por favor solicite um novo código.');
      }
    } catch (error) {
      console.error('Erro ao verificar o código:', error);
      setMessage('Erro ao verificar o código. Por favor, tente novamente.');
    }
  };

  return (
    <div className="cadastro-container">
      <h2>Verificação do Código</h2>
      <div className="form-group">
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          readOnly
        />
      </div>
      <button onClick={handleEnviarCodigo} className="btn btn-success mt-3">
        Enviar Código de Verificação
      </button>
      <div className="form-group mt-4">
        <label htmlFor="codigoVerificacao">Código de Verificação</label>
        <input
          type="text"
          className="form-control"
          id="codigoVerificacao"
          value={codigoVerificacao}
          onChange={(e) => setCodigoVerificacao(e.target.value)}
          placeholder="Digite o código de verificação"
        />
      </div>
      <button onClick={handleVerificarCodigo} className="btn btn-success mt-3">
        Verificar Código
      </button>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}

export default VerificacaoCodigo;
