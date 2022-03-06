import axios from 'axios'
//login Section
import {
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    SIGNUP_SUCCESS,
    SIGNUP_FAILED,
    AUTHENTICATION_SUCCESS,
    AUTHENTICATION_FAILED,
    LOGOUT_USER
} from './action.type.js'

export const login =(email,password) => async (dispatch)=>{
    const config={
        header:{
            'Content-Type':'application/json'
        }
    }
    const body={email,password};
    try{
        const res= await axios.post(
            `{process.env.REACT_APP_API_URL}/auth/login`,
            body,
            config
        );
        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data,
        });
        console.log('user logged in');
    }catch(err){
        dispatch({
            type:LOGIN_FAILED,
        })
    }
}
export const signup=(email,password)=>async (dispatch)=>{
    
}