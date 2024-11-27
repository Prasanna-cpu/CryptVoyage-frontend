import React from 'react';
import {useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormLabel} from "../../components/ui/form.tsx";
import {Input} from "../../components/ui/input.tsx";
import {Button} from "../../components/ui/button.tsx";
import {useDispatch} from "react-redux";
import {login} from "../../State/Auth/Action.ts";
import {useNavigate} from "react-router-dom";

const SignInForm : React.FunctionComponent= () => {
    const form=useForm({
        defaultValues:{
            email:"",
            password:""
        }
    })

    const dispatch:any=useDispatch()

    const navigate=useNavigate()

    const onSubmit=(data)=>{
        dispatch(login({
            data,
            navigate
        }))
        console.log(data)
    }


    return (
        <div className={"px-10 py-2 text-white"}>


            <Form {...form}>

                <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-6"}>


                    <FormField
                        control={form.control}
                        name={"email"}
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>
                                    Email
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={"Enter Email"}
                                        className={"border w-full border-gray-100 py-5 px-5"}
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}

                    />

                    <FormField
                        control={form.control}
                        name={"password"}
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>
                                    Password
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={"Enter Password"}
                                        className={"border w-full border-gray-100 py-5 px-5"}
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}

                    />



                    <Button type={"submit"} className={"w-full py-5 mt-4 bg-transparent hover:bg-pink-700"}>
                        Submit
                    </Button>
                </form>

            </Form>



        </div>
    )
};

export default SignInForm;