import React, {ChangeEvent, useState} from 'react';
import {Input} from "../../components/ui/input.tsx";
import {Button} from "../../components/ui/button.tsx";
import {DialogClose} from "@radix-ui/react-dialog";
import {useDispatch, useSelector} from "react-redux";
import {transferMoney} from "../../State/Wallet/Action.ts";

const MoneyTransferForm : React.FunctionComponent= () => {


    const dispatch:any=useDispatch()

    const {wallet}=useSelector(store=>store)

    const [formData,setFormData]=useState({
        amount:"",
        walletId:"",
        purpose:""
    })

    function handleChange(e:ChangeEvent<HTMLInputElement>) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit() {

        dispatch(transferMoney({
            jwt:localStorage.getItem("jwt"),
            walletId:formData.walletId,
            reqData:{
                amount:formData.amount,
                purpose:formData.purpose
            }
        }))

        console.log(formData)
    }

    return (
        <div className={"pt-10 space-y-5"}>
            <div>
                <h1 className={"pb-1"}>Enter Amount</h1>
                <Input
                    name="amount"
                    onChange={handleChange}
                    value={formData.amount}
                    className={"p-7 border-gray-100"}
                    placeholder={"$88888"}
                />
            </div>
            <div>
                <h1 className={"pb-1"}>WalletId</h1>
                <Input
                    name="walletId"
                    onChange={handleChange}
                    value={formData.walletId}
                    className={"p-7 border-gray-100"}
                    // placeholder={"$88888"}
                />
            </div>
            <div>
                <h1 className={"pb-1"}>Purpose</h1>
                <Input
                    name="purpose"
                    onChange={handleChange}
                    value={formData.purpose}
                    className={"p-7 border-gray-100"}
                    // placeholder={"$88888"}
                />
            </div>
            <DialogClose className={"w-full"}>
                <Button onClick={handleSubmit} className={"w-full py-6 text-md bg-pink-700 hover:bg-red-600"} >
                    Transfer
                </Button>
            </DialogClose>
        </div>
    );
};

export default MoneyTransferForm;