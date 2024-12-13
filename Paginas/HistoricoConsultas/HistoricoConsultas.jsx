import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './HistoricoConsultas.css';

const HistoricoConsultas = () => {
  // Obtém o 'usuarioId' a partir do estado da localização da navegação
  const location = useLocation();
  const { usuarioId } = location.state || {}; // Desestrutura 'usuarioId' do state (pode ser indefinido)

  // Definindo estados para armazenar os dados da consulta, controle de carregamento e mensagem de erro
  const [consultas, setConsultas] = useState([]);  // Armazena o histórico de consultas
  const [loading, setLoading] = useState(true);  // Controla o estado de carregamento
  const [errorMessage, setErrorMessage] = useState('');  // Armazena mensagem de erro em caso de falha na requisição

  // useEffect: Efeito que será executado ao carregar o componente ou quando 'usuarioId' mudar
  useEffect(() => {
    if (!usuarioId) return;  // Se não houver 'usuarioId', a função é interrompida (não faz requisição)

    // Faz a requisição para buscar o histórico de consultas com base no 'usuarioId'
    fetch(`http://localhost:8080/consulta/historico?usuarioId=${usuarioId}`)
      .then((response) => {
        // Verifica se a resposta da API foi bem-sucedida (status 200)
        if (!response.ok) {
          throw new Error('Erro ao buscar histórico de consultas.');
        }
        return response.json();  // Converte a resposta para JSON
      })
      .then((data) => {
        console.log('Dados recebidos da API:', data);  // Exibe os dados recebidos no console
        setConsultas(data);  // Atualiza o estado com os dados das consultas
        setLoading(false);  // Define o estado de carregamento como falso após os dados serem carregados
      })
      .catch((error) => {
        setErrorMessage(error.message);  // Em caso de erro, armazena a mensagem de erro
        setLoading(false);  // Define o estado de carregamento como falso
      });
  }, [usuarioId]);  // O efeito é disparado sempre que 'usuarioId' mudar

  // Condicional que exibe uma mensagem de carregamento enquanto os dados estão sendo buscados
  if (loading) {
    return (
      <div className="loading">
        <p>Carregando histórico de consultas...</p>  {/* Exibe uma mensagem de carregamento */}
      </div>
    );
  }

  // Condicional que exibe uma mensagem de erro, caso haja algum erro ao buscar os dados
  if (errorMessage) {
    return (
      <div className="error">
        <p>Erro: {errorMessage}</p>  {/* Exibe a mensagem de erro */}
      </div>
    );
  }

  // Renderiza o histórico de consultas quando os dados estão disponíveis e não há erros
  return (
    <div className="historico-container">
      <header className="historico-header">
        <h1>Histórico de Consultas</h1>  {/* Cabeçalho do histórico de consultas */}
      </header>

      {consultas.length > 0 ? (  // Verifica se há consultas para mostrar
        <div className="consultas-list">
          {consultas.map((consulta, index) => (  // Mapeia as consultas e exibe um cartão para cada
            <div key={index} className="consulta-card">
              {/* Exibe o nome do nutricionista, com fallback caso não esteja disponível */}
              <h3>{consulta.nutricionistaNome ? consulta.nutricionistaNome : 'Nutricionista não informado'}</h3>
              {/* Exibe as informações da consulta: data, horário e status do pagamento */}
              <p><strong>Data:</strong> {consulta.data}</p>
              <p><strong>Horário:</strong> {consulta.horario}</p>
              <p><strong>Pagamento:</strong> {consulta.pagamento}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-consultas">Nenhuma consulta encontrada.</p>  // Exibe mensagem caso não haja consultas
      )}
    </div>
  );
};

export default HistoricoConsultas;
