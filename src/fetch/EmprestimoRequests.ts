import type EmprestimoDTO from "../dto/EmprestimoDTO";
const API_URL = import.meta.env.VITE_API_URL;

// Classe responsável por fazer requisições à API - emprestimo
class EmprestimoRequests {
  private serverURL;
  private endpointEmprestimo;

  constructor() {
    this.serverURL = `${API_URL}`;
    this.endpointEmprestimo = "/api/emprestimos";
  }

  async obterListaDeEmprestimos() {
    try {
      const token = localStorage.getItem("token");

      const respostaAPI = await fetch(
        `${this.serverURL}${this.endpointEmprestimo}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": `${token}`,
          },
        },
      );

      if (respostaAPI.ok) {
        const listaDeEmprestimos = await respostaAPI.json();
        return listaDeEmprestimos;
      } else {
        throw new Error("Não foi possível listar os empréstimos.");
      }
    } catch (error) {
      console.error(`Erro ao fazer a consulta de empréstimos. ${error}`);
      return;
    }
  }
  async obterEmprestimoPorId(
    id_emprestimo: number,
  ): Promise<EmprestimoDTO | undefined> {
    try {
      const token = localStorage.getItem("token");
      const respostaAPI = await fetch(
        `${this.serverURL}${this.endpointEmprestimo}/${id_emprestimo}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": `${token}`,
          },
        },
      );

      if (respostaAPI.ok) {
        const emprestimo: EmprestimoDTO = await respostaAPI.json();
        return emprestimo;
      } else {
        throw new Error("Não foi possível buscar o emprestimo.");
      }
    } catch (error) {
      console.error(`Erro ao fazer a consulta de emprestimo por ID. ${error}`);
      return;
    }
  }
  async enviarFormularioEmprestimo(
    formEmprestimo: EmprestimoDTO,
  ): Promise<boolean> {
    try {
      const token = localStorage.getItem("token");
      const respostaAPI = await fetch(
        `${this.serverURL}${this.endpointEmprestimo}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": `${token}`,
          },
          body: JSON.stringify(formEmprestimo),
        },
      );

      if (!respostaAPI.ok)
        throw new Error(
          `Erro ${respostaAPI.status}: ${respostaAPI.statusText}`,
        );

      console.info(`${respostaAPI.status}: ${respostaAPI.statusText}`);

      return true;
    } catch (error) {
      console.error(`Erro ao fazer consulta à API. ${error}`);
      return false;
    }
  }
}

export default new EmprestimoRequests();
