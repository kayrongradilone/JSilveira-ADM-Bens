import { Environment } from "../../../environment";
import { Api } from "../axios-config";

export interface IListagemInquilinos {
  id: number;
  nomeInquilino: string;
  email: string;
  cidadeId: number;
  sala: number;
  imovel: string;
}
export interface IDetalheInquilinos {
    id: number;
    nomeInquilino: string;
    email: string;
    cidadeId: number;
    sala: number;
    imovel: string;
}
type TInquilinosComTotalCount = {
  data: IListagemInquilinos[];
  totalCount: number;
};

const getAll = async (
  page = 1,
  filter = ""
): Promise<TInquilinosComTotalCount | Error> => {
  try {
    const urlRelativa = `https://json-server-eosin.vercel.app/inquilinos?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&nomeInquilino_like=${filter}`;

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
const getById = async (id: number): Promise<IDetalheInquilinos | Error> => {
  try {
    const { data } = await Api.get(`https://json-server-eosin.vercel.app/inquilinos/${id}`);

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
  dados: Omit<IDetalheInquilinos, "id">
): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetalheInquilinos>(`https://json-server-eosin.vercel.app/Inquilinos`, dados);

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
  dados: IDetalheInquilinos
): Promise<void | Error> => {
  try {
    await Api.put(`https://json-server-eosin.vercel.app/inquilinos${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao atualizar registro"
    );
  }
};
const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`https://json-server-eosin.vercel.app/inquilinos${id}`);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro  ao atualizar registro"
    );
  }
};
export const InquilinosService = {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
};
