import React from 'react';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../../components/ui/table.tsx";
import {Avatar, AvatarImage} from "@radix-ui/react-avatar";


const Activity : React.FunctionComponent= () => {
    return (
        <div className={"p-5 lg:px-20"}>
            <h1 className={"font-bold text-3xl pb-5"}>Activity</h1>
            <Table className={"border"}>
                {/*<TableCaption>A list of your recent invoices.</TableCaption>*/}
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Date & Time</TableHead>
                        <TableHead>Trading pair</TableHead>
                        <TableHead>Buying price</TableHead>
                        <TableHead>Selling price</TableHead>
                        <TableHead>Order Type</TableHead>
                        <TableHead className={"text-right"}>Profit/Loss</TableHead>
                        <TableHead className={"text-right text-red-600"}>Value</TableHead>
                        {/*<TableHead className={"text-right"}>VOLUME</TableHead>*/}
                        {/*<TableHead className={"text-right text-red-600"}>REMOVE</TableHead>*/}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, index) => (
                            <TableRow key={index}>
                                <TableCell className={"font-medium flex items-center gap-2"}>
                                    <Avatar className={"-z-50"}>
                                        <AvatarImage src={""}/>
                                    </Avatar>
                                    <span>Bitcoin</span>
                                </TableCell>
                                <TableCell>
                                    <p>2024/05/31</p>
                                    <p className={"text-gray-300"}>12:39:32</p>
                                </TableCell>
                                <TableCell>Bitcoin</TableCell>
                                <TableCell>$75684</TableCell>
                                <TableCell>$103684</TableCell>
                                <TableCell className="text-right">-</TableCell>
                                <TableCell className={"text-right"}>
                                    $100.3
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    );
};

export default Activity;