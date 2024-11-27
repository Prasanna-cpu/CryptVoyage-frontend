import React, {useEffect, useState} from 'react';
import {Button} from "../../components/ui/button.tsx";
import AssetTable from "../AssetTable/AssetTable.tsx";
import StockChart from "../StockChart/StockChart.tsx";
import {Avatar} from "@radix-ui/react-avatar";
import {AvatarImage} from "../../components/ui/avatar.tsx";
import {ChevronLeftIcon, Cross1Icon, DotIcon} from "@radix-ui/react-icons";
import {MessageCircle} from "lucide-react";
import {Input} from "../../components/ui/input.tsx"
import {useDispatch, useSelector} from "react-redux";
import {getCoinList, getTop50CoinList} from "../../State/Coin/Action.ts";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
} from "../../components/ui/pagination.tsx";

const Home : React.FunctionComponent= () => {

    const [category,setCategory]=useState("all");
    const [input,setInput]=useState<string>("")
    const {coin}=useSelector(store=>store)
    const [page, setPage] = useState(1);
    const [isChatRelease,setIsChatRelease]=useState<boolean>(false);

    const dispatch:any=useDispatch()

    function handleChatRelease(){
        setIsChatRelease((prevState:boolean)=>!prevState);
    }

    function handleCategory(value:string) {
        setCategory(value)
    }

    function handleInputChange(e:React.ChangeEvent<HTMLInputElement>) {
        setInput(e.target.value)
    }

    useEffect(() => {
        dispatch(getTop50CoinList())
    }, [category]);

    useEffect(() => {
        dispatch(getCoinList(1))
    }, [dispatch]);

    const handlePageChange = (event) => {
        setInput(event.target.value);
    };

    console.log("Here is the coin :", coin)

    return (

        <div className={"relative"}>
            <div className={"lg:flex"}>
                <div className={"lg:w-[50%] lg:border-r"}>
                    <div className={"p-3 flex items-center gap-4"}>
                        <Button
                            className={"rounded-full"}
                            variant={category === "all" ? "default" : "outline"}
                            onClick={() => handleCategory("all")}
                        >
                            All
                        </Button>

                        <Button
                            className={"rounded-full"}
                            variant={category === "top50" ? "default" : "outline"}
                            onClick={() => handleCategory("top50")}
                        >
                            Top 50
                        </Button>

                        <Button
                            className={"rounded-full"}
                            variant={category === "topGainers" ? "default" : "outline"}
                            onClick={() => handleCategory("topGainers")}
                        >
                            Top Gainers
                        </Button>
                        <Button
                            className={"rounded-full"}
                            variant={category === "topLoosers" ? "default" : "outline"}
                            onClick={() => handleCategory("topLoosers")}
                        >
                            Top Loosers
                        </Button>


                    </div>
                    {
                        coin && <AssetTable coin={category=="all"?coin.coinList:coin.top50} category={category}/>
                    }
                    {category == "all" && (
                        <Pagination className="border-t py-3">
                            <PaginationContent>
                                <PaginationItem>
                                    <Button
                                        variant="ghost"
                                        disabled={page == 1}
                                        onClick={() => handlePageChange(page - 1)}
                                    >
                                        <ChevronLeftIcon className="h-4 w-4 mr-1" />
                                        Previous
                                    </Button>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink
                                        onClick={() => handlePageChange(1)}
                                        isActive={page == 1} size={undefined}                                    >
                                        1
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink
                                        onClick={() => handlePageChange(2)}
                                        isActive={page == 2} size={undefined}                                    >
                                        2
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink
                                        onClick={() => handlePageChange(3)}
                                        isActive={page == 3} size={undefined}                                    >
                                        3
                                    </PaginationLink>
                                </PaginationItem>
                                {page > 3 && (
                                    <PaginationItem>
                                        <PaginationLink
                                            onClick={() => handlePageChange(3)}
                                            isActive
                                        >
                                            {page}
                                        </PaginationLink>
                                    </PaginationItem>
                                )}
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationNext
                                        className="cursor-pointer"
                                        onClick={() => handlePageChange(page + 1)}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    )}
                </div>

                <div className={"hidden lg:block lg:w-[50%] p-5"}>
                    <StockChart coinId={"bitcoin"}/>

                    <div className={"flex gap-5 items-center"}>

                        <div>
                            <Avatar>
                                <AvatarImage
                                    src={""}
                                    alt={"bitcoin"}
                                />
                            </Avatar>
                        </div>

                        <div>
                            <div className={"flex items-center gap-2"}>
                                <p>ETH</p>
                                <DotIcon className={"text-gray-400"}/>
                                <p className={"text-gray-400"}>Etherum</p>
                            </div>

                            <div className={"flex items-end gap-2"}>
                                <p className={"text-xl font-bold"}>
                                    5464
                                </p>
                                <p className={"text-red-500"}>
                                    <span>-1319049822.578</span>
                                    <span>(-0.29803%)</span>
                                </p>
                            </div>
                        </div>
                    </div>


                </div>


            </div>

            <section className={"absolute bottom-5 right-5 z-40 flex flex-col justify-end items-end gap-2"}>

                {
                    isChatRelease && (
                        <div className={"rounded-md w-[20rem] md:w-[25rem] lg:w-[25rem] h-[70vh] bg-slate-800"}>
                            <div className={"flex justify-between items-center border-b px-6 h-[12%]"}>
                                <p className={"text-white"}>ChatBot</p>
                                <Button variant={"ghost"} size={"icon"} onClick={handleChatRelease}>
                                    <Cross1Icon/>
                                </Button>
                            </div>

                            <div className={"h-[76%] flex flex-col overflow-y-auto gap-5 px-5 py-2 scroll-container"}>
                                <div className={"self-start pb-5 w-auto"}>
                                    <div className={"justify-end self-end px-5 py-2 rounded-md bg-white w-auto text-black"}>
                                        <p>Hi , How can i help you</p>
                                    </div>
                                </div>

                                {
                                    [1, 1, 1, 1, 1, 1, 1, 1].map((_, index) => (
                                        <div className={`${index % 2 == 0 ? "self-start" : "self-end"} pb-5 w-auto`}
                                             key={index}>
                                            {
                                                index % 2 == 0 ? (
                                                    <div
                                                        className={"justify-end self-end px-5 py-2 rounded-md bg-white w-auto text-black"}>
                                                        <p>Who are you</p>
                                                    </div>
                                                ) : (
                                                    <div
                                                        className={"justify-end self-end px-5 py-2 rounded-md bg-white w-auto text-black"}>
                                                        <p>I am Kumar</p>
                                                    </div>
                                                )
                                            }
                                        </div>


                                    ))


                                }
                                <div className={"h-[12%] border-t"}>
                                    <Input
                                        className={"w-full h-full order-none outline-none"}
                                        onChange={handleInputChange}
                                        value={input}
                                    />
                                </div>
                            </div>

                        </div>
                    )
                }


                <div className={"relative w-[10rem]  cursor-pointer group"}>
                    <Button className={"w-full h-[3rem]"} onClick={handleChatRelease}>
                        <MessageCircle
                            className={"fill-[#eeeeee] -rotate-90 stroke-none group-hover:fill-[#dddddd]"}
                            size={30}/>
                        <span className={"text-2xl"}>Chat Bot</span>
                    </Button>
                </div>

            </section>
        </div>


    );
};

export default Home;