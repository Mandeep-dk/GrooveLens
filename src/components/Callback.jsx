import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Callback() {
    const navigate = useNavigate();

    useEffect(() => {
        const hash = window.location.href;

        if (hash.includes("access_token")) {

            const tokenParts = hash.split(/[=&]/);
            const token = tokenParts[1]; 

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
