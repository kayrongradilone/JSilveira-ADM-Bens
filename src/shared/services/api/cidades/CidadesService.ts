import { Api } from "../axios-config";
import { Environment } from "../../../environment";


export interface IListagemCidade {
  id: number;
  nome: string;
  
}
export interface IDetalheCidade {
  id: number;
  nome: string;
  
}
type TCidadesComTotalCount = {
  data: IListagemCidade[];
  totalCount: number;
};

const getAll = async (
  page = 1,
  filter = ""
): Promise<TCidadesComTotalCount | Error> => {
  try {
    const urlRelativa = `https://json-server-eosin.vercel.app/cidades?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&nome_like=${filter}`;

    const { data, headers } = await Api.get(urlRelativa);

    if (data) {
      return {
        data,
        totalCount: Number(
          headers["x-total-count"] || Environment.LIMITE_DE_LINHAS
        ),
      };
    }

    return new Error("Erro na listagem de registros");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro na listagem de registros"
    );
  }
};
const getById = async (id: number): Promise<IDetalheCidade | Error> => {
  try {
    const { data } = await Api.get(`https://json-server-eosin.vercel.app/cidades/${id}`);

    if (data) {
      return data;
    }
    return new Error("Erro na consulta de registro");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro na consulta de registro"
    );
  }
};
const create = async (
  dados: Omit<IDetalheCidade, "id">
): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetalheCidade>(`https://json-server-eosin.vercel.app/cidades`, dados);

    if (data) {
      return data.id;
    }
    return new Error("Erro ao criar registro");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro  ao criar registro"
    );
  }
};
const updateById = async (
  id: number,
  dados: IDetalheCidade
): Promise<void | Error> => {
  try {
    await Api.put(`https://json-server-eosin.vercel.app/cidades/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao atualizar registro"
    );
  }
};
const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`https://json-server-eosin.vercel.app/cidades/${id}`);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro  ao atualizar registro"
    );
  }
};
export const CidadesService = {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
};
