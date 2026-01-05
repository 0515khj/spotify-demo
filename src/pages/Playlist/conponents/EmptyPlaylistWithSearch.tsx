import { TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import useSearchItemsByKeyword from '../../../hooks/useSearchItemsByKeyword';
import { SEARCH_TYPE } from '../../../models/search';
import SearchResultList from './SearchResultList';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Track } from '../../../models/playlist';
import { addPlaylistTracks } from '../../../apis/playlistApi';

type EmptyPlaylistWithSearchProps = {
  playlistId: string;
};

const EmptyPlaylistWithSearch = ({ playlistId }: EmptyPlaylistWithSearchProps) => {
    const [keyword, setKeyword]=useState<string>('');
    const qc = useQueryClient();

    const {
      data,
      hasNextPage,
      fetchNextPage,
      isFetchingNextPage,
    } = useSearchItemsByKeyword({
        q:keyword,
        type:[SEARCH_TYPE.Track],
    });

   
    const handleSearchKeyword = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setKeyword(e.target.value)
    }


     // ✅ 추가 mutation
  const addMutation = useMutation({
    mutationFn: (trackUri: string) => addPlaylistTracks(playlistId, [trackUri]),
    onSuccess: async() => {
       await Promise.all([
        qc.invalidateQueries({ queryKey: ["playlist-items",playlistId] }),
        qc.invalidateQueries({ queryKey: ["playlist-detail", playlistId] }),
        qc.invalidateQueries({ queryKey: ["current-user-playlists"] }), // 너 queryKey가 다르면 바꿔
      ]);
        setKeyword("");
    },
  });

  const handleAdd = (track: Track) => {
    if (!track.uri) return;
    addMutation.mutate(track.uri);
  };


    return (
        <div>
            <Typography variant='h1' my="10px">
                원하는 음악을 검색하세요
            </Typography>

            <TextField value={keyword} onChange={handleSearchKeyword}/>
            
             {data?.pages.map((item, idx) => {
                if (!item.tracks) return null;

                 return (
                <SearchResultList
                  key={idx}
                  list={item.tracks.items}
                  onAdd={handleAdd}   
                  isFetchingNextPage={isFetchingNextPage}
                  hasNextPage={hasNextPage}
                  fetchNextPage={fetchNextPage}
                />
                 );
            })}
        </div>
    );
};

export default EmptyPlaylistWithSearch;