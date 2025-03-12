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
        {/* Left Side: Content with Image, Basic Theory, and Google Doc */}
        <div className="col-md-8">
          {/* Title and Description */}
          <h2>{content.title}</h2>
          <p>{content.description}</p>
  
          {/* Basic Theory Section 
          <div className="basic-theory mb-4">
            <h4>Basic Theory</h4>
            <p>
              SQL is a domain-specific language used in programming and designed for managing data held in a relational database management system (RDBMS). It is particularly useful for handling structured data, i.e., data incorporating relations among entities and variables.
            </p>
            <p>
              JavaScript is a high-level, interpreted programming language that conforms to the ECMAScript specification. It is a language that is also characterized as dynamic, weakly typed, prototype-based, and multi-paradigm.
            </p>
          </div> */}
  
          {/* Google Doc Section */}
          <div className="google-doc mb-4">
            <h4>Google Doc</h4>
            <iframe
              src={`${content.googleDoc}/pub?embedded=true`}
              width="100%"
              height="500px"
              frameBorder="0"
              title="Google Doc"
              className="google-doc-iframe"
            ></iframe>
            <a
              href={`${content.googleDoc}/pub?embedded=true`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary mt-3"
            >
              Open Google Doc in New Tab
            </a>
          </div>
        </div>
  
        {/* Right Side: Embedded YouTube Video */}
        <div className="col-md-4">
          <h4>Watch Tutorial</h4>
          <div className="embed-responsive embed-responsive-16by9">
            <a href={content.video} target="_blank" rel="noopener noreferrer">
              <img
                src={getYouTubeThumbnail(content.video)}
                alt="Video Thumbnail"
                className="video-thumbnail img-fluid rounded"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentPage;
