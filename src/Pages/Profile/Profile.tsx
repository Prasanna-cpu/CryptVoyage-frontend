import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '../../components/ui/card';
import {Badge} from "../../components/ui/badge"
import {VerifiedIcon} from "lucide-react";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "../../components/ui/dialog.tsx";
import { Button } from '../../components/ui/button.tsx';
import AccountVerificationForm from "./AccountVerificationForm.tsx";
import {useSelector} from "react-redux";

const Profile : React.FunctionComponent = () => {


    // @ts-ignore
    const {auth}=useSelector(store=>store)


    const handleEnableTwoStepVerification=()=>{

    }
    return (
        <div className={"flex flex-col mb-5 items-center"}>
            <div className={"pt-10 w-full lg:w-[60%]"}>

                <Card>
                    <CardHeader className={"pb-9"}>
                        <CardTitle>Your information</CardTitle>
                    </CardHeader>

                    <CardContent>

                        <div className={"lg:flex gap-32"}>

                            <div className={"space-y-7"}>
                                <div className={"flex"}>
                                    <p className={"w-[9rem]"}>Email: </p>
                                    <p className={"text-gray-400"}>{auth.user.data.email}</p>
                                </div>
                                <div className={"flex"}>
                                    <p className={"w-[9rem]"}>FullName: </p>
                                    <p className={"text-gray-400"}>{auth.user.data.fullname}</p>
                                </div>
                                <div className={"flex"}>
                                    <p className={"w-[9rem]"}>Date of Birth: </p>
                                    <p className={"text-gray-400"}>20/09/2002</p>
                                </div>
                                <div className={"flex"}>
                                    <p className={"w-[9rem]"}>Nationality: </p>
                                    <p className={"text-gray-400"}>Indian</p>
                                </div>

                            </div>

                        </div>

                    </CardContent>

                    <div className={"mt-6"}>
                        <CardHeader className={"pb-7"}>
                            <div className={"flex items-center gap-3"}>
                                <CardTitle>2 Step Verification</CardTitle>
                                {
                                    true ? (
                                        <Badge className={"space-x-2 text-white bg-green-600"}>
                                            <VerifiedIcon/>
                                            <span>Enabled</span>
                                        </Badge>
                                    ):(
                                        <Badge className={"bg-orange-500"}>
                                            Disabled
                                        </Badge>
                                    )
                                }
                                <CardContent>
                                    <div>
                                        <Dialog>
                                            <DialogTrigger>
                                                <Button>
                                                    Enable two step verification
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        Verify account?
                                                    </DialogTitle>
                                                </DialogHeader>
                                                <AccountVerificationForm submitFunction={handleEnableTwoStepVerification}/>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </CardContent>
                            </div>
                        </CardHeader>
                    </div>

                </Card>


            </div>
        </div>
    );
};

export default Profile;