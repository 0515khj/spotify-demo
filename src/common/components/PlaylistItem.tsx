import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router";

interface PlaylistItemProps {
  id: string;
  image: string | null;
  name: string;
  artistName: string | null;
  handleClick? : (id:string)=> void;
}

const PlaylistItem = ({ id, image, name, artistName, handleClick }: PlaylistItemProps) => {

     const navigate = useNavigate();

  const onClick = () => {
    if (handleClick) {
      // 부모에서 props로 넘어온 함수가 있으면 그거 호출
      handleClick(id);
    } else {
      // 없으면 기본 동작: 플레이리스트 상세로 이동
      navigate(`/playlist/${id}`);
    }
  };

  return (
    <Box
    //   onClick={()=> handleClick(id)}
      onClick={onClick}
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
        src={image ?? undefined}
        alt={name}
        sx={{
          width: 100,
          height: 100,
          borderRadius: 1,
          flexShrink: 0,
          backgroundColor: "#222",
          objectFit: "cover",
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
            {name}
          </Typography>
        </Box>

        <Box component="li">
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Playlist · {artistName}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PlaylistItem;