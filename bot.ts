import { create, Client, decryptMedia } from '@open-wa/wa-automate';
const mime = require('mime-types');
const fs = require('fs');
const path = require('path');
const axios = require('axios')

const apiUrl = 'http://localhost:4001';

function start(client: Client) {
  client.onMessage(async message => {
    
    let json_ = {
      "content": message.content,
      "time": message.timestamp,
      "from": message.from,
      "update": {},
      "tipo": message.type
    }

    if(message.type === 'location'){
      const {
        loc,
        lat,
        lng
      } = message
      json_['location'] = {
        type: "Point",
        coordinates: [lng, lat]
      }
    }

    const r = await axios.post(apiUrl + "/crear-entrada", json_).catch(err=>{
      console.log(err)
    })

    console.log(r.data)

    if(r.data.value === 1) {
      console.log("resp 1")
      await new Promise(resolve => setTimeout(resolve, 500))
      await client.simulateTyping(message.from,true)
      await new Promise(resolve => setTimeout(resolve, 3000))
      await client.simulateTyping(message.from,false)
      await client.sendText(message.from, '👋 Hola!');
      await client.simulateTyping(message.from,true)
      await new Promise(resolve => setTimeout(resolve, 3000))
      await client.simulateTyping(message.from,false)
      await client.sendText(message.from, 'Soy Néstor, mentiras... soy un bot');
      await client.simulateTyping(message.from,true)
      await new Promise(resolve => setTimeout(resolve, 3000))
      await client.simulateTyping(message.from,false)
      await client.sendText(message.from, 'Escribe alguna opción para saber más: *Info*, *Mapa*');
    } else if(message.content === 'Info' && r.data.state === '') {
      console.log("resp 2")
      await client.sendText(message.from, 'Acá le mandó un pdf o video de la exposición');
    } else if(message.content === 'Mapa' && r.data.state === '') {
      console.log("resp 3")
      await axios.post(apiUrl + "/update-status", {from: message.from, state: 'esperando_loc'}).catch(err=>{
        console.log(err)
      })
      await client.sendText(message.from, 'Para ingresar tu contenido primero necesito saber tu ubicación. Puedes compartir la ubicación de tu celular o escribir el nombre de tu ciudad, pueblo o municipio.');
    } else if(r.data.state === 'esperando_loc') {
      console.log("resp 4")
      if(message.type === 'location'){
        const resp = await axios.post(apiUrl + "/update-status", {from: message.from, state: 'esperando_contenido', location: json_['location']}).catch(err=>{
          console.log('fddfa')
        })

        await client.sendText(message.from, 'Hemos registrado tu ubicación, comparte una foto, audio o mensaje para subirlo al mapa.');
      } else if(message.type === 'chat' && message.content !== 'Si') {
        const resp = await axios.post(apiUrl + "/update-status", {from: message.from, state: 'esperando_loc', location_string: json_['content']}).catch(err=>{
          console.log('fddfa')
        })

        await client.sendText(message.from, 'Hemos registrado tu ubicación como *'+ json_['content'] +'* , si no es correcto vuelve a enviar tu ubicación de lo contrario escribe *Si*.');
      } else if(message.type === 'chat' && message.content === 'Si') {
        const resp = await axios.post(apiUrl + "/update-status", {from: message.from, state: 'esperando_contenido'}).catch(err=>{
          console.log('fddfa')
        })
  
        await client.sendText(message.from, 'Hemos registrado tu ubicación, comparte una foto, audio o mensaje para subirlo al mapa.');
      } else {
        await client.sendText(message.from, 'Por favor comparteme tu ubicacion para poder registrar tu contribucion en el mapa');
      }
    } else if(r.data.state === 'esperando_contenido') {
      console.log("resp 5")
      if(message.type == 'audio' || message.type === 'ptt' || message.type === 'image' || message.type === 'video'){
        if (message.mimetype) {
          const filename = `${message.t}.${mime.extension(message.mimetype)}`;
          const mediaData = await decryptMedia(message);
          const imageBase64 = `data:${message.mimetype};base64,${mediaData.toString(
            'base64'
          )}`;
    
          fs.writeFile(`media/${message.from}_${filename}`, mediaData, async function(err) {
            if (err) {
              return console.log(err);
            }
            json_['enlace'] = `media/${message.from}_${filename}`
            const r = await axios.post(apiUrl + "/crear-respuesta", json_).catch(err=>{
              console.log(err)
            })

            await axios.post(apiUrl + "/update-status", {from: message.from, state: ''}).catch(err=>{
              console.log(err)
            })
            await client.sendText(message.from, 'Gracias! tu respuesta ha sido añadida al mapa');
          });
        }
        
      } else if(message.type === 'chat'){
        const r = await axios.post(apiUrl + "/crear-respuesta", json_).catch(err=>{
          console.log(err)
        })
        await axios.post(apiUrl + "/update-status", {from: message.from, state: ''}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, 'Gracias! tu respuesta ha sido añadida al mapa');
      } else {
        await client.sendText(message.from, 'Por favor envía un audio, imagen, texto o video!');
      }
    } else {
      await client.sendText(message.from, 'Escribe alguna opción para saber más: *Info*, *Mapa*');
    }

    console.log(message.type)
  });
}

create().then(client => start(client));