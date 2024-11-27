const initialState={
    user:null,
    loading:false,
    error:null,
    jwt:null
}


export const authReducer=(state=initialState,action)=>{

    switch (action.type) {
        case "LOGIN_REQUEST":
        case "GET_USER_REQUEST":
        case "REGISTER_REQUEST":
            return {
                ...state,
                loading: true
            }
        case "LOGIN_SUCCESS":
        case "REGISTER_SUCCESS":
            return {
                ...state,
                loading: false,
                jwt: action.payload,
                error: null
            }
        case "GET_USER_SUCCESS":
            return {
                ...state,
                loading: false,
                user: action.payload,
                error: null
            }
        case "LOGIN_FAILURE":
        case "GET_USER_FAILURE":
        case "REGISTER_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.payload,
                user:null
            }

        case "LOGOUT":{
            return initialState
        }

        default:
            return state
    }
}