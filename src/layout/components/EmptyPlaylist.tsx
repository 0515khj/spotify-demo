import { Button, Card, Typography,styled } from '@mui/material';


const ListBox = styled(Card)(({theme}) => ({
    backgroundColor: theme.palette.background.paper,
    padding: "20px",
    borderRadius: "8px",
}))

const CreateBtn = styled(Button)({
    marginTop:'20px',
    fontWeight:"700",
})


const EmptyPlaylist = () => {
    return (
        <ListBox>
            <Typography variant="h2" fontWeight={700}>
                Create your first playlist
            </Typography>
            <Typography variant="body2">It's easy, we'll help you</Typography>
            <CreateBtn variant="contained" color="secondary">
              Create playlist
            </CreateBtn>
        </ListBox>
    );
};

export default EmptyPlaylist;