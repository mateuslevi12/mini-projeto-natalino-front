import { Label } from "@/components/ui/label";
import { SheetTrigger, SheetContent, SheetHeader, SheetTitle, Sheet } from "@/components/ui/sheet";
import { useMatricula } from "../api/useMatricula";
import { Card } from "@/components/ui/card";
import { ClipboardList } from "lucide-react";
import { AsyncSearch } from "@/components/AsyncSearch";
import { Aluno, useAlunos } from "@/pages/alunos/api/alunos";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

export function DisciplinasMatriculados() {
    const { alunos } = useAlunos({ search: "" });
    const alunosArray = Array.isArray(alunos) ? alunos : [];

    const [selectReserva, setSelectReserva] = useState<number>(0);
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const { disciplinas, reload } = useMatricula({ alunoId: selectReserva });

    const handleSheetChange = async (open: boolean) => {
        setIsSheetOpen(open);
        if (!open) {
            setSelectReserva(0);
            await reload();
        }
    };

    return (
        <>
            <Sheet open={isSheetOpen} onOpenChange={handleSheetChange}>
                <SheetTrigger>
                    <Card className="p-4 flex items-center justify-center cursor-pointer">
                        <ClipboardList size={64} />
                    </Card>
                </SheetTrigger>
                <SheetContent side={"right"}>
                    <SheetHeader>
                        <SheetTitle>Selecione um aluno</SheetTitle>
                        <div className="flex flex-col items-start gap-2">
                            <Label htmlFor="username" className="text-right">
                                Nome do aluno
                            </Label>
                            <AsyncSearch<Aluno>
                                items={alunosArray}
                                setBody={(aluno) => {
                                    setSelectReserva(aluno.selected.value);
                                }}
                                body={selectReserva}
                                filterFunction={(aluno, inputValue) =>
                                    aluno?.nome?.toLowerCase().includes(inputValue.toLowerCase())
                                }
                                mapToOption={(aluno) => ({ label: aluno.nome, value: aluno.id })}
                            />
                        </div>
                    </SheetHeader>
                    <Separator className="my-4" />
                    <div className="flex flex-col gap-2">
                        <Label className="text-xl">Disciplinas</Label>
                        {disciplinas?.map((disciplina, index) => {
                            return (
                                <Label key={index}>
                                    {index + 1}. {disciplina.curso}
                                </Label>
                            );
                        })}
                        {disciplinas?.length === 0 && <Label>Nenhuma disciplina encontrada</Label>}
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
}
