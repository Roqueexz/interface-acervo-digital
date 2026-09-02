import { type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import Rodape from "../../../components/Rodape/Rodape";
import { useParams } from "react-router-dom";
import FormAtualizarAluno from "../../../components/Formularios/FormAtualizarAluno/FormAtualizarAluno";

function PAtualizacaoAluno(): JSX.Element {
    const { id_aluno } = useParams();

    return (
        <div className="min-h-screen flex flex-col">
            <Navegacao />
            <FormAtualizarAluno id_aluno={Number(id_aluno)} />
            <Rodape />
        </div>
    );
}

export default PAtualizacaoAluno;
