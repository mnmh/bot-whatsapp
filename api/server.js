const express = require("express");
const app = express();
const connectDb = require("./src/connection");
const cors = require('cors');
const bodyParser = require('body-parser')
const Entrada = require("./src/Entrada.model");
const Respuesta = require("./src/Respuesta.model");
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

      updated = User.findOneAndUpdate({from: req.body.from},update).then(user_ => {
        
        user_.value++

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


// @route   POST /crear-respuesta
// @desc    crear nueva respuesta
// @access  Public
app.post("/crear-respuesta", async (req, res) => {
  const entradaFields = {};
  const errors = {};

  User.findOne({from: req.body.from}).then(user => {
    if(user){
      //El usuario ya existe
      var obj = {
        from: req.body.from,
        tipo: req.body.tipo,
        time: req.body.time
      }

      if(obj['tipo'] === 'chat') obj['content'] = req.body.content
      else obj['content'] = req.body.enlace


      if(user.location_string !== undefined) obj['location_string'] = user.location_string
      if(user.location !== undefined) obj['location'] = user.location

      new Respuesta(obj).save().then((entrada) => {
        update = {}

        update['location'] = undefined
        update['location_string'] = undefined

        User.findOneAndUpdate({from: req.body.from},update).then(user_ => {
          if(user_){
            res.json(entrada)
          }
        })

      }).catch(err => {
        console.log(err)
        res.json(err)
      })
    }
  })
});

// @route   POST /crear-entrada
// @desc    crear nueva entrada
// @access  Public
app.post("/update-status", async (req, res) => {
  console.log(req.body)
  update = {}

  if(req.body.state !== undefined) update['state'] = req.body.state
  if(req.body.location !== undefined) update['location'] = req.body.location
  if(req.body.location_string !== undefined) update['location_string'] = req.body.location_string

  User.findOneAndUpdate({from: req.body.from},update).then(user_ => {
    if(user_){
      res.json({status: 'ok'})
    }
  })
})

app.listen(PORT, function() {
  console.log(`Corriendo en el puerto ${PORT}`);

  connectDb().then(() => {
    console.log("Base de datos conectada");
  });
});
