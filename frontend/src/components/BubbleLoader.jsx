import React from 'react';
import ReactLoading from 'react-loading';
import './BubbleLoader.css'; // Import CSS for custom styling

function BubbleLoader() {
  return (
    <div className="bubble-loader-container">
      {/* Display three bubbles with different configurations */}
      <ReactLoading type="bubble" color="black" className="bubble" />
      <ReactLoading type="bubble" color="black" className="bubble" />
      <ReactLoading type="bubble" color="black" className="bubble" />
    </div>
  );
}

export default BubbleLoader;
