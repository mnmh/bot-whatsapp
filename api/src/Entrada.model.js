const mongoose = require("mongoose");

const entradaSchema = new mongoose.Schema({
  from: {
    type: String
  },
  time: {
    type: Number
  },
  content: {
    type: String
  },
  tipo: {
    type: String
  },
  enlace: {
    type: String
  },
  value: {
    type: Number
  },
  location: {
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number]
    }
  }
});

const Entrada = mongoose.model("Entrada", entradaSchema);

module.exports = Entrada;