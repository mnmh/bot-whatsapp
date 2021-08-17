const express = require("express");
const fetch = require('node-fetch')
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

function quitarAcentos(cadena){
	const acentos = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
	return cadena.split('').map( letra => acentos[letra] || letra).join('').toString().replace('ñ', 'n');	
}


app.get("/procesar", async (req, res) => {
  const entradas = await Respuesta.find({"location_string": {"$exists": true}, 'tipo': "chat"});
  let resp = []
  

  entradas.map(e => {
    if(e.location_string){
      let arcgis_sugg_path = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest?f=json&text="+quitarAcentos(e.location_string)+"&maxSuggestions=1"
      let arcgis_geo_path = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?f=json&magicKey="
      fetch(arcgis_sugg_path)
      .then(resp => resp.json())
      .then(data => {

          fetch(arcgis_geo_path + data.suggestions[0].magicKey)
          .then(resp => resp.json())
          .then(data => {
              console.log(data.candidates[0].location.x)
              Respuesta.findOneAndUpdate({from: e.from, time: e.time},{
                "location": {
                  "type": "Point",
                  "coordinates": [data.candidates[0].location.y, data.candidates[0].location.x]
                }
              }).then(res => {

                console.log(JSON.stringify(res))
              })
          })
      })
    }
    
  })

  res.json(entradas);
})

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