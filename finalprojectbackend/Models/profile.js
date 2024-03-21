const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  handle: {
    type: String,
    required: false,
    max: 40
  },
  profileimage: {
    type: String
  }, 
  coverimage: {
    type: String
  }, 
  bio: {
    type: String
  },
  address: {
    type: String
  },
  phone: {
    type: String
  },
  status: {
    type: String,
  },
  watchlist: [
    {
      title: {
        type: String,
      },
      image: {
        type: String,
      },
      ratting: {
        type: String
      },
      tmdb: {
        type: String
      },
    }
  ],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
