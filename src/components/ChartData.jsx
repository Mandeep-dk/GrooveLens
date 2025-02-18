import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PieChart = () => {
    const token = localStorage.getItem('spotify_token');

    const [sortedGenres, setSortedGenres] = useState([]);
    const [genreCounts, setGenreCounts] = useState([]);
    const [selectedTrackRange, setSelectedTrackRange] = useState('medium_term');

    function sortByFrequency(arr) {
        const frequencyMap = {};
        arr.forEach(item => {
            const genre = item.toLowerCase(); 
            frequencyMap[genre] = (frequencyMap[genre] || 0) + 1;
        });

        return Object.entries(frequencyMap).sort((a, b) => b[1] - a[1]); 
    }

    useEffect(() => {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        };

        axios.get(`https://api.spotify.com/v1/me/top/artists?time_range=${selectedTrackRange}&limit=50`, config)
            .then(response => {
                const artistIds = response.data.items.map(item => item.id); 
                const idContainer = [];
                const genrePromises = artistIds.map(artistId => {
                    return axios.get(`https://api.spotify.com/v1/artists/${artistId}`, config)
                        
                        .then(response => {
                            const genres = response.data.genres; 
                            idContainer.push(...genres);
                        });
                });

                Promise.all(genrePromises).then(() => {
                    const sorted = sortByFrequency(idContainer).slice(0, 5);
                    setSortedGenres(sorted.map(item => item[0])); 
                    setGenreCounts(sorted.map(item => item[1])); 
                }).catch(error => {
                    console.error('Error fetching genres', error);
                });
            })
            .catch(error => {
                console.error('Error fetching top artists for genres', error);
            });

    }, [token, selectedTrackRange]);

    const data = {
        labels: sortedGenres.length > 0 ? sortedGenres : ['No Data'],
        datasets: [
            {
                label: 'Genre Frequency',
                data: genreCounts.length > 0 ? genreCounts : [1],
                backgroundColor: [
                    'rgba(233, 15, 62, 0.4)',
                    'rgba(0, 0, 0, 0.4)',
                    'rgba(255, 206, 86, 0.4)',
                    'rgba(75, 192, 192, 0.4)',
                    'rgba(153, 102, 255, 0.4)',
                    'rgba(255, 159, 64, 0.4)',
                    'rgba(255, 99, 132, 0.4)',
                    'rgba(54, 162, 235, 0.4)',
                    'rgba(255, 206, 86, 0.4)',
                    'rgba(75, 192, 192, 0.4)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgb(19, 60, 173)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgb(14, 116, 31)',
                    'rgb(12, 11, 10)',
                    'rgb(243, 27, 27)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
       
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Top Genres by Frequency',
            },
        },
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
            }}


        >
            <Pie data={data} options={options} height={300} width={400} />
        </div>
    );

};

export default PieChart;
