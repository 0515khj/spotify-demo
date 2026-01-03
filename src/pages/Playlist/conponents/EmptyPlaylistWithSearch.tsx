import { TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

const EmptyPlaylistWithSearch = () => {
    const [keyword, setKeyword]=useState<string>('')
    const handleSearchKeyword = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setKeyword(e.target.value)
    }
    return (
        <div>
            <Typography variant='h1' my="10px">
                Let's find something for your playlist
            </Typography>
            <TextField value={keyword} onChange={handleSearchKeyword}/>
        </div>
    );
};

export default EmptyPlaylistWithSearch;