import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AgendarConsulta.css';
import { useLocation, useNavigate } from 'react-router-dom';

const AgendarConsulta = () => {
  // Obtém os dados do nutricionista e o ID do usuário da navegação anterior (passados via 'location.state')
  const location = useLocation();
  const { nutricionista, usuarioId } = location.state;

  // Declaração de estados locais para gerenciar os valores do formulário e mensagens de erro
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [pagamento, setPagamento] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Hook de navegação para redirecionar após o agendamento
  const navigate = useNavigate();

  // Função para verificar se a data selecionada é válida (futura ou no dia atual)
  const isValidDate = (date) => {
    const today = new Date();
    const selectedDate = new Date(date);
    return selectedDate >= today; // Retorna true se a data for válida
  };

  // Função chamada ao submeter o formulário
  const handleSubmit = (e) => {
    e.preventDefault(); // Impede o envio padrão do formulário
  
    // Verifica se o ID do usuário existe
    if (!usuarioId) {
      setErrorMessage("ID do usuário não foi encontrado. Tente novamente.");
      return;
    }
  
    // Verifica se a data selecionada é válida
    if (!isValidDate(data)) {
      setErrorMessage("A data deve ser no futuro ou no dia atual.");
      return;
    }
  
    const nutricionistaId = nutricionista.id;
  
    // Criação da query string para enviar via GET com os dados do agendamento
    const queryString = new URLSearchParams({
      nutricionistaId,
      usuarioId,
      data,
      horario,
      pagamento,
    }).toString();
  
    setLoading(true); // Ativa o estado de carregamento
    setErrorMessage(''); // Limpa qualquer mensagem de erro anterior
  
    // Envia a requisição POST para o backend para agendar a consulta
    fetch(`http://localhost:8080/consulta/marcar?${queryString}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: null, // Corpo vazio, pois a query string já contém todos os dados
    })
      .then((response) => {
        setLoading(false); // Desativa o carregamento
        // Verifica se a resposta da requisição foi bem-sucedida
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text); // Lança erro com a mensagem de resposta
          });
        }
        return response.text(); // Retorna a resposta como texto
      })
      .then((text) => {
        alert(text); // Exibe uma mensagem com o texto da resposta (sucesso ou erro)
  
        // Após o agendamento, registra no histórico do nutricionista
        fetch('http://localhost:8080/historico-consultas-nutricionista', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nutricionistaId,
            usuarioId,
            data,
            horario,
            pagamento,
          }),
        })
          .then((response) => {
            if (!response.ok) {
              return response.text().then((text) => {
                throw new Error(text);
              });
            }
            return response.text();
          })
          .then((text) => {
            console.log('Consulta registrada no histórico do nutricionista:', text);
          })
          .catch((error) => {
            console.error('Erro ao registrar consulta no histórico do nutricionista:', error);
          });
  
        // Após o agendamento, redireciona o usuário para a tela de histórico de consultas
        navigate('/historico-consultas', {
          state: {
            usuarioId,
            consulta: {
              nutricionista: nutricionista,
              data,
              horario,
              pagamento,
            },
          },
        });
      })
      .catch((error) => {
        setErrorMessage(error.message || 'Houve um erro ao tentar agendar a consulta.'); // Exibe erro
        console.error('Erro na requisição:', error); // Log do erro no console
      });
  };
  

  return (
    <div style={{ backgroundColor: 'rgb(200, 255, 200)', minHeight: '100vh', display: 'grid' }}>
      <div className="container-fluid cabecalhoConsulta">
        <div className="col-sm d-flex justify-content-start align-items-center flex-wrap">
          <div className="titulo-nutrividas mb-3">
            <h1 className="m-0" style={{ color: 'darkgreen' }}>
              Nutrividas
              <img src="NutrividasLogo.png" className="logo" alt="Logo Nutrividas" />
            </h1>
          </div>
        </div>
      </div>

      <div className="container container-form">
        <div className="descricao text-center mb-4">
          <h3 style={{ color: 'green' }}>{nutricionista.nome}</h3>
          <p style={{ color: 'green' }}>{nutricionista.descricao}</p>
        </div>

        <div className="formulario">
          <h2 className="text-center" style={{ color: 'green' }}>Marque sua Consulta</h2>

          {/* Exibição de mensagens de erro, se houver */}
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Campo para selecionar a data da consulta */}
            <div className="form-group">
              <label htmlFor="data">Data da Consulta:</label>
              <input 
                type="date" 
                className="form-control" 
                id="data" 
                name="data" 
                value={data} 
                onChange={(e) => setData(e.target.value)} 
                required 
              />
            </div>

            {/* Campo para selecionar o horário da consulta */}
            <div className="form-group">
              <label htmlFor="horario">Horário:</label>
              <input 
                type="time" 
                className="form-control" 
                id="horario" 
                name="horario" 
                value={horario} 
                onChange={(e) => setHorario(e.target.value)} 
                required 
              />
            </div>

            {/* Campo para selecionar a forma de pagamento */}
            <div className="form-group">
              <label htmlFor="pagamento">Forma de Pagamento:</label>
              <select
                className="form-control"
                id="pagamento"
                name="pagamento"
                value={pagamento}
                onChange={(e) => setPagamento(e.target.value)}
                required
              >
                <option value="" disabled>Selecione uma opção</option>
                <option value="cartao">Cartão de Crédito</option>
                <option value="debito">Cartão de Débito</option>
                <option value="boleto">Boleto Bancário</option>
                <option value="pix">PIX</option>
              </select>
            </div>

            {/* Botão para submeter o formulário, com estado de carregamento */}
            <button type="submit" className="btn btn-success btn-block" disabled={loading}>
              {loading ? 'Agendando...' : 'Agendar Consulta'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AgendarConsulta;
