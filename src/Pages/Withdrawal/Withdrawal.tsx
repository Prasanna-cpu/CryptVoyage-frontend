import React, { useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table.tsx";
import { useDispatch, useSelector } from "react-redux";
import { getWithdrawalHistory } from "../../State/Withdrawal/Action.ts";
import {DateFormatter} from "../../Utils/dateFormatter.ts";

const Withdrawal: React.FunctionComponent = () => {

    const withdrawal = useSelector(store => store.withdrawal); // updated to focus on the withdrawal store directly
    const dispatch: any = useDispatch();

    useEffect(() => {
        dispatch(getWithdrawalHistory(localStorage.getItem("jwt")));
    }, [dispatch]);

    return (
        <div className={"p-5 lg:px-20"}>
            <h1 className={"font-bold text-3xl pb-5"}>Withdrawal</h1>
            <Table className={"border"}>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100]">Date</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead className={"text-right"}>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        withdrawal?.history?.data?.map((item, index) => (
                            <TableRow key={index} className={"w-full"}>
                                <TableCell>
                                    <p>{DateFormatter(item.date)}</p>
                                </TableCell>
                                <TableCell>Bank</TableCell>
                                <TableCell>${item.amount}</TableCell>
                                <TableCell className={"text-right"}>
                                    {item.status}
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    );
};

export default Withdrawal;
