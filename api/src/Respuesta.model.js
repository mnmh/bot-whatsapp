const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const respuestaSchema = new mongoose.Schema({
    tipo: {
        type: String
    },
    content: {
        type: String
    },
    time: {
        type: Number
    },
    location_string: {
        type:String
    },
    location: {
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type: [Number]
        }
    },
    from: {
        type: String
    },
});

const Respuesta = mongoose.model("Respuesta", respuestaSchema);

module.exports = Respuesta;