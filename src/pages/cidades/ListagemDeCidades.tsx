import { Box } from "@mui/material";
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";

export const ListagemDeCidades: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const busca = useMemo(() => {
      return  searchParams.get('busca') || ''
    },[searchParams]);
  return (
    <LayoutBaseDePagina
      titulo="Listagem de Cidades"
      barraDeFerramentas={
        <FerramentasDaListagem
          textoBotaoNovo="Nova"
          mostrarInputBusca
          textoDaBusca={busca}
          aoMudarTextoDeBusca={(texto) => setSearchParams({busca: texto}, {replace: true})}
        />
      }
    >
      <Box> Lista de Cidades</Box>
    </LayoutBaseDePagina>
  );
};
