import React from 'react';
import './ContentPage.css';

// Tutorial data based on topics
const tutorialData = {
  Home: "Welcome to the tutorial website! Select a topic from the side menu to start learning.",
  Java: `Java is a high-level, object-oriented programming language developed by Sun Microsystems in 1995. It is platform-independent and widely used for web, mobile, and enterprise applications.`,
  JavaScript: `JavaScript is a lightweight, interpreted programming language primarily used for web development. It enables dynamic content, interactivity, and client-side scripting.`,
  React: `React is a JavaScript library for building user interfaces, developed by Facebook. It allows developers to create reusable UI components and manage state efficiently.`,
  "Node.js": `Node.js is a runtime environment that allows JavaScript to run on the server side. It uses an event-driven, non-blocking I/O model, making it efficient for building scalable applications.`,
  About: "This website is dedicated to providing high-quality tutorials on Java, JavaScript, React, and Node.js.",
};

const ContentPage = ({ topic }) => {
  return (
    <div className="content-container">
      <h1>{topic} Tutorial</h1>
      <p>{tutorialData[topic] || "Content coming soon..."}</p>
    </div>
  );
};

export default ContentPage;
