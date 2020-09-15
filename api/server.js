const express = require("express");
const app = express();
const connectDb = require("./src/connection");
const cors = require('cors');
const bodyParser = require('body-parser')
const Entrada = require("./src/Entrada.model");
const User = require("./src/User.model");

app.use(cors());
app.use(bodyParser.json());

const PORT = 4001;

// @route   GET /entradas
// @desc    dar todas las entradas
// @access  Public
app.get("/entradas", async (req, res) => {
  const entradas = await Entrada.find({});

  res.json(entradas);
});


// @route   POST /crear-entrada
// @desc    crear nueva entrada
// @access  Public
app.post("/crear-entrada", async (req, res) => {
  const entradaFields = {};
  const errors = {};

  User.findOne({from: req.body.from}).then(user => {
    if(user){
      //El usuario ya existe
      var update = req.body.update
      update['value'] = user.value + 1

      updated = User.findOneAndUpdate(update).then(user_ => {
        res.json(user_)
        new Entrada(req.body).save().then((entrada) => {
          res.json(user_)
        })
      })
    } else {
      // El usuario no existe
      var user = {
        from: req.body.from,
        state: '',
        value: 1
      }
      new User(user).save().then((user_) => {
        new Entrada(req.body).save().then((entrada) => {
          res.json(user_)
        })
      })
    }
  })
});

app.listen(PORT, function() {
  console.log(`Corriendo en el puerto ${PORT}`);

  connectDb().then(() => {
    console.log("Base de datos conectada");
  });
});
