import { Box, Typography } from '@mui/material';
import useGetCurrentUserPlaylists from '../../hooks/useGetCurrentUserPlaylists';
import EmptyPlaylist from './EmptyPlaylist';
import { useInView } from "react-intersection-observer";
import { useEffect } from 'react';
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';
import Spinners from '../../common/components/Spinners';

const Library = () => {
    const { ref , inView} = useInView();
    const {data,
        isLoading,
        error, hasNextPage,isFetchingNextPage, fetchNextPage} = useGetCurrentUserPlaylists({
        limit:10, offset:0});
    useEffect(()=>{
        if(inView && hasNextPage && !isFetchingNextPage){
            fetchNextPage();
        }
    },[inView])
    const {data:user}=useGetCurrentUserProfile();

    if (isLoading) return <Spinners />;  
  if (error) return <div>에러가 발생했습니다.</div>;
    if(!user) return <EmptyPlaylist/>
   return (
  <div>
    {data?.pages && data.pages[0].items.length ? (
      data.pages.map((page, pageIndex) =>
        page.items.map((playlist, itemIndex) => {
          // ★ 마지막 카드에만 ref 달기 (무한스크롤 트리거)
          const isLastItem =
            pageIndex === data.pages.length - 1 &&
            itemIndex === page.items.length - 1;

          return (
            <Box
              key={playlist.id}
              ref={isLastItem ? ref : undefined}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: 1.5,
                py: 1,
                borderRadius: 1,
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.08)",
                },
              }}
            >
              <Box
                component="img"
                src={playlist.images?.[0]?.url}
                alt={playlist.name}
                sx={{
                  width: 100,
                  height: 100,
                  borderRadius: 1,
                  flexShrink: 0,
                }}
              />

              <Box
                component="ul"
                sx={{
                  listStyle: "none",
                  m: 0,
                  p: 0,
                }}
              >
                <Box component="li">
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, lineHeight: 1.2 }}
                  >
                    {playlist.name}
                  </Typography>
                </Box>

                <Box component="li">
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary" }}
                  >
                    Playlist · {playlist.owner?.display_name}
                  </Typography>
                </Box>
              </Box>
            </Box>
          );
        })
      )
    ) : (
      <EmptyPlaylist />
    )}

    {/* 밑에는 그대로 두고, 로딩 중일 때만 스피너 */}
    {isFetchingNextPage && <Spinners />}
  </div>
    );
};

export default Library;