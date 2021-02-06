import {REGISTER_FAIL,REGISTER_SUCCESS,LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT_FAIL,LOGOUT_SUCCESS,AUTHENTICATED_SUCCESS,AUTHENTICATED_FAIL} from '../actions/types'

const initialState = {
    isAuthenticated:null,
    username: '',
}

// eslint-disable-next-line
export default function(state=initialState,action){
    const {type,payload} = action;
    switch(type){
        case AUTHENTICATED_SUCCESS:
        case AUTHENTICATED_FAIL:
            return{
                ...state,
                isAuthenticated:payload
            }
        case REGISTER_SUCCESS:
            return{
                ...state,
                isAuthenticated:false
            }
        case LOGIN_SUCCESS:
            return{
                ...state,
                isAuthenticated:true,
                username:payload
            }
        case LOGOUT_SUCCESS:
            return{
                ...state,
                isAuthenticated:false,
                username:''
            }
        case LOGOUT_FAIL:
        case REGISTER_FAIL:
        case LOGIN_FAIL:
            return state
        default:
            return state
    }
}