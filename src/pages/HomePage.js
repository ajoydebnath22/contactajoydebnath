import React, { useEffect, useState } from "react";
import "../css/HomePage.css";
import ScrollToTop from '../components/ScrollToTop';

const ITEMS_PER_PAGE = 6; // Number of videos to load at a time

const HomePage = () => {
  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [loading, setLoading] = useState(true); // Loader for initial page load
  const [loadingMore, setLoadingMore] = useState(false); // Loader for infinite scrolling

  useEffect(() => {
    fetch("/db/videos.json")
      .then((response) => response.json())
      .then((data) => {
        const sortedVideos = data.sort((a, b) => b.sequence - a.sequence);
        setVideos(sortedVideos);
        setLoading(false); // Stop initial loader once data is loaded
      })
      .catch((error) => {
        console.error("Error fetching video data:", error);
        setLoading(false); // Stop loader even if error occurs
      });
  }, []);

  const getYouTubeThumbnail = (videoUrl) => {
    let videoId = "";
    if (videoUrl.includes("youtube.com/watch?v=")) {
      videoId = videoUrl.split("v=")[1]?.split("&")[0];
    } else if (videoUrl.includes("youtu.be/")) {
      videoId = videoUrl.split("youtu.be/")[1]?.split("?")[0];
    } else if (videoUrl.includes("youtube.com/embed/")) {
      videoId = videoUrl.split("embed/")[1]?.split("?")[0];
    }
    return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "";
  };

  const filteredVideos = videos.filter(
    (video) =>
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Infinite Scroll - Detect when the user reaches the bottom
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 10
      ) {
        if (!loadingMore && visibleCount < filteredVideos.length) {
          setLoadingMore(true);
          setTimeout(() => {
            setVisibleCount((prevCount) => prevCount + ITEMS_PER_PAGE);
            setLoadingMore(false);
          }, 1000); // Simulate loading delay
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadingMore, visibleCount, filteredVideos.length]);

  return (
    <div className="container mt-1">
      <div className="search-container">
        <input
          type="text"
          placeholder="🔍 Explore Our Video Tutorials"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      {/* 🚀 Show loader when the page initially loads */}
      {loading ? (
        <div className="page-loader">
          <div className="loader"></div>
          <p>Loading Tutorial...</p>
        </div>
      ) : (
        <>
          {filteredVideos.length > 0 && (
            <div className="latest-video-section mb-4 mt-3">
              <h3>🔥 Latest Video</h3>
              <div className="latest-video-card">
                <a href={filteredVideos[0].video} target="_blank" rel="noopener noreferrer">
                  <img
                    src={getYouTubeThumbnail(filteredVideos[0].video)}
                    alt={filteredVideos[0].title}
                    className="latest-video-thumbnail"
                  />
                </a>
                <div className="latest-video-info">
                  <h4>{filteredVideos[0].title}</h4>
                  <p>{filteredVideos[0].description}</p>
                  <a href={filteredVideos[0].video} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    Watch Now
                  </a>
                </div>
              </div>
            </div>
          )}

          <div className="row">
            {filteredVideos.slice(0, visibleCount).map((video, index) => (
              <div key={index} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                <div className="video-card">
                  <a href={video.video} target="_blank" rel="noopener noreferrer">
                    <div className="video-thumbnail-container">
                      <img
                        src={getYouTubeThumbnail(video.video)}
                        alt={video.title}
                        className="video-thumbnail"
                      />
                      <div className="overlay">
                        <span className="play-icon">▶</span>
                      </div>
                    </div>
                  </a>
                  <div className="video-info">
                    <h5 className="video-title">{video.title}</h5>
                    <p className="video-description">{video.description}</p>
                    <span className="video-topic">📌 {video.topic}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ⏳ Loader for infinite scrolling */}
          {loadingMore && visibleCount < filteredVideos.length && (
            <div className="loader-container">
              <div className="loader"></div>
              <p>Loading More Tutorial...</p>
            </div>
          )}
        </>
      )}

      <ScrollToTop />
    </div>
  );
};

export default HomePage;
