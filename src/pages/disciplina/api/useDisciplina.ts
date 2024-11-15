interface Disciplina {
    id: number;
    curso: string;
    nome: string;
}

import { api } from "@/api";
import { useEffect, useState } from "react";

export function useDisciplina() {
    const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);

    useEffect(() => {
        reload();
    }, []);

    const reload = async () => {
        const response = await listDisciplinas();
        setDisciplinas(response);
    };

    return {
        disciplinas,
        reload,
    };
}

async function listDisciplinas(): Promise<Disciplina[]> {
    const { data } = await api.get(`/disciplinas`);
    return data;
}
