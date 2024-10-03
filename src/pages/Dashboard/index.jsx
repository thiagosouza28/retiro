import React, { useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import ListarParticipantes from "../ListarParticipantes"; // Assegure-se de que o caminho esteja correto

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true); // Estado para controlar a exibição da mensagem de boas-vindas
  const location = useLocation(); // Hook para obter a localização atual

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLinkClick = (path) => {
    if (path !== location.pathname) {
      setShowWelcome(false); // Oculta a mensagem de boas-vindas quando um link é clicado
    }
  };

  return (
    <div className="flex h-screen">
      {/* Botão Hamburger para Dispositivos Móveis */}
      <button
        className="p-4 text-white bg-indigo-600 md:hidden"
        onClick={toggleMenu}
      >
        ☰
      </button>

      {/* Menu Lateral */}
      <nav className={`fixed top-0 left-0 h-full bg-indigo-600 text-white flex flex-col transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:flex md:w-64`}>
        <div className="p-4 text-2xl font-bold flex justify-between items-center">
          <span>Menu</span>
          <button className="text-white md:hidden" onClick={toggleMenu}>
            X
          </button>
        </div>
        <MenuItem to="/" onClick={() => handleLinkClick("/")}>Dashboard</MenuItem>
        <MenuItem to="/listar-participantes" onClick={() => handleLinkClick("/listar-participantes")}>Participantes</MenuItem>
        <MenuItem to="/cadastro-participantes" onClick={() => handleLinkClick("/cadastro-participantes")}>Cadastro de Participantes</MenuItem>
        <MenuItem to="/cadastro-usuarios" onClick={() => handleLinkClick("/cadastro-usuarios")}>Cadastro de Usuários</MenuItem>
        <MenuItem to="/listar-usuarios" onClick={() => handleLinkClick("/listar-usuarios")}>Lista de Usuários</MenuItem>
        <MenuItem to="/login" onClick={() => handleLinkClick("/login")}>Login</MenuItem>
      </nav>

      {/* Conteúdo Principal */}
      <main className="flex-grow flex items-center justify-center p-4">
        {showWelcome ? (
          <h1 className="text-2xl font-bold">Bem-vindo ao Dashboard!</h1>
        ) : (
          <Routes>
            <Route path="/listar-participantes" element={<ListarParticipantes />} />
            {/* Adicione outras rotas aqui */}
          </Routes>
        )}
      </main>
    </div>
  );
};

// Componente para Itens do Menu
const MenuItem = ({ to, children, onClick }) => (
  <Link to={to} className="py-2 px-4 hover:bg-indigo-500" onClick={onClick}>
    {children}
  </Link>
);

export default Dashboard;
