import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './ContentPage.css';

const ContentPage = () => {
  const { topic } = useParams(); // Get topic from URL
  const [content, setContent] = useState(null);

  // Fetch content from JSON
  useEffect(() => {
    fetch("/db/contentdata.json")
      .then((response) => response.json())
      .then((data) => setContent(data[topic]))
      .catch((error) => console.error("Error fetching content data:", error));
  }, [topic]);

  if (!content) {
    return <div className="container mt-4">Loading...</div>;
  }

  

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

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Left Side: Content with Image */}
        <div className="col-md-8">
          <h2>{content.title}</h2>
          <p>{content.description}</p>
          <img src={content.image} alt={content.title} className="img-fluid rounded" />
        </div>

        {/* Right Side: Embedded YouTube Video */}
        <div className="col-md-4">
          <h4>Watch Tutorial</h4>
          <div className="embed-responsive embed-responsive-16by9">
          <a href={content.video} target="_blank" rel="noopener noreferrer">
            <img 
              src={getYouTubeThumbnail(content.video)} 
              alt="Video Thumbnail" 
              className="video-thumbnail"
            />
          </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentPage;
