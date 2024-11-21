import { Separator } from "@/components/ui/separator";
import { Card, CardTitle } from "@/components/ui/card";
import { useBiblioteca } from "./api/useBiblioteca";
import { Page } from "@/layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DialogReserva } from "./components/DialogReserva";
import { BuscarReservados } from "./components/BuscarReservados";

export function Biblioteca() {
    const { biblioteca } = useBiblioteca();

    return (
        <Page
            breadcrumbItems={[
                { title: "Home", url: "/" },
                { title: "Biblioteca", url: "/biblioteca" },
            ]}
        >
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold">Biblioteca</h1>
                </div>
                <Separator />
                <Tabs defaultValue="Home" className="w-full">
                    <TabsList className="w-full">
                        <TabsTrigger className="w-full" value="Home">Home</TabsTrigger>
                        <TabsTrigger className="w-full" value="AreaDoAluno">Área do Aluno</TabsTrigger>
                    </TabsList>
                    <TabsContent value="Home" className="flex flex-col gap-4">
                        {biblioteca.map((livro, index) => (
                            <Card key={index} className="p-4">
                                <CardTitle>{livro.titulo}</CardTitle>
                                <p>Autor: {livro.autor}</p>
                                <p>Ano: {livro.ano}</p>
                                <p>Status: {livro.status !== "null" && livro.status !== null  ? livro.status : "Não especificado"}</p>
                            </Card>
                        ))}
                    </TabsContent>
                    <TabsContent value="AreaDoAluno" className="flex flex-col gap-4">
                        <p>O que deseja fazer?</p>
                        <div className="flex gap-4">
                            <div className="flex flex-col gap-2 items-center">
                                <DialogReserva type="reservar" />
                                <p>Reservar</p>
                            </div>
                            <div className="flex flex-col gap-2 items-center">
                                <DialogReserva type="cancelar" />
                                <p>Cancelar reserva</p>
                            </div>
                            <div className="flex flex-col gap-2 items-center">
                               <BuscarReservados/>
                                <p className="text-center">Reservados</p>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </Page>
    );
}
