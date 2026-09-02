import type UsuarioDTO from "../dto/UsuarioDTO";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3333";

class UsuarioRequests {
  private serverURL: string;
  private endpointLogin: string;
  private endpointUsuario: string;

  constructor() {
    this.serverURL = `${API_URL}`;
    this.endpointLogin = "/api/login";
    this.endpointUsuario = "/api/usuarios";
  }

  /**
   * Realiza a autenticação do usuário no servidor
   * @param login - email e senha
   * @returns boolean indicando sucesso
   */
  async login(login: { email: string; senha: string }): Promise<boolean> {
    try {
      const response = await fetch(`${this.serverURL}${this.endpointLogin}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(login),
      });

      if (!response.ok) {
        console.error("Erro na autenticação");
        throw new Error("Falha no login");
      }

      const data = await response.json();

      if (data.auth) {
        this.persistToken(data.token, data.usuario, data.auth);
      }

      return true;
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      throw error;
    }
  }

  /**
   * Obtém a lista de usuários
   */
  async obterListaDeUsuarios(): Promise<UsuarioDTO[] | undefined> {
    try {
      const token = localStorage.getItem("token");
      const respostaAPI = await fetch(
        `${this.serverURL}${this.endpointUsuario}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": `${token}`,
          },
        },
      );

      if (respostaAPI.ok) {
        return await respostaAPI.json();
      }
      throw new Error("Não foi possível listar os usuários.");
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      return;
    }
  }

  /**
   * Persiste as informações do token e usuário no localStorage
   */
  persistToken(
    token: string,
    usuario: { id_usuario: number; nome: string; email: string; role: string },
    isAuth: boolean,
  ) {
    localStorage.setItem("token", token);
    localStorage.setItem("nome", usuario.nome);
    localStorage.setItem("idUsuario", (usuario.id_usuario ?? "").toString());
    localStorage.setItem("email", usuario.email);
    localStorage.setItem("role", usuario.role);
    localStorage.setItem("isAuth", isAuth.toString());
  }

  /**
   * Remove token e informações de autenticação do localStorage
   */
  removeToken() {
    const keys = ["token", "nome", "idUsuario", "email", "role", "isAuth"];
    keys.forEach((key) => localStorage.removeItem(key));
    window.location.href = `/login`;
  }

  /**
   * Verifica a validade do token JWT armazenado
   */
  checkTokenExpiry(): boolean {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const expiry = payload.exp;
        const now = Math.floor(Date.now() / 1000);
        if (expiry < now) {
          this.removeToken();
          return false;
        }
        return true;
      } catch {
        this.removeToken();
        return false;
      }
    }
    return false;
  }
}

export default new UsuarioRequests();