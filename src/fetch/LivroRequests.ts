import type LivroDTO from "../dto/LivroDTO";

// Classe responsável por fazer requisições à API - livro
class LivroRequests {
    private serverUrl;
    private endpointLivro;

    constructor() {
        this.serverUrl = 'http://localhost:3333';
        this.endpointLivro = '/api/livros';
    }

    async obterListaDeLivros() {
        try {
            const token = localStorage.getItem('token');

            const respostaAPI = await fetch(`${this.serverUrl}${this.endpointLivro}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                }
            });

            if (respostaAPI.ok) {
                const listaDeAlunos = await respostaAPI.json();
                return listaDeAlunos;
            } else {
                throw new Error(`Não foi possível listar os livros.`);
            }
        } catch (error) {
            console.error(`Erro ao fazer a consulta de livros. ${error}`);
            return;
        }
    }

    async obterLivroPorId(id_livro: number): Promise<LivroDTO | undefined> {
        try {
            const token = localStorage.getItem('token');
            const respostaAPI = await fetch(`${this.serverUrl}${this.endpointLivro}/${id_livro}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                }
            });

            if (respostaAPI.ok) {
                const livro: LivroDTO = await respostaAPI.json();
                return livro;
            } else {
                throw new Error("Não foi possível buscar o livro.");
            }
        } catch (error) {
            console.error(`Erro ao fazer a consulta de livro por ID. ${error}`);
            return;
        }
    }
       async enviarFormularioLivro(formLivro: LivroDTO): Promise<boolean> {
            try {
                const token = localStorage.getItem('token');
                const respostaAPI = await fetch(`${this.serverUrl}${this.endpointLivro}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': `${token}`
                    },
                    body: JSON.stringify(formLivro)
                });
    
                if(!respostaAPI.ok) throw new Error(`Erro ${respostaAPI.status}: ${respostaAPI.statusText}`);
    
                console.info(`${respostaAPI.status}: ${respostaAPI.statusText}`);
    
                return true;
            } catch (error) {
                console.error(`Erro ao fazer consulta à API. ${error}`);
                return false;
            }
        }
}


export default new LivroRequests;