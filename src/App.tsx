import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyles from './styles/global';

import { AuthProvider } from './context/AuthContext';

import Routes from './routes/index';

const App: React.FC = () => {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </AuthProvider>

      <GlobalStyles />
    </>
  );
};

export default App;
