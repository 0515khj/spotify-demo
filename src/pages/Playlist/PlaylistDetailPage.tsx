import { Navigate, useParams } from "react-router-dom";
import useGetPlaylist from "../../hooks/useGetPlaylist";
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import type {PlaylistTrack } from "../../models/playlist";
import useGetPlaylistItems from "../../hooks/useGetPlaylistItems";
import DesktopPlaylistItem from "./conponents/DesktopPlaylistItem";
import { PAGE_LIMIT } from "../../configs/commonConfig";
import EmptyPlaylistWithSearch from "./conponents/EmptyPlaylistWithSearch";

import { useEffect, useRef, useState } from "react";

const PlaylistDetailPage = () => {
    const {id} = useParams<{id:string}>();
    
    const { data:playlist }=useGetPlaylist({playlist_id:id ?? "" })
    
    const {
      data:playlistItems,
      // isLoading:isPlaylistItemsLoading,
      // error:playlistItemsLoading,
      hasNextPage,
      isFetchingNextPage,
      fetchNextPage,
    } = useGetPlaylistItems({playlist_id:id ?? "",limit:PAGE_LIMIT});

    const scrollRef = useRef<HTMLDivElement | null>(null);
    const [bottomEl, setBottomEl] = useState<HTMLDivElement | null>(null);
  

    useEffect(() => {
      if (id) localStorage.setItem("last_playlist_id", id);
    }, [id]);
    
    useEffect(() => {
      const root = scrollRef.current;
      const target = bottomEl;

      if (!root || !target) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        },
        { root, rootMargin: "200px" }
      );
    
      observer.observe(target);
      return () => observer.disconnect();
      }, [bottomEl,hasNextPage, isFetchingNextPage, fetchNextPage]);
    
    // console.log('items :' ,playlistItems );
    if(id === undefined) return <Navigate to="/" />
     if (!playlist) return null;
    
    const imageUrl = playlist.images?.[0]?.url;
    const ownerName = playlist.owner?.display_name ?? "알 수 없음";
    
    const items: PlaylistTrack[] = playlist.tracks?.items ?? [];
    
    const totalTracks = items.length;


    
    return (
         <Box 
         ref={scrollRef}
         className="mainScroll"
         sx={{
          // flex:1,
          // minHeight:0,
          padding: 4,
          height: "100%",
          // overflow: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 3,
         }}
        >
      <Box
        sx={{
          display: "flex",
          gap: 3,
          alignItems: "flex-end",
          padding: 3,
          borderRadius: 2,
          background:
            "linear-gradient(180deg, rgba(80,80,80,0.9), rgba(0,0,0,0.9))",
        }}
      >
        {imageUrl && (
          <Box
            component="img"
            src={imageUrl}
            alt={playlist.name ?? ""}
            sx={{
              width: 180,
              height: 180,
              borderRadius: 1,
              objectFit: "cover",
            }}
          />
        )}

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography
            variant="caption"
            sx={{ textTransform: "uppercase", color: "text.secondary" }}
          >
            Playlist
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 500 }}>
            {playlist.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {ownerName} · {totalTracks} songs
          </Typography>
        </Box>
      </Box>

      {playlist?.tracks?.total === 0 ? (
        <EmptyPlaylistWithSearch playlistId={id ?? ""}/>
      ):(
        <>
        <Table >
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Album</TableCell>
            <TableCell>Date added</TableCell>
            <TableCell>Duration</TableCell>
          </TableRow>
        </TableHead>

        <TableBody >
          {playlistItems?.pages.map((page,pageIndex)=>
          page.items.map((item,itemIndex) =>{
            return (<DesktopPlaylistItem
              item={item} 
              key={itemIndex} 
              index={pageIndex * PAGE_LIMIT + itemIndex + 1}
              />
            )
          })
        )}
        </TableBody>
        </Table>
      <div ref={setBottomEl} style={{height:40}} />
        </>
      )}
    </Box>
    );
};

export default PlaylistDetailPage;