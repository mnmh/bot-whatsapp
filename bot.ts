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

    if(r.data.value === 1) {
      await client.sendText(message.from, 'El bot del Museo de Memoria de Colombia le da la bienvenida a la exposición _SaNaciones: diálogos de la memoria_. Por este medio, podrá conocer más acerca de los contenidos y participar en la conversación sobre sanación y construcción de memoria.\nA lo largo de la actividad se le presentarán opciones para que usted explore la exposición o comparta sus experiencias. Las opciones estarán indicadas por números para que usted responda sobre este chat. Solo tendrá que contestar a los mensajes con el número de opción que desee.\n*1* Información sobre la exposición.\n*2* Participar en la exposición.');
    } else if(message.content === '1' && r.data.state === '') {
      await axios.post(apiUrl + "/update-status", {from: message.from, state: 'Info'}).catch(err=>{
        console.log(err)
      })
      await client.sendText(message.from, '_SaNaciones: diálogos de la memoria_ es una exposición multiplataforma (nos encuentra en www.museodememoria.gov.co/sanaciones) que reflexiona sobre los procesos que los pueblos indígenas realizan para sanar las heridas que el conflicto armado y la violencia histórica les han dejado.\n_SaNaciones_ no debe ser entendida como un resultado: es el inicio de un proceso de diálogo y reflexión de una nación heterogénea. A lo largo de su duración, crecerá y se complementará con sus aportes para encontrar alternativas a la solución pacífica de conflictos y violencias históricas. La exposición recibirá sus aportes del 16 de octubre a diciembre de 2020.\nConozca más:\n*1* Ejes de la exposición.\n*2* Obras de arte que reflexionan sobre la sanación.');
    } else if(r.data.state === 'Info') {
      if(message.content === '2'){
        await client.sendText(message.from, 'Como parte de _SaNaciones: diálogos de la memoria_, y en alianza con empresas de servicios públicos y diarios  del Caribe, el Museo presenta obras de artistas de la región que reflexionan sobre la sanación. A través de la difusión de las obras en recibos públicos, en diarios locales y la distribución de maletas didácticas se busca ser un Museo en casa.\n*1* Álvaro Barrios\n*2* Dayro Carrasquilla\n*3* Enosh Arias\n*4* Eusebio Siosi Rosado\n*5* Juana Ruiz Hernández\n*6* Nohemi Pérez\n*7* Rafael Posso\n*8* Regresar al Inicio')

        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'Info_artista'}).catch(err=>{
          console.log(err)
        })
      } else if(message.content === '1'){
        await client.sendText(message.from, 'La exposición está organizada en cinco ejes narrativos:\n*1* Disposición al diálogo\n*2* Territorios (disponible desde el 23 de octubre)\n*3* Larga duración (disponible desde el 30 de octubre)\n*4* La fuerza de lo colectivo (disponible desde el 6 de noviembre)\n*5* Naciones (disponible desde el 6 de noviembre)');

        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'Info_expo'}).catch(err=>{
          console.log(err)
        })
      } else {
        await client.sendText(message.from, 'Conozca más:\n*1* Ejes de la exposición.\n*2* Obras de arte que reflexionan sobre la sanación.');
      }
    } else if(r.data.state === 'Info_artista'){
      if(message.content === '1'){
        await client.sendImage(message.from, './assets/recibos/Álvaro Barrios-1.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Álvaro Barrios-2.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Álvaro Barrios-3.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Álvaro Barrios-4.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Álvaro Barrios-5.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Álvaro Barrios-6.jpg', '', '');
      } else if(message.content === '2'){
        await client.sendImage(message.from, './assets/recibos/Dayro Carrasquilla-1.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Dayro Carrasquilla-2.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Dayro Carrasquilla-3.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Dayro Carrasquilla-4.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Dayro Carrasquilla-5.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Dayro Carrasquilla-6.jpg', '', '');
      } else if(message.content === '3'){
        await client.sendImage(message.from, './assets/recibos/Enosh Arias-1.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Enosh Arias-2.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Enosh Arias-3.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Enosh Arias-4.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Enosh Arias-5.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Enosh Arias-6.jpg', '', '');
      } else if(message.content === '4'){
        await client.sendImage(message.from, './assets/recibos/Eusebio Siosi Rosado-1.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Eusebio Siosi Rosado-2.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Eusebio Siosi Rosado-3.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Eusebio Siosi Rosado-4.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Eusebio Siosi Rosado-5.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Eusebio Siosi Rosado-6.jpg', '', '');
      } else if(message.content === '5'){
        await client.sendImage(message.from, './assets/recibos/Juana Ruiz Hernández-1.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Juana Ruiz Hernández-2.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Juana Ruiz Hernández-3.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Juana Ruiz Hernández-4.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Juana Ruiz Hernández-5.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Juana Ruiz Hernández-6.jpg', '', '');
      } else if(message.content === '6'){
        await client.sendImage(message.from, './assets/recibos/Nohemi Pérez-1.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Nohemi Pérez-2.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Nohemi Pérez-3.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Nohemi Pérez-4.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Nohemi Pérez-5.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Nohemi Pérez-6.jpg', '', '');
      } else if(message.content === '7'){
        await client.sendImage(message.from, './assets/recibos/Rafael Posso-1.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Rafael Posso-2.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Rafael Posso-3.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Rafael Posso-4.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Rafael Posso-5.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Rafael Posso-6.jpg', '', '');
      } else if(message.content === '8'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: ''}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, '*1* Información sobre la exposición.\n*2* Participar en la exposición.');
      } else {
        await client.sendText(message.from, '*1* Álvaro Barrios\n*2* Dayro Carrasquilla\n*3* Enosh Arias\n*4* Eusebio Siosi Rosado\n*5* Juana Ruiz Hernández\n*6* Nohemi Pérez\n*7* Rafael Posso\n*8* Regresar al Inicio');
      }
    } else if(r.data.state === 'Info_expo'){
      if(message.content === '1'){
        await client.sendImage(message.from, './assets/saludos/1. Frase 1.jpg', '', '');
        await client.sendText(message.from, 'El diálogo se plantea como un intercambio entre personas que reconocen, entienden y valoran sus diferencias de pensamiento, estableciendo una relación horizontal. En esta ocasión, la conversación gira en torno a la compresión del mundo, la capacidad de organización política, los conocimientos y las prácticas medicinales-espirituales de algunos pueblos indígenas, con el fin de continuar el diálogo sobre la memoria histórica del conflicto, que aún persiste, y de vislumbrar caminos para sanar.\nPiezas:\n*1* Saludos de los pueblos indígenas\n*2* Audio Murui')

        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'Info_expo_1'}).catch(err=>{
          console.log(err)
        })
      } else {
        await client.sendText(message.from, 'La exposición está organizada en cinco ejes narrativos:\n*1* Disposición al diálogo\n*2* Territorios (disponible desde el 23 de octubre)\n*3* Larga duración (disponible desde el 30 de octubre)\n*4* La fuerza de lo colectivo (disponible desde el 6 de noviembre)\n*5* Naciones (disponible desde el 6 de noviembre)');
      }
    } else if(r.data.state === 'Info_expo_1'){
      if(message.content === '1'){
        await client.sendImage(message.from, './assets/saludos/2. Frase 2.jpg', '', '');
        await client.sendImage(message.from, './assets/saludos/2. Frase 3.jpg', '', '');
        await client.sendImage(message.from, './assets/saludos/4. Frase 4.jpg', '', '');
        await client.sendImage(message.from, './assets/saludos/5. Frase 5.jpg', '', '');
        await client.sendImage(message.from, './assets/saludos/6. Frase 6.jpg', '', '');
      } else if(message.content === '2') {
        await client.sendText(message.from, 'Esta es la voz del pueblo Murui que llama a los centros de poder a asumir la marginación ejercida sobre los pueblos indígenas. Busca transformar los imaginarios errados sobre su pueblo: destaca su humanidad en contraste a los calificativos que han sido usados para desconocerla, señala la distancia entre las formas de entender y relacionarse con el entorno de ambas culturas, y transmite su capacidad de acción frente a los ciclos de violencia que han sobrevivido.')
        await client.sendFile(message.from, './assets/audio/murui.mp3', '', '');
        await axios.post(apiUrl + "/update-status", {from: message.from, state: ''}).catch(err=>{
          console.log(err)
        })
      } else {
        await client.sendText(message.from, 'Piezas:\n*1* Saludos de los pueblos indígenas\n*2* Audio Murui');
      }
    } else if(message.content === '2' && r.data.state === '') {
      console.log("resp 3")
      await axios.post(apiUrl + "/update-status", {from: message.from, state: 'esperando_con'}).catch(err=>{
        console.log(err)
      })
      await client.sendText(message.from, 'Este mapa se construye con su ayuda. Queremos que nos cuente, según su experiencia: ¿Cómo sanar las heridas del conflicto armado? Su respuesta podrá ser publicada  en el sitio web www.museodememoria.gov.co/sanaciones en el apartado mapa SaNaciones.\nPara participar, debe aceptar el uso de los datos personales que envíe por este medio, de acuerdo a la ley 1581 de 2012 y demás normas concordantes.\n*1* Está de acuerdo.\n*2* No está de acuerdo.');
    } else if(r.data.state === 'esperando_con') {
      if(message.content === '1'){
        await client.sendText(message.from, 'Usted ha elegido compartir su participación. ¡Le damos la bienvenida a la conversación!\nAhora díganos: ¿Dónde se encuentra?')
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'esperando_loc'}).catch(err=>{
          console.log(err)
        })
      } else if(message.content === '2'){
        await client.sendText(message.from, 'Le invitamos a que continúe explorando _SaNaciones: diálogos de la memoria_ Esperamos contar con sus aportes en otra oportunidad.')
        await axios.post(apiUrl + "/update-status", {from: message.from, state: ''}).catch(err=>{
          console.log(err)
        })
      } else {
        await client.sendText(message.from, '*1* Está de acuerdo.\n*2* No está de acuerdo.')
      }
    } else if(r.data.state === 'esperando_loc') {
      console.log("resp 4")
      if(message.type === 'location'){
        const resp = await axios.post(apiUrl + "/update-status", {from: message.from, state: 'esperando_contenido', location: json_['location']}).catch(err=>{
          console.log('fddfa')
        })

        await client.sendText(message.from, 'Hemos registrado tu ubicación, comparte una foto, audio o mensaje para subirlo al mapa.');
      } else if(message.type === 'chat' && message.content !== '1') {
        const resp = await axios.post(apiUrl + "/update-status", {from: message.from, state: 'esperando_loc', location_string: json_['content']}).catch(err=>{
          console.log('fddfa')
        })

        await client.sendText(message.from, 'Hemos registrado tu ubicación como *'+ json_['content'] +'* , si no es correcto vuelve a enviar tu ubicación de lo contrario escribe *1*.');
      } else if(message.type === 'chat' && message.content === '1') {
        const resp = await axios.post(apiUrl + "/update-status", {from: message.from, state: 'esperando_contenido'}).catch(err=>{
          console.log('fddfa')
        })
  
        await client.sendText(message.from, 'Comparta con nosotros un texto con la respuesta a la pregunta ¿Cómo sanar las heridas del conflicto armado?');
      } else {
        await client.sendText(message.from, '¿Dónde se encuentra?');
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
            await client.sendText(message.from, '¡Gracias por su participación! Su respuesta podrá hacer parte de la conversación nacional sobre la sanación.\nLe invitamos a que continúe explorando _SaNaciones: diálogos de la memoria_ y a que participe en las redes sociales del Museo de Memoria de Colombia con la etiqueta #MemoriasQueSanan.');
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
      await client.sendText(message.from, '*1* Información sobre la exposición.\n*2* Participar en la exposición.');
    }

    console.log(message.type)
  });
}

create().then(client => start(client));