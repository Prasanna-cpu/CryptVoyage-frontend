import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {thunk} from "redux-thunk";
import {authReducer} from "./Auth/Reducer.ts";
import coinReducer from "./Coin/Reducer.ts";
import walletReducer from "./Wallet/Reducer.ts";
import withdrawalReducer from "./Withdrawal/Reducer.ts";

const rootReducer=combineReducers({
    auth:authReducer,
    coin:coinReducer,
    wallet:walletReducer,
    withdrawal:withdrawalReducer
})


export const store=legacy_createStore(rootReducer,applyMiddleware(thunk))