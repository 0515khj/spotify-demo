import { Box, Paper, TextField, Typography } from "@mui/material";
import SearchResultList from "../Playlist/conponents/SearchResultList";
import { useEffect, useMemo, useState } from "react";
import type { Track } from "../../models/playlist";
import useSearchItemsByKeyword from "../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../models/search";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPlaylistTracks } from "../../apis/playlistApi";

const SearchPage = () => {
   const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");

  const [sp] = useSearchParams();
  const playlistId =  sp.get("playlistId") ??
  localStorage.getItem("last_playlist_id") ??
  "";
  

  const navigate = useNavigate();

const playlistIdFromQuery = sp.get("playlistId") ?? "";
const lastPlaylistId = localStorage.getItem("last_playlist_id") ?? "";

useEffect(() => {
  if (!playlistIdFromQuery && lastPlaylistId) {
    navigate(`/search?playlistId=${lastPlaylistId}`, { replace: true });
  }
}, [playlistIdFromQuery, lastPlaylistId, navigate]);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(q.trim()), 350);
    return () => clearTimeout(t);
  }, [q]);

  const params = useMemo(
    () => ({
      q: debouncedQ,
      type: [SEARCH_TYPE.Track], 
    }),
    [debouncedQ]
  );

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useSearchItemsByKeyword(params);

  const tracks: Track[] = useMemo(() => {
    return (
      data?.pages?.flatMap((page) => page?.tracks?.items ?? []) ?? []
    );
  }, [data]);

  const qc = useQueryClient();

  const addMutation = useMutation({
    mutationFn: (trackUri: string) => addPlaylistTracks(playlistId, [trackUri]),
    onSuccess: async () => {
      // ✅ (추가) 추가 후 화면/사이드바 갱신
      await Promise.all([
        qc.invalidateQueries({ queryKey: ["playlist-items", playlistId] }),
        qc.invalidateQueries({ queryKey: ["playlist-detail", playlistId] }),
        qc.invalidateQueries({ queryKey: ["current-user-playlists"] }),
      ]);
    },
  });

  const handleAdd = (track: Track) => {
    if (!playlistId) {
      // 여기서 토스트/알림 띄워도 됨
      console.log("error");
      return;
    }
    if (!track.uri) return;
    addMutation.mutate(track.uri);
  };



  return (
      <Box sx={{ px: 2, py: 3 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, md: 3 },
          borderRadius: 3,
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(6px)",
        }}
      >
        <Typography sx={{ color: "white", fontWeight: 800, fontSize: 22 }}>
          원하는 음악을 검색하세요
        </Typography>
        <Typography sx={{ mt: 0.5, color: "rgba(255,255,255,0.65)", fontSize: 13 }}>
          곡명을 입력하면 아래에 결과가 표시됩니다.
        </Typography>

        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            placeholder="예: love, attention, ditto..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            autoComplete="off"
            InputProps={{
              sx: {
                color: "white",
                borderRadius: 2,
                background: "rgba(0,0,0,0.35)",
                "& fieldset": { borderColor: "rgba(255,255,255,0.18)" },
                "&:hover fieldset": { borderColor: "rgba(255,255,255,0.35)" },
                "&.Mui-focused fieldset": { borderColor: "rgba(30,215,96,0.6)" },
              },
            }}
          />
        </Box>
      </Paper>

      <Box sx={{ mt: 3}}>
        {!debouncedQ && (
          <Typography sx={{ color: "rgba(255,255,255,0.55)", fontSize: 13, px: 1 }}>
            검색어를 입력하면 결과가 여기에 표시
          </Typography>
        )}

        {debouncedQ && isLoading && (
          <Typography sx={{ color: "rgba(255,255,255,0.55)", fontSize: 13, px: 1 }}>
            검색중...
          </Typography>
        )}

        {debouncedQ && isError && (
          <Typography sx={{ color: "rgba(255,120,120,0.9)", fontSize: 13, px: 1 }}>
            검색 에러 발생
          </Typography>
        )}

        {debouncedQ && !isLoading && (
          <SearchResultList
            list={tracks}
            fetchNextPage={fetchNextPage}
            hasNextPage={!!hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            onAdd={handleAdd}
          />
        )}
      </Box>
    </Box>
  );
};

export default SearchPage;