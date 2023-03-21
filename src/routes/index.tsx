import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, DetalheDePessoas, ListagemDePessoas } from "../pages";
import { DetalheDeCidades } from "../pages/cidades/DetalheDeCidades";
import { ListagemDeCidades } from "../pages/cidades/ListagemDeCidades";
import { useDrawerContext } from "../shared/contexts";

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        label: "Pagina Inicial",
        path: "/pagina-inicial",
        icon: "home",
      },
      {
        label: "Cidades",
        path: "/cidades",
        icon: "location_city",
      },
      {
        label: "Pessoas",
        path: "/pessoas",
        icon: "people",
      },
      {
        label: "Inquilinos",
        path: "/inquilinos",
        icon: "money",
      },
    ]);
  }, []);
  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />
      <Route path="/pessoas" element={<ListagemDePessoas />} />
      <Route path="/pessoas/detalhe/:id" element={<DetalheDePessoas/>} />
      <Route path="/cidades" element={<ListagemDeCidades />} />
      <Route path="/cidades/detalhe/:id" element={<DetalheDeCidades/>} />
      <Route path="/inquilinos" element={<ListagemDeCidades />} />
      <Route path="/inquilinos/detalhe/:id" element={<DetalheDeCidades/>} />
      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};
