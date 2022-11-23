import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDeDetalhes } from "../../shared/components";

export const DetalheDePessoas: React.FC = () => {
    const {id = 'nova'} = useParams<'id'>()
    const navigate = useNavigate();
    return (
        <LayoutBaseDePagina 
        titulo="Detalhe de Pessoas"
        barraDeFerramentas={
            <FerramentasDeDetalhes
            textoBotaoNovo="Nova"
            mostrarBotaoApagar={id !== 'nova'}
            mostrarBotaoNovo={id !== 'nova'}
            mostrarBotaoSalvarEFechar

            aoClicarEmSalvar={() => {}}
            aoClicarEmApagar={() => {}}
            aoClicarEmNovo={() => {}}
            aoClicarEmVoltar={() => navigate('/pessoas')}
            aoClicarEmSalvarEFechar={() => navigate('/pessoas/detalhe/nova')}
            />
        }
        >
        
        </LayoutBaseDePagina>
    )
}