import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

// Componente que exibe as informações de um nutricionista
const CartaoNutricionista = ({ nome, descricao, endereco, nutricionista, onClick }) => {
  return (
    <div className="col-sm-6 mb-4">
      <div className="divisao" style={{
        border: '2px solid lightgreen', // Definição de borda e estilo do cartão
        borderRadius: '10px',
        padding: '15px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        margin: '10px 0',
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
      }}>
        <h3 style={{ textAlign: 'center', color: 'green' }}>{nome}</h3>
        <address style={{ textAlign: 'center', color: 'green'}}>{descricao}</address>
        <address style={{ textAlign: 'center', color: 'green'}}>Endereço: {endereco}</address>
        <button
          type="button"
          className="btn btn-success"
          onClick={() => onClick(nutricionista)} // Ação ao clicar no botão de agendar consulta
        >
          Marque Sua Consulta
        </button>
      </div>
    </div>
  );
};

// Componente principal que lista os nutricionistas
const Nutrividas = () => {
  const navigate = useNavigate(); // Hook para navegação entre páginas
  const [nutricionistas, setNutricionistas] = useState([]); // Estado para armazenar os nutricionistas
  const [carregando, setCarregando] = useState(true); // Estado para controlar o carregamento

  // useEffect para buscar os nutricionistas ao carregar o componente
  useEffect(() => {
    const fetchNutricionistas = async () => {
      try {
        // Requisição para buscar nutricionistas do backend
        const response = await fetch("http://localhost:8080/nutricionista/all");
        if (!response.ok) {
          throw new Error('Erro ao buscar dados'); // Caso a resposta não seja ok, lança erro
        }
        const data = await response.json(); // Converte a resposta para JSON
        setNutricionistas(data); // Atualiza o estado com os dados recebidos
      } catch (error) {
        console.error('Erro:', error); // Exibe o erro no console
      } finally {
        setCarregando(false); // Ao final do carregamento, atualiza o estado
      }
    };

    fetchNutricionistas(); // Chama a função para buscar os nutricionistas
  }, []); // A dependência vazia [] garante que a requisição seja feita apenas uma vez ao carregar o componente

  // Função que redireciona para a página de agendamento de consulta
  const redirecionarAgendarConsulta = (nutricionista) => {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado')); // Obtém o usuário logado do localStorage
    const usuarioId = usuarioLogado?.id;

    // Verifica se o usuário está logado antes de permitir agendamento
    if (!usuarioId) {
      alert('Caso você seja nutricionista, faça seu cadastro para marcar consulta com outra nutricionista.');
      return;
    }

    // Redireciona para a página de agendamento de consulta com os dados do nutricionista
    navigate('/agendarConsulta', {
      state: {
        nutricionista,
        usuarioId,
        nomeNutricionista: nutricionista.nome // Passa o nome do nutricionista
      }
    });
  };

  // Função para redirecionar para a página de histórico de consultas
  const redirecionarVerConsultas = () => {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado')); // Obtém o usuário logado do localStorage
    const usuarioId = usuarioLogado?.id;

    // Verifica se o usuário está logado antes de permitir acesso ao histórico de consultas
    if (!usuarioId) {
      alert('Por favor, faça login para verificar suas consultas.');
      return;
    }

    // Redireciona para a página de histórico de consultas
    navigate('/historico-consultas', { state: { usuarioId } });
  };

  return (
    <div style={{ backgroundColor: 'rgb(200, 255, 200)' }}>
      <header className="container-fluid cabecalho" style={{ padding: '20px 0' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-md text-center text-md-start">
              <h1 style={{ color: 'darkgreen', margin: '0' }}>
                Nutrividas <img src="NutrividasLogo.png" className="imagem" alt="Logo Nutrividas" style={{ maxWidth: '100px' }} />
              </h1>
            </div>
            <div className="col-12 col-md text-center">
              <h1 style={{ color: 'darkgreen', margin: '0' }}>Nutricionistas</h1>
            </div>
            <nav className="col-12 col-md text-center text-md-end" style={{ marginTop: '20px' }}>
              <button 
                className="btn btn-outline-success mx-3 verificar-consultas"
                onClick={redirecionarVerConsultas}
                style={{
                  border: '2px solid darkgreen',
                  borderRadius: '25px',
                  padding: '10px 20px',
                  color: 'darkgreen',
                  backgroundColor: 'transparent',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease-in-out',
                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
                }}
                // Efeitos de hover para o botão de consultas agendadas
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'darkgreen';
                  e.target.style.color = 'white';
                  e.target.style.boxShadow = '0px 6px 8px rgba(0, 0, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = 'darkgreen';
                  e.target.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
                }}
              >
                Verificar Consultas Agendadas
              </button>
            </nav>
          </div>
        </div>
      </header>

      <div className="container" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
        <div className="titulo text-center" style={{ color: 'green' }}>
          <h1>Encontre o mais perto de você</h1>
        </div>

        {carregando ? (
          <div className="text-center">
            <p>Carregando nutricionistas...</p>
          </div>
        ) : (
          <div className="row">
            {nutricionistas.map((nutricionista) => (
              <CartaoNutricionista
                key={nutricionista.id}
                nome={nutricionista.nome}
                descricao={nutricionista.descricao}
                endereco={nutricionista.endereco}
                nutricionista={nutricionista}
                onClick={redirecionarAgendarConsulta} // Passa a função de redirecionamento para cada cartão
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Nutrividas;
