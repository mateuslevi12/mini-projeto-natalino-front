interface Livro {
    id: number;
    titulo: string;
    autor: string;
    ano: number;
    status: string | null;
}
  import { api } from "@/api";
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
  