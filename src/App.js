import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://serverurls.onrender.com/shorten', {
        longUrl,
      });

      const data = response.data;
      setShortUrl(`https://serverurls.onrender.com/${data.shortUrl}`);
      setError('');
    } catch (error) {
      setError('Error occurred. Please check your URL and try again.');
      console.error('Error:', error);
    }
  };

  const handleClear = () => {
    setLongUrl('');
    setError('');
  };

  return (
    <div className="shortener-form">
      <div className='title'>
        Short URL
      </div>
      <br />
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter URL"
            className="url-input"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
          />
          {longUrl && (
            <button type="button" className="clear-button" onClick={handleClear}>
              X
            </button>
          )}
        </div>
        <button type="submit" className="submit-button">
          Shorten
        </button>
      </form>
      <br />
      <div className='box-url'>
        {error ? (
          <p className='error-message'>{error}</p>
        ) : (
          shortUrl && (
            <p>
              <span className='link-name'>Shortened URL: </span>
              <span className='link'>{shortUrl}</span>
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default App;
