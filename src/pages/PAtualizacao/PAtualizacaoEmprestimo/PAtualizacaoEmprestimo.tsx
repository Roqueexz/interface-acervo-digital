import { type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import Rodape from "../../../components/Rodape/Rodape";
import { useParams } from "react-router-dom";
import FormAtualizarEmprestimo from "../../../components/Formularios/FormAtualizarEmprestimo/FormAtualizarEmprestimo";

function PAtualizacaoEmprestimo(): JSX.Element {
    const { id_emprestimo } = useParams();

    return (
        <div className="min-h-screen flex flex-col">
            <Navegacao />
            <FormAtualizarEmprestimo id_emprestimo={Number(id_emprestimo)} />
            <Rodape />
        </div>
    );
}

export default PAtualizacaoEmprestimo;
