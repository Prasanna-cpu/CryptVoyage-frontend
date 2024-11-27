import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../components/ui/table.tsx"
import {Avatar, AvatarImage} from "@radix-ui/react-avatar";
import {useNavigate} from "react-router-dom";
import {ScrollArea} from "../../components/ui/scroll-area.tsx";



interface AssetTableProps {
    coin?: unknown
    category:unknown
}

const AssetTable: React.FunctionComponent = ({coin,category}: AssetTableProps) => {

    const navigate = useNavigate()

    console.log(coin)


    // @ts-ignore
    // @ts-ignore
    return (
        <div>
            <Table>
                {/*<TableCaption>A list of your recent invoices.</TableCaption>*/}
                <ScrollArea className={`${category==="all"?"h-[74h]":"h-[82vh]"}`}>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Coin</TableHead>
                            <TableHead>SYMBOL</TableHead>
                            <TableHead>VOLUME</TableHead>
                            <TableHead>MARKET CAP</TableHead>
                            <TableHead>24 h</TableHead>
                            <TableHead className="text-right">PRICE</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            coin && coin.data ? (
                                coin.data.map((item,index)=>
                                    <TableRow key={index}>
                                        <TableCell className={"font-medium flex items-center gap-2 cursor-pointer"}
                                                   onClick={() => navigate(`/market/${item.id}`)}>
                                            <Avatar className={"-z-50 "}>
                                                <AvatarImage src={item.image} className={"w-[50px] h-[50px]"}/>
                                            </Avatar>
                                            <span>{item.name}</span>
                                        </TableCell>
                                        <TableCell>{item.symbol}</TableCell>
                                        <TableCell>${item.total_volume}w</TableCell>
                                        <TableCell>${item.market_cap}</TableCell>
                                        <TableCell>${
                                            item.market_cap_change_percentage_24h
                                        }</TableCell>
                                        <TableCell className="text-right">${item.current_price}</TableCell>
                                    </TableRow>
                                )
                            ):(
                                <TableRow>
                                    <TableCell colSpan={6}>No data available</TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </ScrollArea>

            </Table>

        </div>
    );
};

export default AssetTable;