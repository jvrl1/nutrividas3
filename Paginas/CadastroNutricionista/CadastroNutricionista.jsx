import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';  // Importa o Bootstrap para estilização rápida
import { useNavigate } from 'react-router-dom';  // Importa a função de navegação entre páginas

// Componente principal de Cadastro de Nutricionista
function CadastroNutricionista() {
  // Definindo os estados para armazenar os dados do formulário, mensagens de erro e listas de valores cadastrados
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');  // A senha não está sendo utilizada no código atual
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [descricao, setDescricao] = useState('');
  const [emailError, setEmailError] = useState('');  // Controle de erro de email duplicado
  const [telefoneError, setTelefoneError] = useState('');  // Controle de erro de telefone duplicado
  const [enderecoExistenteError, setEnderecoExistenteError] = useState('');  // Controle de erro de endereço duplicado
  const [emailsCadastrados, setEmailsCadastrados] = useState([]);  // Lista de emails cadastrados (ainda não está sendo alimentada)
  const [telefonesCadastrados, setTelefonesCadastrados] = useState([]);  // Lista de telefones cadastrados
  const [enderecosCadastrados, setEnderecosCadastrados] = useState([]);  // Lista de endereços cadastrados
  const [senhasCadastradas, setSenhasCadastradas] = useState([]);  // Lista de senhas cadastradas (não utilizada no código atual)
  const navigate = useNavigate();  // Função para navegar entre páginas

  // Função que lida com o envio do formulário de cadastro
  const handleSubmitCadastro = async (e) => {
    e.preventDefault();  // Impede o comportamento padrão de envio do formulário

    // Limpa os erros antes de validar os novos dados
    setEmailError('');
    setTelefoneError('');
    setEnderecoExistenteError('');

    // Verificação de dados duplicados antes de enviar para o backend
    if (emailsCadastrados.includes(email)) {
      setEmailError('Este email já está cadastrado!');
      return;  // Impede o envio do formulário se o email já estiver cadastrado
    }

    if (telefonesCadastrados.includes(telefone)) {
      setTelefoneError('Este telefone já está cadastrado!');
      return;  // Impede o envio do formulário se o telefone já estiver cadastrado
    }

    if (enderecosCadastrados.includes(endereco)) {
      setEnderecoExistenteError('Este endereço já está cadastrado!');
      return;  // Impede o envio do formulário se o endereço já estiver cadastrado
    }

    try {
      // Envia uma requisição POST para a API do backend para salvar o nutricionista
      const response = await fetch('http://localhost:8080/nutricionista/salvar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, telefone, endereco, descricao }),  // Envia os dados como JSON
      });

      // Verifica se a resposta foi bem-sucedida
      if (!response.ok) {
        throw new Error('Erro ao cadastrar nutricionista');  // Caso haja erro, lança uma exceção
      }

      alert('Cadastro realizado com sucesso!');
      // Navega para a página de nutricionistas após o cadastro bem-sucedido
      navigate('/nutricionistas');  // Redireciona para a página dos nutricionistas
    } catch (error) {
      // Caso ocorra um erro, exibe uma mensagem de erro
      console.error('Erro ao cadastrar:', error);
      alert('Erro ao cadastrar nutricionista');
    }
  };

  return (
    <div className="cadastro-container">
      <div className="container mt-5">
        <h3 className="d-flex align-items-center text-success">Cadastro de Nutricionistas</h3>
        <form onSubmit={handleSubmitCadastro} className="mt-4">
          {/* Campo para o nome do nutricionista */}
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

          {/* Campo para o email do nutricionista */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className={`form-control ${emailError ? 'is-invalid' : ''}`}  // Aplica a classe de erro se o email for inválido
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}  // Atualiza o estado do email
              required
            />
            {emailError && <div className="invalid-feedback">{emailError}</div>}  {/* Exibe mensagem de erro se houver */}
          </div>

          {/* Campo para o telefone do nutricionista */}
          <div className="form-group">
            <label htmlFor="telefone">Telefone</label>
            <input
              type="tel"
              className={`form-control ${telefoneError ? 'is-invalid' : ''}`}  // Aplica a classe de erro se o telefone for inválido
              id="telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}  // Atualiza o estado do telefone
              required
            />
            {telefoneError && <div className="invalid-feedback">{telefoneError}</div>}  {/* Exibe mensagem de erro se houver */}
          </div>

          {/* Campo para o endereço do nutricionista */}
          <div className="form-group">
            <label htmlFor="endereco">Endereço</label>
            <input
              type="text"
              className={`form-control ${enderecoExistenteError ? 'is-invalid' : ''}`}  // Aplica a classe de erro se o endereço for inválido
              id="endereco"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}  // Atualiza o estado do endereço
              required
            />
            {enderecoExistenteError && <div className="invalid-feedback">{enderecoExistenteError}</div>}  {/* Exibe mensagem de erro se houver */}
          </div>

          {/* Campo para a descrição profissional do nutricionista */}
          <div className="form-group">
            <label htmlFor="descricao">Descrição Profissional</label>
            <textarea
              className="form-control"
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}  // Atualiza o estado da descrição
              rows="3"
              placeholder="Breve descrição sobre sua atuação profissional"
              required
            ></textarea>
          </div>

          {/* Botões para submeter o formulário e redirecionar para o login */}
          <div className="d-flex justify-content-between"> {/* Layout flexível para alinhar os botões */}
            <button type="submit" className="btn btn-success">Cadastrar</button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/login-nutricionista')}>Login</button> {/* Botão de Login */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CadastroNutricionista;
