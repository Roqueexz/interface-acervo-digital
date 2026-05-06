import { type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import DetalhesLivro from "../../../components/Listagens/DetalhesLivro/DetalhesLivro";
import Rodape from "../../../components/Rodape/Rodape";
import { useParams } from "react-router-dom";


function PDetalhesLivro(): JSX.Element {
    const { id_livro } = useParams();  // Recebe o ID do registro acessado

    return (
        <div className="min-h-screen flex flex-col">
            <Navegacao />
            <DetalhesLivro id_livro={Number(id_livro)} />  {/* Envia o ID para o componente */}
            <Rodape />
        </div>
    );
}

export default PDetalhesLivro;