import { useState, type JSX, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import EmprestimoRequests from '../../../fetch/EmprestimoRequests';
import type EmprestimoDTO from '../../../dto/EmprestimoDTO';


type FormEmprestimoState = {
    aluno: {
        id_aluno: number
    },
    livro: {
        id_livro: number
    },
    data_emprestimo: string,
    status_emprestimo: string
};

function FormEmprestimo(): JSX.Element {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<FormEmprestimoState>({
        aluno: { id_aluno: 0 },
        livro: { id_livro: 0 },
        data_emprestimo: new Date().toISOString().split('T')[0],
        status_emprestimo: 'Em Andamento'
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const finalValue = type === 'number' ? Number(value) : value;

        if (name === 'id_aluno') {
            setFormData(prev => ({
                ...prev,
                aluno: { ...prev.aluno, id_aluno: finalValue as number }
            }));
            return;
        }

        if (name === 'id_livro') {
            setFormData(prev => ({
                ...prev,
                livro: { ...prev.livro, id_livro: finalValue as number }
            }));
            return;
        }

        setFormData(prev => ({ ...prev, [name]: finalValue }));
    };

    // Envia os dados para a requisição
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // evita o recarregamento da página
        
        // Converte o estado plano para a estrutura aninhada que o EmprestimoDTO/Backend espera
        const payload: EmprestimoDTO = {
            id_emprestimo: 0,
            aluno: { id_aluno: formData.aluno.id_aluno },
            livro: { id_livro: formData.livro.id_livro },
            data_emprestimo: new Date(formData.data_emprestimo),
            status_emprestimo: formData.status_emprestimo
        };

        const resposta = await EmprestimoRequests.enviarFormularioEmprestimo(payload);
        if (resposta) {
            alert("Empréstimo cadastrado com sucesso!");
            navigate('/lista/emprestimos'); // Redireciona após sucesso
        } else {
            alert("Erro ao cadastrar empréstimo.");
        }
    };

    return (
        <main className="bg-gray-100 flex-1 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 overflow-y-auto">
            <div className="max-w-3xl mx-auto">
                <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-2xl p-6 sm:p-10 border border-slate-200">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl text-center font-bold text-slate-800 mb-8 sm:mb-12">
                        Novo Empréstimo
                    </h1>

                    <div className="space-y-6 sm:space-y-8">
                        {/* Linha 1: IDs de Aluno e Livro */}
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex-1">
                                <label htmlFor="id_aluno" className="block text-sm font-semibold text-slate-700 mb-2">
                                    ID do Aluno
                                </label>
                                <input
                                    type="number"
                                    name="id_aluno"
                                    id="id_aluno"
                                    required
                                    min={1}
                                    value={formData.aluno.id_aluno}
                                    onChange={handleChange}
                                    placeholder="Ex: 123"
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>

                            <div className="flex-1">
                                <label htmlFor="id_livro" className="block text-sm font-semibold text-slate-700 mb-2">
                                    ID do Livro
                                </label>
                                <input
                                    type="number"
                                    name="id_livro"
                                    id="id_livro"
                                    required
                                    min={1}
                                    value={formData.livro.id_livro}
                                    onChange={handleChange}
                                    placeholder="Ex: 456"
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>
                        </div>

                        {/* Linha 2: Data e Status */}
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex-1">
                                <label htmlFor="data_emprestimo" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Data do Empréstimo
                                </label>
                                <input
                                    type="date"
                                    name="data_emprestimo"
                                    id="data_emprestimo"
                                    value={formData.data_emprestimo}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all"
                                />
                            </div>

                            <div className="flex-1">
                                <label htmlFor="status_emprestimo" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Status Inicial
                                </label>
                                <select
                                    name="status_emprestimo"
                                    id="status_emprestimo"
                                    value={formData.status_emprestimo}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all bg-white"
                                >
                                    <option value="Em Andamento">Em Andamento</option>
                                    <option value="Finalizado">Finalizado</option>
                                    <option value="Atrasado">Atrasado</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 sm:mt-14 space-y-4">
                        <input
                            type="submit"
                            value="CADASTRAR EMPRÉSTIMO"
                            className="w-full bg-slate-800 text-white py-4 rounded-xl font-bold text-lg cursor-pointer hover:bg-slate-700 shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
                        />
                        <button
                            type="button"
                            onClick={() => navigate('/lista/emprestimos')}
                            className="w-full bg-white border-2 border-slate-300 text-slate-600 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all active:scale-[0.98]"
                        >
                            VOLTAR PARA LISTAGEM
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default FormEmprestimo;