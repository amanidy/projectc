import express from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User.js"
import Jwt from "jsonwebtoken";
import nodemailer from "nodemailer"
import twilio from "twilio"
import dotenv from "dotenv"
import mongoose from "mongoose";
import  Axios  from "axios";
import bodyParser from "body-parser";
import cors from "cors"


dotenv.config()
    
    
const router = express.Router();

const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests from this origin
  credentials: true, // Allow cookies and authorization headers
};

router.use(cors(corsOptions));

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Example middleware to handle CORS if needed
router.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});



router.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email })
    if (user) {
        return res.json({message:"User already existed"})
    }

    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt)
    const newUser = new User({
        username,
        email,
        password: hashpassword,
        
    })

    await newUser.save()
    return res.json({status: true, message:"record registered"})

})

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (!user) {
        return res.json({message:"user is not registered!"})
    }
    
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
        return res.json({message:"password is incorrect!"})
    }

    const token = Jwt.sign({ username: user.username }, process.env.KEY, { expiresIn: "5h" })
    res.cookie('token', token, {httpOnly:true, maxAge: 360000 })
    return res.json({status: true, message:"login successfully"})
})

router.post("/forgotPassword",  async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email }) 
        if (!user) {
            return res.json({message:"User not registered"})
        }
      
       const token = Jwt.sign({ id: user._id }, process.env.KEY, { expiresIn: '1h' });
        var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'amaniarnold08@gmail.com',
    pass: 'uorz ucbc syyg ywum'
  }
});

var mailOptions = {
  from: 'amaniarnold08@gmail.com',
  to: email,
  subject: 'Reset Password',
  text: `Click the following link to reset your password: http://localhost:5000/resetPassword/${token}` //check valid url here
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ message: "Error sending email" });
  } else {
    return res.json({ status: true, message: "email sent" })
  }
});

    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
})

router.post("/resetPassword/:token", async(req, res) => {
  const {token} = req.params;
  const { password } = req.body;
  try {
    const decoded = await Jwt.verify(token, process.env.KEY);
    const id = decoded.id;

    const hashpassword = await bcrypt.hash(password, 10)
    await User.findByIdAndUpdate({ _id: id }, { password: hashpassword })
    return res.json({status:true, message:"updated password"})
    
  } catch (err) {
   return res.json("invalid token")
  }

})

const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
  if (!token) {
    return res.json({status:false, message:"no token"})
  }
    const decoded = await Jwt.verify(token, process.env.KEY);
    next()
    
  } catch (err) {
    return res.json(err)
  }
  
}

router.post('/verify',verifyUser, (req, res) => {
  return res.json({status:true, message:"authorized"})
  
})


router.get('/logout', (req, res) => {
  res.clearCookie('token')
  return res.json({status:true})
})


const ContactFormSubmission = mongoose.model('ContactFormSubmission', {
  name: String,
  email: String,
  message: String,
});


const accountSid = process.env.SID;
const authToken = process.env.AUTH;
const phoneNumber = process.env.TWILIO_PHONE_NUMBER;
const client = new twilio(accountSid, authToken);

router.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const submission = new ContactFormSubmission({ name, email, message });
    await submission.save();

    client.messages
     .create({
        body: `New message from ${name} (${email}): ${message}`,
        from: phoneNumber,
        to: '+254715900589',
      })
     .then((message) => {
        console.log(`SMS sent: ${message.sid}`);
        res.json({ message: 'Message sent successfully!' });
      })
     .catch((error) => {
        console.error(error);
        res.status(500).json({ message: 'Error sending message. Please try again.' });
      });
  } catch(error) {
    console.error(error)
    res.status(500).json({message:"Error processing submission. Please try again"})

  }
})

const chatMessageSchema = new mongoose.Schema({
  text: String,
  user: String,
  timestamp: { type: Date, default: Date.now },
});
const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);

