import React, {useState} from 'react';
import {Input} from "../../components/ui/input.tsx"
import {Button} from "../../components/ui/button.tsx";
import {DialogClose} from "../../components/ui/dialog.tsx";
import {useDispatch, useSelector} from "react-redux";
import {withdrawalRequest} from "../../State/Withdrawal/Action.ts";

const WithdrawalForm: React.FunctionComponent = () => {


    // @ts-ignore
    const {withdrawal,wallet} = useSelector(store => store)

    const dispatch:any=useDispatch()

    const [amount, setAmount] = useState<string>("")

    console.log("wallet in withdrwal:",wallet)

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setAmount(e.target.value)
    }

    function handleSubmit() {
        dispatch(withdrawalRequest({
            amount,
            jwt:localStorage.getItem("jwt")
        }))
    }

    return (
        <div className={"pt-10 space-y-5"}>
            <div
                className={"flex justify-between items-center rounded-md bg-green-700 text-white text-xl font-bold px-5 py-4"}>
                <p>Available balance</p>
                <p>{wallet?.balance}</p>
            </div>
            <div className={"flex items-center justify-center"}>

                <h1>Enter withdrawal amount</h1>

                <Input
                    onChange={handleInputChange}
                    className={"withdrawalInput py-7 border-none outline-none focus:outline-none px-0 text-2xl text-center"}
                    min={0}
                    max={12200}
                    placeholder={"$888888"}
                    type={"number"}
                    value={amount}
                />

            </div>
            <div>
                <p className={"pb-2"}>Transfer to</p>
                <div className={"flex items-center gap-5 border px-5 py-2 rounded-md"}>
                    <img
                        src={""}
                        alt={"bank"}
                        className={"w-8 h-8"}
                    />
                    <div>
                        <p className={"text-xl font-bold"}>{withdrawal?.withdrawal?.paymentDetails?.data?.accountHolderName}</p>
                        <p className={"text-xs"}>{`**** **** **** ${withdrawal?.withdrawal?.paymentDetails?.data?.accountNumber?.slice(-4)}`}</p>
                    </div>
                </div>
            </div>
            <DialogClose>
                <Button onClick={handleSubmit} className={"w-full py-7 text-xl bg-pink-900 hover:bg-red-800"}>
                    Withdraw
                </Button>
            </DialogClose>
        </div>

    );
};

export default WithdrawalForm;