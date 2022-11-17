import { Box, Paper, useTheme, Button, Icon, Divider } from "@mui/material";

interface IFerramentasDeDetalhesProps {
  textoBotaoNovo?: string;
  mostrarBotaoNovo?: boolean;
  mostrarBotaoVoltar?: boolean;
  mostrarBotaoApagar?: boolean;
  mostrarBotaoSalvar?: boolean;
  mostrarBotaoSalvarEFechar?: boolean;
  aoClicarEmNovo?: () => void;
  aoClicarEmVoltar?: () => void;
  aoClicarEmApagar?: () => void;
  aoClicarEmSalvar?: () => void;
  aoClicarEmSalvarEFechar?: () => void;
}
export const FerramentasDeDetalhes: React.FC<IFerramentasDeDetalhesProps> = ({
  textoBotaoNovo = "Novo",
  mostrarBotaoNovo = true,
  mostrarBotaoVoltar = true,
  mostrarBotaoApagar = true,
  mostrarBotaoSalvar = true,
  mostrarBotaoSalvarEFechar = false,
  aoClicarEmNovo,
  aoClicarEmVoltar,
  aoClicarEmApagar,
  aoClicarEmSalvar,
  aoClicarEmSalvarEFechar,
}) => {
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
      {mostrarBotaoSalvar && (
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={aoClicarEmSalvar}
          startIcon={<Icon>save</Icon>}
        >
          Salvar
        </Button>
      )}
      {mostrarBotaoSalvarEFechar && (
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          onClick={aoClicarEmSalvarEFechar}
          startIcon={<Icon>save</Icon>}
        >
          Salvar e Voltar
        </Button>
      )}
      {mostrarBotaoApagar && (
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          onClick={aoClicarEmApagar}
          startIcon={<Icon>delete</Icon>}
        >
          Apagar
        </Button>
      )}
      {mostrarBotaoNovo && (
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          onClick={aoClicarEmNovo}
          startIcon={<Icon>add</Icon>}
        >
          {textoBotaoNovo}
        </Button>
      )}
      <Divider orientation="vertical" flexItem variant="middle" />
      {mostrarBotaoVoltar && (
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          onClick={aoClicarEmVoltar}
          startIcon={<Icon>arrow_back</Icon>}
        >
          Voltar
        </Button>
      )}
    </Box>
  );
};
