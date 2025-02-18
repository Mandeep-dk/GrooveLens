import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import PieChart from './ChartData';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import defaultProfilePic from "../components/../assets/Default_pic.jpg"
import fakeBarcode from "../components/../assets/image.png"
import spotifyLogo from "../components/../assets/Spotify_Full_Logo_RGB_Black.png";

function Home() {
    const token = localStorage.getItem('spotify_token');

    const [profilePic, setProfilePic] = useState(null);
    const [nowPlaying, setNowPlaying] = useState(null);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [artists, setArtists] = useState([]);
    const [albumCover, setAlbumCover] = useState('');
    const [artistImage, setArtistImage] = useState([]);
    const [username, setUsername] = useState(null);
    const [followers, setFollowers] = useState(null);
    const [topArtists, setTopArtists] = useState([]);
    const [topArtistsLink, setTopArtistsLink] = useState([]);
    const [topTracks, setTopTracks] = useState([]);
    const [topTracksLink, setTopTracksLink] = useState([]);
    const [albumCoverLink, setAlbumCoverLink] = useState();
    const [currentlyPlayingTrackLink, setCurrentlyPlayingTrackLink] = useState();
    const [currentlyPlayingArtistLink, setcurrentlyPlayingArtistLink] = useState([]);
    const [userLink, setUserLink] = useState();
    const [selectedArtistRange, setSelectedArtistRange] = useState('medium_term');
    const [selectedTrackRange, setSelectedTrackRange] = useState('medium_term');

    const swiperRef = useRef(null);

    const handleGenerateReceiptForArtists = () => {
        const user = username;
        const topArtist = topArtists.map(items => items);
        generateReceiptForArtists(user, topArtist);
    };

    const generateReceiptForArtists = async (username, topArtists) => {
        const doc = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: [100, 280],
        });
        const formattedDate = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Intl.DateTimeFormat('en-US', options).format(formattedDate);

        doc.setFontSize(12);
        doc.text("Spotify Top Artists Receipt", 27, 20);
        doc.setFontSize(9);
        doc.text("City Index - 02025", 37, 25);
        doc.text("Tel.: +456-468-987-02", 35, 28);

        doc.setFontSize(7);
        doc.text(`${date}`, 12, 34);
        doc.text(`ORDER #0001 FOR ${username || "N/A"}`, 12, 38);

        doc.text("---------------------------------------------------------------------------------------------", 12, 45)
        doc.text("---------------------------------------------------------------------------------------------", 12, 55)
        doc.text("AMT", 83, 50)
        doc.text("QTY", 12, 50)
        doc.text("ITEM", 25, 50)
        doc.setFontSize(8);

        topArtists.forEach((artist, index) => {
            doc.text(`${index + 1}.`, 12, 60 + index * 6);
            doc.text(`${artist}`, 25, 60 + index * 6);

        });
        doc.text(`40`, 85, 60);
        doc.text(`17`, 85, 66);
        doc.text(`22`, 85, 72);
        doc.text(`81`, 85, 78);
        doc.text(`54`, 85, 84);
        doc.text(`65`, 85, 90);
        doc.text(`12`, 85, 96);
        doc.text(`21`, 85, 102);
        doc.text(`80`, 85, 108);
        doc.text(`33`, 85, 114);

        doc.text("----------------------------------------------------------------------------------", 12, 120)
        doc.text("---------------------------------------------------------------------------------", 12, 136)
        doc.text("ITEM COUNT:", 12, 126)
        doc.text("10", 85, 126)
        doc.text("TOTAL:", 12, 131)
        doc.text("415", 84, 131)

        doc.text("----------------------------------------", 35, 216)
        doc.setFontSize(12);
        doc.addImage(fakeBarcode, "PNG", 12, 220, 77, 12)
        doc.text("THANK YOU!", 39, 239);
        doc.text("Glad to see you again!", 31, 243);

        doc.addImage(spotifyLogo, "PNG", 39, 250, 25, 7)
        setTimeout(() => {
            const chartElement = document.getElementById("pieChart");

            if (chartElement) {
                html2canvas(chartElement, { useCORS: true }).then((canvas) => {

                    const imgData = canvas.toDataURL("image/png");
                    doc.addImage(imgData, "PNG", 12, 144, 77, 60);

                    doc.save(`TopArtists_Receipt_${date}.pdf`);
                });
            } else {
                doc.output("dataurlnewwindow");
            }
        }, 100);
    };

    const handleGenerateReceiptForTracks = () => {
        const user = username;
        const topTrack = topTracks.map(items => items);
        generateReceiptForTracks(user, topTrack);
    };

    const generateReceiptForTracks = (username, topArtists) => {
        const doc = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: [100, 300],
        });
        const formattedDate = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Intl.DateTimeFormat('en-US', options).format(formattedDate);

        doc.setFontSize(12);
        doc.text("Spotify Top Tracks Receipt", 27, 20);
        doc.setFontSize(9);
        doc.text("City Index - 02025", 37, 25);
        doc.text("Tel.: +456-468-987-02", 35, 28);

        doc.setFontSize(7);
        doc.text(`${date}`, 12, 34);
        doc.text(`ORDER #0001 FOR ${username || "N/A"}`, 12, 38);

        doc.text("---------------------------------------------------------------------------------------------", 12, 45)
        doc.text("---------------------------------------------------------------------------------------------", 12, 55)
        doc.text("AMT", 83, 50)
        doc.text("QTY", 12, 50)
        doc.text("ITEM", 25, 50)
        doc.setFontSize(8);

        topArtists.forEach((artist, index) => {
            doc.text(`${index + 1}.`, 12, 60 + index * 6);
            doc.text(`${artist}`, 25, 60 + index * 6);

        });
        doc.text(`40`, 85, 60);
        doc.text(`17`, 85, 66);
        doc.text(`22`, 85, 72);
        doc.text(`81`, 85, 78);
        doc.text(`54`, 85, 84);
        doc.text(`65`, 85, 90);
        doc.text(`12`, 85, 96);
        doc.text(`21`, 85, 102);
        doc.text(`80`, 85, 108);
        doc.text(`33`, 85, 114);

        doc.text("----------------------------------------------------------------------------------", 12, 120)
        doc.text("---------------------------------------------------------------------------------", 12, 136)
        doc.text("ITEM COUNT:", 12, 126)
        doc.text("10", 85, 126)
        doc.text("TOTAL:", 12, 131)
        doc.text("415", 84, 131)

        doc.text("----------------------------------------", 35, 216)
        doc.setFontSize(12);
        doc.addImage(fakeBarcode, "PNG", 12, 220, 77, 12)
        doc.text("THANK YOU!", 39, 239);
        doc.text("Glad to see you again!", 31, 243);

        doc.addImage(spotifyLogo, "PNG", 39, 250, 25, 7)

        setTimeout(() => {
            const chartElement = document.getElementById("pieChart");

            if (chartElement) {
                html2canvas(chartElement, { useCORS: true }).then((canvas) => {
                    const imgData = canvas.toDataURL("image/png");
                    doc.addImage(imgData, "PNG", 12, 144, 77, 60);
                    // doc.output("dataurlnewwindow");
                    doc.save(`TopTracks_Receipt_${date}.pdf`)
                });
            } else {
                doc.output("dataurlnewwindow");
            }
        }, 100);
    };

    const handleArtistChange = (event) => {
        const selectedValue = event.target.value;
        if (selectedValue === "artist_receiptfy") {
            handleGenerateReceiptForArtists()
        } else {
            setSelectedArtistRange(selectedValue);

        }
    };

    const handleTrackChange = (event) => {
        const selectedValue = event.target.value;
        if (selectedValue === "track_receiptfy") {
            handleGenerateReceiptForTracks();
        } else {
            setSelectedTrackRange(selectedValue);
        }
    };

    useEffect(() => {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        };

        const fetchPlaying = () => axios.get("https://api.spotify.com/v1/me/player/currently-playing", config)
            .then(response => {
                const { item } = response.data;

                setAlbumCoverLink(response.data.item.album.external_urls.spotify)

                setCurrentlyPlayingTrackLink(response.data.item.external_urls.spotify)

                setcurrentlyPlayingArtistLink(response.data.item.artists.map(items => items.external_urls.spotify))
                if (item) {
                    setAlbumCover(item.album.images[0].url);
                    setArtists(item.artists.map(artist => artist.name));
                    setNowPlaying(item.name);
                    setDuration(item.duration_ms);
                    const progressMs = response.data.progress_ms || 0;
                    setProgress(progressMs);
                }
            })
            .catch(error => {
                console.error('Error fetching currently playing track', error);
            });
        fetchPlaying()

        axios.get("https://api.spotify.com/v1/me", config)
            .then(response => {
                console.log(response.data.external_urls.spotify)
                setUserLink(response.data.external_urls.spotify);
                setProfilePic(response.data.images[0].url);
                setUsername(response.data.display_name);
                setFollowers(response.data.followers.total);
            })
            .catch(error => {
                console.error('Error fetching user data', error);
            });

        axios.get(`https://api.spotify.com/v1/me/top/artists?time_range=${selectedArtistRange}`, config)
            .then(response => {
                console.log(response.data)
                setTopArtistsLink(response.data.items.slice(0, 10).map((items) => items.external_urls.spotify));
                const artistImage = response.data.items.slice(0, 10).map(item => item.images[0]);
                setArtistImage(artistImage);
                const artists = response.data.items.slice(0, 10).map(item => item.name);
                setTopArtists(artists);
            })
            .catch(error => {
                console.error('Error fetching top artists', error);
            });

        axios.get(`https://api.spotify.com/v1/me/top/tracks?time_range=${selectedTrackRange}`, config)
            .then(response => {
                setTopTracksLink(response.data.items.slice(0, 10).map((items) => items.external_urls.spotify))
                const tracks = response.data.items.slice(0, 10).map(item => item.name);
                setTopTracks(tracks);
            })
            .catch(error => {
                console.error('Error fetching top tracks', error);
            });

        setTimeout(() => {
            if (swiperRef.current) {
                swiperRef.current.autoplay.start();
            }
        }, 500);

        const interval = setInterval(fetchPlaying, 1000);
        return () => clearInterval(interval);

    }, [token, selectedArtistRange, selectedTrackRange]);

    const progressPercentage = duration ? (progress / duration) * 100 : 0;

    return (
        <>

            <div className='bg-[url("./assets/6032461.jpg")] min-h-screen text-gray flex flex-col items-center p-4'>
                <h3 className="w-full text-center p-2 lg:text-[51px] text-4xl font-mono font-bold rounded px-4">
                    GrooveLens - A closer look at your sound
                </h3>
                <div className="flex items-center w-full justify-center text-center px-4 lg:px-12 md:justify-center lg:justify-center">
                    <img src={spotifyLogo} className="h-[72px]" alt="Spotify Logo" />
                </div>

                <div className='pt-7 flex flex-col md:flex-row items-center justify-between w-full max-w-6xl p-4 '>

                    {profilePic && (
                        <div className='flex items-center space-x-4 bg-white text-black w-full sm:w-[400px] md:w-[350px] lg:w-[325px] h-auto border rounded-xl border-4 border-black p-4'>
                            <img src={profilePic} alt="Profile pic" className='border rounded-full w-[95px] h-[100px] -ml-1' />
                            <div className='text-left space-y-1 ml-6'>
                                <a href={userLink} target='_blank'>
                                    <p className='font-bold text-xl'>{username}</p>
                                </a>
                                <p className='text-sm'>Followers: {followers}</p>
                            </div>
                        </div>

                    ) || <div className='flex items-center space-x-4 bg-white text-black w-full sm:w-[400px] md:w-[350px] lg:w-[325px] h-auto border rounded-xl border-4 border-black p-4'>
                            <img src={defaultProfilePic} alt="Profile pic" className='border rounded-full w-[90px] h-[100px] mx-3' />
                            <div className='text-center md:text-left'>
                                <p className='font-bold text-xl'>{username}</p>
                                <p className='text-sm mr-4'>Followers: {followers}</p>
                            </div>
                        </div>
                    }


                    {nowPlaying && (
                        <div className="w-full max-w-[600px] md:max-w-[860px] lg:max-w-[1000px] bg-white text-black border rounded-xl p-4 mt-4 md:mt-0 md:ml-6 border-4 border-black">
                            <a href={albumCoverLink} target="_blank">
                                <img className="h-10 w-auto mt-2" src={albumCover} alt="Album cover" />
                            </a>
                            <div className='mx-12 -mt-11'>
                                <a href={currentlyPlayingTrackLink} target='_blank'>
                                    <p>{nowPlaying}</p>
                                </a>
                                {artists.map((artist, artistIndex) => (
                                    <span key={artistIndex}>
                                        <a href={currentlyPlayingArtistLink[artistIndex]} target="_blank" rel="noopener noreferrer">
                                            {artist}
                                        </a>
                                        {artistIndex < artists.length - 1 && ", "}
                                    </span>
                                ))}

                            </div>
                            <p>
                                {Math.floor(progress / 60000)}:
                                {(Math.floor((progress % 60000) / 1000)).toString().padStart(2, '0')}
                                /
                                {Math.floor(duration / 60000)}:
                                {(Math.floor((duration % 60000) / 1000)).toString().padStart(2, '0')}
                            </p>

                            <div className="w-full bg-gray-200 rounded h-2 mt-4">
                                <div
                                    className="bg-green-500 h-full rounded"
                                    style={{ width: `${progressPercentage}%` }}
                                />
                            </div>
                        </div>
                    ) || <div className="min-h-[138px] text-xl w-full max-w-[600px] md:max-w-[860px] lg:max-w-[1000px] bg-white text-black border rounded-xl p-4 mt-4 md:mt-0 md:ml-6 border-4 border-black">
                            <p>Nothing is playing right now. Start a song on Spotify!</p>
                        </div>}

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-6xl p-4">
                    <div className="rounded-xl overflow-hidden shadow-lg bg-white text-black h-auto p-4 border-4 border-black">
                        <div className="font-bold text-xl mb-2">Top Artists</div>
                        <label>Range of top artists: </label>
                        <select value={selectedArtistRange} onChange={handleArtistChange} className='text-black border-black border-2'>
                            <option value="short_term">Last 30 days</option>
                            <option value="medium_term">Last 6 months</option>
                            <option value="long_term">All-time favourites</option>
                            <option value="artist_receiptfy">Download receiptfy</option>
                        </select>
                        <ul className='mt-2'>
                            {topArtists.map((artist, index) => (

                                <li key={index}>
                                    <a href={topArtistsLink[index]} target="_blank"
                                    >{artist}</a>
                                </li>

                            ))}
                        </ul>
                    </div>

                    <div className="rounded-xl overflow-hidden shadow-lg bg-white text-black h-auto p-4 border-4 border-black">
                        <div className="font-bold text-xl mb-2">Top Songs</div>
                        <label>Range of top tracks: </label>
                        <select value={selectedTrackRange} onChange={handleTrackChange} className='text-black border-black border-2'>
                            <option value="short_term">Last 30 days</option>
                            <option value="medium_term">Last 6 months</option>
                            <option value="long_term">All-time favourites</option>
                            <option value="track_receiptfy">Download receiptfy</option>

                        </select>
                        <ul className='mt-2'>
                            {topTracks.map((track, index) => (
                                <li key={index}>
                                    <a href={topTracksLink[index]} target='_blank'>{track}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-6xl p-4">
                    <div
                        id="pieChart"
                        className="flex justify-center items-center w-full p-6 bg-white rounded-xl shadow-lg border-4 border-black">
                        <div className="h-[350px] md:h-[400px] w-full flex justify-center items-center">
                            <PieChart width={300} height={350} />
                        </div>                    
                    </div>


                    <div className="rounded-xl overflow-hidden shadow-lg bg-white text-black h-auto border-4 border-black flex">
                        <Swiper
                            modules={[Autoplay, Pagination, Navigation]}
                            autoplay={{ delay: 2000, disableOnInteraction: false, pauseOnMouseEnter: false }}
                            loop={true}
                            navigation
                            pagination={true}
                            className="w-full h-full"
                            onSwiper={(swiper) => (swiperRef.current = swiper)}
                        >
                            {artistImage.map((src, artistIndex) => (
                                <SwiperSlide key={artistIndex}>

                                    <img src={src.url} alt={`Slide ${artistIndex + 1}`} className="w-full h-full object-cover" />
                                    <a href={topArtistsLink[artistIndex]} target='_blank'>
                                        <p className="absolute top-2 left-2 font-bold bg-opacity-60 text-white px-2 py-1">
                                            #{artistIndex + 1} {topArtists[artistIndex]}
                                        </p>

                                    </a>

                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <style>
                        {`
        .swiper-button-next::after,
        .swiper-button-prev::after {
            color: white;
            font-size: 1.5rem;
            font-weight: bold;
        }

        .swiper-pagination-bullet {
            background-color: gray;
        }

        .swiper-pagination-bullet-active {
            background-color: white;
        }
        `}
                    </style>

                </div>


            </div>
        </>
    );
}
export default Home;
