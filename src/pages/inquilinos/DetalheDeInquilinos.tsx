import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import * as yup from "yup";


import { InquilinosService } from "../../shared/services/api/inquilinos/InquilinosService";

import { LayoutBaseDePagina } from "../../shared/layouts";
import { VTextField, VForm , useVForm, IVFormErrors } from "../../shared/forms";
import { FerramentasDeDetalhes } from "../../shared/components";
import { AutoCompleteCidade } from "./components/AutoCompleteCidade";

interface IFormData {
  email: string;
  cidadeId: number;
  nomeInquilino: string;
  sala: number;
  imovel: string;
  label: string;  
  
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  nomeInquilino: yup.string().required().min(3),
  email: yup.string().required().email(),
  cidadeId: yup.number().required(),
  sala: yup.number().required(),
  imovel: yup.string().required(),
  label: yup.string().required()

})

export const DetalheDeInquilinos: React.FC = () => {
  const { id = "novo" } = useParams<"id">();
  const navigate = useNavigate();

  const {formRef , isSaveAndClose,save,saveAndClose} = useVForm();

  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState("");

  useEffect(() => {
    if (id !== "novo") {
      setIsLoading(true);

      InquilinosService.getById(Number(id)).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
          navigate("/inquilinos");
        } else {
          setNome(result.nomeInquilino);
          formRef.current?.setData(result);
        }
      });
    }else {
      formRef.current?.setData({
        nomeInquilino: '',
        email: '',
        cidadeId: undefined,
        sala: undefined,
        imovel: '',
        nome: ''
      })
    }
  }, [id]);

  const handleSave = (dados: IFormData) => {
    formValidationSchema.
      validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        setIsLoading(true);

        if (id === 'novo') {
          InquilinosService
            .create(dadosValidados)
            .then((result) => {
              setIsLoading(false);

              if (result instanceof Error) {
                alert(result.message);
              } else {
                if (isSaveAndClose()) {
                  navigate('/inquilinos');
                } else {
                  navigate(`/inquilinos/detalhe/${result}`);
                }
              }
            });
        } else {
          InquilinosService
            .updateById(Number(id), { id: Number(id), ...dadosValidados })
            .then((result) => {
              setIsLoading(false);

              if (result instanceof Error) {
                alert(result.message);
              } else {
                if (isSaveAndClose()) {
                  navigate('/inquilinos');
                }
              }
            });
        }
      })
    .catch((errors: yup.ValidationError) =>{
      const validationErrors: IVFormErrors = {};

      errors.inner.forEach(error => {
        if(!error.path) return;
        validationErrors[error.path] = error.message;
      })
      formRef.current?.setErrors(validationErrors);
    })
    
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Realmente deseja apagar?")) {
      InquilinosService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert("Registro apagado com sucesso!");
          navigate("/inquilinos");
        }
      });
    }
  };

  return (
    <LayoutBaseDePagina
      titulo={id === "novo" ? "Nova pessoa" : nome}
      barraDeFerramentas={
        <FerramentasDeDetalhes
          textoBotaoNovo="Nova"
          mostrarBotaoSalvarEFechar
          mostrarBotaoNovo={id !== "novo"}
          mostrarBotaoApagar={id !== "novo"}
          aoClicarEmSalvar={save}
          aoClicarEmSalvarEFechar={saveAndClose}
          aoClicarEmVoltar={() => navigate("/inquilinos")}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmNovo={() => navigate("/inquilinos/detalhe/novo")}
        />
      }
    >
      <VForm ref={formRef} onSubmit={handleSave}>
        <Box
          margin={1}
          display="flex"
          flexDirection="column"
          component={Paper}
          variant="outlined"
        >
          <Grid container direction="column" padding={2} spacing={2}>
            {isLoading && (
              <Grid item>
                <LinearProgress variant="indeterminate" />
              </Grid>
            )}
            {id === "novo" ? (
              <Grid item>
                <Typography variant="h6">Cadastro</Typography>
              </Grid>
            ) : (
              <Grid item>
                <Typography variant="h6">Editar Pessoa</Typography>
              </Grid>
            )}
            <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                  <VTextField
                    fullWidth
                    label="Sala"
                    name="sala"
                    disabled={isLoading}
                  />
                </Grid>
              </Grid>
              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                  <VTextField
                    fullWidth
                    label="Imóvel"
                    name="imovel"
                    disabled={isLoading}
                  />
                </Grid>
              </Grid>
            <Grid container item direction="row" spacing={2}>
              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                  <VTextField
                    fullWidth
                    label="Nome Inquilino"
                    name="nomeInquilino"
                    disabled={isLoading}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                  <VTextField
                    fullWidth
                    label="Email"
                    name="email"
                    disabled={isLoading}
                  />
                </Grid>
              </Grid>
              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                  <AutoCompleteCidade isExternalLoading={isLoading}/>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </VForm>
    </LayoutBaseDePagina>
  );
};
