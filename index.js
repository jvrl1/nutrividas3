import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Importa o componente App
import { AuthProvider } from './AuthContext'; // Importa o AuthProvider

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById('root') // Monta o App dentro do elemento com id 'root'
);
