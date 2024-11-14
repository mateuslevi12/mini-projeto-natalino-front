interface Aluno {
  id: number;
  nome: string;
  curso: string;
  modalidade: 'Presencial' | 'EAD';
  status: 'Ativo' | 'Trancado';
}

import { api } from "@/api";
import { useEffect, useState } from "react";

export function useAlunos({
  search
}: {
  search?: string
}) {
  const [alunos, setAlunos] = useState<Aluno[] | Aluno>([]);

  useEffect(() => {
    reload();
  }, []);

  const reload = async () => {
    const response = await listAlunos(search);
    setAlunos(response);
  };

  return {
    alunos,
    reload,
  };
}

async function listAlunos(search?: string): Promise<Aluno[] | Aluno> {
  const { data } = await api.get(`/alunos/${search}`);
  return data;
}
