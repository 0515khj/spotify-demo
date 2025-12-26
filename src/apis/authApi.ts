import axios from "axios"
import type { ClientCredentialTokenResponse } from "../models/auth";
// import { clientId, clientSecret } from "../configs/authConfig"
const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID as string;
const clientSecret = import.meta.env.VITE_SPOTIFY_SECRET_ID as string;

const encodedBase64 = (data:string):string =>{
    return btoa(data)
}

export const getClientCredientialToken = async():Promise<ClientCredentialTokenResponse> =>{
    try {
       const body = new URLSearchParams({
        grant_type:"client_credentials"
       })
       const response = await axios.post("https://accounts.spotify.com/api/token",body,{
        headers:{
            Authorization:`Basic ${encodedBase64(`${clientId}:${clientSecret}`)}`,
            "Content-Type":"application/x-www-form-urlencoded"
        }
       });
       return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Fail to fetch token")
    }
}