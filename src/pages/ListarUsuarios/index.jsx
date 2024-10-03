import { useEffect, useState } from "react";
import api from "../../services/api";

function ListarUsuarios() {
    const [allUsuarios, setAllUsuarios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        async function loadUsuarios() {
            const token = localStorage.getItem('token');
            setLoading(true);
            try {
                const {
                    data: { usuarios },
                } = await api.get('/listar-usuarios', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setAllUsuarios(usuarios);
            } catch (error) {
                console.error("Erro ao carregar usuários:", error);
                setMessage('Erro ao carregar usuários');
            } finally {
                setLoading(false);
            }
        }

        loadUsuarios();
    }, []);

    // Função para enviar o reset de senha
    const handlePasswordReset = async (email) => {
        setLoading(true);
        setMessage('');
        try {
            const token = localStorage.getItem('token');
            await api.post('/solicitar-redefinicao', { email }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessage(`Email de redefinição de senha enviado para ${email}`);
        } catch (error) {
            setMessage(`Erro ao enviar redefinição de senha: ${error.response?.data?.message || error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto mt-10 bg-gray-50 p-10 border border-gray-200 rounded-xl shadow-lg">
            <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Lista de Usuários</h2>
            {message && <p className="text-center text-green-500 mb-4">{message}</p>}
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-indigo-600 text-white">
                            <th className="px-4 py-3 text-left font-semibold">Nome Completo</th>
                            <th className="px-4 py-3 text-left font-semibold">Email</th>
                            <th className="px-4 py-3 text-left font-semibold">Data de Nascimento</th>
                            <th className="px-4 py-3 text-left font-semibold">Cargo</th>
                            <th className="px-4 py-3 text-left font-semibold">Distrito</th>
                            <th className="px-4 py-3 text-left font-semibold">Igreja</th>
                            <th className="px-4 py-3 text-left font-semibold">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsuarios && allUsuarios.length > 0 ? (
                            allUsuarios.map((usuario, index) => (
                                <tr key={usuario.id} className={`border-b ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-gray-200`}>
                                    <td className="px-4 py-3 whitespace-nowrap">{usuario.nomecompleto}</td>
                                    <td className="px-4 py-3 whitespace-nowrap">{usuario.email}</td>
                                    <td className="px-4 py-3 whitespace-nowrap">{new Date(usuario.datanasc).toLocaleDateString()}</td>
                                    <td className="px-4 py-3 whitespace-nowrap">{usuario.cargo}</td>
                                    <td className="px-4 py-3 whitespace-nowrap">{usuario.distrito}</td>
                                    <td className="px-4 py-3 whitespace-nowrap">{usuario.igreja}</td>
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        <button 
                                            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 focus:outline-none"
                                            onClick={() => handlePasswordReset(usuario.email)}
                                            disabled={loading}
                                        >
                                            {loading ? 'Enviando...' : 'Redefinir Senha'}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center p-6">Nenhum usuário encontrado</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListarUsuarios;
