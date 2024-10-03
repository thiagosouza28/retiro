import { useRef } from "react";
import { Link } from "react-router-dom";
import api from '../../services/api';

function CadastroUsuarios() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const datanascRef = useRef();
    const cargoRef = useRef();
    const distritoRef = useRef();
    const igrejaRef = useRef();

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            await api.post('/cadastro-usuarios', {
                nomecompleto: nameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value,
                datanasc: datanascRef.current.value,
                cargo: cargoRef.current.value,
                distrito: distritoRef.current.value,
                igreja: igrejaRef.current.value,
            });
            alert("Usuário Cadastrado");
        } catch (err) {
            alert("Erro ao cadastrar usuário");
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Cadastro</h2>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <input ref={nameRef} placeholder="Nome Completo" type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" />
                <input ref={emailRef} placeholder="E-mail" type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" />
                <input ref={passwordRef} placeholder="Senha" type="password" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" />
                <input ref={datanascRef} placeholder="Data de Nascimento" type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" />
                <select ref={cargoRef} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none">
                    <option value="">Selecione o Cargo</option>
                    <option value="direto jovem">Direto Jovem</option>
                    <option value="administrador">Administrador</option>
                </select>
                <input ref={distritoRef} placeholder="Distrito" type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" />
                <input ref={igrejaRef} placeholder="Igreja" type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" />
                <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-400">Cadastrar-se</button>
            </form>
            <Link to="/login" className="text-blue-700 hover:underline mt-4 block text-center">Já tem uma conta? Faça login</Link>
        </div>
    );
}

export default CadastroUsuarios;
