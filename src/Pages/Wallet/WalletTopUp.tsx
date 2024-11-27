import React, {useState} from 'react';
import {Input} from "../../components/ui/input.tsx"
import {RadioGroup, RadioGroupItem} from "../../components/ui/radio-group.tsx";
import {Label} from "@radix-ui/react-label";
import {Button} from "../../components/ui/button.tsx";
import {DialogClose} from "../../components/ui/dialog.tsx";
import { useDispatch } from 'react-redux';
import {paymentHandler} from "../../State/Wallet/Action.ts";

const WalletTopUp : React.FunctionComponent= () => {

    const dispatch:any=useDispatch()

    const [paymentMethod,setPaymentMethod]=useState<string>("RAZORPAY")
    const [amount,setAmount]=useState<string>("")

    function handleTopUpAmountChange(e:React.ChangeEvent<HTMLInputElement>) {
        setAmount(e.target.value)
    }

    function handlePaymentMethodChange(value:string) {
        setPaymentMethod(value)
    }

    function handleSubmit() {
        console.log(amount , paymentMethod)
        dispatch(paymentHandler({
            jwt:localStorage.getItem("jwt"),
            paymentMethod,
            amount
        }))
    }

    return (
        <div className={"pt-10 space-y-5"}>
            <div>
                <h1 className={"pb-1"}>Enter Amount</h1>
                <Input
                    className={"py-7 text-lg"}
                    placeholder={"$88888"}
                    onChange={handleTopUpAmountChange}
                    value={amount}
                />
            </div>

            <div>
                <h1 className={"pb-1"}>Select payment method</h1>
                <RadioGroup
                    className={"flex"}
                    defaultValue={"RAZORPAY"}
                    onValueChange={(value) => handlePaymentMethodChange(value)}
                >
                    <div className={"flex items-center space-x-2 border p-3 px-5 rounded-md"}>
                        <RadioGroupItem
                            value={"RAZORPAY"}
                            className={"h-9 w-9"}
                            id={"r1"}
                        />

                        <Label htmlFor={"r1"}>
                            <div className={"bg-white rounded-md px-5 py-2 w-32"}>
                                <img src={""} alt={"RAZORPAY"}/>
                            </div>
                        </Label>

                    </div>

                    <div className={"flex items-center space-x-2 border p-3 px-5 rounded-md"}>
                        <RadioGroupItem
                            value={"STRIPE"}
                            className={"h-9 w-9"}
                            id={"r2"}
                        />

                        <Label htmlFor={"r2"}>
                            <div className={"bg-white rounded-md px-5 py-2 w-32"}>
                                <img src={""} alt={"STRIPE"}/>
                            </div>
                        </Label>

                    </div>
                </RadioGroup>
            </div>

            <DialogClose className={"w-full"}>
                <Button className={"w-full py-7 bg-[#488453]"} onClick={handleSubmit}>
                    Submit
                </Button>
            </DialogClose>
        </div>
    );
};

export default WalletTopUp;