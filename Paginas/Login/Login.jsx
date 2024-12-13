import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  
  // Definindo os estados para armazenar os valores de email, senha, erro e o estado de visibilidade da senha
  const [email, setEmail] = useState('');          // Armazena o email inserido pelo usuário
  const [senha, setSenha] = useState('');          // Armazena a senha inserida pelo usuário
  const [erro, setErro] = useState('');            // Armazena mensagens de erro para exibir caso a autenticação falhe
  const [mostrarSenha, setMostrarSenha] = useState(false);  // Controla a visibilidade da senha
  const navigate = useNavigate();                  // Hook de navegação para redirecionar o usuário após o login bem-sucedido

  // Função que é chamada quando o formulário de login é submetido
  const handleLogin = async (e) => {
    e.preventDefault();  // Previne o comportamento padrão do formulário (que seria recarregar a página)

    try {
      // Envia uma requisição POST para o backend, passando email e senha para validação
      const response = await axios.post('http://localhost:8080/usuario/login', { email, senha });

      // Verifica se a resposta foi bem-sucedida (status 200)
      if (response.status === 200) {
        const usuario = response.data;  // Recebe os dados do usuário retornados pela API

        // Armazena as informações do usuário no localStorage
        localStorage.setItem('usuarioLogado', JSON.stringify({
          id: usuario.id,               // Armazena o ID do usuário
          nome: usuario.nome,           // Armazena o nome do usuário
          email: usuario.email,         // Armazena o email do usuário
          senha: usuario.senha,         // Armazena a senha (não é recomendado armazenar a senha por questões de segurança)
        }));

        // Após um login bem-sucedido, redireciona para a página principal de nutricionistas
        navigate('/nutrividas');
      }
    } catch (error) {
      // Se ocorrer um erro, exibe a mensagem de erro
      setErro('Email ou senha incorretos!');
      console.error(error);  // Registra o erro no console para fins de depuração
    }
  };

  return (
    <div className='cadastro-container'>
      <h3 className="d-flex align-items-center text-success">Iniciar Sessão</h3>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className={`form-control ${erro ? 'is-invalid' : ''}`}  // Aplica a classe 'is-invalid' caso haja erro
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}  // Atualiza o estado 'email' conforme o usuário digita
            required
          />
          {erro && <div className="invalid-feedback">{erro}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="senha">Senha</label>
          <div className="input-group">
            <input
              type={mostrarSenha ? 'text' : 'password'}  // Controla se a senha será exibida em texto claro ou ocultada
              className={`form-control ${erro ? 'is-invalid' : ''}`}  // Aplica a classe 'is-invalid' caso haja erro
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}  // Atualiza o estado 'senha' conforme o usuário digita
              required
            />
            <div className="input-group-append">
              <button
                className="btn btn-success"
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}  // Alterna entre mostrar e esconder a senha
              >
                <i className={`fa ${mostrarSenha ? 'fa-eye-slash' : 'fa-eye'}`}></i>  {/* Ícone para mostrar/ocultar a senha */}
              </button>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-success">Login</button>  {/* Botão de login */}
      </form>
    </div>
  );
}

export default Login;
