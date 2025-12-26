import axios from "axios"
import { SPOTIFY_BASE_URL } from "../configs/commonConfig";
import type { GetNEwReleasesResponse } from "../models/album";

export const getNewReleases = async(clientCredentialToken:string):Promise<GetNEwReleasesResponse>=> {
    try {
        const response = await axios.get(`${SPOTIFY_BASE_URL}/browse/new-releases`,{
            headers:{
                Authorization:`Bearer ${clientCredentialToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error)
        throw new Error('fail to fetch new release')
    }
}