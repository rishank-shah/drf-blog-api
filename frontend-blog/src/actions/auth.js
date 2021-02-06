import axios from 'axios'
import {REGISTER_FAIL,REGISTER_SUCCESS,LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT_FAIL,LOGOUT_SUCCESS,AUTHENTICATED_FAIL,AUTHENTICATED_SUCCESS} from './types'
import Cookies from 'js-cookie'

export const register = (username,password,password2) => async dispatch => {
    const config = {
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };
    const body = JSON.stringify({
        username,password,password2
    })
    try{
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`,body,config)
        if(res.data.error){
            console.log(res.data.error)
            dispatch({
                type:REGISTER_FAIL
            })
        }else{
            dispatch({
                type:REGISTER_SUCCESS
            })
        }
    }catch(err){
        dispatch({
            type:REGISTER_FAIL
        })
    }
}

export const login = (username,password) => async dispatch => {
    const config = {
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };
    const body = JSON.stringify({
        username,password
    })
    try{
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`,body,config)
        if(res.data.error){
            console.log(res.data.error)
            dispatch({
                type:LOGIN_FAIL
            })
        }else{
            dispatch({
                type:LOGIN_SUCCESS,
                payload: res.data.username
            })
        }
    }catch(err){
        dispatch({
            type:LOGIN_FAIL
        })
    }
}

export const logout = () => async dispatch => {
    const config = {
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };
    const body = JSON.stringify({
        'withCredentials':true
    })
    try{
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/logout`,body,config)
        if(res.data.error){
            console.log(res.data.error)
            dispatch({
                type:LOGOUT_FAIL
            })
        }else{
            dispatch({
                type:LOGOUT_SUCCESS
            })
        }
    }catch(err){
        dispatch({
            type:LOGOUT_FAIL
        })
    }
} 

export const checkAuth = () => async dispatch => {
    const config = {
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };
    try{
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/isauthenticated`,config)
        if(res.data.error || res.data.isAuthenticated === 'error'){
            dispatch({
                type:AUTHENTICATED_FAIL,
                payload:false
            })
        }else if(res.data.isAuthenticated === 'success') {
            dispatch({
                type:AUTHENTICATED_SUCCESS,
                payload:true
            })
        }else{
            dispatch({
                type:AUTHENTICATED_FAIL,
                payload:false
            })
        }    
    }catch(err){
        dispatch({
            type:AUTHENTICATED_FAIL,
            payload:false
        })
    }
}