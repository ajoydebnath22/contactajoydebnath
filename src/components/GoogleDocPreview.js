import React from 'react';
import './GoogleDocPreview.css';

const GoogleDocPreview = ({ docId }) => {
  const previewUrl = `https://docs.google.com/document/d/${docId}/preview`;


  return (
    <div className="doc-preview-container">
      <iframe
            src={previewUrl}
            width="100%"
            height="500px"
            frameBorder="0"
            title="Google Doc"
            className="google-doc-iframe"
          ></iframe>

        {/*
          <a
            href={`${previewUrl}/pub?embedded=true`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary mt-3"
          >
              Open Google Doc in New Tab
          </a>

        */}
    </div>
  );
};

export default GoogleDocPreview;