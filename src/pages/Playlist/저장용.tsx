import { Navigate, useParams } from "react-router-dom";
import useGetPlaylist from "../../hooks/useGetPlaylist";
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import type {PlaylistTrack } from "../../models/playlist";
import useGetPlaylistItems from "../../hooks/useGetPlaylistItems";
import DesktopPlaylistItem from "./conponents/DesktopPlaylistItem";
import { PAGE_LIMIT } from "../../configs/commonConfig";


const PlaylistDetailPage = () => {
    const {id} = useParams<{id:string}>();
    
    const { data:playlist }=useGetPlaylist({playlist_id:id ?? ""})
    
    const {
      data:playlistItems,
      // isLoading:isPlaylistItemsLoading,
      // error:playlistItemsLoading,
      // hasNextPage,
      // isFetchingNextPage,
      // fetchNextPage,
    } = useGetPlaylistItems({playlist_id:id ?? "",limit:PAGE_LIMIT,offset:0});
    
    console.log('items :' ,playlistItems );
    if(id === undefined) return <Navigate to="/" />
     if (!playlist) return null;
    
    const imageUrl = playlist.images?.[0]?.url;
    const ownerName = playlist.owner?.display_name ?? "알 수 없음";
    const items: PlaylistTrack[] = playlist.tracks?.items ?? [];
    const totalTracks = items.length;

  //   const formatDuration = (ms?: number) => {
  //   if (!ms) return "";
  //   const totalSeconds = Math.floor(ms / 1000);
  //   const minutes = Math.floor(totalSeconds / 60);
  //   const seconds = totalSeconds % 60;
  //   return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  // };

    return (
         <Box
      sx={{
        padding: 4,
        height: "100%",
        overflow: "auto",
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

      {/* <Box>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: 14,
          }}
        >
          <thead>
            <tr style={{ color: "gray", textAlign: "left" }}>
              <th style={{ padding: "8px" }}>#</th>
              <th style={{ padding: "8px" }}>Title</th>
              <th style={{ padding: "8px" }}>Album</th>
              <th style={{ padding: "8px" }}>Date added</th>
              <th style={{ padding: "8px", textAlign: "right" }}>Duration</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => {
              if (!item.track) return null;
              const track = item.track as Track; 
              const addedDate = item.added_at?.slice(0, 10) ?? "";

              return (
                <tr
                  key={index}
                  style={{
                    borderTop: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <td style={{ padding: "8px", color: "gray" }}>{index + 1}</td>
                  <td style={{ padding: "8px" }}>{track.name}</td>
                  <td style={{ padding: "8px", color: "gray" }}>
                    {track.album?.name}
                  </td>
                  <td style={{ padding: "8px", color: "gray" }}>
                    {addedDate}
                  </td>
                  <td
                    style={{
                      padding: "8px",
                      color: "gray",
                      textAlign: "right",
                    }}
                  >
                    {formatDuration(track.duration_ms)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Box> */}
      {playlist?.tracks?.total === 0 ? (
        <Typography>써치</Typography>
      ):(
        <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Album</TableCell>
            <TableCell>Date added</TableCell>
            <TableCell>Duration</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
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
      )}
    </Box>
    );
};

export default PlaylistDetailPage;