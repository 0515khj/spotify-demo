import { useMutation } from "@tanstack/react-query"
import { exchangeToken } from "../apis/authApi"
import type { ExchangeTokenResponse } from "../models/auth";


const useExchangeToken = () =>{
    /* post 니까 애씀 */
    return useMutation<
    ExchangeTokenResponse,
    Error,
    {code:string,codeVerifier:string}>
    ({
        mutationFn:({code,codeVerifier})=> exchangeToken(code,codeVerifier),
        onSuccess:(data)=>{
            localStorage.setItem("access_token",data.access_token);
        }
    })
}

export default useExchangeToken;