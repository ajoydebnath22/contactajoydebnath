import React, { useEffect, useState } from "react";
import "../css/HomePage.css";

const HomePage = () => {
  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // 🔍 Search state

  useEffect(() => {
    fetch("/db/videos.json")
      .then((response) => response.json())
      .then((data) => {
        const sortedVideos = data.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by latest
        setVideos(sortedVideos);
      })
      .catch((error) => console.error("Error fetching video data:", error));
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

  // 🔍 Filter videos based on search input
  const filteredVideos = videos.filter(
    (video) =>
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-4">
      {/* 🔍 Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="🔍 Explore Our Video Tutorials"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Latest Video Section */}
      {filteredVideos.length > 0 && (
        <div className="latest-video-section mb-4">
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

      {/* Video List Section */}
      <div className="row">
        {filteredVideos.map((video, index) => (
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
                <span className="video-date">📅 {video.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
