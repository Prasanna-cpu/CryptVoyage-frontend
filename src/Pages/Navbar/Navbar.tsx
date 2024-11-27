import React from 'react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "../../components/ui/sheet.tsx";
import {Button} from "../../components/ui/button.tsx";
import {DragHandleHorizontalIcon, MagnifyingGlassIcon} from "@radix-ui/react-icons";
import {Avatar, AvatarImage} from "../../components/ui/avatar.tsx";
import Sidebar from "../Sidebar/Sidebar.tsx";
import {AvatarFallback} from "@radix-ui/react-avatar";
import {useSelector} from "react-redux";

const Navbar : React.FunctionComponent= () => {


    // @ts-ignore
    const {auth}=useSelector(store=>store)


    return (
        <div className={"px-2 py-3 border-b z-50 bg-background bg-opacity-0 top-0 left-0 right-0 flex justify-between items-center"}>
            <div className={"flex items-center gap-3"}>

                <Sheet>
                    <SheetTrigger>
                        <Button
                            variant={"ghost"}
                            size={"icon"}
                            className={"rounded-full h-11 w-11"}
                        >
                            <DragHandleHorizontalIcon className={"h-7 w-7"}>

                            </DragHandleHorizontalIcon>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side={"left"} className={"w-72 border-r-0 flex flex-col justify-center"} >
                        <SheetHeader>
                            <SheetTitle>
                                <div className={"text-3xl flex justify-center items-center gap-1"}>
                                    <Avatar>
                                        <AvatarImage src={"https://cdn.pixabay.com/photo/2015/04/14/12/46/bit-coin-722075_1280.jpg"}/>
                                    </Avatar>
                                    <div>
                                        <span className={"font-bold text-orange-700"}>Crypt</span>
                                        <span>Voyage</span>
                                    </div>
                                </div>
                            </SheetTitle>
                            <SheetDescription>

                            </SheetDescription>
                        </SheetHeader>
                        <Sidebar/>
                    </SheetContent>
                </Sheet>

                <p className={"text-sm lg:text-base cursor-pointer"}>
                    CryptVoyage
                </p>

                <div className={"p-0 ml-9"}>
                    <Button variant={"outline"}>
                        <MagnifyingGlassIcon/>
                        <span>
                            Search
                        </span>
                    </Button>
                </div>

                <div>
                    <Avatar>
                        <AvatarFallback>
                            {
                                auth.user?.data?.fullname[0].toUpperCase()
                            }
                        </AvatarFallback>
                    </Avatar>
                </div>

            </div>
        </div>
    );
};

export default Navbar;