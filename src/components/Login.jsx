import React from 'react';
import spotifyLogo from "../components/../assets/Spotify_Full_Logo_RGB_Black.png";

function Login() {
    const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
    const REDIRECT_URI = window.location.hostname==="localhost"? "http://localhost:3000/callback" : "https://groove-lens.vercel.app/callback";
    const SCOPES = 'user-read-private user-top-read user-read-currently-playing'; 


    const handleLogin = () => {
        const AUTH_URL = `https://accounts.spotify.com/authorize?response_type=token&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES)}`;
        window.location.href = AUTH_URL; 
    };

    return (
        <>
            <div className='flex flex-col items-center justify-center min-h-screen text-3xl'>
            <div className='flex p-2 justify-center text-2xl'>
                    <img src={spotifyLogo} className='h-[72px] px-2'></img>
                </div>
                <h1 className='mb-4 text-center'>
                    You need to login with your Spotify account.
                </h1>
                
                <button onClick={handleLogin} className='bg-green-500 border border-2 border-black rounded-full mt-4 w-70 px-4 py-2 font-semibold text-black hover:bg-green-600'>
                    Login with Spotify
                </button>
               
            </div>
        </>
    );
}

export default Login;
