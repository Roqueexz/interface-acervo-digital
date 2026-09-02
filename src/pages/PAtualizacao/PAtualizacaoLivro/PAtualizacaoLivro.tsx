import { type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import Rodape from "../../../components/Rodape/Rodape";
import { useParams } from "react-router-dom";
import FormAtualizarLivro from "../../../components/Formularios/FormAtualizarLivro/FormAtualizarLivro";

function PAtualizacaoLivro(): JSX.Element {
    const { id_livro } = useParams();

    return (
        <div className="min-h-screen flex flex-col">
            <Navegacao />
            <FormAtualizarLivro id_livro={Number(id_livro)} />
            <Rodape />
        </div>
    );
}

export default PAtualizacaoLivro;
