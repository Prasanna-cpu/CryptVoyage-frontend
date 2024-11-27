import * as types from "./ActionTypes";
import api from "../../api/api.ts";

// Action Creators
export const getUserWallet = (jwt) => async (dispatch) => {
    dispatch({ type: types.GET_USER_WALLET_REQUEST });

    try {
        const response = await api.get("wallets/get-wallet", {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });

        console.log("User Wallet", response.data);

        dispatch({
            type: types.GET_USER_WALLET_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type: types.GET_USER_WALLET_FAILURE,
            error: error.message,
        });
    }
};

export const getWalletTransactions =
    ({ jwt }) =>
        async (dispatch) => {
            dispatch({ type: types.GET_WALLET_TRANSACTION_REQUEST });

            try {
                const response = await api.get("/wallets/all-transactions", {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });

                dispatch({
                    type: types.GET_WALLET_TRANSACTION_SUCCESS,
                    payload: response.data,
                });
                console.log("wallet transaction", response.data);
            } catch (error) {
                console.log(error);
                dispatch({
                    type: types.GET_WALLET_TRANSACTION_FAILURE,
                    error: error.message,
                });
            }
        };

export const depositMoney =
    ({ jwt, orderId, paymentId,navigate }) =>
        async (dispatch) => {
            dispatch({ type: types.DEPOSIT_MONEY_REQUEST });

            console.log("Ids",orderId,paymentId)

            try {
                const response = await api.put(`/wallets/add-money`, null, {
                    params: {
                        order_id: orderId,
                        payment_id: paymentId,
                    },
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });

                dispatch({
                    type: types.DEPOSIT_MONEY_SUCCESS,
                    payload: response.data,
                });
                navigate("/wallet")
                console.log(response.data);
            } catch (error) {
                console.error(error);
                dispatch({
                    type: types.DEPOSIT_MONEY_FAILURE,
                    error: error.message,
                });
            }
        };

export const paymentHandler =
    ({ jwt, amount, paymentMethod }) =>
        async (dispatch) => {
            dispatch({ type: types.DEPOSIT_MONEY_REQUEST });

            try {
                const response = await api.post(
                    `/payments/${paymentMethod}/amount/${amount}`,
                    null,
                    {
                        headers: {
                            Authorization: `Bearer ${jwt}`,
                        },
                    }
                );

                console.log("Payment response", response.data);

                window.location.href = response.data.paymentUrl;

                dispatch({
                    type: types.DEPOSIT_MONEY_SUCCESS,
                    payload: response.data,
                });
            } catch (error) {
                console.log("error", error);
                dispatch({
                    type: types.DEPOSIT_MONEY_FAILURE,
                    error: error.message,
                });
            }
        };

export const transferMoney =
    ({ jwt, walletId, reqData }) =>
        async (dispatch) => {
            dispatch({ type: types.TRANSFER_MONEY_REQUEST });

            try {
                const response = await api.put(
                    `/wallets/transfer/wallet/${walletId}`,
                    reqData,
                    {
                        headers: {
                            Authorization: `Bearer ${jwt}`,
                        },
                    }
                );

                dispatch({
                    type: types.TRANSFER_MONEY_SUCCESS,
                    payload: response.data,
                });
                console.log("Money Sent:",response.data)
            } catch (error) {
                dispatch({
                    type: types.TRANSFER_MONEY_FAILURE,
                    error: error.message,
                });
            }
        };