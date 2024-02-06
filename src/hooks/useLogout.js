import { useAuthContext } from "./useAuthContext";

export function useLogout(){
    const {dispatch} = useAuthContext();
    function logout(){
        dispatch({type: 'LOGOUT'});
        localStorage.removeItem('token');
    }
    return {logout};
}