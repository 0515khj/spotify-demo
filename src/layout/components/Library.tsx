import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import useGetCurrentUserPlaylists from "../../hooks/useGetCurrentUserPlaylists";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";

import Spinners from "../../common/components/Spinners";
import EmptyPlaylist from "./EmptyPlaylist";
import Playlist from "./Playlist";

const Library = () => {
  const { ref, inView } = useInView();

  const {
    data,
    isLoading,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetCurrentUserPlaylists({
    limit: 10,
    offset: 0,
  });

  const { data: user } = useGetCurrentUserProfile();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) return <Spinners />;
  if (!user) return <EmptyPlaylist />;
  if (error) return <div>에러가 발생했습니다.</div>;

  const hasPlaylists =
    data?.pages && data.pages[0].items && data.pages[0].items.length > 0;

  return (
    <div>
      {hasPlaylists ? (
        <>
          {data!.pages.map((page, index) => (
            <Playlist key={index} playlists={page.items} />
          ))}

          <div ref={ref}>{isFetchingNextPage && <Spinners />}</div>
        </>
      ) : (
        <EmptyPlaylist />
      )}
    </div>
  );
};

export default Library;