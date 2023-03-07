import { Environment } from "../../../environment";
import { Api } from "../axios-config";

export interface IListagemPessoa {
  id: number;
  nomeCompleto: string;
  email: string;
  cidadeId: number;
}
export interface IDetalhePessoa {
  id: number;
  nomeCompleto: string;
  email: string;
  cidadeId: number;
}
type TPessoasComTotalCount = {
  data: IListagemPessoa[];
  totalCount: number;
};

const getAll = async (
  page = 1,
  filter = ""
): Promise<TPessoasComTotalCount | Error> => {
  try {
    const urlRelativa = `https://json-server-eosin.vercel.app/pessoas?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&nomeCompleto_like=${filter}`;

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
const getById = async (id: number): Promise<IDetalhePessoa | Error> => {
  try {
    const { data } = await Api.get(`https://json-server-eosin.vercel.app/pessoas/${id}`);

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
  dados: Omit<IDetalhePessoa, "id">
): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetalhePessoa>(`https://json-server-eosin.vercel.app/pessoas`, dados);

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
  dados: IDetalhePessoa
): Promise<void | Error> => {
  try {
    await Api.put(`https://json-server-eosin.vercel.app/pessoas${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao atualizar registro"
    );
  }
};
const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`https://json-server-eosin.vercel.app/pessoas${id}`);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro  ao atualizar registro"
    );
  }
};
export const PessoasService = {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
};
