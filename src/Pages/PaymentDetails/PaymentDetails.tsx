import React, {useEffect} from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../../components/ui/card.tsx";
import { DialogHeader, DialogTrigger,DialogContent} from "../../components/ui/dialog.tsx";
import { Button } from '../../components/ui/button.tsx';
import {Dialog, DialogTitle} from "@radix-ui/react-dialog";
import PaymentDetailsForm from "./PaymentDetailsForm.tsx";
import {useDispatch, useSelector} from "react-redux";
import {getPaymentDetails} from "../../State/Withdrawal/Action.ts";

const PaymentDetails : React.FunctionComponent= () => {

    const dispatch:any=useDispatch()

    const withdrawal=useSelector(store=>store)

    const wallet=useSelector(store=>store)

    useEffect(() => {
        dispatch(getPaymentDetails({
            jwt:localStorage.getItem("jwt")
        }))
    }, []);

    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return (
        <div className={"px-20"}>

            <h1 className={"text-3xl py-10 font-bold"}>Payment Details</h1>

            {
                // eslint-disable-next-line no-constant-condition
                 withdrawal?.withdrawal?.paymentDetails ? (
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                {withdrawal?.withdrawal?.paymentDetails?.data?.bankName || "RandomName"}
                            </CardTitle>
                            <CardDescription>
                                {`**** **** **** ${withdrawal?.withdrawal?.paymentDetails?.data?.accountNumber?.slice(-4)}`}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className={"flex items-center"}>
                                <p className={"w-32"}>A/C Holder</p>
                                <p className={"text-gray-400"}>{withdrawal?.withdrawal?.paymentDetails?.data?.accountHolderName}</p>
                            </div>

                            <div className={"flex items-center"}>
                                <p className={"w-32"}>IFSC</p>
                                <p className={"text-gray-400"}>{withdrawal?.withdrawal?.paymentDetails?.data?.ifscCode}</p>
                            </div>
                        </CardContent>
                    </Card>
                ):(
                    <Dialog>
                        <DialogTrigger>
                            <Button className={"py-6 mt-5 bg-sky-700 hover:bg-red-700"}>
                                Add payment details
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    Top up wallet
                                </DialogTitle>
                            </DialogHeader>
                            <PaymentDetailsForm/>
                        </DialogContent>
                    </Dialog>
                )
            }


        </div>
    );
};

export default PaymentDetails;