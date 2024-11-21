import { AsyncSearch } from "@/components/AsyncSearch";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Aluno, useAlunos } from "@/pages/alunos/api/alunos";
import { GraduationCap, TicketX } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cancelarMatricula, matricular } from "../api/useMatricula";

interface IMatriculaProps {
    type: 'matricular' | 'cancelar',
    // reservas: Reserva[]
}

export function DialogMatricula({ type }: IMatriculaProps) {

    const { alunos, reload } = useAlunos({
        search: ''
    })

    const alunosArray = Array.isArray(alunos) ? alunos : []

    const [selectReserva, setSelectReserva] = useState<number>(0)
    const [nomeAluno, setNomeAluno] = useState('')
    console.log(nomeAluno)

    console.log(selectReserva)

    const { toast } = useToast()

    const typeConfig = {
        'matricular': {
            title: <GraduationCap size={64} />,
            dialogTitle: "Matricular aluno",
            dialogDescription: "Preencha o campo abaixo para matricular um aluno",
            action: async () => {await matricular(selectReserva, toast); await reload()}
        },
        'cancelar': {
            title: <TicketX size={64} />,
            dialogTitle: "Cancelar matricula",
            dialogDescription: "Preencha o campo abaixo para cancelar uma matricula",
            action: async () => {await cancelarMatricula(selectReserva, toast); await reload()},
        }
    }

    return (
        <>
            <Dialog>
                <DialogTrigger>
                    <Card className="p-4 flex items-center justify-center cursor-pointer">
                    {typeConfig[type].title}
                    </Card>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{typeConfig[type].dialogTitle}</DialogTitle>
                        <DialogDescription>
                        {typeConfig[type].dialogDescription}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col items-start gap-2">
                        <Label htmlFor="username" className="text-right">
                            Nome do aluno
                        </Label>
                        <AsyncSearch<Aluno> items={alunosArray} setBody={(aluno) => {setSelectReserva(aluno.selected.value); setNomeAluno(aluno.selected.label)}} body={selectReserva}
                            filterFunction={(aluno, inputValue) =>
                                aluno?.nome?.toLowerCase().includes(inputValue.toLowerCase())
                            }
                            mapToOption={(aluno) => ({ label: aluno.nome, value: aluno.id })} />
                    </div>
                    <Button onClick={async () => await typeConfig[type].action()}>
                        Confirmar
                    </Button>
                </DialogContent>
            </Dialog>
        </>
    )
}