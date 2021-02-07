import React from 'react';

import GlobalStyles from './styles/global';

import SignIn from './pages/SignIn/index';
// import SignUp from './pages/SignUp/index';

const App: React.FC = () => {
  return (
    <>
      <SignIn />
      <GlobalStyles />
    </>
  );
};

export default App;
