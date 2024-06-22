import React,{useEffect,useState} from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import sampleCrops from './CropsData'
import './Explore.css'

const Explore = () => {
  const [soilMoistureData, setSoilMoistureData] = useState([])
  const [historicalWeatherData,setHistoricalWeatherData] = useState([])
  const [weatherAlerts,setWeatherAlerts] = useState([])
  const [marketTrends,setMarketTrends] = useState([])
  const [weatherPredictions,setWeatherPredictions] = useState([])
  const [notification,setNotification] = useState('')
  const [chatMessages,setChatMessages] = useState([])
  const [newMessage,setNewMessage] = useState('')
  const [crops,setCrops] = useState(sampleCrops)
  const [selectedCrop, setSelectedCrop] = useState(null)

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({});
  const [error, setError] = useState(null);
  
  error();

  const navigate = useNavigate();
  Axios.defaults.withCredentials = true;
  useEffect(() => {

    const fetchSearchResults = async () => {
      if (searchQuery) {
        try {
          const response = await Axios.get('http://localhost:3000/search', {
            params: {
              q: searchQuery
            }
          });
          setSearchResults(response.data);
        } catch (error) {
          setError(error.message);
        }
      }
    };

    fetchSearchResults();
  

    //soil moisture
    Axios.post('http://localhost:5000/soil-moisture', {
      params: {
        city: 'Nairobi',
        country: 'Kenya'
      }
    })
     .then(response => {
        setSoilMoistureData(response.data);
      })
     .catch(error => {
        console.error('Error fetching soil moisture data:', error);
      });

    Axios.post('http://localhost:5000/weather-data')
     .then(response => {
        setHistoricalWeatherData(response.data);
      })
     .catch(error => {
        console.error('Error fetching weather data:', error);
      });

    Axios.post('http://localhost:5000/weather-alerts', {
      params: {
        city: 'Nairobi',
        country: 'Kenya'
      }
    })
     .then(response => {
        setWeatherAlerts(response.data);
      })
     .catch(error => {
        console.error('Error fetching weather alerts:', error);
      });

    Axios.post('http://localhost:5000/market-trends')
     .then(response => {
        setMarketTrends(response.data);
      })
     .catch(error => {
        console.error('Error fetching market trends:', error);
      });

    Axios.post('http://localhost:5000/weather-predictions')
     .then(response => {
        setWeatherPredictions(response.data);
      })
     .catch(error => {
        console.error('Error fetching weather predictions:', error);
      });
    
    const sampleChatMessages = [
      { text: 'Hi,have you seen this page?', user: 'Arnold', timestamp: new Date('2024-06-21T10:15:00') },
      { text: 'Hello,yes!', user: 'John', timestamp: new Date('2024-06-21T10:16:00') },
    ];
    setChatMessages(sampleChatMessages);

    setCrops(sampleCrops);

    Axios.post('http://localhost:5000/auth/verify')
      .then(res => {
        if (res.data.status) {
        
        } else {
          navigate("/agrisense")
        }
      }).catch(err => {
        console.log(err)
      })
  }, [searchQuery, navigate]);
 
  const handleNotification = () => {
    setNotification('Sample Notification: Hi,You have a new notification')
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
  

  Axios.defaults.withCredentials = true;
  const handleLogout = () => {
    Axios.get("http://localhost:5000/auth/logout")
      .then(res => {
        if (res.data.status) {
          navigate("/login")
        
      }
    })
  
}

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className='expore-page'>
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
      
      <h2>Key Features</h2>
      <ul>
        <li>
          <i className="fas fa-seedling"></i>
          Soil Moisture Analysis:
          <p>{searchResults.soilMoisture}</p>
          <ul>
            {soilMoistureData.map((data, index) => (
              <li key={index}>{data.soilMoistureLevel}%</li>
            ))}
          </ul>
        </li>
        <li>
          <i className="fas fa-cloud"></i>
          Historical Weather Data:
          <p>{searchResults.weatherData}</p>
          <ul>
            {historicalWeatherData.map((data, index) => (
              <li key={index}>{data.date}: {data.weatherCondition}</li>
            ))}
          </ul>
        </li>
        <li>
          <i className="fas fa-bell"></i>
          Personalized Weather Alerts:
          <p>{searchResults.weatherAlerts}</p>
          <ul>
            {weatherAlerts.map((alert, index) => (
              <li key={index}>{alert.alertMessage}</li>
            ))}
          </ul>
        </li>
        <li>
          <i className="fas fa-chart-line"></i>
          Market Trends:
          <p>{searchResults.marketTrends}</p>
          <ul>
            {marketTrends.map((trend, index) => (
              <li key={index}>{trend.cropType}: {trend.price}</li>
            ))}
          </ul>
        </li>
        <li>
          <i className="fas fa-sun"></i>
          Weather Predictions:
          <p>{searchResults.weatherPredictions}</p>
          <ul>
            {weatherPredictions.map((prediction, index) => (
              <li key={index}>{prediction.date}: {prediction.weatherCondition}</li>
            ))}
          </ul>
        </li>
      </ul>

      <div className="crop-selection">
        <h2>Crop Selection</h2>
        <div className="crop-images">
          {crops.map(crop => (
            <div key={crop.id} className="crop-image" onClick={() => handleCropSelection(crop)}>
              <img src={`./images/${crop.name.toLowerCase()}.jpg`} alt={crop.name} />
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
        <h2>Chat Space</h2>
        <div className="chat-messages">
          {chatMessages.map((message, index) => (
            <div key={index} className="chat-message">
              <strong>{message.user}</strong>: {message.text}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>

      <button onClick={handleNotification}>Show Notification</button> 
      
    <button onClick={handleLogout}>Log Out</button>
    </div>
  )
}

export default Explore;