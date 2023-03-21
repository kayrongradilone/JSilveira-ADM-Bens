import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { CidadesService } from "../../shared/services/api/cidades/CidadesService";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { InquilinosService } from "../../shared/services/api/inquilinos/InquilinosService";

export const Dashboard = () => {
  const [isLoadingCidades, setIsLoadingCidades] = useState(true);
  const [isLoadingPessoas, setIsLoadingPessoas] = useState(true);
  const [isLoadingInquilinos, setIsLoadingInquilinos] = useState(true);
  const [totalCountCidades, setTotalCountCidades] = useState(0);
  const [totalCountPessoas, setTotalCountPessoas] = useState(0);
  const [totalCountInquilinos, setTotalCountInquilinos] = useState(0);

  useEffect(() => {
    setIsLoadingCidades(true);
    setIsLoadingPessoas(true);
    setIsLoadingInquilinos(true);

    CidadesService.getAll(1).then((result) => {
      setIsLoadingCidades(false);

      if (result instanceof Error) {
        alert(result.message);
      } else {
        console.log(result);

        setTotalCountCidades(result.totalCount);
      }
    });
    PessoasService.getAll(1).then((result) => {
      setIsLoadingPessoas(false);

      if (result instanceof Error) {
        alert(result.message);
      } else {
        console.log(result);

        setTotalCountPessoas(result.totalCount);
      }
    });
    InquilinosService.getAll(1).then((result) => {
      setIsLoadingInquilinos(false);

      if (result instanceof Error) {
        alert(result.message);
      } else {
        console.log(result);

        setTotalCountInquilinos(result.totalCount);
      }
    });
  }, []);
  return (
    <LayoutBaseDePagina
      titulo="JSilveira Administradora de Imóveis"
      barraDeFerramentas={<FerramentasDaListagem mostrarBotaoNovo={false} />}
    >
      <Box width="100%" display="flex">
        <Grid container margin={2}>
          <Grid item container spacing={2}>
            
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5" align="center">
                    Total de pessoas
                  </Typography>
                  <Box
                    padding={6}
                    display="flex"
                    justifyContent={"center"}
                    alignItems="center"
                  >
                    {!isLoadingPessoas && (
                      <Typography variant="h1">{totalCountPessoas}</Typography>
                    )}
                    {isLoadingPessoas && (
                      <Typography variant="h6">Carregando...</Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5" align="center">
                    Total de cidades
                  </Typography>
                  <Box
                    padding={6}
                    display="flex"
                    justifyContent={"center"}
                    alignItems="center"
                  >
                    {!isLoadingCidades && (
                      <Typography variant="h1">{totalCountCidades}</Typography>
                    )}
                    {isLoadingCidades && (
                      <Typography variant="h6">Carregando...</Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5" align="center">
                    Total de Inquilinos
                  </Typography>
                  <Box
                    padding={6}
                    display="flex"
                    justifyContent={"center"}
                    alignItems="center"
                  >
                    {!isLoadingInquilinos && (
                      <Typography variant="h1">{totalCountInquilinos}</Typography>
                    )}
                    {isLoadingInquilinos && (
                      <Typography variant="h6">Carregando...</Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </LayoutBaseDePagina>
  );
};
