import React, {useEffect} from 'react';
import {Avatar, AvatarImage} from "../../components/ui/avatar.tsx";
import {DotIcon, BookmarkIcon, BookmarkFilledIcon} from "@radix-ui/react-icons";
import {Button} from "../../components/ui/button.tsx";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogDescription,

    DialogHeader, DialogTitle
} from "../../components/ui/dialog.tsx";
import TradingForm from "../Profile/TradingForm.tsx";
import StockChart from "../StockChart/StockChart.tsx";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {fetchCoinById} from "../../State/Coin/Action.ts";

// import {BookmarkIcon} from "lucide-react";

const StockDetails : React.FunctionComponent= () => {
    const dispatch:any=useDispatch()

    const {coin}=useSelector(store=>store)

    const {id}=useParams()

    useEffect(() => {
        dispatch(fetchCoinById({
            coinId:id,
            jwt:localStorage.getItem("jwt")
        }))
    }, [id]);

    console.log(coin)


    return (
        coin && coin.coinDetails && coin.coinDetails.data && (
            <div className={"p-5 mt-5 flex flex-col gap-4"}>
                <div className={"flex justify-between"}>
                    <div className={"flex gap-5 items-center"}>
                        <Avatar>
                            <AvatarImage
                                src={coin.coinDetails.data.image.large}
                                alt={coin.coinDetails.data.id}
                            >

                            </AvatarImage>
                        </Avatar>
                        <div>
                            <div className={"flex items-center gap-2"}>
                                <p>{coin.coinDetails.data.symbol.toUpperCase()}</p>
                                <DotIcon className={"text-gray-400"}/>
                                <p className={"text-gray-400"}>{coin.coinDetails.data.name}</p>
                            </div>

                            <div className={"flex items-end gap-2"}>
                                <p className={"text-xl font-bold"}>${coin.coinDetails.data.market_data.current_price.usd}</p>
                                <p className={"text-red-500"}>
                            <span>
                                {
                                    coin.coinDetails.data.market_data.market_cap_change_24h
                                }
                            </span>
                                    <span>
                                ({coin.coinDetails.data.market_data.market_cap_change_percentage_24h}%)
                            </span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={"flex items-center gap-4"}>
                        <Button>
                            {
                                true ? (
                                    <BookmarkFilledIcon
                                        className={"h-6 w-6"}
                                    />
                                ) : (
                                    <BookmarkIcon className={"w-6 h-6"}/>
                                )
                            }
                        </Button>
                        <Dialog>
                            <DialogTrigger>
                                <Button size={"lg"} className={"ml-7 bg-sky-600"}>
                                    Trade
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        How much you wanna spend
                                    </DialogTitle>
                                    <DialogDescription>
                                        <TradingForm/>
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>

                    </div>

                </div>
                <div className={"mt-10"}>
                    <StockChart coinId={id}/>
                </div>
            </div>
        )
    );
};

export default StockDetails;