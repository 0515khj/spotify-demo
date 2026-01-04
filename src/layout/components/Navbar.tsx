import { Box } from '@mui/material';
import LoginButton from '../../common/components/LoginButton';
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const Navbar = () => {
    const {data:userProfile} = useGetCurrentUserProfile();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();


    const profileImg = userProfile?.images?.length 
    ? userProfile.images[0].url : "/images/userPro.png";

    const logOut =()=>{
        localStorage.removeItem("access_token");
        window.location.reload();
        navigate('/')
    }

    
    
    return (
        <Box display="flex" justifyContent="flex-end" alignItems="center" height="64px">
          {userProfile ?( 
            <>
            <img src={profileImg} alt="" onClick={()=> setOpen(!open)}
          style={{ width:36 , height:36,borderRadius:"50%",cursor:"pointer" }}
          />
           {open && (
            <Box 
              sx={{
                position: "absolute",
                top: "55px",
                right: "50px",
                backgroundColor: "#222",
                color: "#fff",
                borderRadius: "8px",
                padding: "10px 0",
                width: "120px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
                cursor: "pointer",
                textAlign: "center",
                fontSize: "14px",
            }}
            onClick={logOut}
            >
            LOGOUT
            </Box>
           )}
           </>
        ):( 
        <LoginButton/>
        )}   
        </Box>
    );
};

export default Navbar;