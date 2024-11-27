import React, {useEffect} from 'react';
import "./App.css"
import Navbar from "./Pages/Navbar/Navbar.tsx";
import Home from "./Pages/Home/Home.tsx";
import {Routes, Route} from "react-router-dom";
import Portfolio from "./Pages/Portfolio/Portfolio.tsx";
import Wallet from "./Pages/Wallet/Wallet.tsx";
import Activity from "./Pages/Activity/Activity.tsx";
import PaymentDetails from "./Pages/PaymentDetails/PaymentDetails.tsx";
import WatchList from "./Pages/WatchList/WatchList.tsx";
import SearchCoin from "./Pages/SearchCoin/SearchCoin.tsx";
import StockDetails from "./Pages/StockDetails/StockDetails.tsx";
import Profile from "./Pages/Profile/Profile.tsx";
import Notfound from "./Pages/Notfound/Notfound.tsx";
import Withdrawal from "./Pages/Withdrawal/Withdrawal.tsx";
import Auth from "./Pages/Auth/Auth.tsx";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "./State/Auth/Action.ts";


const App : React.FunctionComponent= () => {


    // @ts-ignore
    const {auth}=useSelector(store=>store)
    const dispatch:any=useDispatch()



    console.log("auth--",auth)


    useEffect(()=>{
        dispatch(getUser(localStorage.getItem("jwt")))
    },[auth.jwt])

    return (
        <>

            {
                auth.user ? (
                    <div>
                        <Navbar/>
                        <Routes>
                            <Route path={"/"} element={<Home/>}/>
                            <Route path={"/portfolio"} element={<Portfolio/>}/>
                            <Route path={"/activity"} element={<Activity/>}/>
                            <Route path={"/wallet"} element={<Wallet/>}/>
                            <Route path={"/payment-details"} element={<PaymentDetails/>}/>
                            <Route path={"/watchlist"} element={<WatchList/>}/>
                            <Route path={"/search"} element={<SearchCoin/>}/>
                            <Route path={"/market/:id"} element={<StockDetails/>}/>
                            <Route path={"/profile"} element={<Profile/>}/>
                            <Route path={"*"} element={<Notfound/>}/>
                            <Route path={"/withdrawal"} element={<Withdrawal/>}/>
                        </Routes>
                    </div>
                ):(
                    <Auth/>
                )
            }
        </>
    );
};

export default App;