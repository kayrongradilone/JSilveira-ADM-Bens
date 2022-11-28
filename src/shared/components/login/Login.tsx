import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { useState } from "react";
import { useAuthContext } from "../../contexts";
import * as yup from "yup";

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(5),
});

interface ILoginProps {
  children: React.ReactNode;
}
export const Login: React.FC<ILoginProps> = ({ children }) => {
  const { isAuthenticated, login } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    loginSchema
      .validate({ email, password }, { abortEarly: false })
      .then((dadosValidados) => {
        setIsLoading(true);
        login(dadosValidados.email, dadosValidados.password).then(() => {
          setIsLoading(false);
        });
      })
      .catch((errors: yup.ValidationError) => {
        setIsLoading(false);
        errors.inner.forEach((error) => {
          if (error.path === "email") {
            setEmailError(error.message);
          } else if (error.path === "password") {
            setPasswordError(error.message);
          }
        });
      });
  };
  if (isAuthenticated) return <>{children}</>;
  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap={2}
    >
      <img
        src="https://lh3.googleusercontent.com/zbw-8Ihm-9OQcXbgKifaRQifQ_UNOJ6cPKVCHpTUku4pCdrKJpS4Xe2fomDkrNZ16uoauS55pPOyjOtppBJNW7aObQOSAONzi8K-mXTEs-wlD2sE7VoBn8hVv3sEprUaBDU4i8ukWKcIlIUT6IqqM2g_m7D-UCuzmhzGpyTMzmxIgTqfZ-0YHYZ7_ICTtIhxeFuJUx8pS1o8952FtjBGX1kdpMl3n-KCJhtlnGy8_ZeHKqSQs69wVMutKxhHhwoPaHOZDHVWlIYFCamBiO9ftfiHSyzQ79kv9i50Rz_73KTewt97V2mZ95wfnHOH9P7BJ0c3PH-kKCuays-VGHuihf873GUBLXizxwRXO_SL3poE_VJrbUHO9JOIMtKkEg1XTOzMt_z-SYJ-QkkbnUkM9Bi67lA53Lg_-Jh_okVY-Co8IfTDazcn4n6JPAveu9D6CkF11rhdgtZCmOZhF52pCMwouQrGzCj46Lak66fo__Dwr7qlH6zytU8plEBh8XCdggwhpbkzX-SAW62hkxNlaojAHduXGRFQ0aJoi8dOXnR3PJS0w65eTX3Dhw7-L41Tpvu3SRcE9uL_sRRgR0KqGN23N8irENFj7A7T6Jyh0HwM55B3Z4D_l99NccCWHKW3nexNIx3bRuSbXhsFmLYSa-uPv7jhGK_0B6RteIlwQg3U9dE2Yqu-jdtUfQudvfgVla2-LQNV6nt9oRFcCjr_lxJ19ubBY03cXCg0yCXDLIh4smqHht9d9Eq2JJYIwYfqRRx-Si2iDuGgI5W7VMa1eMzzCYZ12zl1sqHdLzE8wY3r5bR2wcZlaJWRoetcxdXfCgqeU5pkos5bfIemrKgglpxrKtocbReAwcchzZyvqlnI4Kxmu_LS54f9Ugw02ErefQoG2F6YgoJHz3zvVRvFByh3OxJ2GdBTSYk66aSg_ohTMeJkfQ=s649-no?authuser=0"
        alt="logo"
      ></img>

      <Card>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={2} width={350}>
            <Typography variant="h6" align="center">
              JSilveira Administradora de Imóveis
            </Typography>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              disabled={isLoading}
              error={!!emailError}
              helperText={emailError}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={() => setEmailError("")}
            />
            <TextField
              fullWidth
              label="Senha"
              type="password"
              value={password}
              disabled={isLoading}
              error={!!passwordError}
              helperText={passwordError}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={() => setPasswordError("")}
            />
          </Box>
        </CardContent>
        <CardActions>
          <Box width="100%" display="flex" justifyContent="center">
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={isLoading}
              endIcon={
                isLoading ? (
                  <CircularProgress
                    variant="indeterminate"
                    color="inherit"
                    size={20}
                  />
                ) : undefined
              }
            >
              Entrar
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};
