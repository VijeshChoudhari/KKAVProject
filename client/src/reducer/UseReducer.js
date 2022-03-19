import Cookies from 'js-cookie';
export const initialState=Cookies.get('jwt');
console.log(initialState)

export const reducer=(state,action)=>{
if(action.type==="USER"){
    return action.payload;
}
return state;
}
