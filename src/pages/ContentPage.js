import React from 'react';

const ContentPage = ({ topic }) => {
  const contentData = {
    Home: 'Welcome to the Home Page!',
    Java: 'SQL (Structured Query Language) is a standardized programming language for managing and manipulating relational databases(RDBMS : Relational Database Management System). It is widely used to interact with databases and perform various operations, such as querying, updating, inserting, and deleting data.',
    JavaScript: 'JavaScript is a versatile scripting language...',
    React: 'React is a JavaScript library for building UI...',
    'Node.js': 'Node.js is a runtime for executing JavaScript on the server...',
    About: 'This is an About page.',
  };

  return (
    <div>
      <h2 className="mb-4">{topic}</h2>
      <p>{contentData[topic] || 'Content not found.'}</p>
    </div>
  );
};

export default ContentPage;
