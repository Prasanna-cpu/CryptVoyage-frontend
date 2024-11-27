import React, {useEffect} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "../../components/ui/card.tsx";
import {CopyIcon, DollarSign, WalletIcon} from "lucide-react";
import {ReloadIcon, ShuffleIcon, UpdateIcon, UploadIcon} from "@radix-ui/react-icons";
import {Dialog, DialogTitle} from "@radix-ui/react-dialog";
import {DialogContent, DialogHeader, DialogTrigger} from "../../components/ui/dialog.tsx";
import WalletTopUp from "./WalletTopUp.tsx";
import WithdrawalForm from "./WithdrawalForm.tsx";
import MoneyTransferForm from "./MoneyTransferForm.tsx";
import {Avatar, AvatarFallback} from "../../components/ui/avatar.tsx";
import {useDispatch, useSelector} from "react-redux";
import {depositMoney, getUserWallet, getWalletTransactions} from "../../State/Wallet/Action.ts";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {store} from "../../State/Store.ts";

const Wallet : React.FunctionComponent= () => {

    const navigate=useNavigate()

    const dispatch:any=useDispatch()
    // @ts-ignore
    const {wallet}=useSelector(store=>store)

    console.log("Wallet:",wallet)

    function useQuery(){
        return new URLSearchParams(useLocation().search)
    }


    const query=useQuery()
    const orderId=query.get("order_id")
    const paymentId=query.get("payment_id")
    const razorpayPaymentId=query.get("razorpay_payment_id")
    // const {order_id}=useParams();
    //
    //
    // console.log("Order Id:",orderId)
    //
    // console.log("RazorPay Payment Id:",razorpayPaymentId)

    function handleFetchWalletTransaction(){
        dispatch(getWalletTransactions(
            {
                jwt:localStorage.getItem("jwt")
            }
        ))
    }

    useEffect(() => {
        if (orderId) {
            dispatch(
                depositMoney({
                    jwt: localStorage.getItem("jwt"),
                    orderId: orderId,
                    paymentId: razorpayPaymentId || "AuedkfeuUe",
                    navigate,
                })
            );
            console.log(paymentId, orderId);
        }
    }, [paymentId, orderId,razorpayPaymentId]);






    const handleFetchUserWallet=()=>{
        dispatch(getUserWallet(localStorage.getItem("jwt")))
    }

    useEffect(() => {
        handleFetchUserWallet()
        handleFetchWalletTransaction()
    }, []);

    // console.log(wallet?.transactions?.data)




    return (
        wallet &&(
            <div className={"flex flex-col items-center"}>
                <div className={"pt-10 w-full lg:w-[60%]"}>
                    <Card>
                        <CardHeader className={"pb-9"}>
                            <div className={"flex justify-between items-center"}>
                                <div className={"flex items-center gap-5"}>
                                    <WalletIcon size={32}/>
                                    <div>
                                        <CardTitle className={"text-2xl"}>My Wallet</CardTitle>
                                        <div className={"flex items-center gap-2"}>
                                            <p className={"text-gray-500 text-sm"}>
                                                #{wallet?.userWallet?.data?.id}
                                            </p>
                                            <CopyIcon className={"cursor-pointer hover:text-slate-300 size-5"}>
                                            </CopyIcon>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <ReloadIcon className={"w-6 h-6 cursor-pointer hover:text-gray-300"}
                                                onClick={handleFetchUserWallet}/>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className={"flex items-center"}>
                                <DollarSign/>
                                <span className={"text-2xl font-semibold"}>
                                {wallet?.userWallet?.data?.balance || 0}
                            </span>
                            </div>

                            <div className={"flex gap-7 mt-5 justify-evenly"}>

                                <Dialog>
                                    <DialogTrigger>
                                        <div
                                            className={"h-24 w-24 hover:text-gray-400 cursor-pointer flex flex-col items-center justify-center rounded-md"}>
                                            <UploadIcon/>
                                            Add Money to Purse
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>
                                                Top up wallet
                                            </DialogTitle>
                                        </DialogHeader>
                                        <WalletTopUp/>
                                    </DialogContent>
                                </Dialog>

                                <Dialog>
                                    <DialogTrigger>
                                        <div
                                            className={"h-24 w-24 hover:text-gray-400 cursor-pointer flex flex-col items-center justify-center rounded-md"}>
                                            <UploadIcon/>
                                            Money Withdrawal
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>
                                                Withdraw your money
                                            </DialogTitle>
                                        </DialogHeader>
                                        <WithdrawalForm/>
                                    </DialogContent>
                                </Dialog>

                                <Dialog>
                                    <DialogTrigger>
                                        <div
                                            className={"h-24 w-24 hover:text-gray-400 cursor-pointer flex flex-col items-center justify-center rounded-md"}>
                                            <ShuffleIcon/>
                                            Transfer your money
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>
                                                Transfer your money
                                            </DialogTitle>
                                        </DialogHeader>
                                        <MoneyTransferForm/>
                                    </DialogContent>
                                </Dialog>


                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className={"py-5 pt-10"}>
                    <div className={"flex gap-2 items-center pb-5"}>
                        <h1 className={"text-2xl font-semibold"}>
                            History
                        </h1>
                        <UpdateIcon className={"h-7 w-7 p-0 cursor-pointer hover:text-gray-300"}/>
                    </div>

                    <div className={"space-y-5"}>
                        {
                            wallet?.transactions?.data?.map((item, index) => (
                                <div key={item.id}>
                                    <Card className={"lg:w-[50] px-5 flex justify-between items-center"}>

                                        <div className={"flex items-center gap-5"}>
                                            <Avatar onClick={handleFetchWalletTransaction}>
                                                <AvatarFallback>
                                                    <ShuffleIcon className={""}/>
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className={"space-y-1"}>
                                                <h1>{item?.type}</h1>
                                                <p className={"text-sm text-gray-500"}>{item?.date}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className={`ml-10 ${item.amount > 0 ? "text-green-600" : "text-red-800"}`}>
                                                {item.amount} USD
                                            </p>
                                        </div>

                                    </Card>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    );
};

export default Wallet;