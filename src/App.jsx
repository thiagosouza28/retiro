import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CadastroUsuarios from './pages/CadastroUsuarios';
import ListarUsuarios from './pages/ListarUsuarios';
import Login from './pages/Login';
import CadastroParticipantes from './pages/CadastroParticipantes';
import ListarParticipantes from "./pages/ListarParticipantes";
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-2xl font-bold text-center">Sistema de controle de participantes</h1>
      </header>
      <div className="flex">
        <Dashboard />
        <main className="flex-grow p-6">
          <Routes>
            <Route path="/cadastro-usuarios" element={<CadastroUsuarios />} />
            <Route path="/listar-usuarios" element={<ListarUsuarios />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro-participantes" element={<CadastroParticipantes />} />
            <Route path="/listar-participantes" element={<ListarParticipantes />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
