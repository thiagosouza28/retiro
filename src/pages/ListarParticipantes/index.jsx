import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="flex">
      {/* Botão Hamburger para Dispositivos Móveis */}
      <button
        className="p-4 text-white bg-indigo-600 md:hidden"
        onClick={toggleMenu}
      >
        ☰
      </button>

      {/* Menu Lateral */}
      <nav className={`fixed top-0 left-0 h-full bg-indigo-600 text-white flex flex-col transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative md:flex md:w-64`}>
        <div className="p-4 text-2xl font-bold flex justify-between items-center">
          <span>Menu</span>
          <button className="text-white md:hidden" onClick={toggleMenu}>
            X
          </button>
        </div>
        <MenuItem to="/listar-participantes">Participantes</MenuItem>
        <MenuItem to="/cadastro-participantes">Cadastro de Participantes</MenuItem>
        <MenuItem to="/cadastro-usuarios">Cadastro de Usuários</MenuItem>
        <MenuItem to="/listar-usuarios">Lista de Usuários</MenuItem>
        <MenuItem to="/login">Login</MenuItem>
      </nav>

      {/* Conteúdo Principal */}
      <main className="flex-grow p-4">
        <h1 className="text-2xl font-bold">Bem-vindo ao Dashboard!</h1>
        <ListarParticipantes />
      </main>
    </div>
  );
};

// Componente para Itens do Menu
const MenuItem = ({ to, children }) => (
  <Link to={to} className="py-2 px-4 hover:bg-indigo-500">
    {children}
  </Link>
);

// Componente ListarParticipantes
function ListarParticipantes() {
  const [allParticipantes, setAllParticipantes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function loadParticipantes() {
      const token = localStorage.getItem('token');
      setLoading(true);
      try {
        const { data: { participantes } } = await api.get('/listar-participantes', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setAllParticipantes(participantes);
      } catch (error) {
        console.error("Erro ao carregar participantes:", error);
      } finally {
        setLoading(false);
      }
    }

    loadParticipantes();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-gray-50 p-10 border border-gray-200 rounded-xl shadow-lg">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Lista de Participantes</h2>
      {message && <p className="text-center text-green-500 mb-4">{message}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="px-4 py-3 text-left font-semibold">Nome Completo</th>
              <th className="px-4 py-3 text-left font-semibold">CPF</th>
              <th className="px-4 py-3 text-left font-semibold">Data de Nascimento</th>
              <th className="px-4 py-3 text-left font-semibold">Idade</th>
              <th className="px-4 py-3 text-left font-semibold">Distrito</th>
              <th className="px-4 py-3 text-left font-semibold">Igreja</th>
              <th className="px-4 py-3 text-left font-semibold">Comprovante</th>
              <th className="px-4 py-3 text-left font-semibold">Confirmação de Pagamento</th>
              <th className="px-4 py-3 text-left font-semibold">Data da Inscrição</th>
              <th className="px-4 py-3 text-left font-semibold">Ações</th>
            </tr>
          </thead>
          <tbody>
            {allParticipantes && allParticipantes.length > 0 ? (
              allParticipantes.map((participantes, index) => (
                <tr key={participantes.id} className={`border-b ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-gray-200`}>
                  <td className="px-4 py-3 whitespace-nowrap">{participantes.nomecompleto}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{participantes.cpf}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{new Date(participantes.datanasc).toLocaleDateString()}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{participantes.idade}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{participantes.distrito}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{participantes.igreja}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <a href={participantes.comprovantepag} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Visualizar</a>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">{participantes.confpagamento ? 'Sim' : 'Não'}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{new Date(participantes.datainscricao).toLocaleDateString()}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <button 
                      className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 focus:outline-none"
                      onClick={() => handlePasswordReset(participantes.email)} // Assuming participants have an email field
                      disabled={loading}
                    >
                      {loading ? 'Enviando...' : 'Redefinir Senha'}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center p-6">Nenhum participante encontrado</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListarParticipantes;
