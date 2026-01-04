import { TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import useSearchItemsByKeyword from '../../../hooks/useSearchItemsByKeyword';
import { SEARCH_TYPE } from '../../../models/search';
import SearchResultList from './SearchResultList';

const EmptyPlaylistWithSearch = () => {
    const [keyword, setKeyword]=useState<string>('')
    const {data} = useSearchItemsByKeyword({
        q:keyword,
        type:[SEARCH_TYPE.Track],
    });

   
    const handleSearchKeyword = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setKeyword(e.target.value)
    }
    return (
        <div>
            <Typography variant='h1' my="10px">
                원하는 음악을 검색하세요
            </Typography>
            <TextField value={keyword} onChange={handleSearchKeyword}/>
            {data?.pages.map((item)=> {
                if(!item.tracks) return false
                return <SearchResultList list={item.tracks?.items}/>
            }
            )}
        </div>
    );
};

export default EmptyPlaylistWithSearch;