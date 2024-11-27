import React from 'react';
import {DashboardIcon, HomeIcon, PersonIcon} from "@radix-ui/react-icons";
import { Button } from '../../components/ui/button';
import {SheetClose} from "../../components/ui/sheet.tsx";
import {ActivityIcon, CreditCardIcon, LandmarkIcon, LogOut, WalletIcon} from "lucide-react";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {logout} from "../../State/Auth/Action.ts";
import {useDispatch} from "react-redux";

interface MenuType{
    name: string;
    path:string;
    icon:React.ReactNode
}

const menu:MenuType[]=[
    {
        name:"Home",
        path:"/",
        icon:<HomeIcon className={"h-6 w-6"}/>
    },
    {
        name:"Portfolio",
        path:"/portfolio",
        icon:<DashboardIcon className={"h-6 w-6"}/>
    },
    {
        name:"Activity",
        path:"/activity",
        icon:<ActivityIcon className={"h-6 w-6"}/>
    },
    {
        name:"Wallet",
        path:"/wallet",
        icon:<WalletIcon className={"h-6 w-6"}/>
    },
    {
        name:"Payment Details",
        path:"/payment-details",
        icon:<LandmarkIcon className={"h-6 w-6"}/>
    },
    {
        name:"Profile",
        path:"/profile",
        icon:<PersonIcon className={"h-6 w-6"}/>
    },
    {
        name:"Withdrawal",
        path:"/withdrawal",
        icon:<CreditCardIcon className={"h-6 w-6"}/>
    },
    {
        name:"Logout",
        path:"/logout",
        icon:<LogOut className={"h-6 w-6"}/>
    },

]

const Sidebar : React.FunctionComponent= () => {

    const navigate:NavigateFunction=useNavigate();

    const dispatch:any=useDispatch()

    const handleLogOut=()=>{
        dispatch(logout())
    }


    return (
        <div className={"mt-10 space-y-5"}>

            {
                menu.map((item)=> (
                    <div key={item.name}>
                        <SheetClose className={"w-full"}>
                            <Button
                                variant={"outline"}
                                className={"flex items-center gap-5 py-6 w-full"}
                                onClick={()=>{

                                    if(item.name==="Logout"){
                                        handleLogOut()
                                        navigate("/signin")
                                    }else {
                                        navigate(item.path)
                                    }
                                }}
                            >
                    <span className={"w-8"}>
                        {item.icon}
                    </span>
                                <p>{item.name}</p>
                            </Button>
                        </SheetClose>
                    </div>
                ))
            }

        </div>
    );
};

export default Sidebar;