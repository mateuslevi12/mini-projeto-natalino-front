import { Separator } from "@/components/ui/separator";
import { Page } from "@/layout";
import { DialogMatricula } from "./components/DialogMatricula";
import { DisciplinasMatriculados } from "./components/DisciplinasMatriculado";

export function Matricula() {


    return (
        <Page breadcrumbItems={[
            { title: 'Home', url: '/' },
            { title: 'Matriculas', url: '' },
        ]}>
            <div className="flex flex-col gap-4">
                <p>Matriculas</p>
                <Separator />
                <div className="flex gap-4">
                    <div className="flex items-center flex-col gap-2">
                        <DisciplinasMatriculados />
                        <p>Disciplinas do aluno</p>
                    </div>
                    <div className="flex items-center flex-col gap-2">
                        <DialogMatricula type={"matricular"} />
                        <p>Matricular</p>
                    </div>
                    <div className="flex items-center flex-col gap-2">
                        <DialogMatricula type={"cancelar"} />
                        <p>Cancelar matricula</p>
                    </div>
                </div>
            </div>
        </Page>
    )
}