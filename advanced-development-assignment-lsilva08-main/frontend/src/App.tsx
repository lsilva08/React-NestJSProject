import React from 'react';
import AppRoutes from './config/router';
import { ChakraProvider } from '@chakra-ui/react'
import AuthenticationProvider from './contexts/authentication';

function App() {
  return (
    <ChakraProvider>
      <AuthenticationProvider>
        <AppRoutes />
      </AuthenticationProvider>
    </ChakraProvider>
  );
}

export default App;
