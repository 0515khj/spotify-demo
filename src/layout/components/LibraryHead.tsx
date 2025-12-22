import styled from '@emotion/styled';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const Head = styled('div')({
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    padding:'8px'

})

const LibraryHead = () => {
    return (
        <Head>
            <Box display="flex">
                <BookmarkIcon sx={{marginRight:"15px"}}/>
                <Typography variant='h2' fontWeight={700}>
                    Your Library
                </Typography>
            </Box>
            <Button>
                <AddIcon/>
            </Button>
        </Head>
    );
};

export default LibraryHead;