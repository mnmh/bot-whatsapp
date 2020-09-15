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
    }

    console.log(json_)

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
        console.log('The file was saved!');
        json_['enlace'] = `media/${message.from}_${filename}`
      });
    }

    const r = await axios.post(apiUrl + "/crear-entrada", json_).catch(err=>{
      console.log(err)
    })

    console.log(r.data)

    if(r.data.value == 1) {
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
    } else if(message.content == 'Info') {
      await client.sendText(message.from, 'Acá le mandó un pdf o video de la exposición');
    } else if(message.content == 'Mapa') {
      await client.sendText(message.from, 'Para ingresar tu contenido primero necesito saber tu ubicación');
      await axios.post(apiUrl + "/update-status", {from: message.from}).catch(err=>{
        console.log(err)
      })
    }
  });
}

create().then(client => start(client));