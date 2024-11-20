export interface Livro {
  id: number;
  titulo: string;
  autor: string;
  ano: number;
  status: string | null;
}
import { api } from "@/api";
import { ToastActionElement } from "@/components/ui/toast";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

export function useBiblioteca() {
  const [biblioteca, setBiblioteca] = useState<Livro[]>([]);

  useEffect(() => {
    reload();
  }, []);

  const reload = async () => {
    const response = await listLivros();
    setBiblioteca(response);
  };

  return {
    biblioteca,
    reload,
  };
}



async function listLivros(): Promise<Livro[]> {
  const { data } = await api.get(`/livros`);
  return data;
}

export async function listReservados(alunoId: string | number): Promise<Livro[]> {
  const { data } = await api.get(`/livros/reservados/${alunoId}`);
  return data;
}

export async function reservar(body: { aluno: number; livro: string }, toast: any) {
  try {
      const { data } = await api.post(`/livros/reservar/${body.aluno}`, {
          titulo: body.livro,
      });
      toast({
          title: "Reserva feita com sucesso!",
          description: `O livro "${body.livro}" foi reservado.`,
          status: "success", // ajuste o estilo do toast com base na biblioteca utilizada
      });
      return data;
  } catch (error) {
    const err = error as AxiosError;
    const message = err.response?.data?.error?.message || "Erro desconhecido.";
      toast({
          title: "Erro ao reservar",
          description: `Não foi possível realizar a reserva. Tente novamente. ${message}`,
          variant: "destructive",
      });
      throw error; 
  }
}

export async function cancelarReserva(body: { aluno: number; livro: string }, toast: any) {
  try {
      const { data } = await api.put(`/livros/cancelar-reserva/${body.livro}`, {
          titulo: body.livro,
      });
      toast({
          title: "Reserva cancelada com sucesso!",
          description: `A reserva do livro "${body.livro}" foi cancelada.`,
          status: "success",
      });
      return data;
  } catch (error) {
      const err = error as AxiosError;
      const message = err.response?.data?.error?.message || "Erro desconhecido.";
      toast({
          title: "Erro ao cancelar reserva",
          description: `Não foi possível cancelar a reserva. Tente novamente. ${message}`,
          variant: "destructive",
      });
      throw error; 
  }
}
