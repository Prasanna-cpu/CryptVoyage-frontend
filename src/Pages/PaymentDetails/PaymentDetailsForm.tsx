import React from 'react';
import {Form, FormControl, FormField, FormItem, FormLabel} from "../../components/ui/form.tsx";
import {useForm} from "react-hook-form";
import {Input} from "../../components/ui/input.tsx";
import {Button} from "../../components/ui/button.tsx";
import {DialogClose} from "@radix-ui/react-dialog";

import {addPaymentDetails} from "../../State/Withdrawal/Action.ts";


const PaymentDetailsForm : React.FunctionComponent= () => {



    const form=useForm({
        defaultValues:{
            accountHolderName:"",
            ifsc:"",
            accountNumber:"",
            confirmAccountNumber:"",
            bankName:""
        }
    })

    const onSubmit=(data)=>{
        dispatch(addPaymentDetails(
            {
                paymentDetails:data,
                jwt:localStorage.getItem('jwt')
            }
        ))
    }




    return (
        <div className={"px-10 py-2"}>

            <Form {...form}>

                <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-6"}>
                    <FormField
                        control={form.control}
                        name={"accountHolderName"}
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>
                                    Account Holder Name
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={"Enter Account Holder Name"}
                                        className={"border w-full border-gray-100 py-5 px-5"}
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}

                    />

                    <FormField
                        control={form.control}
                        name={"ifsc"}
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>
                                    IFSC Number
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={"Enter IFSC code"}
                                        className={"border w-full border-gray-100 py-5 px-5"}
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}

                    />

                    <FormField
                        control={form.control}
                        name={"bankName"}
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>
                                    Bank Name
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={"Enter Bank Name"}
                                        className={"border w-full border-gray-100 py-5 px-5"}
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}

                    />


                    <FormField
                        control={form.control}
                        name={"accountNumber"}
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>
                                    Account Number
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={"Enter Account Number"}
                                        className={"border w-full border-gray-100 py-5 px-5"}
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}

                    />

                    <FormField
                        control={form.control}
                        name={"confirmAccountNumber"}
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>
                                    Confirm Account Number
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={"Confirm Account Number"}
                                        className={"border w-full border-gray-100 py-5 px-5"}
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}

                    />
                    <DialogClose className={"w-full"}>
                        <Button type={"submit"} className={"w-full py-5 mt-4 bg-pink-700 hover:bg-red-700"}>
                            Submit
                        </Button>
                    </DialogClose>
                </form>

            </Form>



        </div>
    );
};

export default PaymentDetailsForm;