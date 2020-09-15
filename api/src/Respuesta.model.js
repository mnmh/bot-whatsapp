const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const respuestaSchema = new mongoose.Schema({
    variante: {
        type: String
    },
    id_entrada: {
        type: Schema.Types.ObjectID,
        ref: 'Entrada'
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});

const Respuesta = mongoose.model("Respuesta", respuestaSchema);

module.exports = Respuesta;