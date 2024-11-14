import { Separator } from "@/components/ui/separator";
import { Card, CardTitle } from "@/components/ui/card";
import { useBiblioteca } from "./api/useBiblioteca";

export function Biblioteca() {

    const { biblioteca, reload } = useBiblioteca()

    return (
        <>
            <div className="flex flex-col gap-4">
                <p>Biblioteca</p>
                <Separator />
                {
                    biblioteca.map(livro => {
                        return (
                            <>
                                <Card className="p-4">
                                    <CardTitle>{livro.titulo}</CardTitle>
                                    <p>Autor: {livro.autor}</p>
                                    <p>Ano: {livro.ano}</p>
                                    <p>Status: {livro.status != "null" ? livro.status : "Não especificado"}</p>
                                </Card>
                            </>
                        )
                    }) 
                }
            </div>
        </>
    )
}