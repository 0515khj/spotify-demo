import React, { useEffect, useMemo, useRef } from 'react';
import type { Track } from '../../../models/playlist';
import { Avatar, Box, Button, Divider, Stack, Typography } from '@mui/material';

interface SearchResultListProps {
    list:Track[];
    hasNextPage?: boolean;       
    fetchNextPage?: () => void;  
    isFetchingNextPage?: boolean;
    onAdd?: (track: Track) => void; 
}

const SearchResultList = ({
    list,
    hasNextPage = false,
    fetchNextPage,
    isFetchingNextPage = false,
    onAdd,
}:SearchResultListProps) => {

     const sentinelRef = useRef<HTMLDivElement | null>(null);

      useEffect(() => {
    if (!sentinelRef.current) return;
    if (!fetchNextPage) return;

    const el = sentinelRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { root: null, rootMargin: "300px", threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage, isFetchingNextPage]);

  const rows = useMemo(() => list ?? [], [list]);

    return (
    <Box sx={{ mt: 2 }}>
      <Box
        sx={{
          px: 1,
          pb: 1,
          display: "grid",
          gridTemplateColumns: { xs: "1fr 100px", md: "2fr 1.5fr 110px" },
          gap: 2,
          color: "rgba(255,255,255,0.65)",
          fontSize: 12,
        }}
      >
        <Typography variant="caption">Title</Typography>
        <Typography variant="caption" sx={{ display: { xs: "none", md: "block" } }}>
          Album
        </Typography>
        <Typography variant="caption" sx={{ textAlign: "right" }}>
          Action
        </Typography>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

      <Stack sx={{ mt: 1 }} spacing={0.5}>
        {rows.map((track) => {
          const img =
            track.album?.images?.[2]?.url ||
            track.album?.images?.[1]?.url ||
            track.album?.images?.[0]?.url ||
            "";

          const artistText = track.artists?.map((a) => a.name).join(", ") ?? "";
          const albumName = track.album?.name ?? "";

          return (
            <Box
              key={track.id}
              sx={{
                px: 1,
                py: 1,
                borderRadius: 2,
                display: "grid",
                gridTemplateColumns: { xs: "1fr 100px", md: "2fr 1.5fr 110px" },
                alignItems: "center",
                gap: 2,
                transition: "background 0.15s ease",
                "&:hover": { background: "rgba(255,255,255,0.06)" },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, minWidth: 0 }}>
                <Avatar
                  variant="rounded"
                  src={img}
                  alt={track.name}
                  sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: "rgba(255,255,255,0.08)" }}
                />
                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    sx={{
                      color: "white",
                      fontWeight: 700,
                      fontSize: 14,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {track.name}
                  </Typography>
                  <Typography
                    sx={{
                      color: "rgba(255,255,255,0.65)",
                      fontSize: 12,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {artistText}
                  </Typography>
                </Box>
              </Box>

              <Typography
                sx={{
                  display: { xs: "none", md: "block" },
                  color: "rgba(255,255,255,0.65)",
                  fontSize: 13,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                title={albumName}
              >
                {albumName}
              </Typography>

              {/* 오른쪽: Add */}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => onAdd?.(track)}
                  sx={{
                    borderRadius: 999,
                    textTransform: "none",
                    borderColor: "rgba(30, 215, 96, 0.55)",
                    color: "rgb(30, 215, 96)",
                    "&:hover": {
                      borderColor: "rgb(30, 215, 96)",
                      background: "rgba(30, 215, 96, 0.08)",
                    },
                  }}
                >
                  Add
                </Button>
              </Box>
            </Box>
          );
        })}

        {/* 바닥 센티넬 */}
        <Box ref={sentinelRef} sx={{ height: 1 }} />

        {/* 로딩 표시 */}
        {isFetchingNextPage && (
          <Typography sx={{ color: "rgba(255,255,255,0.65)", fontSize: 12, py: 1, px: 1 }}>
            loading...
          </Typography>
        )}

        {!hasNextPage && rows.length > 0 && (
          <Typography sx={{ color: "rgba(255,255,255,0.45)", fontSize: 12, py: 1, px: 1 }}>
            end of results
          </Typography>
        )}
      </Stack>
    </Box>
  );
};


export default SearchResultList;