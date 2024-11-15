import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";
import { useAlunos } from "./api/alunos";
import { Card, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Page } from "@/layout";

export function Alunos() {

    const [search, setSearch] = useState<string>('')
    const { alunos, reload } = useAlunos({
        search
    })

    return (
        <Page breadcrumbItems={[
            { title: 'Home', url: '/' },
            { title: 'Alunos', url: '/alunos' }
        ]}>
            <div className="flex flex-col gap-4">
                <p>Alunos</p>
                <div className="w-full flex gap-2">
                    <Input onChange={(e) => setSearch(e.target.value)} className="w-full" placeholder="Pesquise por ID ou Nome..." />
                    <Button onClick={async () => { await reload() }}>
                        <Search />
                    </Button>
                </div>
                <Separator />
                {
                    Array.isArray(alunos) ? alunos.map(aluno => {
                        return (
                            <>
                                <Card className="p-4">
                                    <CardTitle>{aluno.nome}</CardTitle>
                                    <p>Curso: {aluno.curso}</p>
                                    <p>Modalidade: {aluno.modalidade}</p>
                                    <p>Status: {aluno.status}</p>
                                </Card>
                            </>
                        )
                    }) : <Card className="p-4">
                        <CardTitle>{alunos.nome}</CardTitle>
                        <p>Curso: {alunos.curso}</p>
                        <p>Modalidade: {alunos.modalidade}</p>
                        <p>Status: {alunos.status}</p>
                    </Card>
                }
            </div>
        </Page>
    )
}