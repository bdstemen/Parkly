import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// connect to db
mongoose.set('strictQuery', true);
mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`);
const db = mongoose.connection;

// full list of parks
const parkSchema = new mongoose.Schema({
  id: String,
  url: String,
  fullName: String,
  parkCode: String,
  description: String,
  latitude: String,
  longitude: String,
  location: {
    $type: {
      $type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number]
    }
  },
  activities: [
    {
      id: String,
      name: String
    }
  ],
  states: String,
  contacts: {
    phoneNumbers: [
      {
        phoneNumber: String,
        type: String
      }
    ],
    emailAddresses: [
      {
        emailAddress: String
      }
    ]
  },
  entranceFees: [
    {
      cost: String,
      description: String,
      title: String
    }
  ],
  entrancePasses: [
    {
      cost: String,
      description: String,
      title: String
    }
  ],
  operatingHours: [
    {
      description: String,
      standardHours: {
        sunday: String,
        monday: String,
        tuesday: String,
        wednesday: String,
        thursday: String,
        friday: String,
        saturday: String
      },
      name: String
    }
  ],
  addresses: [
    {
      postalCode: String,
      city: String,
      stateCode: String,
      line1: String,
      line2: String,
      line3: String,
      type: String
    }
  ],
  images: [
    {
      altText: String,
      caption: String,
      url: String
    }
  ],
  weatherInfo: String,
  designation: String,
  visited: {
    $type: Boolean,
    default: false
  },
  saved: {
    $type: Boolean,
    default: false
  }
}, { typeKey: '$type' });

const Park = new mongoose.model('Park', parkSchema);

export default Park;
