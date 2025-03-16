import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import Modal from "react-modal";
import "./GoogleDocPreview.css";
import GoogleDocModal from "./GoogleDocModal";

const GoogleDocPreview = ({ docId }) => {
  const previewUrl = `https://docs.google.com/document/d/${docId}/preview`;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <div className="google-doc-section">

      {/* Laptop / Tablet - Show Full Google Doc */}
      {!isMobile ? (
        <iframe
          src={`https://docs.google.com/document/d/${docId}/preview`}
          className="google-doc-iframe"
          title="Google Doc"
        ></iframe>
      ) : (
        // Mobile - Small Preview & Click to Open Modal
        <div className="google-doc-preview" onClick={() => setIsModalOpen(true)}>
          <iframe
            src={`https://docs.google.com/document/d/${docId}/preview`}
            className="google-doc-iframe"
            title="Google Doc Preview"
          ></iframe>
          <div className="doc-overlay">📖 Tap to Open</div>
        </div>
      )}

      {/* Modal for Mobile View */}
      {isMobile && (
       <GoogleDocModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} docId={docId} />
      )}
    </div>
  );
};

export default GoogleDocPreview;