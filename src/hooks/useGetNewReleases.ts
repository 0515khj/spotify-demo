import { useQuery } from "@tanstack/react-query"
import { getNewReleases } from "../apis/albumApi";
import useClientCredentialToken from "./useClientCredentialToken";
import type { GetNEwReleasesResponse } from "../models/album";

const useGetNewReleases = () =>{
    const clientCredentialToken = useClientCredentialToken();
    
    return useQuery<GetNEwReleasesResponse>({
        queryKey:["new-releases"],
        queryFn:async()=>{
            if(!clientCredentialToken){
                throw new Error("No token available")
            }
            return getNewReleases(clientCredentialToken);
        },
    });
};

export default useGetNewReleases;
