import { Box, Paper, TextField, Typography } from "@mui/material";
import SearchResultList from "../Playlist/conponents/SearchResultList";
import { useEffect, useMemo, useState } from "react";
import type { Track } from "../../models/playlist";
import useSearchItemsByKeyword from "../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../models/search";

const SearchPage = () => {
   const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(q.trim()), 350);
    return () => clearTimeout(t);
  }, [q]);

  // ✅ 지금은 “노래”만 보여줄거니까 type은 track만
  const params = useMemo(
    () => ({
      q: debouncedQ,
      type: [SEARCH_TYPE.Track], // enum이면 [SEARCH_TYPE.Track] 그대로
      // limit은 searchApi 쪽에서 20 주면 됨 (Spotify 기본 20)
    }),
    [debouncedQ]
  );

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useSearchItemsByKeyword(params);

  // ✅ pages에서 tracks.items만 싹 합치기
  const tracks: Track[] = useMemo(() => {
    return (
      data?.pages?.flatMap((page) => page?.tracks?.items ?? []) ?? []
    );
  }, [data]);

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
            검색어를 입력하면 결과가 여기에 표시돼.
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
            onAdd={(track) => {
              // TODO: 플레이리스트에 track 추가 로직 연결
              console.log("ADD:", track.id);
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default SearchPage;