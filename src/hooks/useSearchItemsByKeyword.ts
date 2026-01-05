import { useInfiniteQuery } from "@tanstack/react-query"
import { searchItemsByKeyword } from "../apis/searchApi";
import type { SearchRequestParams } from "../models/search";
import useClientCredentialToken from "./useClientCredentialToken";


const useSearchItemsByKeyword = (params:SearchRequestParams) =>{
    const clientCredentialToken = useClientCredentialToken();
      const q = (params.q ?? "").trim();
    return useInfiniteQuery({
        queryKey:["search",params],
        enabled: !!clientCredentialToken && q.length > 0, 
        queryFn:({pageParam = 0})=>{
            if(!clientCredentialToken) throw new Error("no token available")
            return searchItemsByKeyword(clientCredentialToken,{...params,q,offset:pageParam})
        },
        initialPageParam:0,
        getNextPageParam:(lastPage)=>{
            const nextPageUrl = 
            lastPage.tracks?.next ||
            lastPage.artists?.next || 
            lastPage.albums?.next ||
            lastPage.playlists?.next ||
            lastPage.shows?.next ||
            lastPage.episodes?.next ||
            lastPage.audiobooks?.next;
            
            if(nextPageUrl){
                const nextOffset = new URL(nextPageUrl).searchParams.get("offset");
                return nextOffset ? parseInt(nextOffset) : undefined;
            }
            return undefined;
        }
    })
}
export default useSearchItemsByKeyword;