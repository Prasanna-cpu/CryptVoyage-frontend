import React, {useState} from 'react';
import {Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger} from "../../components/ui/dialog.tsx";
import {Button} from "../../components/ui/button.tsx";
import {InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot} from "../../components/ui/input-otp.tsx";

interface AccountVerificationFormProps {
    submitFunction?: () => void
}

const AccountVerificationForm: React.FunctionComponent<AccountVerificationFormProps> = ({submitFunction}) => {

    const [value,setValue]=useState<string>("")

    function handleSubmit() {
        console.log(value)
    }

    return (
        <div className={"flex justify-center"}>

            <div className={"space-y-5 mt-10 w-full"}>
                <div className={"flex justify-between items-center"}>
                    <p>Email : </p>
                    <p>kumar22maran@gmail.com</p>
                    <Dialog>
                        <DialogTrigger>
                            <Button>
                                Send OTP
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogTitle>
                                Enter OTP
                            </DialogTitle>

                            <div className={"py-5 flex gap-10 justify-center items-center"}>
                                <InputOTP maxLength={6} value={value} onChange={(value)=>setValue(value)}>
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0}/>
                                        <InputOTPSlot index={1}/>
                                        <InputOTPSlot index={2}/>
                                    </InputOTPGroup>
                                    <InputOTPSeparator/>
                                    <InputOTPGroup>
                                        <InputOTPSlot index={3}/>
                                        <InputOTPSlot index={4}/>
                                        <InputOTPSlot index={5}/>
                                    </InputOTPGroup>
                                </InputOTP>
                                <DialogClose className={"w-full"}>
                                    <Button onClick={handleSubmit}>
                                        Submit
                                    </Button>
                                </DialogClose>
                            </div>

                        </DialogContent>
                    </Dialog>


                </div>
            </div>

        </div>
    );
};

export default AccountVerificationForm;