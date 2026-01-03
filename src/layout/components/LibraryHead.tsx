import styled from '@emotion/styled';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import useCreatePlaylist from '../../hooks/useCreatePlaylist';
import { getSpotifyAuthUrl } from '../../utils/auth';

const Head = styled('div')({
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    padding:'8px'

})

const LibraryHead = () => {

    const {mutate:createPlaylist}= useCreatePlaylist();

    const handleCreatePlaylist =()=>{
        const token = localStorage.getItem('access_token');

        if(!token){
            getSpotifyAuthUrl();
            return;
        }

        createPlaylist({name : "나의 플레이 리스트"})
    }
    return (
        <Head>
            <Box display="flex">
                <BookmarkIcon sx={{marginRight:"15px"}}/>
                <Typography variant='h2' fontWeight={700}>
                    Your Library
                </Typography>
            </Box>
            <Button onClick={handleCreatePlaylist}>
                <AddIcon/>
            </Button>
        </Head>
    );
};

export default LibraryHead;