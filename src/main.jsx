import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components'; //importando o meu provedor de tema.
import GlobalStyles from './styles/global';

import { AuthProvider } from './hooks/auth'; //importando do meu contexto AuthContext do arquivo auth.js a função provider dele.

import theme from './styles/theme'; //importando meu arquivo theme que contém meu tema css central.

import { Routes } from './routes'; 



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
)

// Notas gerais deste arquivo:
// Aqui é meu arquivo js principal onde faço toda a lógica de alternância da SPA acontecer.
// Importo meus React e ReactDOM, este para usarmos a manipulação de elementos (DOM).
// Importo Default (e por isso dei o nome que quis) minhas configurações CSS comuns da Aplicação da pasta styles.
// Importo Default (e por isso dei o nome que quis) meu TEMA (paleta de cores) codada em CSS, que é comum em toda a Aplicação, da pasta styles.
// Importei a página Details, e farei isso com todas as demais.
// Manipulo com o ReactDOM os meus elementos HTML para inserção de conteúdo.
// Uso a tag <React.StrictMode> do React.
// Uso o tema de cores englobando tudo, e depois o CSS geral englobando o resto.
// Insiro as páginas que irão alternar