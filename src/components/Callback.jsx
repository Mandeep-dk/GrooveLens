import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Callback() {
    const navigate = useNavigate();

    useEffect(() => {
        const hash = window.location.href;

        if (hash.includes("access_token")) {
            console.log('URL Hash:', hash); 
            console.log('Current URL:', window.location.href);

            const tokenParts = hash.split(/[=&]/);
            const token = tokenParts[1]; 

            console.log('Token String:', token);

            if (token) {
                localStorage.setItem('spotify_token', token);

                navigate('/home'); 
            }
        }
    }, [navigate]);

    return (
        <div>
            <h1>Logging you in...</h1>
        </div>
    );
}

export default Callback;
