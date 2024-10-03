import { useState } from "react";
import api from "../../services/api"; // Certifique-se de que esta rota esteja correta

function AddParticipante() {
    const [formData, setFormData] = useState({
        cpf: '',
        nomecompleto: '',
        datanasc: '',
        distrito: '',
        igreja: '',
        confpagamento: false, // Padrão como "não"
        datainscricao: new Date().toISOString(),
    });
    const [fotoparticipante, setFotoParticipante] = useState(null); // Para armazenar a foto
    const [comprovantepag, setComprovantePag] = useState(null); // Para armazenar o comprovante
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (name === 'fotoparticipante') {
            setFotoParticipante(files[0]);
        } else if (name === 'comprovantepag') {
            setComprovantePag(files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const token = localStorage.getItem('token');
            const data = new FormData();

            // Adicionando os dados ao FormData
            Object.keys(formData).forEach((key) => {
                data.append(key, formData[key]);
            });

            // Adicionando os arquivos ao FormData
            if (fotoparticipante) {
                data.append('fotoparticipante', fotoparticipante);
            }
            if (comprovantepag) {
                data.append('comprovantepag', comprovantepag);
            }

            await api.post('/cadastro-participantes', data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            setMessage('Participante adicionado com sucesso!');
            // Limpar o formulário após o sucesso
            setFormData({
                cpf: '',
                nomecompleto: '',
                datanasc: '',
                distrito: '',
                igreja: '',
                confpagamento: false,
                datainscricao: new Date().toISOString(),
            });
            setFotoParticipante(null);
            setComprovantePag(null);
        } catch (error) {
            console.error("Erro ao adicionar participante:", error);
            setMessage(`Erro ao adicionar participante: ${error.response?.data?.message || error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">Adicionar Participante</h2>
            {message && <p className="text-center text-red-500 mb-4">{message}</p>}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-2 font-medium" htmlFor="nomecompleto">Nome Completo</label>
                        <input 
                            type="text" 
                            name="nomecompleto" 
                            id="nomecompleto" 
                            value={formData.nomecompleto} 
                            onChange={handleChange} 
                            required 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 font-medium" htmlFor="cpf">CPF</label>
                        <input 
                            type="text" 
                            name="cpf" 
                            id="cpf" 
                            value={formData.cpf} 
                            onChange={handleChange} 
                            required 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-2 font-medium" htmlFor="datanasc">Data de Nascimento</label>
                        <input 
                            type="date" 
                            name="datanasc" 
                            id="datanasc" 
                            value={formData.datanasc} 
                            onChange={handleChange} 
                            required 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 font-medium" htmlFor="distrito">Distrito</label>
                        <input 
                            type="text" 
                            name="distrito" 
                            id="distrito" 
                            value={formData.distrito} 
                            onChange={handleChange} 
                            required 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-2 font-medium" htmlFor="igreja">Igreja</label>
                        <input 
                            type="text" 
                            name="igreja" 
                            id="igreja" 
                            value={formData.igreja} 
                            onChange={handleChange} 
                            required 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 font-medium" htmlFor="comprovantepag">Comprovante</label>
                        <input 
                            type="file" 
                            name="comprovantepag" 
                            id="comprovantepag" 
                            onChange={handleFileChange} 
                            required 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1">
                    <div>
                        <label className="block mb-2 font-medium" htmlFor="fotoparticipante">Foto do Participante</label>
                        <input 
                            type="file" 
                            name="fotoparticipante" 
                            id="fotoparticipante" 
                            onChange={handleFileChange} 
                            required 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>
                <button 
                    type="submit" 
                    className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out"
                    disabled={loading}
                >
                    {loading ? 'Enviando...' : 'Adicionar Participante'}
                </button>
            </form>
        </div>
    );
}

export default AddParticipante;
