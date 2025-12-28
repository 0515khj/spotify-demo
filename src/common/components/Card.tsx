import { Card as MuiCard, CardContent, CardMedia, Typography } from '@mui/material';

interface CardProps {
    name:string;
    image:string;
    artistName:string | undefined;
}

const Card = ({image,name,artistName}:CardProps) => {
    return (
         <MuiCard
      sx={{
         width: '100%',
        //  maxWidth: 220,
        padding:1.5,
        bgcolor: "transparent",
        boxShadow: "none",
        borderRadius: 2,
        cursor: "pointer",
        transition: "all 0.2s",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 8px 20px rgba(0,0,0,0.4)"
        }
      }}
    >
      <CardMedia
        component="img"
        image={image}
        alt={name}
        sx={{
          borderRadius: 2,
          aspectRatio: "1 / 1",
          objectFit: "cover",
          width: '100%',  
        }}
      />

      <CardContent sx={{ px: 0, pt: 1 }}>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          noWrap
           sx={{ fontSize: { xs: 12, sm: 14 } }} 
        >
          {name}
        </Typography>
        <Typography
          variant="subtitle2"
          noWrap
          color="text.secondary"
           sx={{ fontSize: { xs: 11, sm: 13 } }}
        >
          {artistName}
        </Typography>
      </CardContent>
    </MuiCard>
    );
};

export default Card;