export interface Aluno {
  id: number;
  nome: string;
  curso: string;
  modalidade: 'Presencial' | 'EAD';
  status: 'Ativo' | 'Trancado';
}

import { api } from "@/api";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useEffect, useState } from "react";

export function useAlunos({
  search
}: {
  search?: string | number
}) {
  const [alunos, setAlunos] = useState<Aluno[] | Aluno>([]);
  const { toast } = useToast();

  useEffect(() => {
    reload();
  }, [search]);

  const reload = async () => {
    try {
      const response = await listAlunos(search);
      setAlunos(response);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast({
          title: "Erro ao carregar alunos",
          description: error.response?.data?.message || "Erro desconhecido",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Erro ao carregar alunos",
          description: "Erro desconhecido",
          variant: "destructive",
        });
      }
    }
  };

  return {
    alunos,
    reload,
  };
}

async function listAlunos(search?: string | number): Promise<Aluno[] | Aluno> {
  const { data } = await api.get(`/alunos/${search}`);
  return data;
}
