import React, { useState, useEffect } from "react";
import "./FloatingButton.css";

const FloatingVideoButton = ({ scrollToVideos }) => {
  const [position, setPosition] = useState({ top: 100, left: window.innerWidth - 70 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleResize = () => {
      setPosition((prev) => ({
        top: Math.min(prev.top, window.innerHeight - 70),
        left: Math.min(prev.left, window.innerWidth - 70),
      }));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setOffset({ x: e.clientX - position.left, y: e.clientY - position.top });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPosition({
      top: Math.max(10, Math.min(e.clientY - offset.y, window.innerHeight - 70)),
      left: Math.max(10, Math.min(e.clientX - offset.x, window.innerWidth - 70)),
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <button
      className="floating-video-button"
      onClick={scrollToVideos}
      onMouseDown={handleMouseDown}
      style={{ top: `${position.top}px`, left: `${position.left}px` }}
    >
      🎥
    </button>
  );
};

export default FloatingVideoButton;
