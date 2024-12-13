import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';  // Importa o Bootstrap para estilização rápida
import { useNavigate } from 'react-router-dom';  // Importa a função de navegação entre páginas
import "@fortawesome/fontawesome-free/css/all.min.css";  // Importa o Font Awesome para ícones (como o ícone de olho)
import { useAuth } from '../../AuthContext';  // Importa o contexto de autenticação (não utilizado neste código)
import axios from 'axios';  // Importa o Axios para fazer requisições HTTP

// Componente principal de Cadastro de Usuário
function App() {
  // Definindo os estados para armazenar os dados do formulário e controlar o estado da senha
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [senhaError, setSenhaError] = useState('');  // Controle de erro na senha (não utilizado no código atual)
  const [showPassword, setShowPassword] = useState(false);  // Controle para alternar visibilidade da senha
  const navigate = useNavigate();  // Função de navegação entre as páginas

  // Função para alternar a visibilidade da senha
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);  // Inverte o estado da visibilidade
  };

  // Função que lida com o envio do formulário de cadastro
  const handleSubmitCadastro = async (e) => {
    e.preventDefault();  // Impede o comportamento padrão de envio do formulário

    // Cria um objeto com os dados do formulário
    const usuario = {
      nome,
      email,
      senha,
      telefone,
      cpf
    };

    try {
      // Envia uma requisição POST para a API do backend para salvar o usuário
      const response = await axios.post('http://localhost:8080/usuario/salvar', usuario);

      // Verifica se a resposta foi bem-sucedida (status 200)
      if (response.status === 200) {
        alert('Cadastro realizado com sucesso!');
        navigate('/Login');  // Redireciona para a página de Login após o cadastro
      }
    } catch (error) {
      // Caso ocorra um erro, exibe uma mensagem de erro
      alert('Erro ao cadastrar usuário. Tente novamente.');
      console.error(error);
    }
  };

  // Função para redirecionar para a página de Login
  const redirectToLogin = () => {
    navigate('/Login');  // Navega para a página de Login
  };

  // Função para redirecionar para a página de Cadastro de Nutricionista
  const redirectToNutricionista = () => {
    navigate('/CadastroNutricionista');  // Navega para a página de Cadastro de Nutricionista
  };

  return (
    <div className="cadastro-container">
    <h3 className="text-success text-center font-weight-bold">
  <i className="fa fa-user-plus mr-2"></i> 
  Bem-vindo ao Cadastro de Usuários! 
</h3>
<p className="text-muted text-center mb-4">
  Crie sua conta para aproveitar todos os nossos serviços.
</p>
      {/* Formulário de Cadastro */}
      <form onSubmit={handleSubmitCadastro}>
        {/* Campo para o nome do usuário */}
        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            className="form-control"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}  // Atualiza o estado do nome
            required  // Torna o campo obrigatório
          />
        </div>

        {/* Campo para o email do usuário */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}  // Atualiza o estado do email
            required
          />
        </div>

        {/* Campo para o telefone do usuário */}
        <div className="form-group">
          <label htmlFor="telefone">Telefone</label>
          <input
            type="tel"
            className="form-control"
            id="telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}  // Atualiza o estado do telefone
            required
          />
        </div>

        {/* Campo para o CPF do usuário */}
        <div className="form-group">
          <label htmlFor="cpf">CPF</label>
          <input
            type="text"
            className="form-control"
            id="cpf"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}  // Atualiza o estado do CPF
            required
          />
        </div>
        
        {/* Campo para a senha do usuário */}
        <div className="form-group">
          <label htmlFor="senha">Senha</label>
          <div className="input-group">
            <input
              type={showPassword ? 'text' : 'password'}  // Altera o tipo do campo com base no estado de visibilidade
              className="form-control"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}  // Atualiza o estado da senha
              required
            />
            {/* Botão para alternar a visibilidade da senha */}
            <div className="input-group-append">
              <button
                className="btn btn-success"
                type="button"
                onClick={togglePasswordVisibility}  // Alterna a visibilidade ao clicar no botão
              >
                <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>  {/* Ícone de olho */}
              </button>
            </div>
          </div>
          {senhaError && <div className="invalid-feedback">{senhaError}</div>}  {/* Exibe mensagem de erro se houver */}
        </div>

        {/* Botões para enviar o formulário ou redirecionar para outras páginas */}
        <div className="d-flex justify-content-between align-items-center">
          <button type="submit" className="btn btn-success">Cadastrar</button>
          <button type="button" className="btn btn-success" onClick={redirectToNutricionista}>Ir para Nutricionista</button>
        </div>
      </form>
      {/* Link para redirecionar para a página de Login */}
      <div className="text-center mt-3">
        <button type="button" className="btn btn-link" onClick={redirectToLogin}>Iniciar Sessão</button>
      </div>
    </div>
  );
};

export default App;
