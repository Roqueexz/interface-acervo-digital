import { useState, useEffect, type JSX, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import EmprestimoRequests from '../../../fetch/EmprestimoRequests';
import type EmprestimoDTO from '../../../dto/EmprestimoDTO';
import Utilitario from '../../../utils/Utilitario';

interface FormAtualizarEmprestimoProps {
    id_emprestimo: number;
}

type FormAtualizarEmprestimoState = {
    aluno: {
        id_aluno: number
    },
    livro: {
        id_livro: number
    },
    data_emprestimo: string,
    data_devolucao: string,
    status_emprestimo: string
};

function FormAtualizarEmprestimo({ id_emprestimo }: FormAtualizarEmprestimoProps): JSX.Element {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);

    const [formData, setFormData] = useState<FormAtualizarEmprestimoState>({
        aluno: { id_aluno: 0 },
        livro: { id_livro: 0 },
        data_emprestimo: '',
        data_devolucao: '',
        status_emprestimo: 'Em Andamento'
    });

    // Carrega os dados atuais do empréstimo para preencher o formulário
    useEffect(() => {
        const carregarEmprestimo = async () => {
            try {
                setLoading(true);
                const emp = await EmprestimoRequests.obterEmprestimoPorId(id_emprestimo);
                if (emp) {
                    setFormData({
                        aluno: { id_aluno: emp.aluno?.id_aluno || 0 },
                        livro: { id_livro: emp.livro?.id_livro || 0 },
                        data_emprestimo: Utilitario.formatarDataParaInput(emp.data_emprestimo),
                        data_devolucao: emp.data_devolucao ? Utilitario.formatarDataParaInput(emp.data_devolucao) : '',
                        status_emprestimo: emp.status_emprestimo || 'Em Andamento'
                    });
                } else {
                    alert("Empréstimo não encontrado.");
                    navigate('/lista/emprestimos');
                }
            } catch (error) {
                console.error(`Erro ao carregar dados do empréstimo. ${error}`);
                alert("Erro ao buscar informações do empréstimo.");
            } finally {
                setLoading(false);
            }
        };

        if (id_emprestimo) {
            carregarEmprestimo();
        }
    }, [id_emprestimo, navigate]);

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

        const payload: EmprestimoDTO = {
            id_emprestimo: id_emprestimo,
            aluno: { id_aluno: formData.aluno.id_aluno },
            livro: { id_livro: formData.livro.id_livro },
            data_emprestimo: new Date(formData.data_emprestimo),
            data_devolucao: formData.data_devolucao ? new Date(formData.data_devolucao) : undefined,
            status_emprestimo: formData.status_emprestimo
        };

        const resposta = await EmprestimoRequests.atualizarEmprestimo(id_emprestimo, payload);
        if (resposta) {
            alert("Empréstimo atualizado com sucesso!");
            navigate('/lista/emprestimos');
        } else {
            alert("Erro ao atualizar empréstimo.");
        }
    };

    if (loading) {
        return (
            <main className="bg-gray-100 flex-1 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
                <p className="text-slate-600 text-lg font-medium">Carregando dados do empréstimo...</p>
            </main>
        );
    }

    return (
        <main className="bg-gray-100 flex-1 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 overflow-y-auto">
            <div className="max-w-3xl mx-auto">
                <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-2xl p-6 sm:p-10 border border-slate-200">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl text-center font-bold text-slate-800 mb-8 sm:mb-12">
                        Atualizar Empréstimo
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

                        {/* Linha 2: Datas de Empréstimo e Devolução */}
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex-1">
                                <label htmlFor="data_emprestimo" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Data do Empréstimo
                                </label>
                                <input
                                    type="date"
                                    name="data_emprestimo"
                                    id="data_emprestimo"
                                    required
                                    value={formData.data_emprestimo}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all"
                                />
                            </div>

                            <div className="flex-1">
                                <label htmlFor="data_devolucao" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Data de Devolução (Opcional)
                                </label>
                                <input
                                    type="date"
                                    name="data_devolucao"
                                    id="data_devolucao"
                                    value={formData.data_devolucao}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Linha 3: Status */}
                        <div>
                            <label htmlFor="status_emprestimo" className="block text-sm font-semibold text-slate-700 mb-2">
                                Status do Empréstimo
                            </label>
                            <select
                                name="status_emprestimo"
                                id="status_emprestimo"
                                value={formData.status_emprestimo}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all bg-white"
                            >
                                <option value="Em Andamento">Em Andamento</option>
                                <option value="Devolvido">Devolvido</option>
                                <option value="Finalizado">Finalizado</option>
                                <option value="Atrasado">Atrasado</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-10 sm:mt-14 space-y-4">
                        <input
                            type="submit"
                            value="ATUALIZAR EMPRÉSTIMO"
                            className="w-full bg-slate-800 text-white py-4 rounded-xl font-bold text-lg cursor-pointer hover:bg-slate-700 shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
                        />
                        <button
                            type="button"
                            onClick={() => navigate('/lista/emprestimos')}
                            className="w-full bg-white border-2 border-slate-300 text-slate-600 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all active:scale-[0.98] cursor-pointer"
                        >
                            VOLTAR PARA LISTAGEM
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default FormAtualizarEmprestimo;
