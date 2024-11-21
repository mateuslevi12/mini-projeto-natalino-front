
import { api } from "@/api";
import { useEffect, useState } from "react";

export interface Curso {
    curso: string;
    disciplinas: {
        id: number;
        curso: string;
        nome: string;
    }[];
}

export function useMatricula({ alunoId }: {
    alunoId: number;
}) {
    const [disciplinas, setDsiciplinas] = useState<Curso[]>([]);

    useEffect(() => {
        reload();
    }, [alunoId]);

    const reload = async () => {
        const response = await listDisciplinasDoAluno(alunoId);
        setDsiciplinas(response);
    };

    return {
        disciplinas,
        reload,
    };
}

async function listDisciplinasDoAluno(aluno: number): Promise<Curso[]> {
    const { data } = await api.get(`/matricula/buscar-disciplinas/${aluno}`);
    return data;
}

export async function matricular(alunoId: number, toast: any) {
    try {
        const { data } = await api.post(`/matricula/historia/${alunoId}`);
        toast({
            title: "Sucesso!",
            description: `Aluno matriculado com sucesso.`,
            status: "success", 
        });
        return data;
    } catch (error) {
        toast({
            title: "Erro",
            description: `Não foi possível realizar a matricula. Tente novamente.`,
            variant: "destructive",
        });
        throw error;
    }
}

export async function cancelarMatricula(alunoId: number, toast: any) {
    try {
        const { data } = await api.put(`/matricula/remover-matricula/${alunoId}`);
        toast({
            title: "Sucesso!",
            description: `Matricula cancelada com sucesso`,
            status: "success",
        });
        return data;
    } catch (error) {
        toast({
            title: "Erro ao cancelar matricula",
            description: `Não foi possível cancelar a reserva. Tente novamente.`,
            variant: "destructive",
        });
        throw error;
    }
}
