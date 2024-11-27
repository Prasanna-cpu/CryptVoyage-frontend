import React from 'react';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../../components/ui/table.tsx";
import {Avatar, AvatarImage} from "@radix-ui/react-avatar";
// import {Button} from "../../components/ui/button.tsx";
// import {BookmarkFilledIcon} from "@radix-ui/react-icons";

const WatchList : React.FunctionComponent= () => {
    // function handleRemoveWatchList(id:string) {
    //
    // }

    return (
        <div className={"p-5 lg:px-20"}>
            <h1 className={"font-bold text-3xl pb-5"}>WatchList</h1>
            <Table className={"border"} >
                {/*<TableCaption>A list of your recent invoices.</TableCaption>*/}
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ASSET</TableHead>
                        <TableHead>PRICE</TableHead>
                        <TableHead>UNIT</TableHead>
                        <TableHead>CHANGE</TableHead>
                        <TableHead>CHANGE(%)</TableHead>
                        <TableHead className={"text-right"}>VOLUME</TableHead>
                        <TableHead className={"text-right text-red-600"}>REMOVE</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        [1,1,1,1,1,1,1,1,1,1].map((item,index)=>(
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
                                <TableCell className={"text-right"}>
                                    {/*<Button onClick={()=>handleRemoveWatchList(item.id)} size={"icon"} className={"h-10 w-10"}>*/}
                                    {/*    <BookmarkFilledIcon/>*/}
                                    {/*</Button>*/}
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    );
};

export default WatchList;