const mongoose = require('mongoose');

const celebritySchema = new mongoose.Schema({
  celebrity: {
    name: {
      type: String,
      required: true
    },
    occupation: {
      type: String
    },
    catchphrase: {
      type: String,
      required: true
    }
  }
});

const Celebrity = mongoose.model('Celebrity', celebritySchema);

module.exports = Celebrity;
