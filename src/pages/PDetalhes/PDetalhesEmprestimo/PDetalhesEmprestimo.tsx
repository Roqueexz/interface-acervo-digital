import { type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import DetalhesEmprestimo from "../../../components/Listagens/DetalhesEmprestimos/DetalhesEmprestimos";
import Rodape from "../../../components/Rodape/Rodape";
import { useParams } from "react-router-dom";


function PDetalhesEmprestimo(): JSX.Element {
    const { id_emprestimo } = useParams();  // Recebe o ID do registro acessado

    return (
        <div className="min-h-screen flex flex-col">
            <Navegacao />
            <DetalhesEmprestimo id_emprestimo={Number(id_emprestimo)} />  {/* Envia o ID para o componente */}
            <Rodape />
        </div>
    );
}

export default PDetalhesEmprestimo;