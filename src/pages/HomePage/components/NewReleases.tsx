import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import useGetNewReleases from '../../../hooks/useGetNewReleases';
import Spinners from '../../../common/components/Spinners';
import ErrorMessage from '../../../common/components/ErrorMessage';
import Card from '../../../common/components/Card';

const NewReleases = () => {
    const {data,error,isLoading} = useGetNewReleases();
    console.log('ddd',data)
    if(isLoading){
        return <Spinners/>
    }
    if(error){
        return <ErrorMessage errorMessage={error.message}/>;
    }
    return (
        <div>
            <Typography variant='h1' paddingTop="8px">
                New Released Albums
            </Typography>
            {data && data.albums.items.length > 0 ?(
                <Grid container  rowSpacing={4} columnSpacing={1}>
                    {data.albums.items.map((album)=>(
                        <Grid size={{xs:6, sm:4, md:2}} key={album.id}>
                            <Card 
                            image={album.images[0].url} 
                            name={album.name} 
                            artistName={album.artists[0].name}
                            />
                        </Grid>
                    ))}
                </Grid>
                ):(
                <Typography variant='h2'>No Data</Typography>
                )}
        </div>
    );
};

export default NewReleases;