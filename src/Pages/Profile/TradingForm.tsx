import React, {useState} from 'react';
import {Input} from "../../components/ui/input"
import {Avatar, AvatarImage} from "../../components/ui/avatar.tsx";
import {DotIcon} from "@radix-ui/react-icons";
import {Button} from "../../components/ui/button.tsx";
const TradingForm : React.FunctionComponent= () => {

    const [orderType,setOrderType]=useState<string>("BUY")

    function handleChange() {

    }

    return (
        <div className={"space-y-10 p-5"}>
            <div className={"gap-2 flex flex-col"}>
                <div className={"flex gap-4 items-center justify-between"}>

                    <Input
                        className={"py-7 focus:outline-none"}
                        placeholder={"Enter amount"}
                        onChange={handleChange}
                        type="number"
                        min={0}
                        name="amount"
                    />

                    <div>
                        <p className={"border text-2xl flex justify-center items-center w-36 h-14 rounded-md"}>2292</p>
                    </div>

                    {
                        false && <h1 className={"text-orange-800"}>Insufficient wallet balance</h1>
                    }

                </div>

                <div className={"flex gap-5 items-center mt-5"}>
                    <Avatar>
                        <AvatarImage
                            src={""}
                            alt={"BITCOIN"}
                        >

                        </AvatarImage>
                    </Avatar>
                    <div>
                        <div className={"flex items-center gap-2"}>
                            <p>BTC</p>
                            <DotIcon className={"text-gray-400"}/>
                            <p className={"text-gray-400"}>Bitcoin</p>
                        </div>

                        <div className={"flex items-end gap-2"}>
                            <p className={"text-xl font-bold"}>$7838</p>
                            <p className={"text-red-500"}>
                            <span>
                                -1319056748.46
                            </span>
                                <span>
                                (-0.29803%)
                            </span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className={"flex items-center justify-between"}>
                    <p>Order Type</p>
                    <p>Market Order</p>
                </div>

                <div className={"flex items-center justify-between"}>
                    <p>
                        {
                            orderType==="BUY" ? (
                                "Available Cash"
                            ):(
                                "Available Quantity"
                            )
                        }
                    </p>
                    <p>
                        {
                            orderType==="BUY"?9000:23.08
                        }
                    </p>
                </div>

                <div>
                    <Button className={`w-full py-6 ${orderType==="SELL"?"bg-red-700 text-white":"bg-green-700 text-white"}`}>
                        {
                            orderType
                        }
                    </Button>
                    <Button onClick={()=>setOrderType(orderType=="BUY"?"SELL":"BUY")} className={"mt-4 bg-transparent text-sky-600 hover:text-white"}>
                        {
                            orderType==="BUY"?"Or Sell":"Or buy"
                        }
                    </Button>
                </div>

            </div>
        </div>
    );
};

export default TradingForm;