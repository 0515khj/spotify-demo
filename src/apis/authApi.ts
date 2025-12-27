import axios from "axios"
import type { ClientCredentialTokenResponse, ExchangeTokenResponse } from "../models/auth";
import { CLIENT_ID, CLIENT_SECRET } from "../configs/authConfig";
import { REDIRECT_URI, REDIRECT_URI_PROD } from "../configs/commonConfig";
// const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID as string;
// const clientSecret = import.meta.env.VITE_SPOTIFY_SECRET_ID as string;

const encodedBase64 = (data:string):string =>{
    return btoa(data)
}

const getRedirectUri = () => {
  const host = window.location.hostname;
  const isLocal = host === "localhost" || host === "127.0.0.1";
  return isLocal ? REDIRECT_URI : REDIRECT_URI_PROD;
};

export const getClientCredientialToken = async():Promise<ClientCredentialTokenResponse> =>{
    try {
       const body = new URLSearchParams({
        grant_type:"client_credentials"
       })
       const response = await axios.post("https://accounts.spotify.com/api/token",body,{
        headers:{
            Authorization:`Basic ${encodedBase64(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
            "Content-Type":"application/x-www-form-urlencoded"
        }
       });
       return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Fail to fetch token")
    }
}

export const exchangeToken = async(code:string,codeVerifier:string):Promise<ExchangeTokenResponse> =>{
    try {
        const url = "https://accounts.spotify.com/api/token";
        const redirectUri = getRedirectUri();
        if(!CLIENT_ID && !REDIRECT_URI){
            throw new Error('Missing required parameters');
        }
        const body = new URLSearchParams({
        client_id: CLIENT_ID,
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
        })
    const response = await axios.post(url,body,{
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
    return response.data;
    } catch (error) {
        console.log(error)
        throw new Error("fail")
    }
}