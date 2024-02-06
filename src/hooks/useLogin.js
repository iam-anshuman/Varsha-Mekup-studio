import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export function useLogin(){
    const {dispatch} = useAuthContext();
    const [error,setError] = useState(null);
    const [isLoading,setIsLoading] = useState(false);

    async function login(email,password){
        setError(null);
        setIsLoading(true);

        if(!email || !password){
            setError("Email and password are required");
        };

        try {

            const response =  await fetch("http://localhost:4000/auth/login",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({email,password})
            });
            const data = await response.json();
            if(response.ok){
                setIsLoading(false);
                localStorage.setItem("token",data.token);
                dispatch({type:"LOGIN",payload:data});
            }
            else{
                setIsLoading(false);
                setError(data.message);
                console.log(data);
            }

        } catch (error) {
            setError(error);
        }

    }
    return {login,isLoading,error};
}