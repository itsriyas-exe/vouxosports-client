import React from 'react';
import '../styles/latestNews.css';

const LatestNews = ({ news }) => {
    const { imageUrl, title, gmtTime, sourceStr, page } = news;

    return (
        <div className="news-card">
            <img src={imageUrl} alt="news thumbnail" className="news-card-img" />
            <div className="news-card-content">
                <h3 className="news-card-title">{title}</h3>
                <p className="news-card-source">Source: {sourceStr || 'Unknown'}</p>
                <p className="news-card-time">
                    Published on: {new Date(gmtTime).toLocaleString()}
                </p>
                <a
                    href={`https://free-api-live-football-data.p.rapidapi.com${page.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="news-card-button"
                >
                    Read More
                </a>
            </div>
        </div>
    );
};

export default LatestNews;
