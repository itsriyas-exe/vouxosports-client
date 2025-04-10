import React, { useEffect, useState } from 'react';
import '../styles/latestNews.css';
import LatestNews from '../components/LatestNews';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const Trending = () => {
    const [newsData, setNewsData] = useState([]);
    const API_URL = 'https://free-api-live-football-data.p.rapidapi.com/football-get-trendingnews';
    const API_KEY = '1ec73c266amsh756bf6548903ef6p184c00jsn5f929ded0e5a'; // Replace with your actual API key
    
    //check auth
  const [token, setToken] = useState("");
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    setToken(storedToken);
    // Redirect logic based on token and userId
    if (!storedToken) {
        // Redirect to /home if token exists but userId does not match
        navigate("/error");
      }
    }, [navigate]);
  
    // Fetch the latest news from the API
    const getNewsData = async () => {
        try {
            const response = await fetch(API_URL, {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Host': 'free-api-live-football-data.p.rapidapi.com',
                    'X-RapidAPI-Key': API_KEY,
                },
            });
            const jsonData = await response.json();
            setNewsData(jsonData.response.news); // Set the news items
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    useEffect(() => {
        getNewsData();
    }, []);

    return (
       <>
       <Header/>
            <div className="news-container">
                <div>
                    <h1 className="heading">Sports News</h1>
                    <p>Stay Updated with Latest Sports News</p>
                </div>
                <div className="news-cards">
                    {newsData.length > 0 ? (
                        newsData.map((newsItem) => (
                            <LatestNews key={newsItem.id} news={newsItem} />
                        ))
                    ) : (
                        <p>Loading news...</p>
                    )}
                </div>
            </div>
            <Footer/>
       </>
    );
};

export default Trending;
