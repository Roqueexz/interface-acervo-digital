import { useState, type JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import LivroRequests from '../../../fetch/LivroRequests';
import type LivroDTO from '../../../dto/LivroDTO';


function FormLivro(): JSX.Element {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<LivroDTO>({
        titulo: '',
        autor: '',
        editora: '',
        ano_publicacao: '',
        isbn: '',
        quant_total: 0,
        quant_disponivel: 0,
        quant_aquisicao: 0,
        valor_aquisicao: 0
    });

    // Atualiza o state a partir de qualquer input do formulário
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;

        // Converte para número se o input for do tipo number
        const finalValue = type === 'number' ? Number(value) : value;
        
        setFormData(prev => ({ ...prev, [name]: finalValue }));
    };

    // Envia os dados para a requisição
    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault(); // evita o recarregamento da página
        
        // chama o método que irá fazer a requisição à API para cadastrar o livro
        const resposta = await LivroRequests.enviarFormularioLivro(formData);
        if (resposta) {
            alert("Livro cadastrado com sucesso!");
            navigate('/lista/livros'); // Redireciona após sucesso
        } else {
            alert("Erro ao cadastrar livro.");
        }
    };

    return (
        <main className="bg-gray-100 flex-1 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 overflow-y-auto">
            <div className="max-w-3xl mx-auto">
                <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-2xl p-6 sm:p-10 border border-slate-200">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl text-center font-bold text-slate-800 mb-8 sm:mb-12">
                        Cadastro de Livro
                    </h1>

                    <div className="space-y-6 sm:space-y-8">
                        {/* Linha 1: Título e Autor */}
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex-1">
                                <label htmlFor="titulo" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Título
                                </label>
                                <input
                                    type="text"
                                    name="titulo"
                                    id="titulo"
                                    required
                                    onChange={handleChange}
                                    placeholder="Ex: O Senhor dos Anéis"
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>

                            <div className="flex-1">
                                <label htmlFor="autor" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Autor
                                </label>
                                <input
                                    type="text"
                                    name="autor"
                                    id="autor"
                                    required
                                    onChange={handleChange}
                                    placeholder="Nome do autor"
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>
                        </div>

                        {/* Linha 2: Editora e ISBN */}
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex-1">
                                <label htmlFor="editora" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Editora
                                </label>
                                <input
                                    type="text"
                                    name="editora"
                                    id="editora"
                                    required
                                    onChange={handleChange}
                                    placeholder="Nome da editora"
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all"
                                />
                            </div>

                            <div className="flex-1">
                                <label htmlFor="isbn" className="block text-sm font-semibold text-slate-700 mb-2">
                                    ISBN
                                </label>
                                <input
                                    type="text"
                                    name="isbn"
                                    id="isbn"
                                    required
                                    onChange={handleChange}
                                    placeholder="000-00-000-0000-0"
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>
                        </div>

                        {/* Linha 3: Ano e Quantidades */}
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="w-full sm:w-1/3">
                                <label htmlFor="ano_publicacao" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Ano
                                </label>
                                <input
                                    type="text"
                                    name="ano_publicacao"
                                    id="ano_publicacao"
                                    required
                                    onChange={handleChange}
                                    placeholder="Ex: 2024"
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>

                            <div className="w-full sm:w-1/3">
                                <label htmlFor="quant_total" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Qtd. Total
                                </label>
                                <input
                                    type="number"
                                    name="quant_total"
                                    id="quant_total"
                                    min={0}
                                    required
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>

                            <div className="w-full sm:w-1/3">
                                <label htmlFor="valor_aquisicao" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Valor (R$)
                                </label>
                                <input
                                    type="number"
                                    name="valor_aquisicao"
                                    id="valor_aquisicao"
                                    step="0.01"
                                    min={0}
                                    required
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 sm:mt-14 space-y-4">
                        <input
                            type="submit"
                            value="CADASTRAR LIVRO"
                            className="w-full bg-slate-800 text-white py-4 rounded-xl font-bold text-lg cursor-pointer hover:bg-slate-700 shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
                        />
                        <button
                            type="button"
                            onClick={() => navigate('/lista/livros')}
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

export default FormLivro;