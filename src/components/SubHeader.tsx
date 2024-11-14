import { ButtonProps } from "./ui/button";
import { Card } from "./ui/card";

interface ISubHeader {
    options: {
        titulo: string;
        button?: ButtonProps[];
    }[]
}

export function SubHeader({options}: ISubHeader) {
    return (
        <>
        <Card className="w-full flex gap-4 bg-white rounded-lg p-4 items-center justify-between">
            {
                options?.map(o => {
                    return (
                        <>
                        <h1 className="w-full text-3xl">{o.titulo}</h1>
                        {o.button}
                        </>
                    )
                })
            }
        </Card>
        </>
    )
}