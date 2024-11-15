import { Separator } from "@/components/ui/separator";
import { Card, CardTitle } from "@/components/ui/card";
import { useDisciplina } from "./api/useDisciplina";
import { Page } from "@/layout";

export function Disciplina() {

    const { disciplinas, reload } = useDisciplina()

    return (
        <Page breadcrumbItems={[
            { title: 'Home', url: '/' },
            { title: 'Disciplinas', url: '/disciplinas' },
        ]}>
            <div className="flex flex-col gap-4">
                <p>Disciplinas</p>
                <Separator />
                {
                    disciplinas.map(disciplina => {
                        return (
                            <>
                                <Card className="p-4">
                                    <CardTitle>{disciplina.curso}</CardTitle>
                                    <p>Nome: {disciplina.nome}</p>
                                </Card>
                            </>
                        )
                    }) 
                }
            </div>
        </Page>
    )
}