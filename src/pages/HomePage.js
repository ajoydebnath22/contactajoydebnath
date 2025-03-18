import React, { useEffect, useState } from "react";
import "../css/HomePage.css";
import ScrollToTop from '../components/ScrollToTop';
import BuyMeACoffee from '../components/BuyMeACoffee';
import FloatingLinks from '../components/FloatingLinks';


const ITEMS_PER_PAGE = 6;

const HomePage = () => {
  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    fetch("/db/videos.json")
      .then((response) => response.json())
      .then((data) => {
        const sortedVideos = data.sort((a, b) => b.sequence - a.sequence);
        setVideos(sortedVideos);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching video data:", error);
        setLoading(false);
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
          }, 1000);
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

      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
          <p>Loading videos...</p>
        </div>
      ) : filteredVideos.length > 0 ? (
        <>
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
                <a href={filteredVideos[0].video} target="_blank" rel="noopener noreferrer" className="watch-now-btn">
                  Watch Now
                </a>
              </div>
            </div>
          </div>

          <div className="video-header">
            <h3>🎥Tutorials</h3>
            <span className="video-count-badge">✨ {filteredVideos.length}</span>
          </div>
             
          <div className="row video-list">
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

          {loadingMore && (
            <div className="loader-container">
              <div className="loader"></div>
              <p>Loading more videos...</p>
            </div>
          )}
        </>
      ) : searchQuery ? (
        <div className="no-data-found">
          <h4>🚫 No Tutorial Found</h4>
          <p>Please try searching for another topic.</p>
        </div>
      ) : null}

      <ScrollToTop />
      <BuyMeACoffee />
      <FloatingLinks/>
    </div>
  );
};

export default HomePage;