router.get('/search', async (req, res) => {
  try {
    const searchQuery = req.query.q;
    // Example of handling soil moisture data
    const soilMoistureResponse = await Axios.get('https://api.weatherbit.io/v2.0/history/agweather', {
      params: {
        start_date,
        end_date,
        units,
        tp,
        key: process.env.WEATHERBIT_API_KEY,
      }
    });

    // Example of handling historical weather data
    const weatherDataResponse = await Axios.get('http://api.openweathermap.org/data/2.5/forecast', {
      params: {
        q: `${searchQuery},Kenya`,
        units: 'metric',
        appid: process.env.OPENWEATHERMAP_API_KEY
      }
    });

    // Example of handling weather alerts
    const weatherAlertsResponse = await Axios.get('https://api.weatherbit.io/v2.0/alerts', {
      params: {
        city: searchQuery,
        country: '', // Adjust as per your needs
        key: process.env.WEATHERBIT_API_KEY
      }
    });

    // Example of handling market trends
    const marketTrendsResponse = await Axios.get('https://api.market-trends.com/v1/trends', {
      params: {
        api_key: process.env.MARKET_TRENDS_API_KEY
      }
    });

    // Example of handling weather predictions
    const weatherPredictionsResponse = await Axios.get('http://api.openweathermap.org/data/2.5/forecast', {
      params: {
        q: `${searchQuery},Kenya`,
        units: 'metric',
        appid: process.env.OPENWEATHERMAP_API_KEY
      }
    });

    const searchData = {
      soilMoisture: soilMoistureResponse.data,
      weatherData: weatherDataResponse.data,
      weatherAlerts: weatherAlertsResponse.data,
      marketTrends: marketTrendsResponse.data,
      weatherPredictions: weatherPredictionsResponse.data
    };

    res.json(searchData);
  } catch (error) {
    console.error('Error fetching search data:', error);
    res.status(500).json({ error: 'Failed to fetch search data' });
  }
});

// Example route to handle soil moisture data separately
router.post('/auth/weather-data', async (req, res) => {
  try {
    const weatherDataResponse = await Axios.get('http://api.openweathermap.org/data/2.5/forecast', {
      params: {
        q: 'Nairobi,Kenya',
        units: 'metric',
        appid: process.env.OPENWEATHERMAP_API_KEY
      }
    });
    res.json(weatherDataResponse.data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// Endpoint to fetch weather alerts
router.post('/weather-alerts', async (req, res) => {
  try {
    const weatherAlertsResponse = await Axios.get('https://api.weatherbit.io/v2.0/alerts', {
      params: {
        city: 'Nairobi',
        country: 'Kenya',
        key: process.env.WEATHERBIT_API_KEY
      }
    });
    res.json(weatherAlertsResponse.data);
  } catch (error) {
    console.error('Error fetching weather alerts:', error);
    res.status(500).json({ error: 'Failed to fetch weather alerts' });
  }
});

// Endpoint to fetch market trends
router.post('/market-trends', async (req, res) => {
  try {
    const marketTrendsResponse = await Axios.get('https://api.market-trends.com/v1/trends', {
      params: {
        api_key: process.env.MARKET_TRENDS_API_KEY
      }
    });
    res.json(marketTrendsResponse.data);
  } catch (error) {
    console.error('Error fetching market trends:', error);
    res.status(500).json({ error: 'Failed to fetch market trends' });
  }
});

// Endpoint to fetch weather predictions
router.post('/weather-predictions', async (req, res) => {
  try {
    const weatherPredictionsResponse = await Axios.get('http://api.openweathermap.org/data/2.5/forecast', {
      params: {
        q: 'Nairobi,Kenya',
        units: 'metric',
        appid: process.env.OPENWEATHERMAP_API_KEY
      }
    });
    res.json(weatherPredictionsResponse.data);
  } catch (error) {
    console.error('Error fetching weather predictions:', error);
    res.status(500).json({ error: 'Failed to fetch weather predictions' });
  }
});

// Example route to handle soil moisture data separately
router.post('/soil-moisture', async (req, res) => {
  try {
    const {start_date,end_date,units,tp } = req.body;

    const soilMoistureResponse = await Axios.get('https://api.weatherbit.io/v2.0/history/agweather', {
      params: {
        start_date,
       end_date,
       units,
       tp,
    key: process.env.WEATHERBIT_API_KEY,
      }
    });

    res.json(soilMoistureResponse.data);
  } catch (error) {
    console.error('Error fetching soil moisture data:', error);
    res.status(500).json({ error: 'Failed to fetch soil moisture data' });
  }
});




// Chat Messages Routes
router.post('/chat-messages', async (req, res) => {
  try {
    const chatMessages = await ChatMessage.find().sort({ timestamp: -1 }).limit(20);
    res.json(chatMessages);
  } catch (error) {
    console.error('Error fetching chat messages:', error);
    res.status(500).json({ error: 'Failed to fetch chat messages' });
  }
});

router.post('/chat-messages', async (req, res) => {
  const { text, user } = req.body;
  const message = new ChatMessage({ text, user });
  try {
    const savedMessage = await message.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    console.error('Error saving chat message:', error);
    res.status(500).json({ error: 'Failed to save chat message' });
  }
});


export {router as UserRouter}