import { Card } from "@/components/ui/card";
import { Page } from "@/layout";
import { BookOpenText, IdCard, SquareLibrary, Users } from "lucide-react";
import { Link } from "react-router-dom";

export function Home() {
    return (
        <Page breadcrumbItems={[
            { title: "Home", url: "/" },
        ]}>
            <div className="flex flex-col gap-4">
                <p>O que deseja ver?</p>
                <div className="flex gap-4">
                    <div className="flex flex-col gap-2 items-center">
                        <Link to='/alunos'>
                            <Card className="p-4 flex items-center justify-center cursor-pointer">
                                <Users size={64} />
                            </Card>
                        </Link>
                        <p>Alunos</p>
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                        <Link to="/biblioteca">
                            <Card className="p-4 flex items-center justify-center cursor-pointer">
                                <SquareLibrary size={64} />
                            </Card>
                        </Link>
                        <p>Biblioteca</p>
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                        <Link to="/disciplinas">
                            <Card className="p-4 flex items-center justify-center cursor-pointer">
                                <BookOpenText size={64} />
                            </Card>
                        </Link>
                        <p>Disciplinas</p>
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                        <Link to="/matriculas">
                            <Card className="p-4 flex items-center justify-center cursor-pointer">
                                <IdCard size={64} />
                            </Card>
                        </Link>
                        <p>Matrícula</p>
                    </div>
                </div>
            </div>
        </Page>
    );
}
