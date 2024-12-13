// src/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Começa com arrays vazios para os emails e senhas
  const [emailsCadastrados, setEmailsCadastrados] = useState([]);
  const [senhasCadastradas, setSenhasCadastradas] = useState([]);

  const adicionarUsuario = (email, senha) => {
    // Adiciona um novo usuário aos arrays
    setEmailsCadastrados((prev) => [...prev, email]);
    setSenhasCadastradas((prev) => [...prev, senha]);
  };

  // Carrega dados do localStorage na inicialização
  useEffect(() => {
    const emailsSalvos = JSON.parse(localStorage.getItem('emails'));
    const senhasSalvas = JSON.parse(localStorage.getItem('senhas'));

    if (emailsSalvos) setEmailsCadastrados(emailsSalvos);
    if (senhasSalvas) setSenhasCadastradas(senhasSalvas);
  }, []);

  // Salva dados no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('emails', JSON.stringify(emailsCadastrados));
    localStorage.setItem('senhas', JSON.stringify(senhasCadastradas));
  }, [emailsCadastrados, senhasCadastradas]);

  return (
    <AuthContext.Provider value={{ emailsCadastrados, senhasCadastradas, adicionarUsuario }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
