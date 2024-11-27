import axios from "axios";
import {
    GET_USER_FAILURE,
    GET_USER_REQUEST, GET_USER_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS
} from "./ActionType.ts";


const appUrl=import.meta.env.VITE_API_URL


export const register=(userData)=>async (dispatch)=>{

    dispatch({
        type:REGISTER_REQUEST
    })

    try{
        const res=await axios.post(`${appUrl}/auth/register`,userData)
        const user=res.data
        console.log(user)
        dispatch({
            type:REGISTER_SUCCESS,
            payload:user.token
        })
        localStorage.setItem("jwt",user.jwt)
    }
    catch (error){
        dispatch({
            type:REGISTER_FAILURE,
            payload:error.message
        })
        console.log(error)

    }
}


export const login=(userData)=>async (dispatch)=>{


    dispatch({
        type:LOGIN_REQUEST
    })


    try{
        const res=await axios.post(`${appUrl}/auth/signin`,userData.data)
        const user=res.data
        console.log(user)
        localStorage.setItem("jwt",user.token)
        userData.navigate("/")
        dispatch({
            type:LOGIN_SUCCESS,
            payload:user.token
        })
    }
    catch (error){
        dispatch({
            type:LOGIN_FAILURE,
            payload:error.message
        })
        console.log(error)

    }
}



export const getUser=(jwt)=>async (dispatch)=>{
    dispatch({
        type:GET_USER_REQUEST
    })

    try{
        const res=await axios.get(`${appUrl}/api/users/profile`,{
            headers:{
                Authorization : `Bearer ${jwt}`
            }
        })
        const user=res.data
        console.log(user)
        dispatch({
            type:GET_USER_SUCCESS,
            payload:user
        })
    }
    catch (error){
        dispatch({
            type:GET_USER_FAILURE,
            payload:error.message
        })
        console.log(error)
    }

}

export const logout=()=>(dispatch)=>{

    localStorage.removeItem("jwt")
    dispatch({
        type:"LOGOUT"
    })
}













