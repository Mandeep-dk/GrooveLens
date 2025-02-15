import React from 'react';

function Login() {
    const CLIENT_ID = '6bebea651ed148aeb6097e6373c8b659';
    const REDIRECT_URI = 'http://localhost:3000/callback';
    const SCOPES = 'user-read-private user-read-email user-top-read user-read-currently-playing'; 


    const handleLogin = () => {
        const AUTH_URL = `https://accounts.spotify.com/authorize?response_type=token&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES)}`;
        window.location.href = AUTH_URL; 
    };

    return (
        <>
            <div className='flex flex-col items-center justify-center min-h-screen text-3xl'>
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
