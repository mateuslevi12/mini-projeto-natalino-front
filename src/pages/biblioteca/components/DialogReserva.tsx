import { AsyncSearch } from "@/components/AsyncSearch"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { BookX, CalendarDays } from "lucide-react"
import { cancelarReserva, reservar, useBiblioteca } from "../api/useBiblioteca"
import { useState } from "react"
import { Aluno, useAlunos } from "@/pages/alunos/api/alunos"
import { useToast } from "@/hooks/use-toast"

interface IReservaProps {
    type: 'reservar' | 'cancelar',
    // biblioteca: Livro[]
}

export function DialogReserva({ type }: IReservaProps) {

    const { biblioteca, reload } = useBiblioteca()
    const { alunos } = useAlunos({
        search: ""
    })

    const [selectReserva, setSelectReserva] = useState({
        livro: "",
        aluno: 0
    })

    console.log(selectReserva)

    const { toast } = useToast()

    const typeConfig = {
        'reservar': {
            title: <CalendarDays size={64} />,
            dialogTitle: "Reservar livro",
            dialogDescription: "Preencha os campos abaixo para reservar um livro",
            action: async () => {await reservar({
                aluno: selectReserva.aluno,
                livro: selectReserva.livro,
            }, toast); await reload()},
            labelAluno: 'Quem vai reservar?',
            labelLivro: 'Livro a ser reservado'
        },
        'cancelar': {
            title: <BookX size={64} />,
            dialogTitle: "Cancelar reserva",
            dialogDescription: "Preencha os campos abaixo para cancelar uma reserva",
            action: async () => {await cancelarReserva({
                aluno: selectReserva.aluno,
                livro: selectReserva.livro,
            }, toast), await reload()},
            labelAluno: 'Aluno responsavel pela reserva',
            labelLivro: 'Livro reservado'
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Card className="p-4 flex items-center justify-center cursor-pointer">
                    {typeConfig[type].title}
                </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{typeConfig[type].dialogTitle}</DialogTitle>
                    <DialogDescription>
                        {typeConfig[type].dialogDescription}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex flex-col items-start gap-2">
                        <Label htmlFor="name" className="text-right">
                        {typeConfig[type].labelLivro}
                        </Label>
                        <AsyncSearch
                            items={biblioteca}
                            setBody={(livro) => setSelectReserva((prev) => ({ ...prev, livro: livro.selected.value }))}
                            body={selectReserva.livro}
                            filterFunction={(livro, inputValue) =>
                                livro.titulo?.toLowerCase().includes(inputValue.toLowerCase())
                            }
                            mapToOption={(livro) => ({ label: livro.titulo, value: livro.titulo })}
                            placeholder="Pesquisar livro..."
                        />

                    </div>
                    <div className="flex flex-col items-start gap-2">
                        <Label htmlFor="username" className="text-right">
                           {typeConfig[type].labelAluno}
                        </Label>
                        <AsyncSearch<Aluno>
                            items={alunos}
                            setBody={(aluno) => setSelectReserva((prev) => ({ ...prev, aluno: aluno.selected.value }))}
                            body={selectReserva.aluno}
                            filterFunction={(aluno, inputValue) =>
                                aluno?.nome?.toLowerCase().includes(inputValue.toLowerCase())
                            }
                            mapToOption={(aluno) => ({ label: aluno.nome, value: aluno.id })}
                            placeholder="Pesquisar aluno..."
                        />

                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={async () => await typeConfig[type].action()} type="submit">Confirmar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
