// Classe responsável por fazer requisições à API - aluno
import type AlunoDTO from "../dto/AlunoDTO";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3333";

class AlunoRequests {
  private serverURL;
  private endpointAluno;

  constructor() {
    this.serverURL = `${API_URL}`;
    this.endpointAluno = `/api/alunos`;
  }

  async obterListaDeAlunos() {
    try {
      const token = localStorage.getItem("token");

      const respostaAPI = await fetch(
        `${this.serverURL}${this.endpointAluno}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": `${token}`,
          },
        },
      );

      if (respostaAPI.ok) {
        const listaDeAlunos = await respostaAPI.json();
        return listaDeAlunos;
      } else {
        throw new Error("Não foi possível listar os alunos.");
      }
    } catch (error) {
      console.error(`Erro ao fazer a consulta de alunos. ${error}`);
      return;
    }
  }

  async obterAlunoPorId(id_aluno: number): Promise<AlunoDTO | undefined> {
    try {
      const token = localStorage.getItem("token");
      const respostaAPI = await fetch(
        `${this.serverURL}${this.endpointAluno}/${id_aluno}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": `${token}`,
          },
        },
      );

      if (respostaAPI.ok) {
        const aluno: AlunoDTO = await respostaAPI.json();
        return aluno;
      } else {
        throw new Error("Não foi possível buscar o aluno.");
      }
    } catch (error) {
      console.error(`Erro ao fazer a consulta de aluno por ID. ${error}`);
      return;
    }
  }

  async enviarFormularioAluno(formAluno: AlunoDTO): Promise<boolean> {
    try {
      const token = localStorage.getItem("token");
      const respostaAPI = await fetch(
        `${this.serverURL}${this.endpointAluno}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": `${token}`,
          },
          body: JSON.stringify(formAluno),
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

  async atualizarAluno(id_aluno: number, formAluno: AlunoDTO): Promise<boolean> {
    try {
      const token = localStorage.getItem("token");
      const respostaAPI = await fetch(
        `${this.serverURL}${this.endpointAluno}/${id_aluno}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": `${token}`,
          },
          body: JSON.stringify(formAluno),
        },
      );

      if (!respostaAPI.ok)
        throw new Error(
          `Erro ${respostaAPI.status}: ${respostaAPI.statusText}`,
        );

      console.info(`${respostaAPI.status}: ${respostaAPI.statusText}`);

      return true;
    } catch (error) {
      console.error(`Erro ao atualizar aluno na API. ${error}`);
      return false;
    }
  }

  async removerAluno(id_aluno: number): Promise<boolean> {
    try {
      const token = localStorage.getItem("token");
      const respostaAPI = await fetch(
        `${this.serverURL}${this.endpointAluno}/${id_aluno}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": `${token}`,
          },
        },
      );

      if (!respostaAPI.ok) {
        const errorData = await respostaAPI.json().catch(() => ({}));
        const errorMessage =
          errorData.mensagem ||
          `Erro ${respostaAPI.status}: ${respostaAPI.statusText}`;
        throw new Error(errorMessage);
      }

      console.info(`${respostaAPI.status} ${respostaAPI.statusText}`);

      return true;
    } catch (error) {
      console.error(`Erro ao fazer consulta à API. ${error}`);
      return false;
    }
  }
}

export default new AlunoRequests();
