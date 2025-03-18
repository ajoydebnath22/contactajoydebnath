import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GoogleDocPreview from "../components/GoogleDocPreview";
import ScrollToTop from "../components/ScrollToTop";
import BuyMeACoffee from "../components/BuyMeACoffee";
import FloatingLinks from "../components/FloatingLinks";
import "./ContentPage.css";
const ContentPage = () => {
  const { topic } = useParams();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/db/contentdata.json")
      .then((response) => response.json())
      .then((data) => {
        setContent(data[topic]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching content data:", error);
        setLoading(false);
      });
  }, [topic]);

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

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <p>Loading videos...</p>
      </div>
    );
  }

  if (!content) {
    return <div className="container mt-4">Content not found.</div>;
  }

  return (
    <div className="content-page">
      {/* Beautiful Header 
      <header className="content-header">
        <h3>{content.title}</h3>
      </header>*/}

      <div className="container">
        <div className="row">
          {/* Left Side: Content Section */}
          <div className="col-md-9 content-section">
          <h3>{content.title}</h3>
          <p>🔥{content.description}</p>
            {/* Google Doc Section */}
            <div className="google-doc mb-4">
              <h4>📄 Google Doc</h4>
              <GoogleDocPreview docId={content.googleDoc} />
            </div>
          </div>

          {/* Right Side: Video Section */}
          <div className="col-md-3 video-section">
            <h4 className="video-title">🎥 Watch Tutorial</h4>
            <div className="video-list">
              {content.videos.map((video, index) => (
                <a key={index} href={video} target="_blank" rel="noopener noreferrer" className="video-item">
                  <img src={getYouTubeThumbnail(video)} alt={`Video ${index + 1}`} className="video-thumbnail img-fluid rounded shadow" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ScrollToTop />
      <BuyMeACoffee />
      <FloatingLinks />
    </div>
  );
};

export default ContentPage;

