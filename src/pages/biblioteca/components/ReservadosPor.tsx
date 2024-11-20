import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useAlunos } from "@/pages/alunos/api/alunos"
import { useEffect, useState } from "react"
import { listReservados, Livro } from "../api/useBiblioteca"
import { Label } from "@/components/ui/label"


export function ReservadoPor({ alunoId, open, nomeAluno }: { alunoId: number, nomeAluno: string, open: boolean }) {

    const { alunos } = useAlunos({
        search: alunoId
    })

    console.log('alunoId', alunoId)

    const aluno = !Array.isArray(alunos) ? alunos : null

    const [reservadosPor, setReservadosPor] = useState<Livro[]>()

    useEffect(() => {
        if (!open) {
            return;
        }

        const fetchReservados = async () => {
            try {
                const response = await listReservados(alunoId);
                setReservadosPor(response)
                console.log(response);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        };

        fetchReservados();
    }, [alunoId, open]);

    return (
        <Sheet>
            <SheetTrigger disabled={!alunoId}>Confirmar</SheetTrigger>
            <SheetContent side={"right"}>
                <SheetHeader>
                    <SheetTitle>Livros reservados por {nomeAluno}</SheetTitle>
                    <SheetDescription>
                        {
                            reservadosPor?.map(reservado => {
                                return (
                                    <>
                                        <Label><span className="font-bold">{reservado?.titulo}</span>, {reservado?.autor}</Label>
                                    </>
                                )
                            })
                        }
                        {
                            reservadosPor?.length === 0 &&
                            <Label>Nenhum livro reservado.</Label>
                        }
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>


    )
}