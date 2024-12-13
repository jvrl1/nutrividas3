import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Cadastro from './Paginas/Cadastro/Cadastro';
import Nutrividas from './Paginas/Nutrividas/Nutrividas';
import CadastroNutricionista from './Paginas/CadastroNutricionista/CadastroNutricionista';
import AgendarConsulta from './Paginas/AgendarConsulta/AgendarConsulta';
import VerificacaoCodigo from './Paginas/verificacaoCodigo/verificacaoCodigo';
import Login from './Paginas/Login/Login';
import HistoricoConsultas from './Paginas/HistoricoConsultas/HistoricoConsultas'; // Histórico do usuário
import HistoricoConsultasNutricionista from './Paginas/HistoricoConsultasNutricionista/HistoricoConsultasNutricionista'; // Histórico do nutricionista
import LoginNutricionista from './Paginas/LoginNutricionista/LoginNutricionista';  // Componente para login do nutricionista

function App() {
  // Verifica se o usuário ou nutricionista está logado
  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
  const nutricionistaLogado = JSON.parse(localStorage.getItem('nutricionistaLogado'));

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/cadastro" />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/nutricionistas" element={usuarioLogado ? <Nutrividas /> : <Navigate to="/login" />} />
          <Route path="/CadastroNutricionista" element={<CadastroNutricionista />} />
          <Route path="/agendarConsulta" element={usuarioLogado ? <AgendarConsulta /> : <Navigate to="/login" />} />
          <Route path="/verificacaoCodigo" element={usuarioLogado ? <VerificacaoCodigo /> : <Navigate to="/login" />} />
          <Route path="/nutrividas" element={nutricionistaLogado ? <Nutrividas /> : <Navigate to="/login-nutricionista" />} />
          <Route path="/login" element={usuarioLogado || nutricionistaLogado ? <Navigate to="/nutrividas" /> : <Login />} />
          <Route path="/login-nutricionista" element={nutricionistaLogado || usuarioLogado ? <Navigate to="/nutrividas" /> : <LoginNutricionista />} />  {/* Login Nutricionista */}
          <Route path="/historico-consultas" element={usuarioLogado ? <HistoricoConsultas /> : <Navigate to="/login" />} /> {/* Rota para Histórico de Consultas do Usuário */}
          <Route path="/historico-consultas-nutricionista" element={nutricionistaLogado ? <HistoricoConsultasNutricionista /> : <Navigate to="/login-nutricionista" />} /> {/* Rota para Histórico de Consultas do Nutricionista */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
