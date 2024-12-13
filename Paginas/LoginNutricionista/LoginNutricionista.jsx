import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./LoginNutricionista.css"

function LoginNutricionista() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Envia uma requisição POST para o backend para o login do nutricionista
      const response = await axios.post('http://localhost:8080/nutricionista/login', { email, senha });

      if (response.status === 200) {
        const nutricionista = response.data;

        // Armazena as informações do nutricionista no localStorage
        localStorage.setItem('nutricionistaLogado', JSON.stringify({
          id: nutricionista.id,
          nome: nutricionista.nome,
          email: nutricionista.email,
        }));

        // Redireciona para a página principal do nutricionista
        navigate('/nutrividas');
      }
    } catch (error) {
      setErro('Email ou senha incorretos!');
      console.error(error);
    }
  };

  return (
    <div className="cadastro-container">
      <h3 className="d-flex align-items-center text-success">Iniciar Sessão - Nutricionista</h3>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className={`form-control ${erro ? 'is-invalid' : ''}`}
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {erro && <div className="invalid-feedback">{erro}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="senha">Senha</label>
          <div className="input-group">
            <input
              type={mostrarSenha ? 'text' : 'password'}
              className={`form-control ${erro ? 'is-invalid' : ''}`}
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
            <div className="input-group-append">
              <button
                className="btn btn-success"
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
              >
                <i className={`fa ${mostrarSenha ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-success">Login</button>
      </form>
    </div>
  );
}

export default LoginNutricionista;
