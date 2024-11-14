import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableHead,
    TableRow,
} from "@/components/ui/table"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

interface TableGeneric {
    labels: string[],
    data?: any[][],
}   

export function TabelaGenerica({ labels, data }:TableGeneric) {
    return (
        <>
            <ScrollArea  className="w-full h-full" >


                <Table className="bg-white ">
                    <TableHeader  >
                        <TableRow>
                            {
                                labels?.map((l, index) => {
                                    return (
                                        <>
                                            <TableHead key={index} className={`bg-[var(--red-lfa)] text-white text-center  `} >{l}</TableHead>
                                        </>
                                    )
                                })
                            }   
                        </TableRow>
                    </TableHeader>
                    <TableBody>

                        {data?.map((d, dIndex) => (
                            <TableRow key={dIndex}>
                                {d?.map((c, cIndex) => (
                                    <TableCell style={{whiteSpace: 'nowrap', fontSize: 17}} key={cIndex} align="center">
                                        {/* {c ?? '-'} */}
                                        {c == null || c == '' ? "-" : c}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
                <ScrollBar orientation="horizontal" />
            </ScrollArea >
            
        </>
    )
}