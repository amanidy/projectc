import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import sampleCrops from './CropsData';
import './Explore.css';

const Explore = () => {
  const [soilMoistureData, setSoilMoistureData] = useState([]);
  const [historicalWeatherData, setHistoricalWeatherData] = useState([]);
  const [weatherAlerts, setWeatherAlerts] = useState([]);
  const [marketTrends, setMarketTrends] = useState([]);
  const [weatherPredictions, setWeatherPredictions] = useState([]);
  const [notification, setNotification] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [crops, setCrops] = useState(sampleCrops);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;

  const fetchData = async () => {
    try {
      const soilMoistureResponse = await Axios.post('http://localhost:5000/auth/soil-moisture', {
        start_date: '2024-06-25',
        end_date: '2024-07-01',
        lat: -1.286389,
        lon: 36.817223
      });
      console.log('Soil Moisture Data:', soilMoistureResponse.data);
      setSoilMoistureData(soilMoistureResponse.data);

      const historicalWeatherResponse = await Axios.post('http://localhost:5000/auth/weather-data', {
        lat: -1.286389,
        lon: 36.817223
      });
      console.log('Historical Data:', historicalWeatherResponse.data);
      setHistoricalWeatherData(historicalWeatherResponse.data);

      const weatherAlertsResponse = await Axios.post('http://localhost:5000/auth/weather-alerts', {
        city: 'Nairobi',
        country: 'Kenya'
      });
      console.log('Weather alert data:', weatherAlertsResponse.data);
      setWeatherAlerts(weatherAlertsResponse.data);

      const marketTrendsResponse = await Axios.post('http://localhost:5000/auth/market-trends', {
        id: 5,
        name: 'Crops',
        description: ''
      });
      console.log('market trend data:', marketTrendsResponse.data);
      setMarketTrends(marketTrendsResponse.data);

      const weatherPredictionsResponse = await Axios.post('http://localhost:5000/auth/weather-predictions', {
        city: 'Nairobi,Kenya',
        lat: -1.286389,
        lon: 36.817223
      });
      console.log('weather prediction data:', weatherPredictionsResponse.data);
      setWeatherPredictions(weatherPredictionsResponse.data);



      setSoilMoistureData(soilMoistureResponse.data);
      setHistoricalWeatherData(historicalWeatherResponse.data);
      setWeatherAlerts(weatherAlertsResponse.data);
      setMarketTrends(marketTrendsResponse.data);
      setWeatherPredictions(weatherPredictionsResponse.data);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery) {
        try {
          const response = await Axios.get('http://localhost:5000/auth/search', {
            params: {
              q: searchQuery
            }
          })
          console.log('Search API Response:', response.data);

          setSearchResults(response.data);
        
         if (response.data.length === 0) {
          setNotification('No results found');
        } else {
          setNotification('Search successful');
        }

        } catch (error) {
          console.log('Error:', error);
          setNotification('Failed to fetch search results');
        }
      }
    };


    const sampleChatMessages = [
      { text: 'Hi, have you seen this page?', user: 'Arnold', timestamp: new Date('2024-06-21T10:15:00') },
      { text: 'Hello, yes!', user: 'John', timestamp: new Date('2024-06-21T10:16:00') },
    ];
    setChatMessages(sampleChatMessages);

    setCrops(sampleCrops);

    Axios.post('http://localhost:5000/auth/verify', {}, { withCredentials: true })
      .then(res => {
        if (!res.data.status) {
          navigate("/agrisense");
        }
      })
      .catch(err => {
        console.log(err);
      });
    
     fetchSearchResults();
  }, [searchQuery, navigate]);

  const handleNotification = () => {
    setNotification('Sample Notification: Hi, You have a new notification');
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const message = { text: newMessage, user: 'current-user', timestamp: new Date() };
      setChatMessages([...chatMessages, message]);
      setNewMessage('');
    }
  };

  const handleCropSelection = (crop) => {
    setSelectedCrop(crop);
  };

  const handleLogout = () => {
    Axios.get("http://localhost:5000/auth/logout")
      .then(res => {
        if (res.data.status) {
          navigate("/login");
        }
      })
      .catch(error => {
        console.error('Error logging out:', error);
      });
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
  };

  return (
    <div className='explore-page'>
      <form onSubmit={handleSubmit} className='search-form'>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Enter city or location"
          className='search-input'
        />
        <button type="submit" className='search-button'>Search</button>
      </form>

      {notification && <div className="notification">{notification}</div>}
      <button onClick={handleNotification}>Show Notification</button>

      {searchResults.length > 0 && (
        <div className="search-results">
          <h2>Search Results</h2>
          <ul>
            {searchResults.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
          </ul>
        </div>
      )}
    
    
      
      <h2>Key Features</h2>
      
     <ul>
        {soilMoistureData.map((data, index) => (
          <li key={index}>
            <p>Soil Moisture Value: {data.soilMoistureValue}%</p>
          </li>
        ))}
      </ul>

      <h1>Historical Weather Data</h1>
      <ul>
        {historicalWeatherData.map((data, index) => (
          <li key={index}>
            <p>Temperature: {data.main.temp}°C</p>
            <p>Humidity: {data.main.humidity}%</p>
          </li>
        ))}
      </ul>

      <h1>Weather Alerts</h1>
      <ul>
        {weatherAlerts.map((data, index) => (
          <li key={index}>
            <p>Description: {data.description}</p>
            <p>Severity: {data.severity}</p>
          </li>
        ))}
      </ul>

      <h1>Market Trends</h1>
      <ul>
        {marketTrends.map((data, index) => (
          <li key={index}>
            <p>County: {data.name}</p>
            <p>Trend: {data.trend}</p>
          </li>
        ))}
      </ul>

      <h1>Weather Predictions</h1>
      <ul>
        {weatherPredictions.map((data, index) => (
          <li key={index}>
            <p>Prediction: {data.prediction}</p>
          </li>
        ))}
      </ul>

      <div className="crop-selection">
        <h2>Crop Selection</h2>
        <div className="crop-images">
          {crops.map(crop => (
            <div key={crop.id} className="crop-image" onClick={() => handleCropSelection(crop)}>
              <img src={`${process.env.PUBLIC_URL}/images/${crop.name.toLowerCase()}.jpg`} alt={crop.name} />
              <p>{crop.name}</p>
            </div>
          ))}
        </div>
        {selectedCrop && (
          <div className="crop-details">
            <h3>{selectedCrop.name}</h3>
            <p><strong>Conditions:</strong> {selectedCrop.conditions}</p>
            <p><strong>Regions:</strong> {selectedCrop.regions.join(', ')}</p>
            <p><strong>Pest Control Measures:</strong> {selectedCrop.pests.join(', ')}</p>
            <p><strong>Insights:</strong> {selectedCrop.insights}</p>
          </div>
        )}
      </div>

      <div className="chat-container">
        <h2>Chat Feature</h2>
        <div className="chat-messages">
          {chatMessages.map((message, index) => (
            <div key={index} className={`chat-message ${message.user === 'current-user' ? 'current-user' : ''}`}>
              <strong>{message.user}</strong>: {message.text}
              <br />
              <small>{message.timestamp.toLocaleString()}</small>
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message"
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Explore;
 