import { Box } from "@mui/material";
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { useSearchParams } from "react-router-dom";
import { useEffect, useMemo } from "react";

export const ListagemDePessoas: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const busca = useMemo(() => {
      return  searchParams.get('busca') || ''
    },[searchParams]);

    useEffect(() => {

    },[])

  return (
    <LayoutBaseDePagina
      titulo="Listagem de Pessoas"
      barraDeFerramentas={
        <FerramentasDaListagem
          textoBotaoNovo="Nova"
          mostrarInputBusca
          textoDaBusca={busca}
          aoMudarTextoDeBusca={(texto) => setSearchParams({busca: texto}, {replace: true})}
        />
      }
    >
      <Box> Lista de Pessoas</Box>
    </LayoutBaseDePagina>
  );
};
