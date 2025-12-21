import React from 'react';
import { PacmanLoader } from 'react-spinners';

const Spinners = () => {
    return (
         <div style={{ display: "flex", justifyContent: "center", 
            alignItems: "center", height: "100vh" }}>
            <PacmanLoader color="#1db954" size={48} />
        </div>
    );
};

export default Spinners;