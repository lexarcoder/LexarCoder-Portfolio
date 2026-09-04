import React from 'react'
import AppRouter from "./routes/AppRouter";
import  "./shared/Global.scss"
import { AuthProvider } from './store/auth.context';

function App() {
  return (
    <>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </>
  );
}

export default App
