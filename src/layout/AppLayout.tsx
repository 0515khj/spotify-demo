import { Box, styled, Typography } from "@mui/material";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom"; 
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryHead from "./components/LibraryHead";
import Library from "./components/Library";
import Navbar from "./components/Navbar";
import { getSpotifyAuthUrl } from "../utils/auth";
import ErrorState from "./components/ErrorState";

const Layout = styled("div")({
  display: "flex",
  height: "100vh",
  padding: "8px",
  gap: "8px",
});

const Sidebar = styled("div")(({ theme }) => ({
  width: "300px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  [theme.breakpoints.down("sm")]: { display: "none" },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  borderRadius: "8px",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  width: "100%",
  minHeight: 0,
}));

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  gap: "14px",
  color: theme.palette.text.secondary,
  "&:hover": { color: theme.palette.text.primary },
  "&.active": { color: theme.palette.text.primary },
}));


const TopHeader = styled(Box)(({ theme }) => ({
  zIndex: 50,
  height: 100,
  overflow:"hidden",
  padding: "10px 14px",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: 10,
  background: theme.palette.background.paper,
  backdropFilter: "blur(10px)",
}));

const HeaderLeft = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: 10,
}));

const HeaderRight = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: 8,
  marginLeft: "auto", 
}));

const HeaderLink = styled(NavLink)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 8,
  textDecoration: "none",
  color: theme.palette.text.secondary,
  padding: "8px 10px",
  borderRadius: 10,
  "&:hover": {
    background: "rgba(255,255,255,0.06)",
    color: theme.palette.text.primary,
  },
  "&.active": { color: theme.palette.text.primary },
}));

const MainScrollArea = styled(Box)(() => ({
  flex: 1,
  minHeight: 0, 
  overflowY: "auto",
}));

const HeaderButton = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 8,
  color: theme.palette.text.secondary,
  padding: "8px 10px",
  borderRadius: 10,
  cursor: "pointer",
  userSelect: "none",
  "&:hover": {
    background: "rgba(255,255,255,0.06)",
    color: theme.palette.text.primary,
  },
}));

const AppLayout = () => {
    const accessToken = localStorage.getItem("access_token"); 
    const isLoggedIn = !!accessToken;

    const location = useLocation();
 const navigate = useNavigate(); // ✅ 추가

  // ✅ 추가: Search 클릭 시점에 playlistId를 "다시" 계산해서 이동
  const goSearch = () => {
    const m = location.pathname.match(/^\/playlist\/([^/]+)/);
    const fromPath = m?.[1] ?? "";
    const lastPlaylistId = localStorage.getItem("last_playlist_id") ?? "";
    const playlistIdForSearch = fromPath || lastPlaylistId;

    if (playlistIdForSearch) {
      navigate(`/search?playlistId=${playlistIdForSearch}`);
    } else {
      navigate("/search");
    }
  };
    const login = () =>{
            getSpotifyAuthUrl();
        }

  return (
    <Layout>
      <Sidebar>
        <ContentBox sx={{ p: 2 }}>
            <StyledNavLink to="/">
            <Box
              component="img"
              src="/images/spo1.png"
              alt="Spotify"
              sx={{
                width: 300,
                height: 60,
                objectFit: "contain",
              }}
            />
            </StyledNavLink>
        </ContentBox>

        <ContentBox
          sx={{
            flex: 1,
            p: 2,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <LibraryHead />
          {!isLoggedIn ? (
            <Box sx={{mt:2}}>
            <ErrorState
                fullScreen={false}            
                title="로그인 하세요"
                description="로그인해야 플레이리스트 / 라이브러리를 사용할 수 있어요."
                actionLabel="Log in"
                onAction={login}
            />
            </Box>
           ) : (
          <Box className="mainScroll" sx={{ mt: 1, flex: 1, overflowY: "auto", pr: 1 }}>
            <Library />
          </Box>
        )}
        </ContentBox>
      </Sidebar>

      <ContentBox
        sx={{
          flex: 1,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
        }}
      >
        
          <TopHeader>
            <HeaderLeft>
              <HeaderLink to="/">
                <HomeIcon fontSize="small" />
                <Typography sx={{ fontSize: 14, fontWeight: 700 }}>
                  Home
                </Typography>
              </HeaderLink>

              {/* <HeaderLink to={searchTo}>
                <SearchIcon fontSize="small" />
                <Typography sx={{ fontSize: 14, fontWeight: 700 }}>
                  Search
                </Typography>
              </HeaderLink> */}

            <HeaderButton onClick={goSearch} role="button" tabIndex={0}>
              <SearchIcon fontSize="small" />
              <Typography sx={{ fontSize: 14, fontWeight: 700 }}>Search</Typography>
            </HeaderButton>


            </HeaderLeft>

            <HeaderRight>
                <Navbar/>
            </HeaderRight>
          </TopHeader>

          <MainScrollArea className="mainScroll">
            <Box sx={{ px: 2, pt: 0, pb: 3 }}>
              <Outlet />
            </Box>
          </MainScrollArea>
      </ContentBox>

    </Layout>
  );
};

export default AppLayout;
