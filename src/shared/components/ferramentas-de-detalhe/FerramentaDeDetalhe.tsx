import { Box, Paper, useTheme, Button, Icon, Divider } from "@mui/material";
export const FerramentasDeDetalhes: React.FC = () => {
  const theme = useTheme();
  return (
    <Box
      marginX={1}
      paddingX={2}
      display="flex"
      gap={1}
      alignItems="center"
      height={theme.spacing(7)}
      component={Paper}
    >
      <Button
        variant="contained"
        color="primary"
        disableElevation
        startIcon={<Icon>save</Icon>}
      >
        Salvar
      </Button>
      <Button
        variant="outlined"
        color="primary"
        disableElevation
        startIcon={<Icon>save</Icon>}
      >
        Salver e Voltar
      </Button>
      <Button
        variant="outlined"
        color="primary"
        disableElevation
        startIcon={<Icon>delete</Icon>}
      >
        Apagar
      </Button>
      <Button
        variant="outlined"
        color="primary"
        disableElevation
        startIcon={<Icon>add</Icon>}
      >
        Novo
      </Button>
      <Divider orientation="vertical" flexItem variant="middle" />
      <Button
        variant="outlined"
        color="primary"
        disableElevation
        startIcon={<Icon>arrow_back</Icon>}
      >
        Voltar
      </Button>
    </Box>
  );
};
