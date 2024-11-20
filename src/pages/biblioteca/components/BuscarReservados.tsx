import { AsyncSearch } from "@/components/AsyncSearch";
import { Card } from "@/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Aluno, useAlunos } from "@/pages/alunos/api/alunos";
import { LibraryBig } from "lucide-react";
import { ReservadoPor } from "./ReservadosPor";
import { useState } from "react";
import { Button } from "@/components/ui/button";



export function BuscarReservados() {

    const { alunos } = useAlunos({
        search: ''
    })

    const alunosArray = Array.isArray(alunos) ? alunos : []

    const [selectReserva, setSelectReserva] = useState<number | string>('')
    const [nomeAluno, setNomeAluno] = useState('')
    console.log(nomeAluno)

    const [open, setOpen] = useState(false)

    console.log(selectReserva)

    return (
        <>
            <Dialog>
                <DialogTrigger>
                    <Card className="p-4 flex items-center justify-center cursor-pointer">
                        <LibraryBig size={64} />
                    </Card>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Buscar livros reservados</DialogTitle>
                        <DialogDescription>
                            Informe qual aluno você deseja visualizar os livros reservados
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
                    <Button onClick={() => setOpen(true)}>
                        <ReservadoPor nomeAluno={nomeAluno} open={open} alunoId={selectReserva} />
                    </Button>
                    <DialogClose>
                    </DialogClose>
                </DialogContent>
            </Dialog>
        </>
    )
}