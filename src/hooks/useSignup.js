import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

export function useSignup(){
    const {dispatch} = useAuthContext();
    const [error,setError] = useState(null);
    const [isLoading,setIsLoading] = useState(false);

    async function signup(firstName,lastName,phone,email,password){
        setError(null);
        setIsLoading(true);

        if(!firstName || !lastName || !phone || !email || !password){
            setError("All fields are required");
        };

        try {

            const response =  await fetch("http://localhost:4000/auth/signup",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({firstName,lastName,phone,email,password})
            });
            const data = await response.json();
            if(response.ok){
                setIsLoading(false);
                localStorage.setItem("token",data.token);
                dispatch({type:"LOGIN",payload:data});
            }
            if(!response.ok){
                setIsLoading(false);
                setError(data.message);
            }

        } catch (error) {
            setError(error);
        }
    };
    return {signup,isLoading,error};


}