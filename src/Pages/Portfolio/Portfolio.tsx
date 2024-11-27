import React from 'react';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../../components/ui/table.tsx";
import {Avatar, AvatarImage} from "@radix-ui/react-avatar";

const Portfolio : React.FunctionComponent= () => {
    return (
        <div className={"lg:px-20 p-5"}>
            <h1 className={"font-bold text-3xl pb-5"}>Portfolio</h1>
            <Table className={"border-x"} >
                {/*<TableCaption>A list of your recent invoices.</TableCaption>*/}
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ASSET</TableHead>
                        <TableHead>PRICE</TableHead>
                        <TableHead>UNIT</TableHead>
                        <TableHead>CHANGE</TableHead>
                        <TableHead>CHANGE(%)</TableHead>
                        <TableHead className="text-right">VOLUME</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        [1,1,1,1,1,1,1,1,1,1].map((_,index)=>(
                            <TableRow key={index}>
                                <TableCell className={"font-medium flex items-center gap-2"}>
                                    <Avatar className={"-z-50"}>
                                        <AvatarImage src={""}/>
                                    </Avatar>
                                    <span>Bitcoin</span>
                                </TableCell>
                                <TableCell>BTC</TableCell>
                                <TableCell>9124463121w</TableCell>
                                <TableCell>1364881428323</TableCell>
                                <TableCell>-0.200009</TableCell>
                                <TableCell className="text-right">$45527</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    );
};

export default Portfolio;