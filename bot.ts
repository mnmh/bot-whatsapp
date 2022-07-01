import { create, Client, decryptMedia } from '@open-wa/wa-automate';
const mime = require('mime-types');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
"use strict";
const nodemailer = require('nodemailer');

const apiUrl = 'http://localhost:4001';


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'botsanaciones@gmail.com',
    pass: 'Caminos_Resistencias'
  }
});



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
      await client.sendText(message.from, 'Nos encanta que estés acompañandonos y te interese la exposición');
      await client.sendText(message.from, 'SaNaciones es la exposición *MULTIPLATAFORMA, TRANSMEDIA e ITINERANTE* del Museo de Memoria de Colombia que fue construida de manera participativa y colectiva con siete comunidades indígenas víctimas del conflicto armado. Soy SaNáa y te voy a estar acompañando en este recorrido.');
      await client.sendText(message.from, 'Todos los contenidos e imágenes utilizadas responden a derechos de autor. Al continuar entendemos que aceptas la política de datos. Recuerda que en cualquier momento puedes abandonar y volver a la conversación.');
      await client.sendText(message.from, 'Consulta la política de datos y los términos y condiciones de la exposición.\nhttps://museodelamemoria.gov.co/sanaciones');
      await client.sendText(message.from, 'En esta conversación puedes conocer más acerca de la *exposición SaNaciones*, hacer un recorrido por los *seis caminos de la exposición* para entender las violencias que han sufrido los pueblos indígenas y las formas en que las han enfrentado y tramitado; o puedes participar directamente con tu opinión en la construcción del *Mapa de SaNaciones*.');
      await client.sendText(message.from, 'Ahora para continuar lee el menu de cada sección, escribe y envíame solo el número de la opción que más te interese; por ejemplo: 3 👇🏽 🔢\n *1* ¿Qué es SaNaciones?\n *2* Caminos de la exposición\n *3* Participa de la exposición\n *4* Plataforma virtual');
    } 
    
    else if(message.content === '1' && r.data.state === '') {
      await axios.post(apiUrl + "/update-status", {from: message.from, state: 'Info'}).catch(err=>{
        console.log(err)
      })
      await client.sendText(message.from, '*SaNaciones: diálogos de la memoria* es una exposición que invita a comprender el territorio como víctima y a reconocer las violencias que han sufrido las comunidades étnicas desde hace siglos. También exalta su capacidad organizativa y cuestiona el lugar que han ocupado en nuestra nación. Esta exposición fue construida de manera participativa y colectiva *con diez comunidades indígenas víctimas del conflicto armado.*' );
      await client.sendText(message.from, 'Te mencioné que SaNaciones es una una exposición *MULTIPLATAFORMA, TRANSMEDIA e ITINERANTE*, esto quiere decir que tiene varias plataformas físicas y virtuales: 🖥️ una curaduría en la página web del Museo, 🎒 una maleta con material didáctico, 🚚 una unidad móvil que recorrerá varios territorios con actividades artísticas, culturales y pedagógicas, y 🤖 este bot de WhatsApp.');
      await client.sendText(message.from, '👇🏽 🔢 ↔️ Más de SaNaciones:\n*1* Caminos de la exposición\n*2* Participa de la exposición\n *3* Plataforma virtual');
    } 
    else if (message.content === '2' && r.data.state === ''){
      await axios.post(apiUrl + "/update-status", {from: message.from, state: 'caminos'}).catch(err=>{
        console.log(err)
      })
      await client.sendText(message.from, "En SaNaciones tenemos seis  caminos  para entender  las violencias que han sufrido los pueblos indígenas, las formas en quer las han enfrentado y tramitado.")
      await client.sendText(message.from, '👇🏽 🔢 ⤵️ \n\n*1* Disposición al diálogo\n*2* Territorios\n*3* Resistencias históricas de los pueblos indígenas\n*4* La fuerza de lo colectivo\n*5* Naciones\n*6* Arte y sanación');
      await client.sendText(message.from, '🛖 Inicio:\n*7* ¿Qué es SaNaciones?\n*8* 📍Caminos de la exposición\n*9* Participa de la exposición\n *10* Plataforma virtual');
    }
    else if (message.content === '3' && r.data.state === ''){
      await axios.post(apiUrl + "/update-status", {from: message.from, state: 'participa'}).catch(err=>{
        console.log(err)
      })
      await client.sendText(message.from, 'Entre todos creamos el mapa de la SaNación! Ya somos 123 participantes! \n Tu opinión será totalmente anónima. \n ¿Cómo sanar las heridas del conflicto armado? Cuéntanos qué piensas con un texto.');
      await client.sendText(message.from, 'Consulte los términos y condiciones  Mapa de SaNaciones en el sitio web www.museodememoria.gov.co/sanaciones');
      await client.sendText(message.from, '¿Quieres participar? \n*1* Sí, quiero participar.\n*2* No, quiero volver.');
      
    }
    else if (message.content === '4' && r.data.state === ''){
      await axios.post(apiUrl + "/update-status", {from: message.from, state: 'plataforma'}).catch(err=>{
        console.log(err)
      })
      await client.sendText(message.from, 'Otra de las plataformas en la q que desarrollamos la Exposición de SaNaciones es la plataforma web., donde podrás complementar los contenidos de cada uno de los caminos de la exposición. Vas a encontrar contenidos más extensos y diferentes elementos multimedia.');
      await client.sendText(message.from, '⚠️ Te recuerdo que es una página externa y el consumo de los datos en tu celular puede ser alta. Si no puedes hacerlo ahora, te recomiendo la visites cuando tu celular esté conectado a una red WI-FI para que puedas el resto de contenido que está genial.');
      await client.sendText(message.from, 'SaNaciones: diálogos de la memoria \nhttps://museodelamemoria.gov.co/sanaciones');
      await client.sendText(message.from, "👇🏽 🔢 ↔️ O si prefieres continuar conversando de la exposición: \n*1* ¿Qué es SaNaciones? \n*2* Caminos de la exposición \n*3* Participa en el mapa de SaNaciones")  
      
    }

    else if (r.data.state === 'plataforma'){
      if(message.content === '1'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'Info'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, '*SaNaciones: diálogos de la memoria* es una exposición que invita a comprender el territorio como víctima y a reconocer las violencias que han sufrido las comunidades étnicas desde hace siglos. También exalta su capacidad organizativa y cuestiona el lugar que han ocupado en nuestra nación. Esta exposición fue construida de manera participativa y colectiva *con diez comunidades indígenas víctimas del conflicto armado.*' );
        await client.sendText(message.from, 'Te mencioné que SaNaciones es una una exposición *MULTIPLATAFORMA, TRANSMEDIA e ITINERANTE*, esto quiere decir que tiene varias plataformas físicas y virtuales: 🖥️ una curaduría en la página web del Museo, 🎒 una maleta con material didáctico, 🚚 una unidad móvil que recorrerá varios territorios con actividades artísticas, culturales y pedagógicas, y 🤖 este bot de WhatsApp.');
        await client.sendText(message.from, '👇🏽 🔢 ↔️ Más de SaNaciones:\n*1* Caminos de la exposición\n*2* Participa de la exposición\n *3* Plataforma virtual');
      }
      else if(message.content === '2'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'caminos'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, "En SaNaciones tenemos seis  caminos  para entender  las violencias que han sufrido los pueblos indígenas, las formas en quer las han enfrentado y tramitado.")
        await client.sendText(message.from, '👇🏽 🔢 ⤵️ \n\n*1* Disposición al diálogo\n*2* Territorios\n*3* Resistencias históricas de los pueblos indígenas\n*4* La fuerza de lo colectivo\n*5* Naciones\n*6* Arte y sanación');
        await client.sendText(message.from, '🛖 Inicio:\n*7* ¿Qué es SaNaciones?\n*8* 📍Caminos de la exposición\n*9* Participa de la exposición\n *10* Plataforma virtual');
      }
      else if (message.content === '3'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'participa'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, 'Entre todos creamos el mapa de la SaNación! Ya somos 123 participantes! \n Tu opinión será totalmente anónima. \n ¿Cómo sanar las heridas del conflicto armado? Cuéntanos qué piensas con un texto.');
        await client.sendText(message.from, 'Consulte los términos y condiciones  Mapa de SaNaciones en el sitio web www.museodememoria.gov.co/sanaciones');
        await client.sendText(message.from, '¿Quieres participar? \n*1* Sí, quiero participar.\n*2* No, quiero volver.');
      }       
      else{
      await client.sendText(message.from, 'Otra de las plataformas en la q que desarrollamos la Exposición de SaNaciones es la plataforma web., donde podrás complementar los contenidos de cada uno de los caminos de la exposición. Vas a encontrar contenidos más extensos y diferentes elementos multimedia.');
      await client.sendText(message.from, '⚠️ Te recuerdo que es una página externa y el consumo de los datos en tu celular puede ser alta. Si no puedes hacerlo ahora, te recomiendo la visites cuando tu celular esté conectado a una red WI-FI para que puedas el resto de contenido que está genial.');
      await client.sendText(message.from, 'SaNaciones: diálogos de la memoria \nhttps://museodelamemoria.gov.co/sanaciones');
      await client.sendText(message.from, "👇🏽 🔢 ↔️ O si prefieres continuar conversando de la exposición: \n*1* ¿Qué es SaNaciones? \n*2* Caminos de la exposición \n*3* Participa en el mapa de SaNaciones")  
      }
    }
    

    else if (r.data.state === 'resistencias'){
      if(message.content === '1'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'sobrevivientes'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, "Sobrevivientes victoriosos En 1905, la empresa del peruano Julio César Arana adquirió 19 centros de extracción de caucho en los ríos Caquetá y Putumayo, cuyo acopio principal era la Casa Arana, en La Chorrera, a orillas del río Igará Paraná. La esclavización, los asesinatos, las torturas y el uso desmedido de la mano de obra local por más de 20 años cobraron la vida de más de 40 mil indígenas, casi el 60% de la población nativa de la región. Hoy los pueblos Uitoto MɨNɨKa, Ɨvuuhza (Okaina), Pɨɨnenicína (Bora) y Gaigoomɨjɨ (Muinane) de La Chorrera abandonan la condición de víctimas para renombrarse ellos mismos como sobrevivientes victoriosos.")  
        await client.sendText(message.from, "👇🏽 🔢 \n\n⤵️\n*1* La SaNación\n*2* Campamentos, Violencias, Confrontación, Resignificar la Casa Arana 📺 = 3.4MB")  
        await client.sendText(message.from, "↔️ Continua en Resistencias históricas de los pueblos indígenas:\n*3* Ishtana resiste")  
        await client.sendText(message.from, "↩️ Más de Caminos de SaNaciones:\n*4* Disposición al diálogo\n*5* Territorios\n*6* 📍Resistencias históricas de los pueblos indígenas\n*7* La fuerza de lo colectivo\n*8* Naciones\n*9* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*10* ¿Qué es SaNaciones?\n*11* 📍Caminos de la exposición\n*12* Participa de la exposición\n *13* Plataforma virtual")  
        //await client.sendText(message.from, "*Sobrevivientes Victoriosos*\n Descripción de este camino en un párrafo.\n\n*1* Video temática SaNación.\n*2* Campamentos, Violencias, Confrontación, Resignificar la Casa Arana.\n *3* Atrás\n *4* Volver al inicio")  
      }
      else if(message.content === '2'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'ishtana'}).catch(err=>{
          console.log(err)
        })
        
        await client.sendText(message.from, "*Ishtana resiste* \nIshtana, en la lengua barí ara, es la palabra que define nuestro territorio, el cual, ancestralmente, se extendía desde la Serranía del Perijá hasta los Andes venezolanos. Esto marcó el carácter binacional de nuestro pueblo, cuyos integrantes vivimos tanto en Colombia como en Venezuela. La defensa de l tierra del pueblo Barí responde a la alarmante reducción del territorio y la superposición con otras figuras territoriales como las campesinas y los parques naturales.")  
        await client.sendText(message.from, "👇🏽 🔢\n\n ⤵️ \n*1* Video 📺 = 2.2MB \n*2* Audio 🔈 = 3.4MB \n*3* Mapa 🗺️ = 2.2MB")
        await client.sendText(message.from, "↔️ Continua en Resistencias históricas de los pueblos indígenas: \n*4* Sobrevivientes victoriosos")
        await client.sendText(message.from, "↩️ Más de Caminos de SaNaciones: \n*5* Disposición al diálogo \n*6* Territorios \n*7* 📍Resistencias históricas de los pueblos indígenas \n*8* La fuerza de lo colectivo \n*9* Naciones \n*10* Arte y sanación")
        await client.sendText(message.from, "🛖 Inicio:\n*11* ¿Qué es SaNaciones?\n*12* 📍Caminos de la exposición\n*13* Participa de la exposición\n *14* Plataforma virtual")
      }
      
      else if(message.content === '3'){
      await axios.post(apiUrl + "/update-status", {from: message.from, state: 'disposicion'}).catch(err=>{
        console.log(err)
      })  
        await client.sendText(message.from, "*Disposición al diálogo* \nLa palabra sin acción es vacía, la acción sin palabra es ciega, la palabra y la acción por fuera del espíritu de la comunidad son la muerte -Pensamiento Nasa.\n\nEl diálogo permite construir la memoria histórica y es un camino para sanar.")  
        await client.sendText(message.from, "Esta exposición es el resultado de un diálogo entre el Museo de Memoria de Colombia y los pueblos indígenas que participaron.")  
        await client.sendText(message.from, "Estar dispuestos a dialogar nos permite transformar imaginarios sobre los otros y reconocer que a pesar de nuestras diferencias podemos convivir y aprender de los demás. Para esto necesitamos crear acuerdos basados en el respeto, la tolerancia y la defensa de la vida. El diálogo es un pilar fundamental en la cosmogonía de los pueblos indígenas. Está presente en todos los ámbitos de la vida y es esencial en sus procesos de sanación.")  
        await client.sendText(message.from, "Los pueblos indígenas nos saludan e invitan al diálogo: 👇🏽 🔢\n ⤵️ \n\n*1* Saludos de pueblos indigenas 🌄 = 1.4MB\n*2* Mapa de los pueblos indigenas 🗺️ = 2MB")  
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*3 📍Disposición al diálogo* \n*4* Territorios \n*5* Resistencias históricas de los pueblos indígenas \n*6* La fuerza de lo colectivo \n*7* Naciones \n*8* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*9* ¿Qué es SaNaciones? \n*10* 📍Caminos de la exposición \n*11*  Participa de la exposición\n *12* Plataforma virtual")  
      }
      else if(message.content === '4'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'territorios'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, "*Territorios* \nPara los pueblos indígenas, el territorio representa la madre que da vida. Es un espacio espiritual que conecta con lo sagrado y permite ver las huellas que ha dejado el conflicto armado.")  
        await client.sendText(message.from, "En este camino verás y escucharás los lugares que habitan los pueblos indígenas. También conocerás obras de arte que reflexionan sobre el significado de estos territorios para sus comunidades. 👇🏽 🔢 \n⤵️ \n*1* Vivir y resistir como semillas \n*2* Tierras \n*3* Pueblo Wiwa 📺 + 🔈 = 3.4MB")  
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*4* Disposición al diálogo \n*5 📍Territorios* \n*6* Resistencias históricas de los pueblos indígenas \n*7* La fuerza de lo colectivo \n*8* Naciones \n*9* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*10* ¿Qué es SaNaciones? \n*11* 📍Caminos de la exposición \n*12*  Participa de la exposición\n *13* Plataforma virtual")  
      }
      else if(message.content === '5'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'resistencias'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, '*Resistencias históricas de los pueblos indígenas* \nLos pueblos indígenas y sus territorios han sido afectados desde hace siglos por distintos tipos de violencia. Algunas de ellas continúan todavía. En este camino encontrarás las memorias del pueblo Barí, del Catatumbo, y de los pueblos Uitoto Mnka, vhuuza (Okaina), Gaigoomj (Muinane) y Pnenicína (Bora), esencia del tabaco, la coca y la yuca dulce de La Chorrera, en Amazonas. Estos pueblos por poco fueron exterminados, pero hoy anhelan que no se repita y que puedan tejer una nueva historia. Para poder sanar, reinterpretan su memoria desde la palabra de vida, conocimiento y resistencia.');
        await client.sendText(message.from, '👇🏽 🔢 ⤵️\n*1* Sobrevivientes victoriosos \n*2* Ishtana resiste');
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*3 📍Disposición al diálogo* \n*4* Territorios \n*5* Resistencias históricas de los pueblos indígenas \n*6* La fuerza de lo colectivo \n*7* Naciones \n*8* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*9* ¿Qué es SaNaciones? \n*10* 📍Caminos de la exposición \n*11*  Participa de la exposición\n *12* Plataforma virtual")  
      }
      else if(message.content === '6'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'fuerza'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, '*La fuerza de lo colectivo* \nLos logros organizativos de los pueblos indígenas parten de las luchas y experiencias políticas de sus mayores. La defensa del territorio y el conocimiento espiritual se han transmitido de generación en generación. En este camino, los líderes y comunidades han entendido que unidos son más fuertes para enfrentar la violencia de actores armados legales e ilegales.');
        await client.sendText(message.from, 'En este camino verás cómo el pueblo Nasa, en el norte del Cauca, y el pueblo Awá, en Nariño, Putumayo y territorio ecuatoriano, han creado estrategias desde lo colectivo para resistir.');
        await client.sendText(message.from, '👇🏽 🔢 \n⤵️ \n*1* ¡Viva la guardia, viva la minga! \n*2* Rastrear la memoria');
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*3 📍Disposición al diálogo* \n*4* Territorios \n*5* Resistencias históricas de los pueblos indígenas \n*6* La fuerza de lo colectivo \n*7* Naciones \n*8* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*9* ¿Qué es SaNaciones? \n*10* 📍Caminos de la exposición \n*11*  Participa de la exposición\n *12* Plataforma virtual")  
      }
      else if(message.content === '7'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'naciones'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, '*Naciones* La Constitución de 1991 reconoce que hacemos parte de un país que reúne diferentes pueblos con identidades particulares, territorios definidos y derecho a la autodeterminación. Sin embargo, para los pueblos étnicos, la multiculturalidad es una realidad inacabada, pues aún luchan por la defensa de sus derechos, autonomía y soberanía. \nPara los pueblos indígenas la idea de nación recoge el territorio como ser vivo e implica la convivencia armónica entre la naturaleza y los seres humanos, pero también involucra la cosmovisión, la autonomía y la autodeterminación.');
        await client.sendText(message.from, '*Naciones Indigenas* Son proyectos de vida de algunos pueblos indígenas que habitan en Colombia, quienes nos llaman a interactuar y convivir con nuestras diferencias.');
        await client.sendText(message.from, '*1* Bari 🌄 = 1.2MB\n*2* Nasa 🌄 + 🔈 = 2.2MB\n*3* Awá 🌄 = 1.2MB\n*4* Pasto 📺 = 5.2MB\n*5* Kamantsa 📺 = 12.2MB');
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*6 📍Disposición al diálogo* \n*7* Territorios \n*8* Resistencias históricas de los pueblos indígenas \n*9* La fuerza de lo colectivo \n*10* Naciones \n*11* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*12* ¿Qué es SaNaciones? \n*13* 📍Caminos de la exposición \n*14*  Participa de la exposición\n *15* Plataforma virtual")  
        
      }
      else if(message.content === '8'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'Info_artista'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, '*Arte y sanación* En 2020, el Museo de Memoria de Colombia invitó a varios artistas a intervenir recibos de servicio público y periódicos con obras que reflexionaran sobre la sanación.');
        await client.sendText(message.from, "*1* Rafael Posso 🌄 + 🔈 = 1.4MB \n*2* Dayro Carrasquilla 🌄 + 🔈 = 2.2MB \n*3* Eusebio Siosi 🌄 + 🔈 = 4.6MB \n*4* Enosh Arias 🌄 + 🔈 = 2.2MB \n*5* Juana Alicia 🌄 + 🔈 = 1.8MB \n*6* Álvaro Barrios 🌄 + 🔈 = 2.1MB \n*7* Alexandra Gelis 🌄 + 🔈 = 2.2MB \n*8* Nohemí Pérez 🌄 + 🔈 = 4.6MB")  
        await client.sendText(message.from, "↩️ Más de Caminos de SaNaciones: \n*9* Disposición al diálogo \n*10* Territorios \n*11* Resistencias históricas de los pueblos indígenas \n*12* La fuerza de lo colectivo \n*13* Naciones \n*14 📍Arte y sanación*")  
        await client.sendText(message.from, "🛖 Inicio:\n*15* ¿Qué es SaNaciones? \n*16* 📍Caminos de la exposición \n*17*  Participa de la exposición\n *18* Plataforma virtual")   
      }
      else if(message.content === '9'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'Info'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, '*SaNaciones: diálogos de la memoria* es una exposición que invita a comprender el territorio como víctima y a reconocer las violencias que han sufrido las comunidades étnicas desde hace siglos. También exalta su capacidad organizativa y cuestiona el lugar que han ocupado en nuestra nación. Esta exposición fue construida de manera participativa y colectiva *con diez comunidades indígenas víctimas del conflicto armado.*' );
        await client.sendText(message.from, 'Te mencioné que SaNaciones es una una exposición *MULTIPLATAFORMA, TRANSMEDIA e ITINERANTE*, esto quiere decir que tiene varias plataformas físicas y virtuales: 🖥️ una curaduría en la página web del Museo, 🎒 una maleta con material didáctico, 🚚 una unidad móvil que recorrerá varios territorios con actividades artísticas, culturales y pedagógicas, y 🤖 este bot de WhatsApp.');
        await client.sendText(message.from, '👇🏽 🔢 ↔️ Más de SaNaciones:\n*1* Caminos de la exposición\n*2* Participa de la exposición\n *3* Plataforma virtual');
      }
      else if(message.content === '10'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'caminos'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, "En SaNaciones tenemos seis  caminos  para entender  las violencias que han sufrido los pueblos indígenas, las formas en quer las han enfrentado y tramitado.")
        await client.sendText(message.from, '👇🏽 🔢 ⤵️ \n\n*1* Disposición al diálogo\n*2* Territorios\n*3* Resistencias históricas de los pueblos indígenas\n*4* La fuerza de lo colectivo\n*5* Naciones\n*6* Arte y sanación');
        await client.sendText(message.from, '🛖 Inicio:\n*7* ¿Qué es SaNaciones?\n*8* 📍Caminos de la exposición\n*9* Participa de la exposición\n *10* Plataforma virtual');
      }
      else if (message.content === '11'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'participa'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, 'Entre todos creamos el mapa de la SaNación! Ya somos 123 participantes! \n Tu opinión será totalmente anónima. \n ¿Cómo sanar las heridas del conflicto armado? Cuéntanos qué piensas con un texto.');
        await client.sendText(message.from, 'Consulte los términos y condiciones  Mapa de SaNaciones en el sitio web www.museodememoria.gov.co/sanaciones');
        await client.sendText(message.from, '¿Quieres participar? \n*1* Sí, quiero participar.\n*2* No, quiero volver.');
      }    
      else if (message.content === '12')
      {
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'plataforma'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, 'Otra de las plataformas en la q que desarrollamos la Exposición de SaNaciones es la plataforma web., donde podrás complementar los contenidos de cada uno de los caminos de la exposición. Vas a encontrar contenidos más extensos y diferentes elementos multimedia.');
        await client.sendText(message.from, '⚠️ Te recuerdo que es una página externa y el consumo de los datos en tu celular puede ser alta. Si no puedes hacerlo ahora, te recomiendo la visites cuando tu celular esté conectado a una red WI-FI para que puedas el resto de contenido que está genial.');
        await client.sendText(message.from, 'SaNaciones: diálogos de la memoria \nhttps://museodelamemoria.gov.co/sanaciones');
        await client.sendText(message.from, "👇🏽 🔢 ↔️ O si prefieres continuar conversando de la exposición: \n*1* ¿Qué es SaNaciones? \n*2* Caminos de la exposición \n*3* Participa en el mapa de SaNaciones")  
        
      }   
      else{
        await client.sendText(message.from, '*Resistencias históricas de los pueblos indígenas* \nLos pueblos indígenas y sus territorios han sido afectados desde hace siglos por distintos tipos de violencia. Algunas de ellas continúan todavía. En este camino encontrarás las memorias del pueblo Barí, del Catatumbo, y de los pueblos Uitoto Mnka, vhuuza (Okaina), Gaigoomj (Muinane) y Pnenicína (Bora), esencia del tabaco, la coca y la yuca dulce de La Chorrera, en Amazonas. Estos pueblos por poco fueron exterminados, pero hoy anhelan que no se repita y que puedan tejer una nueva historia. Para poder sanar, reinterpretan su memoria desde la palabra de vida, conocimiento y resistencia.');
        await client.sendText(message.from, '👇🏽 🔢 ⤵️\n*1* Sobrevivientes victoriosos \n*2* Ishtana resiste');
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*3 📍Disposición al diálogo* \n*4* Territorios \n*5* Resistencias históricas de los pueblos indígenas \n*6* La fuerza de lo colectivo \n*7* Naciones \n*8* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*9* ¿Qué es SaNaciones? \n*10* 📍Caminos de la exposición \n*11*  Participa de la exposición\n *12* Plataforma virtual")  
      }
    }

    else if (r.data.state === 'sobrevivientes'){
      if(message.content === '2'){
        await client.sendText(message.from, "Campamentos, Violencias, Confrontación, Resignificar la Casa Arana");
        await client.sendFileFromUrl(message.from, "https://youtu.be/AYYk9qbrsEE", 'video.mp4', `teste`, null, null, true)
        await client.sendText(message.from, "👇🏽 🔢 \n\n↔️ Continúa en Sobrevivientes victoriosos: \n*2* Campamentos, Violencias, Confrontación, Resignificar la Casa Arana 📺 = 3.4MB");  
        await client.sendText(message.from, "↩️ Más de Resistencias históricas de los pueblos indígenas: \n*2 📍Sobrevivientes victoriosos* \n*3* Ishtana resiste")    
        await client.sendText(message.from, "↖️ Ir a Caminos de SaNaciones: \n*4* Disposición al diálogo \n*5* Territorios \n*6* 📍Resistencias históricas de los pueblos indígenas \n*7* La fuerza de lo colectivo \n*8* Naciones \n*9* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*10* ¿Qué es SaNaciones?\n*11* 📍Caminos de la exposición\n*12* Participa de la exposición\n *13* Plataforma virtual")  
        //await client.sendText(message.from, "*Sobrevivientes Victoriosos*\n Descripción de este camino en un párrafo.\n\n*1* Video temática SaNación.\n*2* Campamentos, Violencias, Confrontación, Resignificar la Casa Arana.\n *3* Atrás\n *4* Volver al inicio")  
      }  
      else if (message.content === '1'){
        await client.sendText(message.from, "La SaNación");
        await client.sendFileFromUrl(message.from, "https://youtu.be/-n-f9KRgmbo", 'video.mp4', `teste`, null, null, true)
        await client.sendText(message.from, "👇🏽 🔢 \n\n↔️ Continúa en Sobrevivientes victoriosos: \n*2* Campamentos, Violencias, Confrontación, Resignificar la Casa Arana 📺 = 3.4MB");  
        await client.sendText(message.from, "↩️ Más de Resistencias históricas de los pueblos indígenas: \n*2 📍Sobrevivientes victoriosos* \n*3* Ishtana resiste")    
        await client.sendText(message.from, "↖️ Ir a Caminos de SaNaciones: \n*4* Disposición al diálogo \n*5* Territorios \n*6* 📍Resistencias históricas de los pueblos indígenas \n*7* La fuerza de lo colectivo \n*8* Naciones \n*9* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*10* ¿Qué es SaNaciones?\n*11* 📍Caminos de la exposición\n*12* Participa de la exposición\n *13* Plataforma virtual")  
        //await client.sendText(message.from, "*Sobrevivientes Victoriosos*\n Descripción de este camino en un párrafo.\n\n*1* Video temática SaNación.\n*2* Campamentos, Violencias, Confrontación, Resignificar la Casa Arana.\n *3* Atrás\n *4* Volver al inicio")  
      }
      else if(message.content === '3'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'ishtana'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, "*Ishtana resiste* \nIshtana, en la lengua barí ara, es la palabra que define nuestro territorio, el cual, ancestralmente, se extendía desde la Serranía del Perijá hasta los Andes venezolanos. Esto marcó el carácter binacional de nuestro pueblo, cuyos integrantes vivimos tanto en Colombia como en Venezuela. La defensa de l tierra del pueblo Barí responde a la alarmante reducción del territorio y la superposición con otras figuras territoriales como las campesinas y los parques naturales.")  
        await client.sendText(message.from, "👇🏽 🔢\n\n ⤵️ \n*1* Video 📺 = 2.2MB \n*2* Audio 🔈 = 3.4MB \n*3* Mapa 🗺️ = 2.2MB")
        await client.sendText(message.from, "↔️ Continua en Resistencias históricas de los pueblos indígenas: \n*4* Sobrevivientes victoriosos")
        await client.sendText(message.from, "↩️ Más de Caminos de SaNaciones: \n*5* Disposición al diálogo \n*6* Territorios \n*7* 📍Resistencias históricas de los pueblos indígenas \n*8* La fuerza de lo colectivo \n*9* Naciones \n*10* Arte y sanación")
        await client.sendText(message.from, "🛖 Inicio:\n*11* ¿Qué es SaNaciones?\n*12* 📍Caminos de la exposición\n*13* Participa de la exposición\n *14* Plataforma virtual")
      }
      else if(message.content === '4'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'disposicion'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, "*Disposición al diálogo* \nLa palabra sin acción es vacía, la acción sin palabra es ciega, la palabra y la acción por fuera del espíritu de la comunidad son la muerte -Pensamiento Nasa.\n\nEl diálogo permite construir la memoria histórica y es un camino para sanar.")  
        await client.sendText(message.from, "Esta exposición es el resultado de un diálogo entre el Museo de Memoria de Colombia y los pueblos indígenas que participaron.")  
        await client.sendText(message.from, "Estar dispuestos a dialogar nos permite transformar imaginarios sobre los otros y reconocer que a pesar de nuestras diferencias podemos convivir y aprender de los demás. Para esto necesitamos crear acuerdos basados en el respeto, la tolerancia y la defensa de la vida. El diálogo es un pilar fundamental en la cosmogonía de los pueblos indígenas. Está presente en todos los ámbitos de la vida y es esencial en sus procesos de sanación.")  
        await client.sendText(message.from, "Los pueblos indígenas nos saludan e invitan al diálogo: 👇🏽 🔢\n ⤵️ \n\n*1* Saludos de pueblos indigenas 🌄 = 1.4MB\n*2* Mapa de los pueblos indigenas 🗺️ = 2MB")  
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*3 📍Disposición al diálogo* \n*4* Territorios \n*5* Resistencias históricas de los pueblos indígenas \n*6* La fuerza de lo colectivo \n*7* Naciones \n*8* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*9* ¿Qué es SaNaciones? \n*10* 📍Caminos de la exposición \n*11*  Participa de la exposición\n *12* Plataforma virtual")  
      }
      else if(message.content === '5'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'territorios'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, "*Territorios* \nPara los pueblos indígenas, el territorio representa la madre que da vida. Es un espacio espiritual que conecta con lo sagrado y permite ver las huellas que ha dejado el conflicto armado.")  
        await client.sendText(message.from, "En este camino verás y escucharás los lugares que habitan los pueblos indígenas. También conocerás obras de arte que reflexionan sobre el significado de estos territorios para sus comunidades. 👇🏽 🔢 \n⤵️ \n*1* Vivir y resistir como semillas \n*2* Tierras \n*3* Pueblo Wiwa 📺 + 🔈 = 3.4MB")  
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*4* Disposición al diálogo \n*5 📍Territorios* \n*6* Resistencias históricas de los pueblos indígenas \n*7* La fuerza de lo colectivo \n*8* Naciones \n*9* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*10* ¿Qué es SaNaciones? \n*11* 📍Caminos de la exposición \n*12*  Participa de la exposición\n *13* Plataforma virtual")  
      }
      else if(message.content === '6'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'resistencias'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, '*Resistencias históricas de los pueblos indígenas* \nLos pueblos indígenas y sus territorios han sido afectados desde hace siglos por distintos tipos de violencia. Algunas de ellas continúan todavía. En este camino encontrarás las memorias del pueblo Barí, del Catatumbo, y de los pueblos Uitoto Mnka, vhuuza (Okaina), Gaigoomj (Muinane) y Pnenicína (Bora), esencia del tabaco, la coca y la yuca dulce de La Chorrera, en Amazonas. Estos pueblos por poco fueron exterminados, pero hoy anhelan que no se repita y que puedan tejer una nueva historia. Para poder sanar, reinterpretan su memoria desde la palabra de vida, conocimiento y resistencia.');
        await client.sendText(message.from, '👇🏽 🔢 ⤵️\n*1* Sobrevivientes victoriosos \n*2* Ishtana resiste');
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*3 📍Disposición al diálogo* \n*4* Territorios \n*5* Resistencias históricas de los pueblos indígenas \n*6* La fuerza de lo colectivo \n*7* Naciones \n*8* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*9* ¿Qué es SaNaciones? \n*10* 📍Caminos de la exposición \n*11*  Participa de la exposición\n *12* Plataforma virtual")  
      }
      else if(message.content === '7'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'fuerza'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, '*La fuerza de lo colectivo* \nLos logros organizativos de los pueblos indígenas parten de las luchas y experiencias políticas de sus mayores. La defensa del territorio y el conocimiento espiritual se han transmitido de generación en generación. En este camino, los líderes y comunidades han entendido que unidos son más fuertes para enfrentar la violencia de actores armados legales e ilegales.');
        await client.sendText(message.from, 'En este camino verás cómo el pueblo Nasa, en el norte del Cauca, y el pueblo Awá, en Nariño, Putumayo y territorio ecuatoriano, han creado estrategias desde lo colectivo para resistir.');
        await client.sendText(message.from, '👇🏽 🔢 \n⤵️ \n*1* ¡Viva la guardia, viva la minga! \n*2* Rastrear la memoria');
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*3 📍Disposición al diálogo* \n*4* Territorios \n*5* Resistencias históricas de los pueblos indígenas \n*6* La fuerza de lo colectivo \n*7* Naciones \n*8* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*9* ¿Qué es SaNaciones? \n*10* 📍Caminos de la exposición \n*11*  Participa de la exposición\n *12* Plataforma virtual")  
      }
      else if(message.content === '8'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'naciones'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, '*Naciones* La Constitución de 1991 reconoce que hacemos parte de un país que reúne diferentes pueblos con identidades particulares, territorios definidos y derecho a la autodeterminación. Sin embargo, para los pueblos étnicos, la multiculturalidad es una realidad inacabada, pues aún luchan por la defensa de sus derechos, autonomía y soberanía. \nPara los pueblos indígenas la idea de nación recoge el territorio como ser vivo e implica la convivencia armónica entre la naturaleza y los seres humanos, pero también involucra la cosmovisión, la autonomía y la autodeterminación.');
        await client.sendText(message.from, '*Naciones Indigenas* Son proyectos de vida de algunos pueblos indígenas que habitan en Colombia, quienes nos llaman a interactuar y convivir con nuestras diferencias.');
        await client.sendText(message.from, '*1* Bari 🌄 = 1.2MB\n*2* Nasa 🌄 + 🔈 = 2.2MB\n*3* Awá 🌄 = 1.2MB\n*4* Pasto 📺 = 5.2MB\n*5* Kamantsa 📺 = 12.2MB');
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*6 📍Disposición al diálogo* \n*7* Territorios \n*8* Resistencias históricas de los pueblos indígenas \n*9* La fuerza de lo colectivo \n*10* Naciones \n*11* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*12* ¿Qué es SaNaciones? \n*13* 📍Caminos de la exposición \n*14*  Participa de la exposición\n *15* Plataforma virtual")  
        
      }
      else if(message.content === '9'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'Info_artista'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, '*Arte y sanación* En 2020, el Museo de Memoria de Colombia invitó a varios artistas a intervenir recibos de servicio público y periódicos con obras que reflexionaran sobre la sanación.');
        await client.sendText(message.from, "*1* Rafael Posso 🌄 + 🔈 = 1.4MB \n*2* Dayro Carrasquilla 🌄 + 🔈 = 2.2MB \n*3* Eusebio Siosi 🌄 + 🔈 = 4.6MB \n*4* Enosh Arias 🌄 + 🔈 = 2.2MB \n*5* Juana Alicia 🌄 + 🔈 = 1.8MB \n*6* Álvaro Barrios 🌄 + 🔈 = 2.1MB \n*7* Alexandra Gelis 🌄 + 🔈 = 2.2MB \n*8* Nohemí Pérez 🌄 + 🔈 = 4.6MB")  
        await client.sendText(message.from, "↩️ Más de Caminos de SaNaciones: \n*9* Disposición al diálogo \n*10* Territorios \n*11* Resistencias históricas de los pueblos indígenas \n*12* La fuerza de lo colectivo \n*13* Naciones \n*14 📍Arte y sanación*")  
        await client.sendText(message.from, "🛖 Inicio:\n*15* ¿Qué es SaNaciones? \n*16* 📍Caminos de la exposición \n*17*  Participa de la exposición\n *18* Plataforma virtual")   
      }
      else if(message.content === '10'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'Info'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, '*SaNaciones: diálogos de la memoria* es una exposición que invita a comprender el territorio como víctima y a reconocer las violencias que han sufrido las comunidades étnicas desde hace siglos. También exalta su capacidad organizativa y cuestiona el lugar que han ocupado en nuestra nación. Esta exposición fue construida de manera participativa y colectiva *con diez comunidades indígenas víctimas del conflicto armado.*' );
        await client.sendText(message.from, 'Te mencioné que SaNaciones es una una exposición *MULTIPLATAFORMA, TRANSMEDIA e ITINERANTE*, esto quiere decir que tiene varias plataformas físicas y virtuales: 🖥️ una curaduría en la página web del Museo, 🎒 una maleta con material didáctico, 🚚 una unidad móvil que recorrerá varios territorios con actividades artísticas, culturales y pedagógicas, y 🤖 este bot de WhatsApp.');
        await client.sendText(message.from, '👇🏽 🔢 ↔️ Más de SaNaciones:\n*1* Caminos de la exposición\n*2* Participa de la exposición\n *3* Plataforma virtual');
      }
      else if(message.content === '11'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'caminos'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, "En SaNaciones tenemos seis  caminos  para entender  las violencias que han sufrido los pueblos indígenas, las formas en quer las han enfrentado y tramitado.")
        await client.sendText(message.from, '👇🏽 🔢 ⤵️ \n\n*1* Disposición al diálogo\n*2* Territorios\n*3* Resistencias históricas de los pueblos indígenas\n*4* La fuerza de lo colectivo\n*5* Naciones\n*6* Arte y sanación');
        await client.sendText(message.from, '🛖 Inicio:\n*7* ¿Qué es SaNaciones?\n*8* 📍Caminos de la exposición\n*9* Participa de la exposición\n *10* Plataforma virtual');
      }
      else if(message.content === '12'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'participa'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, 'Entre todos creamos el mapa de la SaNación! Ya somos 123 participantes! \n Tu opinión será totalmente anónima. \n ¿Cómo sanar las heridas del conflicto armado? Cuéntanos qué piensas con un texto.');
        await client.sendText(message.from, 'Consulte los términos y condiciones  Mapa de SaNaciones en el sitio web www.museodememoria.gov.co/sanaciones');
        await client.sendText(message.from, '¿Quieres participar? \n*1* Sí, quiero participar.\n*2* No, quiero volver.');
      }
      else if (message.content === '13')
      {
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'plataforma'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, 'Otra de las plataformas en la q que desarrollamos la Exposición de SaNaciones es la plataforma web., donde podrás complementar los contenidos de cada uno de los caminos de la exposición. Vas a encontrar contenidos más extensos y diferentes elementos multimedia.');
        await client.sendText(message.from, '⚠️ Te recuerdo que es una página externa y el consumo de los datos en tu celular puede ser alta. Si no puedes hacerlo ahora, te recomiendo la visites cuando tu celular esté conectado a una red WI-FI para que puedas el resto de contenido que está genial.');
        await client.sendText(message.from, 'SaNaciones: diálogos de la memoria \nhttps://museodelamemoria.gov.co/sanaciones');
        await client.sendText(message.from, "👇🏽 🔢 ↔️ O si prefieres continuar conversando de la exposición: \n*1* ¿Qué es SaNaciones? \n*2* Caminos de la exposición \n*3* Participa en el mapa de SaNaciones")  
        
      } 
      else{
        await client.sendText(message.from, "Sobrevivientes victoriosos En 1905, la empresa del peruano Julio César Arana adquirió 19 centros de extracción de caucho en los ríos Caquetá y Putumayo, cuyo acopio principal era la Casa Arana, en La Chorrera, a orillas del río Igará Paraná. La esclavización, los asesinatos, las torturas y el uso desmedido de la mano de obra local por más de 20 años cobraron la vida de más de 40 mil indígenas, casi el 60% de la población nativa de la región. Hoy los pueblos Uitoto MɨNɨKa, Ɨvuuhza (Okaina), Pɨɨnenicína (Bora) y Gaigoomɨjɨ (Muinane) de La Chorrera abandonan la condición de víctimas para renombrarse ellos mismos como sobrevivientes victoriosos.")  
        await client.sendText(message.from, "👇🏽 🔢 \n\n⤵️\n*1* La SaNación\n*2* Campamentos, Violencias, Confrontación, Resignificar la Casa Arana 📺 = 3.4MB")  
        await client.sendText(message.from, "↔️ Continua en Resistencias históricas de los pueblos indígenas:\n*3* Ishtana resiste")  
        await client.sendText(message.from, "↩️ Más de Caminos de SaNaciones:\n*4* Disposición al diálogo\n*5* Territorios\n*6* 📍Resistencias históricas de los pueblos indígenas\n*7* La fuerza de lo colectivo\n*8* Naciones\n*9* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*10* ¿Qué es SaNaciones?\n*11* 📍Caminos de la exposición\n*12* Participa de la exposición\n *13* Plataforma virtual")  
        //await client.sendText(message.from, "*Sobrevivientes Victoriosos*\n Descripción de este camino en un párrafo.\n\n*1* Video temática SaNación.\n*2* Campamentos, Violencias, Confrontación, Resignificar la Casa Arana.\n *3* Atrás\n *4* Volver al inicio")  
        }
        

    }

    else if (r.data.state === 'ishtana') {
      if(message.content === '1'){
        await client.sendText(message.from, "*Video*")
        await client.sendFile(message.from, './assets/audio/awa.mp3', '', '');
        await client.sendText(message.from, "👇🏽 🔢 \n\n⤵️Continúa con Ishtana resiste: \n*1* Video 📺 = 2.2MB \n*2* Audio 🔈 = 3.4MB \n*3* Mapa 🗺️ = 2.2MB")
        await client.sendText(message.from, "↩️ Más de Resistencias históricas de los pueblos indígenas: \n*4* Sobrevivientes victoriosos \n*5 📍Ishtana resiste*")
        await client.sendText(message.from, "↖️ Ir a Caminos de SaNaciones: \n*6* Disposición al diálogo \n*7* Territorios \n*8* 📍Resistencias históricas de los pueblos indígenas \n*9* La fuerza de lo colectivo \n*10* Naciones \n*11* Arte y sanación")
        await client.sendText(message.from, "🛖 Inicio:\n*12* ¿Qué es SaNaciones?\n*13* 📍Caminos de la exposición\n*14* Participa de la exposición\n *15* Plataforma virtual")  
      }
      else if(message.content === '2'){
        await client.sendText(message.from, "*Video*")
        await client.sendFile(message.from, './assets/audio/awa.mp3', '', '');
        await client.sendText(message.from, "👇🏽 🔢 \n\n⤵️Continúa con Ishtana resiste: \n*1* Video 📺 = 2.2MB \n*2* Audio 🔈 = 3.4MB \n*3* Mapa 🗺️ = 2.2MB")
        await client.sendText(message.from, "↩️ Más de Resistencias históricas de los pueblos indígenas: \n*4* Sobrevivientes victoriosos \n*5 📍Ishtana resiste*")
        await client.sendText(message.from, "↖️ Ir a Caminos de SaNaciones: \n*6* Disposición al diálogo \n*7* Territorios \n*8* 📍Resistencias históricas de los pueblos indígenas \n*9* La fuerza de lo colectivo \n*10* Naciones \n*11* Arte y sanación")
        await client.sendText(message.from, "🛖 Inicio:\n*12* ¿Qué es SaNaciones?\n*13* 📍Caminos de la exposición\n*14* Participa de la exposición\n *15* Plataforma virtual")  
      }
      else if(message.content === '3'){
        await client.sendText(message.from, "*Video*")
        await client.sendFile(message.from, './assets/audio/awa.mp3', '', '');
        await client.sendText(message.from, "👇🏽 🔢 \n\n⤵️Continúa con Ishtana resiste: \n*1* Video 📺 = 2.2MB \n*2* Audio 🔈 = 3.4MB \n*3* Mapa 🗺️ = 2.2MB")
        await client.sendText(message.from, "↩️ Más de Resistencias históricas de los pueblos indígenas: \n*4* Sobrevivientes victoriosos \n*5 📍Ishtana resiste*")
        await client.sendText(message.from, "↖️ Ir a Caminos de SaNaciones: \n*6* Disposición al diálogo \n*7* Territorios \n*8* 📍Resistencias históricas de los pueblos indígenas \n*9* La fuerza de lo colectivo \n*10* Naciones \n*11* Arte y sanación")
        await client.sendText(message.from, "🛖 Inicio:\n*12* ¿Qué es SaNaciones?\n*13* 📍Caminos de la exposición\n*14* Participa de la exposición\n *15* Plataforma virtual")  
      }
      else if(message.content === '4'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'sobrevivientes'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, "Sobrevivientes victoriosos En 1905, la empresa del peruano Julio César Arana adquirió 19 centros de extracción de caucho en los ríos Caquetá y Putumayo, cuyo acopio principal era la Casa Arana, en La Chorrera, a orillas del río Igará Paraná. La esclavización, los asesinatos, las torturas y el uso desmedido de la mano de obra local por más de 20 años cobraron la vida de más de 40 mil indígenas, casi el 60% de la población nativa de la región. Hoy los pueblos Uitoto MɨNɨKa, Ɨvuuhza (Okaina), Pɨɨnenicína (Bora) y Gaigoomɨjɨ (Muinane) de La Chorrera abandonan la condición de víctimas para renombrarse ellos mismos como sobrevivientes victoriosos.")  
        await client.sendText(message.from, "👇🏽 🔢 \n\n⤵️\n*1* La SaNación\n*2* Campamentos, Violencias, Confrontación, Resignificar la Casa Arana 📺 = 3.4MB")  
        await client.sendText(message.from, "↔️ Continua en Resistencias históricas de los pueblos indígenas:\n*3* Ishtana resiste")  
        await client.sendText(message.from, "↩️ Más de Caminos de SaNaciones:\n*4* Disposición al diálogo\n*5* Territorios\n*6* 📍Resistencias históricas de los pueblos indígenas\n*7* La fuerza de lo colectivo\n*8* Naciones\n*9* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*10* ¿Qué es SaNaciones?\n*11* 📍Caminos de la exposición\n*12* Participa de la exposición\n *13* Plataforma virtual")  
      }
      else if(message.content === '5'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'disposicion'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, "*Disposición al diálogo* \nLa palabra sin acción es vacía, la acción sin palabra es ciega, la palabra y la acción por fuera del espíritu de la comunidad son la muerte -Pensamiento Nasa.\n\nEl diálogo permite construir la memoria histórica y es un camino para sanar.")  
        await client.sendText(message.from, "Esta exposición es el resultado de un diálogo entre el Museo de Memoria de Colombia y los pueblos indígenas que participaron.")  
        await client.sendText(message.from, "Estar dispuestos a dialogar nos permite transformar imaginarios sobre los otros y reconocer que a pesar de nuestras diferencias podemos convivir y aprender de los demás. Para esto necesitamos crear acuerdos basados en el respeto, la tolerancia y la defensa de la vida. El diálogo es un pilar fundamental en la cosmogonía de los pueblos indígenas. Está presente en todos los ámbitos de la vida y es esencial en sus procesos de sanación.")  
        await client.sendText(message.from, "Los pueblos indígenas nos saludan e invitan al diálogo: 👇🏽 🔢\n ⤵️ \n\n*1* Saludos de pueblos indigenas 🌄 = 1.4MB\n*2* Mapa de los pueblos indigenas 🗺️ = 2MB")  
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*3 📍Disposición al diálogo* \n*4* Territorios \n*5* Resistencias históricas de los pueblos indígenas \n*6* La fuerza de lo colectivo \n*7* Naciones \n*8* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*9* ¿Qué es SaNaciones? \n*10* 📍Caminos de la exposición \n*11*  Participa de la exposición\n *12* Plataforma virtual")  
      }
      else if(message.content === '6'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'Territorios'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, "*Territorios* \nPara los pueblos indígenas, el territorio representa la madre que da vida. Es un espacio espiritual que conecta con lo sagrado y permite ver las huellas que ha dejado el conflicto armado.")  
        await client.sendText(message.from, "En este camino verás y escucharás los lugares que habitan los pueblos indígenas. También conocerás obras de arte que reflexionan sobre el significado de estos territorios para sus comunidades. 👇🏽 🔢 \n⤵️ \n*1* Vivir y resistir como semillas \n*2* Tierras \n*3* Pueblo Wiwa 📺 + 🔈 = 3.4MB")  
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*4* Disposición al diálogo \n*5 📍Territorios* \n*6* Resistencias históricas de los pueblos indígenas \n*7* La fuerza de lo colectivo \n*8* Naciones \n*9* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*10* ¿Qué es SaNaciones? \n*11* 📍Caminos de la exposición \n*12*  Participa de la exposición\n *13* Plataforma virtual")  
      }
      else if(message.content === '7'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'resistencias'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, '*Resistencias históricas de los pueblos indígenas* \nLos pueblos indígenas y sus territorios han sido afectados desde hace siglos por distintos tipos de violencia. Algunas de ellas continúan todavía. En este camino encontrarás las memorias del pueblo Barí, del Catatumbo, y de los pueblos Uitoto Mnka, vhuuza (Okaina), Gaigoomj (Muinane) y Pnenicína (Bora), esencia del tabaco, la coca y la yuca dulce de La Chorrera, en Amazonas. Estos pueblos por poco fueron exterminados, pero hoy anhelan que no se repita y que puedan tejer una nueva historia. Para poder sanar, reinterpretan su memoria desde la palabra de vida, conocimiento y resistencia.');
        await client.sendText(message.from, '👇🏽 🔢 ⤵️\n*1* Sobrevivientes victoriosos \n*2* Ishtana resiste');
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*3 📍Disposición al diálogo* \n*4* Territorios \n*5* Resistencias históricas de los pueblos indígenas \n*6* La fuerza de lo colectivo \n*7* Naciones \n*8* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*9* ¿Qué es SaNaciones? \n*10* 📍Caminos de la exposición \n*11*  Participa de la exposición\n *12* Plataforma virtual")  
      }
      else if(message.content === '8'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'fuerza'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, '*La fuerza de lo colectivo* \nLos logros organizativos de los pueblos indígenas parten de las luchas y experiencias políticas de sus mayores. La defensa del territorio y el conocimiento espiritual se han transmitido de generación en generación. En este camino, los líderes y comunidades han entendido que unidos son más fuertes para enfrentar la violencia de actores armados legales e ilegales.');
        await client.sendText(message.from, 'En este camino verás cómo el pueblo Nasa, en el norte del Cauca, y el pueblo Awá, en Nariño, Putumayo y territorio ecuatoriano, han creado estrategias desde lo colectivo para resistir.');
        await client.sendText(message.from, '👇🏽 🔢 \n⤵️ \n*1* ¡Viva la guardia, viva la minga! \n*2* Rastrear la memoria');
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*3 📍Disposición al diálogo* \n*4* Territorios \n*5* Resistencias históricas de los pueblos indígenas \n*6* La fuerza de lo colectivo \n*7* Naciones \n*8* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*9* ¿Qué es SaNaciones? \n*10* 📍Caminos de la exposición \n*11*  Participa de la exposición\n *12* Plataforma virtual")  
      }
      else if(message.content === '9'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'naciones'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, '*Naciones* La Constitución de 1991 reconoce que hacemos parte de un país que reúne diferentes pueblos con identidades particulares, territorios definidos y derecho a la autodeterminación. Sin embargo, para los pueblos étnicos, la multiculturalidad es una realidad inacabada, pues aún luchan por la defensa de sus derechos, autonomía y soberanía. \nPara los pueblos indígenas la idea de nación recoge el territorio como ser vivo e implica la convivencia armónica entre la naturaleza y los seres humanos, pero también involucra la cosmovisión, la autonomía y la autodeterminación.');
        await client.sendText(message.from, '*Naciones Indigenas* Son proyectos de vida de algunos pueblos indígenas que habitan en Colombia, quienes nos llaman a interactuar y convivir con nuestras diferencias.');
        await client.sendText(message.from, '*1* Bari 🌄 = 1.2MB\n*2* Nasa 🌄 + 🔈 = 2.2MB\n*3* Awá 🌄 = 1.2MB\n*4* Pasto 📺 = 5.2MB\n*5* Kamantsa 📺 = 12.2MB');
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*6 📍Disposición al diálogo* \n*7* Territorios \n*8* Resistencias históricas de los pueblos indígenas \n*9* La fuerza de lo colectivo \n*10* Naciones \n*11* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*12* ¿Qué es SaNaciones? \n*13* 📍Caminos de la exposición \n*14*  Participa de la exposición\n *15* Plataforma virtual")  
        
      }
      else if(message.content === '10'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'Info_artista'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, '*Arte y sanación* En 2020, el Museo de Memoria de Colombia invitó a varios artistas a intervenir recibos de servicio público y periódicos con obras que reflexionaran sobre la sanación.');
        await client.sendText(message.from, "*1* Rafael Posso 🌄 + 🔈 = 1.4MB \n*2* Dayro Carrasquilla 🌄 + 🔈 = 2.2MB \n*3* Eusebio Siosi 🌄 + 🔈 = 4.6MB \n*4* Enosh Arias 🌄 + 🔈 = 2.2MB \n*5* Juana Alicia 🌄 + 🔈 = 1.8MB \n*6* Álvaro Barrios 🌄 + 🔈 = 2.1MB \n*7* Alexandra Gelis 🌄 + 🔈 = 2.2MB \n*8* Nohemí Pérez 🌄 + 🔈 = 4.6MB")  
        await client.sendText(message.from, "↩️ Más de Caminos de SaNaciones: \n*9* Disposición al diálogo \n*10* Territorios \n*11* Resistencias históricas de los pueblos indígenas \n*12* La fuerza de lo colectivo \n*13* Naciones \n*14 📍Arte y sanación*")  
        await client.sendText(message.from, "🛖 Inicio:\n*15* ¿Qué es SaNaciones? \n*16* 📍Caminos de la exposición \n*17*  Participa de la exposición\n *18* Plataforma virtual")   
      }
      else if(message.content === '11'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'Info'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, '*SaNaciones: diálogos de la memoria* es una exposición que invita a comprender el territorio como víctima y a reconocer las violencias que han sufrido las comunidades étnicas desde hace siglos. También exalta su capacidad organizativa y cuestiona el lugar que han ocupado en nuestra nación. Esta exposición fue construida de manera participativa y colectiva *con diez comunidades indígenas víctimas del conflicto armado.*' );
        await client.sendText(message.from, 'Te mencioné que SaNaciones es una una exposición *MULTIPLATAFORMA, TRANSMEDIA e ITINERANTE*, esto quiere decir que tiene varias plataformas físicas y virtuales: 🖥️ una curaduría en la página web del Museo, 🎒 una maleta con material didáctico, 🚚 una unidad móvil que recorrerá varios territorios con actividades artísticas, culturales y pedagógicas, y 🤖 este bot de WhatsApp.');
        await client.sendText(message.from, '👇🏽 🔢 ↔️ Más de SaNaciones:\n*1* Caminos de la exposición\n*2* Participa de la exposición\n *3* Plataforma virtual');
      }
      else if(message.content === '12'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'caminos'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, "En SaNaciones tenemos seis  caminos  para entender  las violencias que han sufrido los pueblos indígenas, las formas en quer las han enfrentado y tramitado.")
        await client.sendText(message.from, '👇🏽 🔢 ⤵️ \n\n*1* Disposición al diálogo\n*2* Territorios\n*3* Resistencias históricas de los pueblos indígenas\n*4* La fuerza de lo colectivo\n*5* Naciones\n*6* Arte y sanación');
        await client.sendText(message.from, '🛖 Inicio:\n*7* ¿Qué es SaNaciones?\n*8* 📍Caminos de la exposición\n*9* Participa de la exposición\n *10* Plataforma virtual');
      }
      else if(message.content === '13'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'participa'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, 'Entre todos creamos el mapa de la SaNación! Ya somos 123 participantes! \n Tu opinión será totalmente anónima. \n ¿Cómo sanar las heridas del conflicto armado? Cuéntanos qué piensas con un texto.');
        await client.sendText(message.from, 'Consulte los términos y condiciones  Mapa de SaNaciones en el sitio web www.museodememoria.gov.co/sanaciones');
        await client.sendText(message.from, '¿Quieres participar? \n*1* Sí, quiero participar.\n*2* No, quiero volver.');
      }
      else if (message.content === '14')
      {
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'plataforma'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, 'Otra de las plataformas en la q que desarrollamos la Exposición de SaNaciones es la plataforma web., donde podrás complementar los contenidos de cada uno de los caminos de la exposición. Vas a encontrar contenidos más extensos y diferentes elementos multimedia.');
        await client.sendText(message.from, '⚠️ Te recuerdo que es una página externa y el consumo de los datos en tu celular puede ser alta. Si no puedes hacerlo ahora, te recomiendo la visites cuando tu celular esté conectado a una red WI-FI para que puedas el resto de contenido que está genial.');
        await client.sendText(message.from, 'SaNaciones: diálogos de la memoria \nhttps://museodelamemoria.gov.co/sanaciones');
        await client.sendText(message.from, "👇🏽 🔢 ↔️ O si prefieres continuar conversando de la exposición: \n*1* ¿Qué es SaNaciones? \n*2* Caminos de la exposición \n*3* Participa en el mapa de SaNaciones")  
        
      } 
      else{
        await client.sendText(message.from, "*Ishtana resiste* \nIshtana, en la lengua barí ara, es la palabra que define nuestro territorio, el cual, ancestralmente, se extendía desde la Serranía del Perijá hasta los Andes venezolanos. Esto marcó el carácter binacional de nuestro pueblo, cuyos integrantes vivimos tanto en Colombia como en Venezuela. La defensa de l tierra del pueblo Barí responde a la alarmante reducción del territorio y la superposición con otras figuras territoriales como las campesinas y los parques naturales.")  
        await client.sendText(message.from, "👇🏽 🔢\n\n ⤵️ \n*1* Video 📺 = 2.2MB \n*2* Audio 🔈 = 3.4MB \n*3* Mapa 🗺️ = 2.2MB")
        await client.sendText(message.from, "↔️ Continua en Resistencias históricas de los pueblos indígenas: \n*4* Sobrevivientes victoriosos")
        await client.sendText(message.from, "↩️ Más de Caminos de SaNaciones: \n*5* Disposición al diálogo \n*6* Territorios \n*7* 📍Resistencias históricas de los pueblos indígenas \n*8* La fuerza de lo colectivo \n*9* Naciones \n*10* Arte y sanación")
        await client.sendText(message.from, "🛖 Inicio:\n*11* ¿Qué es SaNaciones?\n*12* 📍Caminos de la exposición\n*13* Participa de la exposición\n *14* Plataforma virtual")
        }
    }

    else if (r.data.state === 'caminos'){
      if(message.content === '1'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'disposicion'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, "*Disposición al diálogo* \nLa palabra sin acción es vacía, la acción sin palabra es ciega, la palabra y la acción por fuera del espíritu de la comunidad son la muerte -Pensamiento Nasa.\n\nEl diálogo permite construir la memoria histórica y es un camino para sanar.")  
        await client.sendText(message.from, "Esta exposición es el resultado de un diálogo entre el Museo de Memoria de Colombia y los pueblos indígenas que participaron.")  
        await client.sendText(message.from, "Estar dispuestos a dialogar nos permite transformar imaginarios sobre los otros y reconocer que a pesar de nuestras diferencias podemos convivir y aprender de los demás. Para esto necesitamos crear acuerdos basados en el respeto, la tolerancia y la defensa de la vida. El diálogo es un pilar fundamental en la cosmogonía de los pueblos indígenas. Está presente en todos los ámbitos de la vida y es esencial en sus procesos de sanación.")  
        await client.sendText(message.from, "Los pueblos indígenas nos saludan e invitan al diálogo: 👇🏽 🔢\n ⤵️ \n\n*1* Saludos de pueblos indigenas 🌄 = 1.4MB\n*2* Mapa de los pueblos indigenas 🗺️ = 2MB")  
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*3 📍Disposición al diálogo* \n*4* Territorios \n*5* Resistencias históricas de los pueblos indígenas \n*6* La fuerza de lo colectivo \n*7* Naciones \n*8* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*9* ¿Qué es SaNaciones? \n*10* 📍Caminos de la exposición \n*11*  Participa de la exposición\n *12* Plataforma virtual")  
      }
      else if(message.content === '2'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'Territorios'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, "*Territorios* \nPara los pueblos indígenas, el territorio representa la madre que da vida. Es un espacio espiritual que conecta con lo sagrado y permite ver las huellas que ha dejado el conflicto armado.")  
        await client.sendText(message.from, "En este camino verás y escucharás los lugares que habitan los pueblos indígenas. También conocerás obras de arte que reflexionan sobre el significado de estos territorios para sus comunidades. 👇🏽 🔢 \n⤵️ \n*1* Vivir y resistir como semillas \n*2* Tierras \n*3* Pueblo Wiwa 📺 + 🔈 = 3.4MB")  
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*4* Disposición al diálogo \n*5 📍Territorios* \n*6* Resistencias históricas de los pueblos indígenas \n*7* La fuerza de lo colectivo \n*8* Naciones \n*9* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*10* ¿Qué es SaNaciones? \n*11* 📍Caminos de la exposición \n*12*  Participa de la exposición\n *13* Plataforma virtual")  
      }
      else if (message.content === '3'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'resistencias'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, '*Resistencias históricas de los pueblos indígenas* \nLos pueblos indígenas y sus territorios han sido afectados desde hace siglos por distintos tipos de violencia. Algunas de ellas continúan todavía. En este camino encontrarás las memorias del pueblo Barí, del Catatumbo, y de los pueblos Uitoto Mnka, vhuuza (Okaina), Gaigoomj (Muinane) y Pnenicína (Bora), esencia del tabaco, la coca y la yuca dulce de La Chorrera, en Amazonas. Estos pueblos por poco fueron exterminados, pero hoy anhelan que no se repita y que puedan tejer una nueva historia. Para poder sanar, reinterpretan su memoria desde la palabra de vida, conocimiento y resistencia.');
        await client.sendText(message.from, '👇🏽 🔢 ⤵️\n*1* Sobrevivientes victoriosos \n*2* Ishtana resiste');
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*3 📍Disposición al diálogo* \n*4* Territorios \n*5* Resistencias históricas de los pueblos indígenas \n*6* La fuerza de lo colectivo \n*7* Naciones \n*8* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*9* ¿Qué es SaNaciones? \n*10* 📍Caminos de la exposición \n*11*  Participa de la exposición\n *12* Plataforma virtual")  
      
      }
      else if (message.content === '4'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'fuerza'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, '*La fuerza de lo colectivo* \nLos logros organizativos de los pueblos indígenas parten de las luchas y experiencias políticas de sus mayores. La defensa del territorio y el conocimiento espiritual se han transmitido de generación en generación. En este camino, los líderes y comunidades han entendido que unidos son más fuertes para enfrentar la violencia de actores armados legales e ilegales.');
        await client.sendText(message.from, 'En este camino verás cómo el pueblo Nasa, en el norte del Cauca, y el pueblo Awá, en Nariño, Putumayo y territorio ecuatoriano, han creado estrategias desde lo colectivo para resistir.');
        await client.sendText(message.from, '👇🏽 🔢 \n⤵️ \n*1* ¡Viva la guardia, viva la minga! \n*2* Rastrear la memoria');
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*3 📍Disposición al diálogo* \n*4* Territorios \n*5* Resistencias históricas de los pueblos indígenas \n*6* La fuerza de lo colectivo \n*7* Naciones \n*8* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*9* ¿Qué es SaNaciones? \n*10* 📍Caminos de la exposición \n*11*  Participa de la exposición\n *12* Plataforma virtual")  
      }
      else if (message.content === '5'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'naciones'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, '*Naciones* La Constitución de 1991 reconoce que hacemos parte de un país que reúne diferentes pueblos con identidades particulares, territorios definidos y derecho a la autodeterminación. Sin embargo, para los pueblos étnicos, la multiculturalidad es una realidad inacabada, pues aún luchan por la defensa de sus derechos, autonomía y soberanía. \nPara los pueblos indígenas la idea de nación recoge el territorio como ser vivo e implica la convivencia armónica entre la naturaleza y los seres humanos, pero también involucra la cosmovisión, la autonomía y la autodeterminación.');
        await client.sendText(message.from, '*Naciones Indigenas* Son proyectos de vida de algunos pueblos indígenas que habitan en Colombia, quienes nos llaman a interactuar y convivir con nuestras diferencias.');
        await client.sendText(message.from, '*1* Bari 🌄 = 1.2MB\n*2* Nasa 🌄 + 🔈 = 2.2MB\n*3* Awá 🌄 = 1.2MB\n*4* Pasto 📺 = 5.2MB\n*5* Kamantsa 📺 = 12.2MB');
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*6 📍Disposición al diálogo* \n*7* Territorios \n*8* Resistencias históricas de los pueblos indígenas \n*9* La fuerza de lo colectivo \n*10* Naciones \n*11* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*12* ¿Qué es SaNaciones? \n*13* 📍Caminos de la exposición \n*14*  Participa de la exposición\n *15* Plataforma virtual")  
        
      
      }
      else if(message.content === '6'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'Info_artista'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, '*Arte y sanación* En 2020, el Museo de Memoria de Colombia invitó a varios artistas a intervenir recibos de servicio público y periódicos con obras que reflexionaran sobre la sanación.');
        await client.sendText(message.from, "*1* Rafael Posso 🌄 + 🔈 = 1.4MB \n*2* Dayro Carrasquilla 🌄 + 🔈 = 2.2MB \n*3* Eusebio Siosi 🌄 + 🔈 = 4.6MB \n*4* Enosh Arias 🌄 + 🔈 = 2.2MB \n*5* Juana Alicia 🌄 + 🔈 = 1.8MB \n*6* Álvaro Barrios 🌄 + 🔈 = 2.1MB \n*7* Alexandra Gelis 🌄 + 🔈 = 2.2MB \n*8* Nohemí Pérez 🌄 + 🔈 = 4.6MB")  
        await client.sendText(message.from, "↩️ Más de Caminos de SaNaciones: \n*9* Disposición al diálogo \n*10* Territorios \n*11* Resistencias históricas de los pueblos indígenas \n*12* La fuerza de lo colectivo \n*13* Naciones \n*14 📍Arte y sanación*")  
        await client.sendText(message.from, "🛖 Inicio:\n*15* ¿Qué es SaNaciones? \n*16* 📍Caminos de la exposición \n*17*  Participa de la exposición\n *18* Plataforma virtual")   
      }
      else if(message.content === '7'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'Info'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, '*SaNaciones: diálogos de la memoria* es una exposición que invita a comprender el territorio como víctima y a reconocer las violencias que han sufrido las comunidades étnicas desde hace siglos. También exalta su capacidad organizativa y cuestiona el lugar que han ocupado en nuestra nación. Esta exposición fue construida de manera participativa y colectiva *con diez comunidades indígenas víctimas del conflicto armado.*' );
        await client.sendText(message.from, 'Te mencioné que SaNaciones es una una exposición *MULTIPLATAFORMA, TRANSMEDIA e ITINERANTE*, esto quiere decir que tiene varias plataformas físicas y virtuales: 🖥️ una curaduría en la página web del Museo, 🎒 una maleta con material didáctico, 🚚 una unidad móvil que recorrerá varios territorios con actividades artísticas, culturales y pedagógicas, y 🤖 este bot de WhatsApp.');
        await client.sendText(message.from, '👇🏽 🔢 ↔️ Más de SaNaciones:\n*1* Caminos de la exposición\n*2* Participa de la exposición\n *3* Plataforma virtual');
      }
      else if(message.content === '8'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'caminos'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, "En SaNaciones tenemos seis  caminos  para entender  las violencias que han sufrido los pueblos indígenas, las formas en quer las han enfrentado y tramitado.")
        await client.sendText(message.from, '👇🏽 🔢 ⤵️ \n\n*1* Disposición al diálogo\n*2* Territorios\n*3* Resistencias históricas de los pueblos indígenas\n*4* La fuerza de lo colectivo\n*5* Naciones\n*6* Arte y sanación');
        await client.sendText(message.from, '🛖 Inicio:\n*7* ¿Qué es SaNaciones?\n*8* 📍Caminos de la exposición\n*9* Participa de la exposición\n *10* Plataforma virtual');
      }
      else if(message.content === '9'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'participa'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, 'Entre todos creamos el mapa de la SaNación! Ya somos 123 participantes! \n Tu opinión será totalmente anónima. \n ¿Cómo sanar las heridas del conflicto armado? Cuéntanos qué piensas con un texto.');
        await client.sendText(message.from, 'Consulte los términos y condiciones  Mapa de SaNaciones en el sitio web www.museodememoria.gov.co/sanaciones');
        await client.sendText(message.from, '¿Quieres participar? \n*1* Sí, quiero participar.\n*2* No, quiero volver.');
      }
      else if (message.content === '10')
      {
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'plataforma'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, 'Otra de las plataformas en la q que desarrollamos la Exposición de SaNaciones es la plataforma web., donde podrás complementar los contenidos de cada uno de los caminos de la exposición. Vas a encontrar contenidos más extensos y diferentes elementos multimedia.');
        await client.sendText(message.from, '⚠️ Te recuerdo que es una página externa y el consumo de los datos en tu celular puede ser alta. Si no puedes hacerlo ahora, te recomiendo la visites cuando tu celular esté conectado a una red WI-FI para que puedas el resto de contenido que está genial.');
        await client.sendText(message.from, 'SaNaciones: diálogos de la memoria \nhttps://museodelamemoria.gov.co/sanaciones');
        await client.sendText(message.from, "👇🏽 🔢 ↔️ O si prefieres continuar conversando de la exposición: \n*1* ¿Qué es SaNaciones? \n*2* Caminos de la exposición \n*3* Participa en el mapa de SaNaciones")  
        
      } 
      else{
        await client.sendText(message.from, "En SaNaciones tenemos seis  caminos  para entender  las violencias que han sufrido los pueblos indígenas, las formas en quer las han enfrentado y tramitado.")
        await client.sendText(message.from, '👇🏽 🔢 ⤵️ \n\n*1* Disposición al diálogo\n*2* Territorios\n*3* Resistencias históricas de los pueblos indígenas\n*4* La fuerza de lo colectivo\n*5* Naciones\n*6* Arte y sanación');
        await client.sendText(message.from, '🛖 Inicio:\n*7* ¿Qué es SaNaciones?\n*8* 📍Caminos de la exposición\n*9* Participa de la exposición\n *10* Plataforma virtual');
        }
    }

    else if (r.data.state === 'naciones'){

      if(message.content === '1'){
        await client.sendText(message.from, '*Nación Barí*\n Comunidad Brubucanina, Resguardo Motilón Barí. Catatumbo, Norte de Santander');
        await client.sendFile(message.from, './assets/caminos/Naciones/Nacion_Bari.jpg', '', '');
        await client.sendText(message.from, '*1* Bari 🌄 = 1.2MB\n*2* Nasa 🌄 + 🔈 = 2.2MB\n*3* Awá 🌄 = 1.2MB\n*4* Pasto 📺 = 5.2MB\n*5* Kamantsa 📺 = 12.2MB');
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*6 📍Disposición al diálogo* \n*7* Territorios \n*8* Resistencias históricas de los pueblos indígenas \n*9* La fuerza de lo colectivo \n*10* Naciones \n*11* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*12* ¿Qué es SaNaciones? \n*13* 📍Caminos de la exposición \n*14*  Participa de la exposición\n *15* Plataforma virtual")  
      }
      else if(message.content === '2'){
        await client.sendText(message.from, '*Nación Nasa*\n Paisaje Cauca\n Floresmiro Noscue Coordinador de la Guardia Indígena, Pueblo Nasa');
        await client.sendFile(message.from, './assets/caminos/Naciones/Nacion_Nasa.jpg', '', '');
        await client.sendFile(message.from, './assets/caminos/Naciones/Nasa.mp3', '', '');
        await client.sendText(message.from, '*1* Bari 🌄 = 1.2MB\n*2* Nasa 🌄 + 🔈 = 2.2MB\n*3* Awá 🌄 = 1.2MB\n*4* Pasto 📺 = 5.2MB\n*5* Kamantsa 📺 = 12.2MB');
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*6 📍Disposición al diálogo* \n*7* Territorios \n*8* Resistencias históricas de los pueblos indígenas \n*9* La fuerza de lo colectivo \n*10* Naciones \n*11* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*12* ¿Qué es SaNaciones? \n*13* 📍Caminos de la exposición \n*14*  Participa de la exposición\n *15* Plataforma virtual")  
      }
      else if(message.content === '3'){
        await client.sendText(message.from, '*Nación Awá*\n Resguardo el Gran Sábalo, municipio de Barbacoas, Nariño');
        await client.sendFile(message.from, './assets/caminos/Naciones/Nacion_Awa.jpg', '', '');
        await client.sendText(message.from, '*1* Bari 🌄 = 1.2MB\n*2* Nasa 🌄 + 🔈 = 2.2MB\n*3* Awá 🌄 = 1.2MB\n*4* Pasto 📺 = 5.2MB\n*5* Kamantsa 📺 = 12.2MB');
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*6 📍Disposición al diálogo* \n*7* Territorios \n*8* Resistencias históricas de los pueblos indígenas \n*9* La fuerza de lo colectivo \n*10* Naciones \n*11* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*12* ¿Qué es SaNaciones? \n*13* 📍Caminos de la exposición \n*14*  Participa de la exposición\n *15* Plataforma virtual")  
      }
      else if(message.content === '4'){
        await client.sendText(message.from, '*Nación Pasto*\n Güel, resguardo de Cumbal, Nariño');
        await client.sendFile(message.from, './assets/caminos/Naciones/Nacion_Pasto.jpg', '', '');
        await client.sendText(message.from, '*1* Bari 🌄 = 1.2MB\n*2* Nasa 🌄 + 🔈 = 2.2MB\n*3* Awá 🌄 = 1.2MB\n*4* Pasto 📺 = 5.2MB\n*5* Kamantsa 📺 = 12.2MB');
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*6 📍Disposición al diálogo* \n*7* Territorios \n*8* Resistencias históricas de los pueblos indígenas \n*9* La fuerza de lo colectivo \n*10* Naciones \n*11* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*12* ¿Qué es SaNaciones? \n*13* 📍Caminos de la exposición \n*14*  Participa de la exposición\n *15* Plataforma virtual")  
      }
      /*
      else if(message.content === '5'){
        await client.sendText(message.from, '*Nación Awá*\n Resguardo el Gran Sábalo, municipio de Barbacoas, Nariño');
        await client.sendFile(message.from, './assets/caminos/Naciones/Nacion_Nasa.jpg', '', '');
        await client.sendFile(message.from, './assets/caminos/Naciones/Nasa.mp3', '', '');
        await client.sendText(message.from, '*1* Bari 🌄 = 1.2MB\n*2* Nasa 🌄 + 🔈 = 2.2MB\n*3* Awá 🌄 = 1.2MB\n*4* Pasto 📺 = 5.2MB\n*5* Kamantsa 📺 = 12.2MB');
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*6 📍Disposición al diálogo* \n*7* Territorios \n*8* Resistencias históricas de los pueblos indígenas \n*9* La fuerza de lo colectivo \n*10* Naciones \n*11* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*12* ¿Qué es SaNaciones? \n*13* 📍Caminos de la exposición \n*14*  Participa de la exposición\n *15* Plataforma virtual")  
      }
      */
      else if(message.content === '5'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'disposicion'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, "*Disposición al diálogo* \nLa palabra sin acción es vacía, la acción sin palabra es ciega, la palabra y la acción por fuera del espíritu de la comunidad son la muerte -Pensamiento Nasa.\n\nEl diálogo permite construir la memoria histórica y es un camino para sanar.")  
        await client.sendText(message.from, "Esta exposición es el resultado de un diálogo entre el Museo de Memoria de Colombia y los pueblos indígenas que participaron.")  
        await client.sendText(message.from, "Estar dispuestos a dialogar nos permite transformar imaginarios sobre los otros y reconocer que a pesar de nuestras diferencias podemos convivir y aprender de los demás. Para esto necesitamos crear acuerdos basados en el respeto, la tolerancia y la defensa de la vida. El diálogo es un pilar fundamental en la cosmogonía de los pueblos indígenas. Está presente en todos los ámbitos de la vida y es esencial en sus procesos de sanación.")  
        await client.sendText(message.from, "Los pueblos indígenas nos saludan e invitan al diálogo: 👇🏽 🔢\n ⤵️ \n\n*1* Saludos de pueblos indigenas 🌄 = 1.4MB\n*2* Mapa de los pueblos indigenas 🗺️ = 2MB")  
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*3 📍Disposición al diálogo* \n*4* Territorios \n*5* Resistencias históricas de los pueblos indígenas \n*6* La fuerza de lo colectivo \n*7* Naciones \n*8* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*9* ¿Qué es SaNaciones? \n*10* 📍Caminos de la exposición \n*11*  Participa de la exposición\n *12* Plataforma virtual")  
      }
      else if(message.content === '7'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'territorios'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, "*Territorios* \nPara los pueblos indígenas, el territorio representa la madre que da vida. Es un espacio espiritual que conecta con lo sagrado y permite ver las huellas que ha dejado el conflicto armado.")  
        await client.sendText(message.from, "En este camino verás y escucharás los lugares que habitan los pueblos indígenas. También conocerás obras de arte que reflexionan sobre el significado de estos territorios para sus comunidades. 👇🏽 🔢 \n⤵️ \n*1* Vivir y resistir como semillas \n*2* Tierras \n*3* Pueblo Wiwa 📺 + 🔈 = 3.4MB")  
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*4* Disposición al diálogo \n*5 📍Territorios* \n*6* Resistencias históricas de los pueblos indígenas \n*7* La fuerza de lo colectivo \n*8* Naciones \n*9* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*10* ¿Qué es SaNaciones? \n*11* 📍Caminos de la exposición \n*12*  Participa de la exposición\n *13* Plataforma virtual")  
      }
      else if(message.content === '8'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'resistencias'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, '*Resistencias históricas de los pueblos indígenas* \nLos pueblos indígenas y sus territorios han sido afectados desde hace siglos por distintos tipos de violencia. Algunas de ellas continúan todavía. En este camino encontrarás las memorias del pueblo Barí, del Catatumbo, y de los pueblos Uitoto Mnka, vhuuza (Okaina), Gaigoomj (Muinane) y Pnenicína (Bora), esencia del tabaco, la coca y la yuca dulce de La Chorrera, en Amazonas. Estos pueblos por poco fueron exterminados, pero hoy anhelan que no se repita y que puedan tejer una nueva historia. Para poder sanar, reinterpretan su memoria desde la palabra de vida, conocimiento y resistencia.');
        await client.sendText(message.from, '👇🏽 🔢 ⤵️\n*1* Sobrevivientes victoriosos \n*2* Ishtana resiste');
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*3 📍Disposición al diálogo* \n*4* Territorios \n*5* Resistencias históricas de los pueblos indígenas \n*6* La fuerza de lo colectivo \n*7* Naciones \n*8* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*9* ¿Qué es SaNaciones? \n*10* 📍Caminos de la exposición \n*11*  Participa de la exposición\n *12* Plataforma virtual")  
      }
      else if(message.content === '9'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'fuerza'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, '*La fuerza de lo colectivo* \nLos logros organizativos de los pueblos indígenas parten de las luchas y experiencias políticas de sus mayores. La defensa del territorio y el conocimiento espiritual se han transmitido de generación en generación. En este camino, los líderes y comunidades han entendido que unidos son más fuertes para enfrentar la violencia de actores armados legales e ilegales.');
        await client.sendText(message.from, 'En este camino verás cómo el pueblo Nasa, en el norte del Cauca, y el pueblo Awá, en Nariño, Putumayo y territorio ecuatoriano, han creado estrategias desde lo colectivo para resistir.');
        await client.sendText(message.from, '👇🏽 🔢 \n⤵️ \n*1* ¡Viva la guardia, viva la minga! \n*2* Rastrear la memoria');
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*3 📍Disposición al diálogo* \n*4* Territorios \n*5* Resistencias históricas de los pueblos indígenas \n*6* La fuerza de lo colectivo \n*7* Naciones \n*8* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*9* ¿Qué es SaNaciones? \n*10* 📍Caminos de la exposición \n*11*  Participa de la exposición\n *12* Plataforma virtual")  
      }
      else if(message.content === '10'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'naciones'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, '*Naciones* La Constitución de 1991 reconoce que hacemos parte de un país que reúne diferentes pueblos con identidades particulares, territorios definidos y derecho a la autodeterminación. Sin embargo, para los pueblos étnicos, la multiculturalidad es una realidad inacabada, pues aún luchan por la defensa de sus derechos, autonomía y soberanía. \nPara los pueblos indígenas la idea de nación recoge el territorio como ser vivo e implica la convivencia armónica entre la naturaleza y los seres humanos, pero también involucra la cosmovisión, la autonomía y la autodeterminación.');
        await client.sendText(message.from, '*Naciones Indigenas* Son proyectos de vida de algunos pueblos indígenas que habitan en Colombia, quienes nos llaman a interactuar y convivir con nuestras diferencias.');
        await client.sendText(message.from, '*1* Bari 🌄 = 1.2MB\n*2* Nasa 🌄 + 🔈 = 2.2MB\n*3* Awá 🌄 = 1.2MB\n*4* Pasto 📺 = 5.2MB\n*5* Kamantsa 📺 = 12.2MB');
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*6 📍Disposición al diálogo* \n*7* Territorios \n*8* Resistencias históricas de los pueblos indígenas \n*9* La fuerza de lo colectivo \n*10* Naciones \n*11* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*12* ¿Qué es SaNaciones? \n*13* 📍Caminos de la exposición \n*14*  Participa de la exposición\n *15* Plataforma virtual")  
        
        
      }
      else if(message.content === '11'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'Info_artista'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, '*Arte y sanación* En 2020, el Museo de Memoria de Colombia invitó a varios artistas a intervenir recibos de servicio público y periódicos con obras que reflexionaran sobre la sanación.');
        await client.sendText(message.from, "*1* Rafael Posso 🌄 + 🔈 = 1.4MB \n*2* Dayro Carrasquilla 🌄 + 🔈 = 2.2MB \n*3* Eusebio Siosi 🌄 + 🔈 = 4.6MB \n*4* Enosh Arias 🌄 + 🔈 = 2.2MB \n*5* Juana Alicia 🌄 + 🔈 = 1.8MB \n*6* Álvaro Barrios 🌄 + 🔈 = 2.1MB \n*7* Alexandra Gelis 🌄 + 🔈 = 2.2MB \n*8* Nohemí Pérez 🌄 + 🔈 = 4.6MB")  
        await client.sendText(message.from, "↩️ Más de Caminos de SaNaciones: \n*9* Disposición al diálogo \n*10* Territorios \n*11* Resistencias históricas de los pueblos indígenas \n*12* La fuerza de lo colectivo \n*13* Naciones \n*14 📍Arte y sanación*")  
        await client.sendText(message.from, "🛖 Inicio:\n*15* ¿Qué es SaNaciones? \n*16* 📍Caminos de la exposición \n*17*  Participa de la exposición\n *18* Plataforma virtual")   
        
      }
      else if(message.content === '12'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'Info'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, '*SaNaciones: diálogos de la memoria* es una exposición que invita a comprender el territorio como víctima y a reconocer las violencias que han sufrido las comunidades étnicas desde hace siglos. También exalta su capacidad organizativa y cuestiona el lugar que han ocupado en nuestra nación. Esta exposición fue construida de manera participativa y colectiva *con siete comunidades indígenas víctimas del conflicto armado.*' );
        await client.sendText(message.from, 'Te mencioné que SaNaciones es una una exposición *MULTIPLATAFORMA, TRANSMEDIA e ITINERANTE*, esto quiere decir que tiene varias plataformas físicas y virtuales: 🖥️ una curaduría en la página web del Museo, 🎒 una maleta con material didáctico, 🚚 una unidad móvil que recorrerá varios territorios con actividades artísticas, culturales y pedagógicas, y 🤖 este bot de WhatsApp.');
        await client.sendText(message.from, '👇🏽 🔢 ↔️ Más de SaNaciones:\n*1* Caminos de la exposición\n*2* Participa de la exposición\n *3* Plataforma virtual');
      }
      else if(message.content === '13'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'caminos'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, "En SaNaciones tenemos seis  caminos  para entender  las violencias que han sufrido los pueblos indígenas, las formas en quer las han enfrentado y tramitado.")
        await client.sendText(message.from, '👇🏽 🔢 ⤵️ \n\n*1* Disposición al diálogo\n*2* Territorios\n*3* Resistencias históricas de los pueblos indígenas\n*4* La fuerza de lo colectivo\n*5* Naciones\n*6* Arte y sanación');
        await client.sendText(message.from, '🛖 Inicio:\n*7* ¿Qué es SaNaciones?\n*8* 📍Caminos de la exposición\n*9* Participa de la exposición\n *10* Plataforma virtual');
      }
      else if(message.content === '14'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'participa'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, 'Entre todos creamos el mapa de la SaNación! Ya somos 123 participantes! \n Tu opinión será totalmente anónima. \n ¿Cómo sanar las heridas del conflicto armado? Cuéntanos qué piensas con un texto.');
        await client.sendText(message.from, 'Consulte los términos y condiciones  Mapa de SaNaciones en el sitio web www.museodememoria.gov.co/sanaciones');
        await client.sendText(message.from, '¿Quieres participar? \n*1* Sí, quiero participar.\n*2* No, quiero volver.');
      }
      else if (message.content === '15')
      {
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'plataforma'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, 'Otra de las plataformas en la q que desarrollamos la Exposición de SaNaciones es la plataforma web., donde podrás complementar los contenidos de cada uno de los caminos de la exposición. Vas a encontrar contenidos más extensos y diferentes elementos multimedia.');
        await client.sendText(message.from, '⚠️ Te recuerdo que es una página externa y el consumo de los datos en tu celular puede ser alta. Si no puedes hacerlo ahora, te recomiendo la visites cuando tu celular esté conectado a una red WI-FI para que puedas el resto de contenido que está genial.');
        await client.sendText(message.from, 'SaNaciones: diálogos de la memoria \nhttps://museodelamemoria.gov.co/sanaciones');
        await client.sendText(message.from, "👇🏽 🔢 ↔️ O si prefieres continuar conversando de la exposición: \n*1* ¿Qué es SaNaciones? \n*2* Caminos de la exposición \n*3* Participa en el mapa de SaNaciones")  
        
      } 
      else{
        await client.sendText(message.from, '*1* Bari 🌄 = 1.2MB\n*2* Nasa 🌄 + 🔈 = 2.2MB\n*3* Awá 🌄 = 1.2MB\n*4* Pasto 📺 = 5.2MB\n*5* Kamantsa 📺 = 12.2MB');
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*6 📍Disposición al diálogo* \n*7* Territorios \n*8* Resistencias históricas de los pueblos indígenas \n*9* La fuerza de lo colectivo \n*10* Naciones \n*11* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*12* ¿Qué es SaNaciones? \n*13* 📍Caminos de la exposición \n*14*  Participa de la exposición\n *15* Plataforma virtual")  
        }
    }
/*
    else if (r.data.state === 'pueblos'){
      if (message.content === 'A'){
        await client.sendFile(message.from, './assets/audio/awa.mp3', '', '');
        await client.sendText(message.from, "*A. Galería de tres pueblos*\n\n*2 Atrás*\n*3 Volver al inicio*")
      }
      else if(message.content === '2'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'naciones'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, "Naciones\n\n*1. Naciones Indígenas*\n\n*2 Atrás*\n*3 Volver al inicio*")
      }
      else if(message.content === '3'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: ''}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, 'Ahora para continuar lee el menu de cada sección, escribe y envíame solo el número de la opción que más te interese; por ejemplo: 3 👇🏽 🔢\n *1* ¿Qué es SaNaciones?\n *2* Caminos de la exposición\n *3* Participa de la exposición');
      }
      else
      {
        await client.sendText(message.from, "*¡Viva la guardia, viva la minga!*\nLa guardia indígena del pueblo Nasa protege el territorio, la vida, el principio de autonomía y la participación activa en la defensa de los derechos humanos.\nLa minga es una práctica ancestral que sigue vigente en la actualidad. Viene del sentir comunitario que busca el bienestar de todos. Significa unidad, conocimiento y transmisión de valores. La minga es tejer entre todos.\nLas mingas las hacemos para defender la vida y proteger el territorio. La minga es trueque, reciprocidad, compartir, repartir. Es dar lo que nosotros tenemos. ")
        await client.sendText(message.from, "👇🏽 🔢\n\n ⤵️ \n*1* La SaNación 📺 = 2.2MB\n*2* La guardia indígena 📺 = 3.4MB\n*3* Hilo de las mujeres 📺 = 2.2MB")
        await client.sendText(message.from, "↔️ Continua en La fuerza de lo colectivo:\n*4* Rastrear la memoria")
        await client.sendText(message.from, "↩️ Más de Caminos de SaNaciones: \n*5* Disposición al diálogo\n*6* Territorios\n*7* Resistencias históricas de los pueblos indígenas\n*8* 📍La fuerza de lo colectivo\n*9* Naciones\n*10* Arte y sanación")
        await client.sendText(message.from, "🛖 Inicio:\n*11* ¿Qué es SaNaciones? \n*12* 📍Caminos de la exposición \n*13* Participa de la exposición")
        //await client.sendText(message.from, "*1. ¡Viva la guardia, viva la minga!*\n\nA. Video SaNación\n\nB. Video guardia indígena\n\nC. Video hilo de las mujeres\n\n*2 Atrás*\n*3 Volver al inicio*")
        }
    }
*/
    else if (r.data.state === 'fuerza'){
      if(message.content === '1'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'viva'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, "*¡Viva la guardia, viva la minga!*\nLa guardia indígena del pueblo Nasa protege el territorio, la vida, el principio de autonomía y la participación activa en la defensa de los derechos humanos.\nLa minga es una práctica ancestral que sigue vigente en la actualidad. Viene del sentir comunitario que busca el bienestar de todos. Significa unidad, conocimiento y transmisión de valores. La minga es tejer entre todos.\nLas mingas las hacemos para defender la vida y proteger el territorio. La minga es trueque, reciprocidad, compartir, repartir. Es dar lo que nosotros tenemos. ")
        await client.sendText(message.from, "👇🏽 🔢\n\n ⤵️ \n*1* La SaNación 📺 = 2.2MB\n*2* La guardia indígena 📺 = 3.4MB\n*3* Hilo de las mujeres 📺 = 2.2MB")
        await client.sendText(message.from, "↔️ Continua en La fuerza de lo colectivo:\n*4* Rastrear la memoria")
        await client.sendText(message.from, "↩️ Más de Caminos de SaNaciones: \n*5* Disposición al diálogo\n*6* Territorios\n*7* Resistencias históricas de los pueblos indígenas\n*8* 📍La fuerza de lo colectivo\n*9* Naciones\n*10* Arte y sanación")
        await client.sendText(message.from, "🛖 Inicio:\n*11* ¿Qué es SaNaciones? \n*12* 📍Caminos de la exposición \n*13* Participa de la exposición\n *14* Plataforma virtual")
        //await client.sendText(message.from, "*1. ¡Viva la guardia, viva la minga!*\n\nA. Video SaNación\n\nB. Video guardia indígena\n\nC. Video hilo de las mujeres\n\n*2 Atrás*\n*3 Volver al inicio*")
      }
      else if(message.content === '2'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'rastrear'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, "Rastrear la memoria El territorio del pueblo Awá ha sido afectado desde la colonia española hasta la actualidad. Esto ha provocado constantes desplazamientos que les impiden vivir en armonía con la naturaleza. Desde los años 80, líderes de este pueblo en Colombia y Ecuador gestaron la idea de crear la Gran Familia Awá Binacional. Es una estrategia política y cultural para mejorar la calidad de vida, reconocer la identidad propia y garantizar sus derechos dentro y fuera del territorio. Esta unión les ha permitido luchar contra el riesgo de extinción de su lengua, medicina tradicional, cosmovisión y territorio, causado por grupos armados, narcotráfico y proyectos extractivos. La Gran Familia Awá Binacional tiene cuatro organizaciones entre Nariño, Putumayo y Ecuador.")
        await client.sendText(message.from, "👇🏽 🔢 \n\n⤵️ \n*1* El territorio 🌄 + 📺 = 2.2MB \n*2* El conflicto 📺 = 3.4MB \n*3* Las mujeres 📺 = 4.8MB")
        await client.sendText(message.from, "↔️ Continua en La fuerza de lo colectivo: \n*4* ¡Viva la guardia, viva la minga!")
        await client.sendText(message.from, "↩️ Más de Caminos de SaNaciones: \n*5* Disposición al diálogo \n*6* Territorios \n*7* Resistencias históricas de los pueblos indígenas \n*8* 📍La fuerza de lo colectivo \n*9* Naciones \n*10* Arte y sanación")
        await client.sendText(message.from, "🛖 Inicio:\n*11* ¿Qué es SaNaciones? \n*12* 📍Caminos de la exposición \n*13* Participa de la exposició\n *14* Plataforma virtual")
        //await client.sendText(message.from, "*2. Rastrear la memoria:*\n\nA. Foto imágen temática territorio\n\nB. Video temática conflicto\n\nC. Imágen + audio temática mujeres\n\n*3 Atrás*\n*4 Volver al inicio*")
      }
      else if(message.content === '3'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'disposicion'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, "*Disposición al diálogo* \nLa palabra sin acción es vacía, la acción sin palabra es ciega, la palabra y la acción por fuera del espíritu de la comunidad son la muerte -Pensamiento Nasa.\n\nEl diálogo permite construir la memoria histórica y es un camino para sanar.")  
        await client.sendText(message.from, "Esta exposición es el resultado de un diálogo entre el Museo de Memoria de Colombia y los pueblos indígenas que participaron.")  
        await client.sendText(message.from, "Estar dispuestos a dialogar nos permite transformar imaginarios sobre los otros y reconocer que a pesar de nuestras diferencias podemos convivir y aprender de los demás. Para esto necesitamos crear acuerdos basados en el respeto, la tolerancia y la defensa de la vida. El diálogo es un pilar fundamental en la cosmogonía de los pueblos indígenas. Está presente en todos los ámbitos de la vida y es esencial en sus procesos de sanación.")  
        await client.sendText(message.from, "Los pueblos indígenas nos saludan e invitan al diálogo: 👇🏽 🔢\n ⤵️ \n\n*1* Saludos de pueblos indigenas 🌄 = 1.4MB\n*2* Mapa de los pueblos indigenas 🗺️ = 2MB")  
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*3 📍Disposición al diálogo* \n*4* Territorios \n*5* Resistencias históricas de los pueblos indígenas \n*6* La fuerza de lo colectivo \n*7* Naciones \n*8* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*9* ¿Qué es SaNaciones? \n*10* 📍Caminos de la exposición \n*11*  Participa de la exposición\n *12* Plataforma virtual")  
      }
      else if(message.content === '4'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'Territorios'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, "*Territorios* \nPara los pueblos indígenas, el territorio representa la madre que da vida. Es un espacio espiritual que conecta con lo sagrado y permite ver las huellas que ha dejado el conflicto armado.")  
        await client.sendText(message.from, "En este camino verás y escucharás los lugares que habitan los pueblos indígenas. También conocerás obras de arte que reflexionan sobre el significado de estos territorios para sus comunidades. 👇🏽 🔢 \n⤵️ \n*1* Vivir y resistir como semillas \n*2* Tierras \n*3* Pueblo Wiwa 📺 + 🔈 = 3.4MB")  
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*4* Disposición al diálogo \n*5 📍Territorios* \n*6* Resistencias históricas de los pueblos indígenas \n*7* La fuerza de lo colectivo \n*8* Naciones \n*9* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*10* ¿Qué es SaNaciones? \n*11* 📍Caminos de la exposición \n*12*  Participa de la exposición\n *13* Plataforma virtual")  
      }
      else if(message.content === '5'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'resisitencias'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, 'Ahora para continuar lee el menu de cada sección, escribe y envíame solo el número de la opción que más te interese; por ejemplo: 3 👇🏽 🔢\n *1* ¿Qué es SaNaciones?\n *2* Caminos de la exposición\n *3* Participa de la exposición');
      }
      else if(message.content === '6'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'fuerza'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, '*La fuerza de lo colectivo* \nLos logros organizativos de los pueblos indígenas parten de las luchas y experiencias políticas de sus mayores. La defensa del territorio y el conocimiento espiritual se han transmitido de generación en generación. En este camino, los líderes y comunidades han entendido que unidos son más fuertes para enfrentar la violencia de actores armados legales e ilegales.');
        await client.sendText(message.from, 'En este camino verás cómo el pueblo Nasa, en el norte del Cauca, y el pueblo Awá, en Nariño, Putumayo y territorio ecuatoriano, han creado estrategias desde lo colectivo para resistir.');
        await client.sendText(message.from, '👇🏽 🔢 \n⤵️ \n*1* ¡Viva la guardia, viva la minga! \n*2* Rastrear la memoria');
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*3 📍Disposición al diálogo* \n*4* Territorios \n*5* Resistencias históricas de los pueblos indígenas \n*6* La fuerza de lo colectivo \n*7* Naciones \n*8* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*9* ¿Qué es SaNaciones? \n*10* 📍Caminos de la exposición \n*11*  Participa de la exposición\n *12* Plataforma virtual")  
      }
      else if(message.content === '7'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'naciones'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, '*Naciones* La Constitución de 1991 reconoce que hacemos parte de un país que reúne diferentes pueblos con identidades particulares, territorios definidos y derecho a la autodeterminación. Sin embargo, para los pueblos étnicos, la multiculturalidad es una realidad inacabada, pues aún luchan por la defensa de sus derechos, autonomía y soberanía. \nPara los pueblos indígenas la idea de nación recoge el territorio como ser vivo e implica la convivencia armónica entre la naturaleza y los seres humanos, pero también involucra la cosmovisión, la autonomía y la autodeterminación.');
        await client.sendText(message.from, '*Naciones Indigenas* Son proyectos de vida de algunos pueblos indígenas que habitan en Colombia, quienes nos llaman a interactuar y convivir con nuestras diferencias.');
        await client.sendFile(message.from, './assets/audio/awa.mp3', '', '');
        await client.sendFile(message.from, './assets/audio/awa.mp3', '', '');
        await client.sendFile(message.from, './assets/audio/awa.mp3', '', '');
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*1 📍Disposición al diálogo* \n*2* Territorios \n*3* Resistencias históricas de los pueblos indígenas \n*4* La fuerza de lo colectivo \n*5* Naciones \n*6* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*7* ¿Qué es SaNaciones? \n*8* 📍Caminos de la exposición \n*9*  Participa de la exposición\n *10* Plataforma virtual")  
        await client.sendText(message.from, '');
      }
      else if(message.content === '8'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'Info_artista'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, '*Arte y sanación* En 2020, el Museo de Memoria de Colombia invitó a varios artistas a intervenir recibos de servicio público y periódicos con obras que reflexionaran sobre la sanación.');
        await client.sendText(message.from, "*1* Rafael Posso 🌄 + 🔈 = 1.4MB \n*2* Dayro Carrasquilla 🌄 + 🔈 = 2.2MB \n*3* Eusebio Siosi 🌄 + 🔈 = 4.6MB \n*4* Enosh Arias 🌄 + 🔈 = 2.2MB \n*5* Juana Alicia 🌄 + 🔈 = 1.8MB \n*6* Álvaro Barrios 🌄 + 🔈 = 2.1MB \n*7* Alexandra Gelis 🌄 + 🔈 = 2.2MB \n*8* Nohemí Pérez 🌄 + 🔈 = 4.6MB")  
        await client.sendText(message.from, "↩️ Más de Caminos de SaNaciones: \n*9* Disposición al diálogo \n*10* Territorios \n*11* Resistencias históricas de los pueblos indígenas \n*12* La fuerza de lo colectivo \n*13* Naciones \n*14 📍Arte y sanación*")  
        await client.sendText(message.from, "🛖 Inicio:\n*15* ¿Qué es SaNaciones? \n*16* 📍Caminos de la exposición \n*17*  Participa de la exposición\n *18* Plataforma virtual")   
      }
      else if(message.content === '9'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'Info'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, '*SaNaciones: diálogos de la memoria* es una exposición que invita a comprender el territorio como víctima y a reconocer las violencias que han sufrido las comunidades étnicas desde hace siglos. También exalta su capacidad organizativa y cuestiona el lugar que han ocupado en nuestra nación. Esta exposición fue construida de manera participativa y colectiva *con diez comunidades indígenas víctimas del conflicto armado.*' );
        await client.sendText(message.from, 'Te mencioné que SaNaciones es una una exposición *MULTIPLATAFORMA, TRANSMEDIA e ITINERANTE*, esto quiere decir que tiene varias plataformas físicas y virtuales: 🖥️ una curaduría en la página web del Museo, 🎒 una maleta con material didáctico, 🚚 una unidad móvil que recorrerá varios territorios con actividades artísticas, culturales y pedagógicas, y 🤖 este bot de WhatsApp.');
        await client.sendText(message.from, '👇🏽 🔢 ↔️ Más de SaNaciones:\n*1* Caminos de la exposición\n*2* Participa de la exposición\n *3* Plataforma virtual');
      }
      else if(message.content === '10'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'caminos'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, "En SaNaciones tenemos seis  caminos  para entender  las violencias que han sufrido los pueblos indígenas, las formas en quer las han enfrentado y tramitado.")
        await client.sendText(message.from, '👇🏽 🔢 ⤵️ \n\n*1* Disposición al diálogo\n*2* Territorios\n*3* Resistencias históricas de los pueblos indígenas\n*4* La fuerza de lo colectivo\n*5* Naciones\n*6* Arte y sanación');
        await client.sendText(message.from, '🛖 Inicio:\n*7* ¿Qué es SaNaciones?\n*8* 📍Caminos de la exposición\n*9* Participa de la exposición\n *10* Plataforma virtual');
      }
      else if(message.content === '11'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'participa'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, 'Entre todos creamos el mapa de la SaNación! Ya somos 123 participantes! \n Tu opinión será totalmente anónima. \n ¿Cómo sanar las heridas del conflicto armado? Cuéntanos qué piensas con un texto.');
        await client.sendText(message.from, 'Consulte los términos y condiciones  Mapa de SaNaciones en el sitio web www.museodememoria.gov.co/sanaciones');
        await client.sendText(message.from, '¿Quieres participar? \n*1* Sí, quiero participar.\n*2* No, quiero volver.');
      }
      else if (message.content === '12')
      {
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'plataforma'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, 'Otra de las plataformas en la q que desarrollamos la Exposición de SaNaciones es la plataforma web., donde podrás complementar los contenidos de cada uno de los caminos de la exposición. Vas a encontrar contenidos más extensos y diferentes elementos multimedia.');
        await client.sendText(message.from, '⚠️ Te recuerdo que es una página externa y el consumo de los datos en tu celular puede ser alta. Si no puedes hacerlo ahora, te recomiendo la visites cuando tu celular esté conectado a una red WI-FI para que puedas el resto de contenido que está genial.');
        await client.sendText(message.from, 'SaNaciones: diálogos de la memoria \nhttps://museodelamemoria.gov.co/sanaciones');
        await client.sendText(message.from, "👇🏽 🔢 ↔️ O si prefieres continuar conversando de la exposición: \n*1* ¿Qué es SaNaciones? \n*2* Caminos de la exposición \n*3* Participa en el mapa de SaNaciones")  
        
      } 
      else{
        await client.sendText(message.from, '*La fuerza de lo colectivo* \nLos logros organizativos de los pueblos indígenas parten de las luchas y experiencias políticas de sus mayores. La defensa del territorio y el conocimiento espiritual se han transmitido de generación en generación. En este camino, los líderes y comunidades han entendido que unidos son más fuertes para enfrentar la violencia de actores armados legales e ilegales.');
        await client.sendText(message.from, 'En este camino verás cómo el pueblo Nasa, en el norte del Cauca, y el pueblo Awá, en Nariño, Putumayo y territorio ecuatoriano, han creado estrategias desde lo colectivo para resistir.');
        await client.sendText(message.from, '👇🏽 🔢 \n⤵️ \n*1* ¡Viva la guardia, viva la minga! \n*2* Rastrear la memoria');
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*3 📍Disposición al diálogo* \n*4* Territorios \n*5* Resistencias históricas de los pueblos indígenas \n*6* La fuerza de lo colectivo \n*7* Naciones \n*8* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*9* ¿Qué es SaNaciones? \n*10* 📍Caminos de la exposición \n*11*  Participa de la exposición\n *12* Plataforma virtual")  
        }
    }
    else if (r.data.state === 'viva'){
      if (message.content === '1'){
        https://youtu.be/-n-f9KRgmbo

        await client.sendText(message.from, "👇🏽 Continúa con Viva la guardia 🔢\n\n ⤵️ \n*1* La SaNación 📺 = 2.2MB\n*2* La guardia indígena 📺 = 3.4MB\n*3* Hilo de las mujeres 📺 = 2.2MB")
        await client.sendText(message.from, "↔️ Continua en La fuerza de lo colectivo:\n*4* Rastrear la memoria")
        await client.sendText(message.from, "↩️ Más de Caminos de SaNaciones: \n*5* Disposición al diálogo\n*6* Territorios\n*7* Resistencias históricas de los pueblos indígenas\n*8* 📍La fuerza de lo colectivo\n*9* Naciones\n*10* Arte y sanación")
        await client.sendText(message.from, "🛖 Inicio:\n*11* ¿Qué es SaNaciones? \n*12* 📍Caminos de la exposición \n*13* Participa de la exposición\n *14* Plataforma virtual")
      }
      else if (message.content === '2'){
        await client.sendFile(message.from, './assets/audio/awa.mp3', '', '');
        await client.sendText(message.from, "👇🏽 Continúa con Viva la guardia 🔢\n\n ⤵️ \n*1* La SaNación 📺 = 2.2MB\n*2* La guardia indígena 📺 = 3.4MB\n*3* Hilo de las mujeres 📺 = 2.2MB")
        await client.sendText(message.from, "↔️ Continua en La fuerza de lo colectivo:\n*4* Rastrear la memoria")
        await client.sendText(message.from, "↩️ Más de Caminos de SaNaciones: \n*5* Disposición al diálogo\n*6* Territorios\n*7* Resistencias históricas de los pueblos indígenas\n*8* 📍La fuerza de lo colectivo\n*9* Naciones\n*10* Arte y sanación")
        await client.sendText(message.from, "🛖 Inicio:\n*11* ¿Qué es SaNaciones? \n*12* 📍Caminos de la exposición \n*13* Participa de la exposición\n *14* Plataforma virtual")
      }
      else if (message.content === '3'){
        await client.sendFile(message.from, './assets/audio/awa.mp3', '', '');
        await client.sendText(message.from, "👇🏽 Continúa con Viva la guardia 🔢\n\n ⤵️ \n*1* La SaNación 📺 = 2.2MB\n*2* La guardia indígena 📺 = 3.4MB\n*3* Hilo de las mujeres 📺 = 2.2MB")
        await client.sendText(message.from, "↔️ Continua en La fuerza de lo colectivo:\n*4* Rastrear la memoria")
        await client.sendText(message.from, "↩️ Más de Caminos de SaNaciones: \n*5* Disposición al diálogo\n*6* Territorios\n*7* Resistencias históricas de los pueblos indígenas\n*8* 📍La fuerza de lo colectivo\n*9* Naciones\n*10* Arte y sanación")
        await client.sendText(message.from, "🛖 Inicio:\n*11* ¿Qué es SaNaciones? \n*12* 📍Caminos de la exposición \n*13* Participa de la exposición\n *14* Plataforma virtual")
      }
      else if(message.content === '4'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'rastrear'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, "Rastrear la memoria El territorio del pueblo Awá ha sido afectado desde la colonia española hasta la actualidad. Esto ha provocado constantes desplazamientos que les impiden vivir en armonía con la naturaleza. Desde los años 80, líderes de este pueblo en Colombia y Ecuador gestaron la idea de crear la Gran Familia Awá Binacional. Es una estrategia política y cultural para mejorar la calidad de vida, reconocer la identidad propia y garantizar sus derechos dentro y fuera del territorio. Esta unión les ha permitido luchar contra el riesgo de extinción de su lengua, medicina tradicional, cosmovisión y territorio, causado por grupos armados, narcotráfico y proyectos extractivos. La Gran Familia Awá Binacional tiene cuatro organizaciones entre Nariño, Putumayo y Ecuador.")
        await client.sendText(message.from, "👇🏽 🔢 \n\n⤵️ \n*1* El territorio 🌄 + 📺 = 2.2MB \n*2* El conflicto 📺 = 3.4MB \n*3* Las mujeres 📺 = 4.8MB")
        await client.sendText(message.from, "↔️ Continua en La fuerza de lo colectivo: \n*4* ¡Viva la guardia, viva la minga!")
        await client.sendText(message.from, "↩️ Más de Caminos de SaNaciones: \n*5* Disposición al diálogo \n*6* Territorios \n*7* Resistencias históricas de los pueblos indígenas \n*8* 📍La fuerza de lo colectivo \n*9* Naciones \n*10* Arte y sanación")
        await client.sendText(message.from, "🛖 Inicio:\n*11* ¿Qué es SaNaciones? \n*12* 📍Caminos de la exposición \n*13* Participa de la exposición\n *14* Plataforma virtual")
      }
      else if(message.content === '5'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'disposicion'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, "*Disposición al diálogo* \nLa palabra sin acción es vacía, la acción sin palabra es ciega, la palabra y la acción por fuera del espíritu de la comunidad son la muerte -Pensamiento Nasa.\n\nEl diálogo permite construir la memoria histórica y es un camino para sanar.")  
        await client.sendText(message.from, "Esta exposición es el resultado de un diálogo entre el Museo de Memoria de Colombia y los pueblos indígenas que participaron.")  
        await client.sendText(message.from, "Estar dispuestos a dialogar nos permite transformar imaginarios sobre los otros y reconocer que a pesar de nuestras diferencias podemos convivir y aprender de los demás. Para esto necesitamos crear acuerdos basados en el respeto, la tolerancia y la defensa de la vida. El diálogo es un pilar fundamental en la cosmogonía de los pueblos indígenas. Está presente en todos los ámbitos de la vida y es esencial en sus procesos de sanación.")  
        await client.sendText(message.from, "Los pueblos indígenas nos saludan e invitan al diálogo: 👇🏽 🔢\n ⤵️ \n\n*1* Saludos de pueblos indigenas 🌄 = 1.4MB\n*2* Mapa de los pueblos indigenas 🗺️ = 2MB")  
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*3 📍Disposición al diálogo* \n*4* Territorios \n*5* Resistencias históricas de los pueblos indígenas \n*6* La fuerza de lo colectivo \n*7* Naciones \n*8* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*9* ¿Qué es SaNaciones? \n*10* 📍Caminos de la exposición \n*11*  Participa de la exposición\n *12* Plataforma virtual")  
      }
      else if(message.content === '6'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'Territorios'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, "*Territorios* \nPara los pueblos indígenas, el territorio representa la madre que da vida. Es un espacio espiritual que conecta con lo sagrado y permite ver las huellas que ha dejado el conflicto armado.")  
        await client.sendText(message.from, "En este camino verás y escucharás los lugares que habitan los pueblos indígenas. También conocerás obras de arte que reflexionan sobre el significado de estos territorios para sus comunidades. 👇🏽 🔢 \n⤵️ \n*1* Vivir y resistir como semillas \n*2* Tierras \n*3* Pueblo Wiwa 📺 + 🔈 = 3.4MB")  
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*4* Disposición al diálogo \n*5 📍Territorios* \n*6* Resistencias históricas de los pueblos indígenas \n*7* La fuerza de lo colectivo \n*8* Naciones \n*9* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*10* ¿Qué es SaNaciones? \n*11* 📍Caminos de la exposición \n*12*  Participa de la exposición\n *13* Plataforma virtual")  
      }
      else if(message.content === '7'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'resistencias'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, '*Resistencias históricas de los pueblos indígenas* \nLos pueblos indígenas y sus territorios han sido afectados desde hace siglos por distintos tipos de violencia. Algunas de ellas continúan todavía. En este camino encontrarás las memorias del pueblo Barí, del Catatumbo, y de los pueblos Uitoto Mnka, vhuuza (Okaina), Gaigoomj (Muinane) y Pnenicína (Bora), esencia del tabaco, la coca y la yuca dulce de La Chorrera, en Amazonas. Estos pueblos por poco fueron exterminados, pero hoy anhelan que no se repita y que puedan tejer una nueva historia. Para poder sanar, reinterpretan su memoria desde la palabra de vida, conocimiento y resistencia.');
        await client.sendText(message.from, '👇🏽 🔢 ⤵️\n*1* Sobrevivientes victoriosos \n*2* Ishtana resiste');
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*3 📍Disposición al diálogo* \n*4* Territorios \n*5* Resistencias históricas de los pueblos indígenas \n*6* La fuerza de lo colectivo \n*7* Naciones \n*8* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*9* ¿Qué es SaNaciones? \n*10* 📍Caminos de la exposición \n*11*  Participa de la exposición\n *12* Plataforma virtual")  
      }
      else if(message.content === '8'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'fuerza'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, '*La fuerza de lo colectivo* \nLos logros organizativos de los pueblos indígenas parten de las luchas y experiencias políticas de sus mayores. La defensa del territorio y el conocimiento espiritual se han transmitido de generación en generación. En este camino, los líderes y comunidades han entendido que unidos son más fuertes para enfrentar la violencia de actores armados legales e ilegales.');
        await client.sendText(message.from, 'En este camino verás cómo el pueblo Nasa, en el norte del Cauca, y el pueblo Awá, en Nariño, Putumayo y territorio ecuatoriano, han creado estrategias desde lo colectivo para resistir.');
        await client.sendText(message.from, '👇🏽 🔢 \n⤵️ \n*1* ¡Viva la guardia, viva la minga! \n*2* Rastrear la memoria');
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*3 📍Disposición al diálogo* \n*4* Territorios \n*5* Resistencias históricas de los pueblos indígenas \n*6* La fuerza de lo colectivo \n*7* Naciones \n*8* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*9* ¿Qué es SaNaciones? \n*10* 📍Caminos de la exposición \n*11*  Participa de la exposición\n *12* Plataforma virtual")  
      }
      else if(message.content === '9'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'naciones'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, '*Naciones* La Constitución de 1991 reconoce que hacemos parte de un país que reúne diferentes pueblos con identidades particulares, territorios definidos y derecho a la autodeterminación. Sin embargo, para los pueblos étnicos, la multiculturalidad es una realidad inacabada, pues aún luchan por la defensa de sus derechos, autonomía y soberanía. \nPara los pueblos indígenas la idea de nación recoge el territorio como ser vivo e implica la convivencia armónica entre la naturaleza y los seres humanos, pero también involucra la cosmovisión, la autonomía y la autodeterminación.');
        await client.sendText(message.from, '*Naciones Indigenas* Son proyectos de vida de algunos pueblos indígenas que habitan en Colombia, quienes nos llaman a interactuar y convivir con nuestras diferencias.');
        await client.sendFile(message.from, './assets/audio/awa.mp3', '', '');
        await client.sendFile(message.from, './assets/audio/awa.mp3', '', '');
        await client.sendFile(message.from, './assets/audio/awa.mp3', '', '');
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*1 📍Disposición al diálogo* \n*2* Territorios \n*3* Resistencias históricas de los pueblos indígenas \n*4* La fuerza de lo colectivo \n*5* Naciones \n*6* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*7* ¿Qué es SaNaciones? \n*8* 📍Caminos de la exposición \n*9*  Participa de la exposición\n *10* Plataforma virtual")  
        await client.sendText(message.from, '');
      }
      else if(message.content === '10'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'Info_artista'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, '*Arte y sanación* En 2020, el Museo de Memoria de Colombia invitó a varios artistas a intervenir recibos de servicio público y periódicos con obras que reflexionaran sobre la sanación.');
        await client.sendText(message.from, "*1* Rafael Posso 🌄 + 🔈 = 1.4MB \n*2* Dayro Carrasquilla 🌄 + 🔈 = 2.2MB \n*3* Eusebio Siosi 🌄 + 🔈 = 4.6MB \n*4* Enosh Arias 🌄 + 🔈 = 2.2MB \n*5* Juana Alicia 🌄 + 🔈 = 1.8MB \n*6* Álvaro Barrios 🌄 + 🔈 = 2.1MB \n*7* Alexandra Gelis 🌄 + 🔈 = 2.2MB \n*8* Nohemí Pérez 🌄 + 🔈 = 4.6MB")  
        await client.sendText(message.from, "↩️ Más de Caminos de SaNaciones: \n*9* Disposición al diálogo \n*10* Territorios \n*11* Resistencias históricas de los pueblos indígenas \n*12* La fuerza de lo colectivo \n*13* Naciones \n*14 📍Arte y sanación*")  
        await client.sendText(message.from, "🛖 Inicio:\n*15* ¿Qué es SaNaciones? \n*16* 📍Caminos de la exposición \n*17*  Participa de la exposición\n *18* Plataforma virtual")   
      }
      else if(message.content === '11'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'Info'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, '*SaNaciones: diálogos de la memoria* es una exposición que invita a comprender el territorio como víctima y a reconocer las violencias que han sufrido las comunidades étnicas desde hace siglos. También exalta su capacidad organizativa y cuestiona el lugar que han ocupado en nuestra nación. Esta exposición fue construida de manera participativa y colectiva *con diez comunidades indígenas víctimas del conflicto armado.*' );
        await client.sendText(message.from, 'Te mencioné que SaNaciones es una una exposición *MULTIPLATAFORMA, TRANSMEDIA e ITINERANTE*, esto quiere decir que tiene varias plataformas físicas y virtuales: 🖥️ una curaduría en la página web del Museo, 🎒 una maleta con material didáctico, 🚚 una unidad móvil que recorrerá varios territorios con actividades artísticas, culturales y pedagógicas, y 🤖 este bot de WhatsApp.');
        await client.sendText(message.from, '👇🏽 🔢 ↔️ Más de SaNaciones:\n*1* Caminos de la exposición\n*2* Participa de la exposición\n *3* Plataforma virtual');
      }
      else if(message.content === '12'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'caminos'}).catch(err=>{
        console.log(err)
      })  
        await client.sendText(message.from, "En SaNaciones tenemos seis  caminos  para entender  las violencias que han sufrido los pueblos indígenas, las formas en quer las han enfrentado y tramitado.")
        await client.sendText(message.from, '👇🏽 🔢 ⤵️ \n\n*1* Disposición al diálogo\n*2* Territorios\n*3* Resistencias históricas de los pueblos indígenas\n*4* La fuerza de lo colectivo\n*5* Naciones\n*6* Arte y sanación');
        await client.sendText(message.from, '🛖 Inicio:\n*7* ¿Qué es SaNaciones?\n*8* 📍Caminos de la exposición\n*9* Participa de la exposición\n *10* Plataforma virtual');
    }
    else if(message.content === '13'){
      await axios.post(apiUrl + "/update-status", {from: message.from, state: 'participa'}).catch(err=>{
      console.log(err)
    })  
    await client.sendText(message.from, 'Entre todos creamos el mapa de la SaNación! Ya somos 123 participantes! \n Tu opinión será totalmente anónima. \n ¿Cómo sanar las heridas del conflicto armado? Cuéntanos qué piensas con un texto.');
    await client.sendText(message.from, 'Consulte los términos y condiciones  Mapa de SaNaciones en el sitio web www.museodememoria.gov.co/sanaciones');
    await client.sendText(message.from, '¿Quieres participar? \n*1* Sí, quiero participar.\n*2* No, quiero volver.');
    }
    else if (message.content === '14')
      {
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'plataforma'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, 'Otra de las plataformas en la q que desarrollamos la Exposición de SaNaciones es la plataforma web., donde podrás complementar los contenidos de cada uno de los caminos de la exposición. Vas a encontrar contenidos más extensos y diferentes elementos multimedia.');
        await client.sendText(message.from, '⚠️ Te recuerdo que es una página externa y el consumo de los datos en tu celular puede ser alta. Si no puedes hacerlo ahora, te recomiendo la visites cuando tu celular esté conectado a una red WI-FI para que puedas el resto de contenido que está genial.');
        await client.sendText(message.from, 'SaNaciones: diálogos de la memoria \nhttps://museodelamemoria.gov.co/sanaciones');
        await client.sendText(message.from, "👇🏽 🔢 ↔️ O si prefieres continuar conversando de la exposición: \n*1* ¿Qué es SaNaciones? \n*2* Caminos de la exposición \n*3* Participa en el mapa de SaNaciones")  
        
      } 
    else{
        await client.sendText(message.from, "*¡Viva la guardia, viva la minga!*\nLa guardia indígena del pueblo Nasa protege el territorio, la vida, el principio de autonomía y la participación activa en la defensa de los derechos humanos.\nLa minga es una práctica ancestral que sigue vigente en la actualidad. Viene del sentir comunitario que busca el bienestar de todos. Significa unidad, conocimiento y transmisión de valores. La minga es tejer entre todos.\nLas mingas las hacemos para defender la vida y proteger el territorio. La minga es trueque, reciprocidad, compartir, repartir. Es dar lo que nosotros tenemos. ")
        await client.sendText(message.from, "👇🏽 🔢\n\n ⤵️ \n*1* La SaNación 📺 = 2.2MB\n*2* La guardia indígena 📺 = 3.4MB\n*3* Hilo de las mujeres 📺 = 2.2MB")
        await client.sendText(message.from, "↔️ Continua en La fuerza de lo colectivo:\n*4* Rastrear la memoria")
        await client.sendText(message.from, "↩️ Más de Caminos de SaNaciones: \n*5* Disposición al diálogo\n*6* Territorios\n*7* Resistencias históricas de los pueblos indígenas\n*8* 📍La fuerza de lo colectivo\n*9* Naciones\n*10* Arte y sanación")
        await client.sendText(message.from, "🛖 Inicio:\n*11* ¿Qué es SaNaciones? \n*12* 📍Caminos de la exposición \n*13* Participa de la exposición\n *14* Plataforma virtual")
        }
    }

    else if (r.data.state === 'rastrear'){
      if (message.content === '1'){
        await client.sendFile(message.from, './assets/caminos/Fuerza/Rastrear/territorio1.jpg', '', '');
        await client.sendFile(message.from, './assets/caminos/Fuerza/Rastrear/territorio2.jpg', '', '');
        //await client.sendFileFromUrl(message.from, './assets/caminos/Fuerza/Rastrear/territorio.mp4', '', '');
        await client.sendFileFromUrl(message.from, "https://youtu.be/mG1ZVGL5pVE", 'video.mp4', `teste`, null, null, true)
        .catch((err) => console.error(err))
        await client.sendText(message.from, "👇🏽 🔢 \n\nContinúa en Rastrear la memoria ⤵️ \n*1* El territorio 🌄 + 📺 = 2.2MB \n*2* El conflicto 📺 = 3.4MB \n*3* Las mujeres 📺 = 4.8MB")
        await client.sendText(message.from, "↔️ Continua en La fuerza de lo colectivo: \n*4* ¡Viva la guardia, viva la minga!")
        await client.sendText(message.from, "↩️ Más de Caminos de SaNaciones: \n*5* Disposición al diálogo \n*6* Territorios \n*7* Resistencias históricas de los pueblos indígenas \n*8* 📍La fuerza de lo colectivo \n*9* Naciones \n*10* Arte y sanación")
        await client.sendText(message.from, "🛖 Inicio:\n*11* ¿Qué es SaNaciones? \n*12* 📍Caminos de la exposición \n*13* Participa de la exposición\n *14* Plataforma virtual")
      }
      else if (message.content === '2'){
        await client.sendFileFromUrl(message.from, "https://youtu.be/6uYQZ2yY4A8", 'video.mp4', `teste`, null, null, true)
        await client.sendText(message.from, "👇🏽 🔢 \n\nContinúa en Rastrear la memoria ⤵️ \n*1* El territorio 🌄 + 📺 = 2.2MB \n*2* El conflicto 📺 = 3.4MB \n*3* Las mujeres 📺 = 4.8MB")
        await client.sendText(message.from, "↔️ Continua en La fuerza de lo colectivo: \n*4* ¡Viva la guardia, viva la minga!")
        await client.sendText(message.from, "↩️ Más de Caminos de SaNaciones: \n*5* Disposición al diálogo \n*6* Territorios \n*7* Resistencias históricas de los pueblos indígenas \n*8* 📍La fuerza de lo colectivo \n*9* Naciones \n*10* Arte y sanación")
        await client.sendText(message.from, "🛖 Inicio:\n*11* ¿Qué es SaNaciones? \n*12* 📍Caminos de la exposición \n*13* Participa de la exposición\n *14* Plataforma virtual")
      }
      else if (message.content === '3'){
        await client.sendFile(message.from, './assets/caminos/Fuerza/mujeres.jpg', '', '');
        await client.sendFileFromUrl(message.from, "https://youtu.be/FfvOCsB_18c", 'video.mp4', `teste`, null, null, true)
        await client.sendText(message.from, "👇🏽 🔢 \n\nContinúa en Rastrear la memoria ⤵️ \n*1* El territorio 🌄 + 📺 = 2.2MB \n*2* El conflicto 📺 = 3.4MB \n*3* Las mujeres 📺 = 4.8MB")
        await client.sendText(message.from, "↔️ Continua en La fuerza de lo colectivo: \n*4* ¡Viva la guardia, viva la minga!")
        await client.sendText(message.from, "↩️ Más de Caminos de SaNaciones: \n*5* Disposición al diálogo \n*6* Territorios \n*7* Resistencias históricas de los pueblos indígenas \n*8* 📍La fuerza de lo colectivo \n*9* Naciones \n*10* Arte y sanación")
        await client.sendText(message.from, "🛖 Inicio:\n*11* ¿Qué es SaNaciones? \n*12* 📍Caminos de la exposición \n*13* Participa de la exposición\n *14* Plataforma virtual")
      }
      else if(message.content === '4'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'Territorios'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, "*Territorios* \nPara los pueblos indígenas, el territorio representa la madre que da vida. Es un espacio espiritual que conecta con lo sagrado y permite ver las huellas que ha dejado el conflicto armado.")  
        await client.sendText(message.from, "En este camino verás y escucharás los lugares que habitan los pueblos indígenas. También conocerás obras de arte que reflexionan sobre el significado de estos territorios para sus comunidades. 👇🏽 🔢 \n⤵️ \n*1* Vivir y resistir como semillas \n*2* Tierras \n*3* Pueblo Wiwa 📺 + 🔈 = 3.4MB")  
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*4* Disposición al diálogo \n*5 📍Territorios* \n*6* Resistencias históricas de los pueblos indígenas \n*7* La fuerza de lo colectivo \n*8* Naciones \n*9* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*10* ¿Qué es SaNaciones? \n*11* 📍Caminos de la exposición \n*12*  Participa de la exposición\n *13* Plataforma virtual")  
      }
      else if(message.content === '5'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'disposicion'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, "*Disposición al diálogo* \nLa palabra sin acción es vacía, la acción sin palabra es ciega, la palabra y la acción por fuera del espíritu de la comunidad son la muerte -Pensamiento Nasa.\n\nEl diálogo permite construir la memoria histórica y es un camino para sanar.")  
        await client.sendText(message.from, "Esta exposición es el resultado de un diálogo entre el Museo de Memoria de Colombia y los pueblos indígenas que participaron.")  
        await client.sendText(message.from, "Estar dispuestos a dialogar nos permite transformar imaginarios sobre los otros y reconocer que a pesar de nuestras diferencias podemos convivir y aprender de los demás. Para esto necesitamos crear acuerdos basados en el respeto, la tolerancia y la defensa de la vida. El diálogo es un pilar fundamental en la cosmogonía de los pueblos indígenas. Está presente en todos los ámbitos de la vida y es esencial en sus procesos de sanación.")  
        await client.sendText(message.from, "Los pueblos indígenas nos saludan e invitan al diálogo: 👇🏽 🔢\n ⤵️ \n\n*1* Saludos de pueblos indigenas 🌄 = 1.4MB\n*2* Mapa de los pueblos indigenas 🗺️ = 2MB")  
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*3 📍Disposición al diálogo* \n*4* Territorios \n*5* Resistencias históricas de los pueblos indígenas \n*6* La fuerza de lo colectivo \n*7* Naciones \n*8* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*9* ¿Qué es SaNaciones? \n*10* 📍Caminos de la exposición \n*11*  Participa de la exposición\n *12* Plataforma virtual")  
      }
      else if(message.content === '6'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'Territorios'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, "*Territorios* \nPara los pueblos indígenas, el territorio representa la madre que da vida. Es un espacio espiritual que conecta con lo sagrado y permite ver las huellas que ha dejado el conflicto armado.")  
        await client.sendText(message.from, "En este camino verás y escucharás los lugares que habitan los pueblos indígenas. También conocerás obras de arte que reflexionan sobre el significado de estos territorios para sus comunidades. 👇🏽 🔢 \n⤵️ \n*1* Vivir y resistir como semillas \n*2* Tierras \n*3* Pueblo Wiwa 📺 + 🔈 = 3.4MB")  
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*4* Disposición al diálogo \n*5 📍Territorios* \n*6* Resistencias históricas de los pueblos indígenas \n*7* La fuerza de lo colectivo \n*8* Naciones \n*9* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*10* ¿Qué es SaNaciones? \n*11* 📍Caminos de la exposición \n*12*  Participa de la exposición\n *13* Plataforma virtual")  
      }
      else if(message.content === '7'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'resistencias'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, '*Resistencias históricas de los pueblos indígenas* \nLos pueblos indígenas y sus territorios han sido afectados desde hace siglos por distintos tipos de violencia. Algunas de ellas continúan todavía. En este camino encontrarás las memorias del pueblo Barí, del Catatumbo, y de los pueblos Uitoto Mnka, vhuuza (Okaina), Gaigoomj (Muinane) y Pnenicína (Bora), esencia del tabaco, la coca y la yuca dulce de La Chorrera, en Amazonas. Estos pueblos por poco fueron exterminados, pero hoy anhelan que no se repita y que puedan tejer una nueva historia. Para poder sanar, reinterpretan su memoria desde la palabra de vida, conocimiento y resistencia.');
        await client.sendText(message.from, '👇🏽 🔢 ⤵️\n*1* Sobrevivientes victoriosos \n*2* Ishtana resiste');
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*3 📍Disposición al diálogo* \n*4* Territorios \n*5* Resistencias históricas de los pueblos indígenas \n*6* La fuerza de lo colectivo \n*7* Naciones \n*8* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*9* ¿Qué es SaNaciones? \n*10* 📍Caminos de la exposición \n*11*  Participa de la exposición\n *12* Plataforma virtual")  
      }
      else if(message.content === '8'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'fuerza'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, '*La fuerza de lo colectivo* \nLos logros organizativos de los pueblos indígenas parten de las luchas y experiencias políticas de sus mayores. La defensa del territorio y el conocimiento espiritual se han transmitido de generación en generación. En este camino, los líderes y comunidades han entendido que unidos son más fuertes para enfrentar la violencia de actores armados legales e ilegales.');
        await client.sendText(message.from, 'En este camino verás cómo el pueblo Nasa, en el norte del Cauca, y el pueblo Awá, en Nariño, Putumayo y territorio ecuatoriano, han creado estrategias desde lo colectivo para resistir.');
        await client.sendText(message.from, '👇🏽 🔢 \n⤵️ \n*1* ¡Viva la guardia, viva la minga! \n*2* Rastrear la memoria');
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*3 📍Disposición al diálogo* \n*4* Territorios \n*5* Resistencias históricas de los pueblos indígenas \n*6* La fuerza de lo colectivo \n*7* Naciones \n*8* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*9* ¿Qué es SaNaciones? \n*10* 📍Caminos de la exposición \n*11*  Participa de la exposición\n *13* Plataforma virtual")  
      }
      else if(message.content === '9'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'naciones'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, '*Naciones* La Constitución de 1991 reconoce que hacemos parte de un país que reúne diferentes pueblos con identidades particulares, territorios definidos y derecho a la autodeterminación. Sin embargo, para los pueblos étnicos, la multiculturalidad es una realidad inacabada, pues aún luchan por la defensa de sus derechos, autonomía y soberanía. \nPara los pueblos indígenas la idea de nación recoge el territorio como ser vivo e implica la convivencia armónica entre la naturaleza y los seres humanos, pero también involucra la cosmovisión, la autonomía y la autodeterminación.');
        await client.sendText(message.from, '*Naciones Indigenas* Son proyectos de vida de algunos pueblos indígenas que habitan en Colombia, quienes nos llaman a interactuar y convivir con nuestras diferencias.');
        await client.sendFile(message.from, './assets/audio/awa.mp3', '', '');
        await client.sendFile(message.from, './assets/audio/awa.mp3', '', '');
        await client.sendFile(message.from, './assets/audio/awa.mp3', '', '');
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*1 📍Disposición al diálogo* \n*2* Territorios \n*3* Resistencias históricas de los pueblos indígenas \n*4* La fuerza de lo colectivo \n*5* Naciones \n*6* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*7* ¿Qué es SaNaciones? \n*8* 📍Caminos de la exposición \n*9*  Participa de la exposición\n *13* Plataforma virtual")  
        await client.sendText(message.from, '');
      }
      else if(message.content === '10'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'Info_artista'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, '*Arte y sanación* En 2020, el Museo de Memoria de Colombia invitó a varios artistas a intervenir recibos de servicio público y periódicos con obras que reflexionaran sobre la sanación.');
        await client.sendText(message.from, "*1* Rafael Posso 🌄 + 🔈 = 1.4MB \n*2* Dayro Carrasquilla 🌄 + 🔈 = 2.2MB \n*3* Eusebio Siosi 🌄 + 🔈 = 4.6MB \n*4* Enosh Arias 🌄 + 🔈 = 2.2MB \n*5* Juana Alicia 🌄 + 🔈 = 1.8MB \n*6* Álvaro Barrios 🌄 + 🔈 = 2.1MB \n*7* Alexandra Gelis 🌄 + 🔈 = 2.2MB \n*8* Nohemí Pérez 🌄 + 🔈 = 4.6MB")  
        await client.sendText(message.from, "↩️ Más de Caminos de SaNaciones: \n*9* Disposición al diálogo \n*10* Territorios \n*11* Resistencias históricas de los pueblos indígenas \n*12* La fuerza de lo colectivo \n*13* Naciones \n*14 📍Arte y sanación*")  
        await client.sendText(message.from, "🛖 Inicio:\n*15* ¿Qué es SaNaciones? \n*16* 📍Caminos de la exposición \n*17*  Participa de la exposición\n *18* Plataforma virtual")   
      }
      else if(message.content === '11'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'Info'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, '*SaNaciones: diálogos de la memoria* es una exposición que invita a comprender el territorio como víctima y a reconocer las violencias que han sufrido las comunidades étnicas desde hace siglos. También exalta su capacidad organizativa y cuestiona el lugar que han ocupado en nuestra nación. Esta exposición fue construida de manera participativa y colectiva *con diez comunidades indígenas víctimas del conflicto armado.*' );
        await client.sendText(message.from, 'Te mencioné que SaNaciones es una una exposición *MULTIPLATAFORMA, TRANSMEDIA e ITINERANTE*, esto quiere decir que tiene varias plataformas físicas y virtuales: 🖥️ una curaduría en la página web del Museo, 🎒 una maleta con material didáctico, 🚚 una unidad móvil que recorrerá varios territorios con actividades artísticas, culturales y pedagógicas, y 🤖 este bot de WhatsApp.');
        await client.sendText(message.from, '👇🏽 🔢 ↔️ Más de SaNaciones:\n*1* Caminos de la exposición\n*2* Participa de la exposición\n *3* Plataforma virtual');
      }
      else if(message.content === '12'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'caminos'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, "En SaNaciones tenemos seis  caminos  para entender  las violencias que han sufrido los pueblos indígenas, las formas en quer las han enfrentado y tramitado.")
        await client.sendText(message.from, '👇🏽 🔢 ⤵️ \n\n*1* Disposición al diálogo\n*2* Territorios\n*3* Resistencias históricas de los pueblos indígenas\n*4* La fuerza de lo colectivo\n*5* Naciones\n*6* Arte y sanación');
        await client.sendText(message.from, '🛖 Inicio:\n*7* ¿Qué es SaNaciones?\n*8* 📍Caminos de la exposición\n*9* Participa de la exposición\n *10* Plataforma virtual');
      }
      else if(message.content === '13'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'participa'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, 'Entre todos creamos el mapa de la SaNación! Ya somos 123 participantes! \n Tu opinión será totalmente anónima. \n ¿Cómo sanar las heridas del conflicto armado? Cuéntanos qué piensas con un texto.');
        await client.sendText(message.from, 'Consulte los términos y condiciones  Mapa de SaNaciones en el sitio web www.museodememoria.gov.co/sanaciones');
        await client.sendText(message.from, '¿Quieres participar? \n*1* Sí, quiero participar.\n*2* No, quiero volver.');
      }
      else if (message.content === '14')
      {
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'plataforma'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, 'Otra de las plataformas en la q que desarrollamos la Exposición de SaNaciones es la plataforma web., donde podrás complementar los contenidos de cada uno de los caminos de la exposición. Vas a encontrar contenidos más extensos y diferentes elementos multimedia.');
        await client.sendText(message.from, '⚠️ Te recuerdo que es una página externa y el consumo de los datos en tu celular puede ser alta. Si no puedes hacerlo ahora, te recomiendo la visites cuando tu celular esté conectado a una red WI-FI para que puedas el resto de contenido que está genial.');
        await client.sendText(message.from, 'SaNaciones: diálogos de la memoria \nhttps://museodelamemoria.gov.co/sanaciones');
        await client.sendText(message.from, "👇🏽 🔢 ↔️ O si prefieres continuar conversando de la exposición: \n*1* ¿Qué es SaNaciones? \n*2* Caminos de la exposición \n*3* Participa en el mapa de SaNaciones")  
        
      } 
      else{
        await client.sendText(message.from, "Rastrear la memoria El territorio del pueblo Awá ha sido afectado desde la colonia española hasta la actualidad. Esto ha provocado constantes desplazamientos que les impiden vivir en armonía con la naturaleza. Desde los años 80, líderes de este pueblo en Colombia y Ecuador gestaron la idea de crear la Gran Familia Awá Binacional. Es una estrategia política y cultural para mejorar la calidad de vida, reconocer la identidad propia y garantizar sus derechos dentro y fuera del territorio. Esta unión les ha permitido luchar contra el riesgo de extinción de su lengua, medicina tradicional, cosmovisión y territorio, causado por grupos armados, narcotráfico y proyectos extractivos. La Gran Familia Awá Binacional tiene cuatro organizaciones entre Nariño, Putumayo y Ecuador.")
        await client.sendText(message.from, "👇🏽 🔢 \n\n⤵️ \n*1* El territorio 🌄 = 2.2MB \n*2* El conflicto 📺 = 3.4MB \n*3* Las mujeres 🌄 + 🔈 = 4.8MB")
        await client.sendText(message.from, "↔️ Continua en La fuerza de lo colectivo: \n*4* ¡Viva la guardia, viva la minga!")
        await client.sendText(message.from, "↩️ Más de Caminos de SaNaciones: \n*5* Disposición al diálogo \n*6* Territorios \n*7* Resistencias históricas de los pueblos indígenas \n*8* 📍La fuerza de lo colectivo \n*9* Naciones \n*10* Arte y sanación")
        await client.sendText(message.from, "🛖 Inicio:\n*11* ¿Qué es SaNaciones? \n*12* 📍Caminos de la exposición \n*13* Participa de la exposición\n *14* Plataforma virtual")
        }
    }

    else if (r.data.state === 'Territorios') {
      
      if(message.content === '1'){
       /* await axios.post(apiUrl + "/update-status", {from: message.from, state: 'vivir'}).catch(err=>{
          console.log(err)
        })*/
        await client.sendText(message.from, "Vivir y resistir como semillas Te voy a enviar un audio y te propongo que mientras lo escuchas cierres los ojos. 😌 👇🏽 🔢 ⤵️ \n*1* Pueblo WIWA 🔈 = 1.4MB \n*2* Pueblo Nasa 🔈 = 2.2MB \n*3* Pueblo AWÁ 🔈 = 4.6MB \n*4* Pueblo de La Chorrera 🔈 = 1.8MB \n*5* Pueblo Barí 🔈 = 2.1MB");
        await client.sendFile(message.from, './assets/audio/1 Wiwa Soundscape 01.mp3', '', '');
        await client.sendFile(message.from, './assets/audio/2 Chorrera Foto + Soundscapel.mp3', '', '');
        await client.sendFile(message.from, './assets/audio/3 Nasa Foto + Soundscape.mp3', '', '');
        await client.sendFile(message.from, './assets/audio/4 Bari Foto + Soundscapel.mp3', '', '');
        await client.sendFile(message.from, './assets/audio/awa.mp3', '', ''); 
        await client.sendText(message.from, "↔️ Continúa en Territorios: \n*1 Vivir y resistir como semillas* \n*2* Tierras \n*3* Pueblo Wiwa 📺 + 🔈 = 3.4MB")    
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*4* Disposición al diálogo \n*5 📍Territorios* \n*6* Resistencias históricas de los pueblos indígenas \n*7* La fuerza de lo colectivo \n*8* Naciones \n*9* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*10* ¿Qué es SaNaciones? \n*11* 📍Caminos de la exposición \n*12*  Participa de la exposición\n *13* Plataforma virtual")    
      }      
      else if(message.content === '2'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'ter_tie'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, "*Tierras* \ņLas obras artísticas que vas a encontrar fueron realizadas por artistas pertenecientes a pueblos indígenas. Estas obras son pruebas del fecundo diálogo entre el lenguaje artístico actual y las cosmogonías indígenas ancestrales. Son una invitación a reivindicar, entre otros, los procesos de resistencia de estos pueblos, a dimensionar lo que significa para ellos contemplar el territorio como víctima del conflicto armado. También convocan a respetar la diversidad de pensamientos y formas propias de tramitar el dolor.");
        await client.sendText(message.from, "*1* Nohemí Pérez\n*2* Confucio Hernández\n*3* Julieth Morales\n*4* Benjamín Jacanamijoy\n*5* Jesús Hernández\n");
        await client.sendText(message.from, "↔️ Continúa en Territorios: \n6 Vivir y resistir como semillas \n*7 Tierras* \n*8* Pueblo Wiwa 📺 + 🔈 = 3.4MB")    
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*9* Disposición al diálogo \n*10 📍Territorios* \n11* Resistencias históricas de los pueblos indígenas \n*12* La fuerza de lo colectivo \n*13* Naciones \n*14* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*15* ¿Qué es SaNaciones? \n*16* 📍Caminos de la exposición \n*17*  Participa de la exposición\n *18* Plataforma virtual")    
      }
      else if(message.content === '3'){        
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'ter_pue'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, "*Pueblo WiWa*");
        await client.sendImage(message.from, './assets/saludos/1.jpg', '', '');
        await client.sendText(message.from, "↩️ Más de Territorios: \n*6* Vivir y resistir como semillas \n*7* Tierras \n*8* 📍Pueblo Wiwa 📺 + 🔈 = 3.4MB")  
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*9* Disposición al diálogo \n*10 📍Territorios* \n*11* Resistencias históricas de los pueblos indígenas \n*12* La fuerza de lo colectivo \n*13* Naciones \n*14* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*15* ¿Qué es SaNaciones? \n*16* 📍Caminos de la exposición \n*17*  Participa de la exposición\n *18* Plataforma virtual")  
      }
      else if(message.content === '4'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'disposicion'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, "*Disposición al diálogo* \nLa palabra sin acción es vacía, la acción sin palabra es ciega, la palabra y la acción por fuera del espíritu de la comunidad son la muerte -Pensamiento Nasa.\n\nEl diálogo permite construir la memoria histórica y es un camino para sanar.")  
        await client.sendText(message.from, "Esta exposición es el resultado de un diálogo entre el Museo de Memoria de Colombia y los pueblos indígenas que participaron.")  
        await client.sendText(message.from, "Estar dispuestos a dialogar nos permite transformar imaginarios sobre los otros y reconocer que a pesar de nuestras diferencias podemos convivir y aprender de los demás. Para esto necesitamos crear acuerdos basados en el respeto, la tolerancia y la defensa de la vida. El diálogo es un pilar fundamental en la cosmogonía de los pueblos indígenas. Está presente en todos los ámbitos de la vida y es esencial en sus procesos de sanación.")  
        await client.sendText(message.from, "Los pueblos indígenas nos saludan e invitan al diálogo: 👇🏽 🔢\n ⤵️ \n\n*1* Saludos de pueblos indigenas 🌄 = 1.4MB\n*2* Mapa de los pueblos indigenas 🗺️ = 2MB")  
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*3 📍Disposición al diálogo* \n*4* Territorios \n*5* Resistencias históricas de los pueblos indígenas \n*6* La fuerza de lo colectivo \n*7* Naciones \n*8* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*9* ¿Qué es SaNaciones? \n*10* 📍Caminos de la exposición \n*11*  Participa de la exposición\n *12* Plataforma virtual")  
      }
      else if(message.content === '5'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'Territorios'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, "*Territorios* \nPara los pueblos indígenas, el territorio representa la madre que da vida. Es un espacio espiritual que conecta con lo sagrado y permite ver las huellas que ha dejado el conflicto armado.")  
        await client.sendText(message.from, "En este camino verás y escucharás los lugares que habitan los pueblos indígenas. También conocerás obras de arte que reflexionan sobre el significado de estos territorios para sus comunidades. 👇🏽 🔢 \n⤵️ \n*1* Vivir y resistir como semillas \n*2* Tierras \n*3* Pueblo Wiwa 📺 + 🔈 = 3.4MB")  
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*4* Disposición al diálogo \n*5 📍Territorios* \n*6* Resistencias históricas de los pueblos indígenas \n*7* La fuerza de lo colectivo \n*8* Naciones \n*9* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*10* ¿Qué es SaNaciones? \n*11* 📍Caminos de la exposición \n*12*  Participa de la exposición\n *13* Plataforma virtual")  
      }
      else if(message.content === '6'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'resistencias'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, '*Resistencias históricas de los pueblos indígenas* \nLos pueblos indígenas y sus territorios han sido afectados desde hace siglos por distintos tipos de violencia. Algunas de ellas continúan todavía. En este camino encontrarás las memorias del pueblo Barí, del Catatumbo, y de los pueblos Uitoto Mnka, vhuuza (Okaina), Gaigoomj (Muinane) y Pnenicína (Bora), esencia del tabaco, la coca y la yuca dulce de La Chorrera, en Amazonas. Estos pueblos por poco fueron exterminados, pero hoy anhelan que no se repita y que puedan tejer una nueva historia. Para poder sanar, reinterpretan su memoria desde la palabra de vida, conocimiento y resistencia.');
        await client.sendText(message.from, '👇🏽 🔢 ⤵️\n*1* Sobrevivientes victoriosos \n*2* Ishtana resiste');
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*3 📍Disposición al diálogo* \n*4* Territorios \n*5* Resistencias históricas de los pueblos indígenas \n*6* La fuerza de lo colectivo \n*7* Naciones \n*8* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*9* ¿Qué es SaNaciones? \n*10* 📍Caminos de la exposición \n*11*  Participa de la exposición\n *12* Plataforma virtual")  
      }
      else if(message.content === '7'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'fuerza'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, '*La fuerza de lo colectivo* \nLos logros organizativos de los pueblos indígenas parten de las luchas y experiencias políticas de sus mayores. La defensa del territorio y el conocimiento espiritual se han transmitido de generación en generación. En este camino, los líderes y comunidades han entendido que unidos son más fuertes para enfrentar la violencia de actores armados legales e ilegales.');
        await client.sendText(message.from, 'En este camino verás cómo el pueblo Nasa, en el norte del Cauca, y el pueblo Awá, en Nariño, Putumayo y territorio ecuatoriano, han creado estrategias desde lo colectivo para resistir.');
        await client.sendText(message.from, '👇🏽 🔢 \n⤵️ \n*1* ¡Viva la guardia, viva la minga! \n*2* Rastrear la memoria');
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*3 📍Disposición al diálogo* \n*4* Territorios \n*5* Resistencias históricas de los pueblos indígenas \n*6* La fuerza de lo colectivo \n*7* Naciones \n*8* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*9* ¿Qué es SaNaciones? \n*10* 📍Caminos de la exposición \n*11*  Participa de la exposición\n *12* Plataforma virtual")  
      }
      else if(message.content === '8'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'naciones'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, '*Naciones* La Constitución de 1991 reconoce que hacemos parte de un país que reúne diferentes pueblos con identidades particulares, territorios definidos y derecho a la autodeterminación. Sin embargo, para los pueblos étnicos, la multiculturalidad es una realidad inacabada, pues aún luchan por la defensa de sus derechos, autonomía y soberanía. \nPara los pueblos indígenas la idea de nación recoge el territorio como ser vivo e implica la convivencia armónica entre la naturaleza y los seres humanos, pero también involucra la cosmovisión, la autonomía y la autodeterminación.');
        await client.sendText(message.from, '*Naciones Indigenas* Son proyectos de vida de algunos pueblos indígenas que habitan en Colombia, quienes nos llaman a interactuar y convivir con nuestras diferencias.');
        await client.sendFile(message.from, './assets/audio/awa.mp3', '', '');
        await client.sendFile(message.from, './assets/audio/awa.mp3', '', '');
        await client.sendFile(message.from, './assets/audio/awa.mp3', '', '');
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*1 📍Disposición al diálogo* \n*2* Territorios \n*3* Resistencias históricas de los pueblos indígenas \n*4* La fuerza de lo colectivo \n*5* Naciones \n*6* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*7* ¿Qué es SaNaciones? \n*8* 📍Caminos de la exposición \n*9*  Participa de la exposición\n *10* Plataforma virtual")  
        await client.sendText(message.from, '');
      }
      else if(message.content === '9'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'Info_artista'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, '*Arte y sanación* En 2020, el Museo de Memoria de Colombia invitó a varios artistas a intervenir recibos de servicio público y periódicos con obras que reflexionaran sobre la sanación.');
        await client.sendText(message.from, "*1* Rafael Posso 🌄 + 🔈 = 1.4MB \n*2* Dayro Carrasquilla 🌄 + 🔈 = 2.2MB \n*3* Eusebio Siosi 🌄 + 🔈 = 4.6MB \n*4* Enosh Arias 🌄 + 🔈 = 2.2MB \n*5* Juana Alicia 🌄 + 🔈 = 1.8MB \n*6* Álvaro Barrios 🌄 + 🔈 = 2.1MB \n*7* Alexandra Gelis 🌄 + 🔈 = 2.2MB \n*8* Nohemí Pérez 🌄 + 🔈 = 4.6MB")  
        await client.sendText(message.from, "↩️ Más de Caminos de SaNaciones: \n*9* Disposición al diálogo \n*10* Territorios \n*11* Resistencias históricas de los pueblos indígenas \n*12* La fuerza de lo colectivo \n*13* Naciones \n*14 📍Arte y sanación*")  
        await client.sendText(message.from, "🛖 Inicio:\n*15* ¿Qué es SaNaciones? \n*16* 📍Caminos de la exposición \n*17*  Participa de la exposición\n *18* Plataforma virtual")   
      }
      else if(message.content === '10'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'Info'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, '*SaNaciones: diálogos de la memoria* es una exposición que invita a comprender el territorio como víctima y a reconocer las violencias que han sufrido las comunidades étnicas desde hace siglos. También exalta su capacidad organizativa y cuestiona el lugar que han ocupado en nuestra nación. Esta exposición fue construida de manera participativa y colectiva *con diez comunidades indígenas víctimas del conflicto armado.*' );
        await client.sendText(message.from, 'Te mencioné que SaNaciones es una una exposición *MULTIPLATAFORMA, TRANSMEDIA e ITINERANTE*, esto quiere decir que tiene varias plataformas físicas y virtuales: 🖥️ una curaduría en la página web del Museo, 🎒 una maleta con material didáctico, 🚚 una unidad móvil que recorrerá varios territorios con actividades artísticas, culturales y pedagógicas, y 🤖 este bot de WhatsApp.');
        await client.sendText(message.from, '👇🏽 🔢 ↔️ Más de SaNaciones:\n*1* Caminos de la exposición\n*2* Participa de la exposición\n *3* Plataforma virtual');
      }
      else if(message.content === '11'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'caminos'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, "En SaNaciones tenemos seis  caminos  para entender  las violencias que han sufrido los pueblos indígenas, las formas en quer las han enfrentado y tramitado.")
        await client.sendText(message.from, '👇🏽 🔢 ⤵️ \n\n*1* Disposición al diálogo\n*2* Territorios\n*3* Resistencias históricas de los pueblos indígenas\n*4* La fuerza de lo colectivo\n*5* Naciones\n*6* Arte y sanación');
        await client.sendText(message.from, '🛖 Inicio:\n*7* ¿Qué es SaNaciones?\n*8* 📍Caminos de la exposición\n*9* Participa de la exposición\n *10* Plataforma virtual');
      }
      else if(message.content === '12'){        
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'participa'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, 'Entre todos creamos el mapa de la SaNación! Ya somos 123 participantes! \n Tu opinión será totalmente anónima. \n ¿Cómo sanar las heridas del conflicto armado? Cuéntanos qué piensas con un texto.');
        await client.sendText(message.from, 'Consulte los términos y condiciones  Mapa de SaNaciones en el sitio web www.museodememoria.gov.co/sanaciones');
        await client.sendText(message.from, '¿Quieres participar? \n*1* Sí, quiero participar.\n*2* No, quiero volver.');
      }
      else if (message.content === '13')
      {
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'plataforma'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, 'Otra de las plataformas en la q que desarrollamos la Exposición de SaNaciones es la plataforma web., donde podrás complementar los contenidos de cada uno de los caminos de la exposición. Vas a encontrar contenidos más extensos y diferentes elementos multimedia.');
        await client.sendText(message.from, '⚠️ Te recuerdo que es una página externa y el consumo de los datos en tu celular puede ser alta. Si no puedes hacerlo ahora, te recomiendo la visites cuando tu celular esté conectado a una red WI-FI para que puedas el resto de contenido que está genial.');
        await client.sendText(message.from, 'SaNaciones: diálogos de la memoria \nhttps://museodelamemoria.gov.co/sanaciones');
        await client.sendText(message.from, "👇🏽 🔢 ↔️ O si prefieres continuar conversando de la exposición: \n*1* ¿Qué es SaNaciones? \n*2* Caminos de la exposición \n*3* Participa en el mapa de SaNaciones")  
        
      } 
      else{
        await client.sendText(message.from, "↔️ Continúa en Territorios: \n*1 Vivir y resistir como semillas* \n*2* Tierras \n*3* Pueblo Wiwa 📺 + 🔈 = 3.4MB")    
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*4* Disposición al diálogo \n*5 📍Territorios* \n*6* Resistencias históricas de los pueblos indígenas \n*7* La fuerza de lo colectivo \n*8* Naciones \n*9* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*10* ¿Qué es SaNaciones? \n*11* 📍Caminos de la exposición \n*12*  Participa de la exposición\n *13* Plataforma virtual")    
      }

    } 

    else if (r.data.state === 'ter_tie'){
      /*if (message.content === '1'){
        await client.sendImage(message.from, './assets/Tierras/01/Obra/03.jpg', '', '');
        await client.sendImage(message.from, './assets/Tierras/01/Obra/04.jpg', '', '');
        await client.sendImage(message.from, './assets/Tierras/01/Obra/06.jpg', '', '');
        await client.sendImage(message.from, './assets/Tierras/01/Obra/07.jpg', '', '');
        await client.sendImage(message.from, './assets/Tierras/01/Obra/08.jpg', '', '');
        await client.sendImage(message.from, './assets/Tierras/01/Obra/09.jpg', '', '');
        await client.sendImage(message.from, './assets/Tierras/01/Obra/10.jpg', '', '');
        await client.sendImage(message.from, './assets/Tierras/01/Obra/11.jpg', '', '');
        await client.sendImage(message.from, './assets/Tierras/01/Obra/12.jpg', '', '');
        await client.sendFile(message.from, './assets/Tierras/01/Audio/Aldibey.mp3', '', '');
        //await client.sendText(message.from, "*1* Aldibey Talaga\n*2* Nohemí Pérez\n*3* Confucio Hernández\n*4* Julieth Morales\n*5* Benjamín Jacanamijoy\n*6* Jesús Hernández\n*7* Atrás\n*8* Volver al inicio");
      }*/
      if (message.content === '1'){
        await client.sendText(message.from, "*Nohemí Pérez*\n Nació en Tibú (Catatumbo). Su trabajo es un ejercicio de reflexión sobre el impacto del conflicto armado y las economías extractivistas en el Catatumbo, donde habita el pueblo Barí. En esta obra representa la exuberancia del paisaje pero muestra también la explotación minera. El material utilizado-carboncillo- permite evocar simbólicamente el mundo minero.");
        await client.sendImage(message.from, './assets/Tierras/02/Fotos/ApuntesPanoramaCatatumbo.jpg', '- Nohemí Pérez Panorama Catatumbo, 2017. Instalación de dibujo sobre tela, 1.80 x 50 m.', '');
        await client.sendImage(message.from, './assets/Tierras/02/Fotos/ApuntesPanoramaCatatumbo2.jpg', '', '');
        await client.sendImage(message.from, './assets/Tierras/02/Fotos/ExposiciónEntreCaníbales_2016.jpg', '', '');
        await client.sendImage(message.from, './assets/Tierras/02/Fotos/PanoramaCatatumbo(1)_2012.jpg', '', '');
        await client.sendImage(message.from, './assets/Tierras/02/Fotos/PanoramaCatatumbo(7)_2018.jpg', '', '');
        await client.sendImage(message.from, './assets/Tierras/02/Fotos/PanoramaCatatumbo(9)_2012.jpg', '', '');
        await client.sendImage(message.from, './assets/Tierras/02/Fotos/PanoramaCatatumbo(10)_2012.jpg', '', '');
        await client.sendFile(message.from, './assets/Tierras/02/Audio/Nohemi.mp3', '', '');
        await client.sendText(message.from, "*1* Nohemí Pérez 🌄 + 🔈 = 1.4MB\n*2* Confucio Hernández 🌄 + 🔈 = 1.4MB\n*3* Julieth Morales 🌄 + 🔈 = 1.4MB\n*4* Benjamín Jacanamijoy 🌄 + 🔈 = 1.4MB\n*5* Jesús Hernández 🌄 + 🔈 = 1.4MB");
        await client.sendText(message.from, "↔️ Continúa en Territorios: \n6 Vivir y resistir como semillas \n*7 Tierras* \n*8* Pueblo Wiwa 📺 + 🔈 = 3.4MB")    
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*9* Disposición al diálogo \n*10 📍Territorios* \n11* Resistencias históricas de los pueblos indígenas \n*12* La fuerza de lo colectivo \n*13* Naciones \n*14* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*15* ¿Qué es SaNaciones? \n*16* 📍Caminos de la exposición \n*17*  Participa de la exposición\n *18* Plataforma virtual")    
      }
      else if(message.content === '2'){
        await client.sendText(message.from, "*Confucio Hernández Makuritof*\n Es un Artista del pueblo Uitoto de la región de Araracuara, en el Amazonas. Es biólogo e ilustrador de diferentes historias tradicionales de su pueblo y de especies animales. Esta obra es un tributo a la belleza de la flora y la fauna de la Amazonía.");
        await client.sendImage(message.from, './assets/Tierras/03/Fotos/CONFUCIO.jpg', '', '');
        await client.sendImage(message.from, './assets/Tierras/03/Fotos/confucio1.jpg', '', '');
        await client.sendFile(message.from, './assets/Tierras/03/Audio/Confucio.mp3', '', '');
        await client.sendText(message.from, "*1* Nohemí Pérez 🌄 + 🔈 = 1.4MB\n*2* Confucio Hernández 🌄 + 🔈 = 1.4MB\n*3* Julieth Morales 🌄 + 🔈 = 1.4MB\n*4* Benjamín Jacanamijoy 🌄 + 🔈 = 1.4MB\n*5* Jesús Hernández 🌄 + 🔈 = 1.4MB");
        await client.sendText(message.from, "↔️ Continúa en Territorios: \n6 Vivir y resistir como semillas \n*7 Tierras* \n*8* Pueblo Wiwa 📺 + 🔈 = 3.4MB")    
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*9* Disposición al diálogo \n*10 📍Territorios* \n11* Resistencias históricas de los pueblos indígenas \n*12* La fuerza de lo colectivo \n*13* Naciones \n*14* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*15* ¿Qué es SaNaciones? \n*16* 📍Caminos de la exposición \n*17*  Participa de la exposición\n *18* Plataforma virtual")    
      }
      else if(message.content === '3'){
        await client.sendText(message.from, "*Julieth Morales*\n Es artista del pueblo Misakb del Cauca. En sus proyectos exalta el empoderamiento y las luchas de las mujeres indígenas en comunidades con estructuras tradicionalmente patriarcales.");
        await client.sendImage(message.from, './assets/Tierras/04/Fotos/ED_MJ_4_1.jpg', '', '');
        await client.sendImage(message.from, './assets/Tierras/04/Fotos/ED_MJ_4_2.jpg', '', '');
        await client.sendImage(message.from, './assets/Tierras/04/Fotos/ED_MJ_4_3.jpg', '', '');
        await client.sendText(message.from, "*1* Nohemí Pérez 🌄 + 🔈 = 1.4MB\n*2* Confucio Hernández 🌄 + 🔈 = 1.4MB\n*3* Julieth Morales 🌄 + 🔈 = 1.4MB\n*4* Benjamín Jacanamijoy 🌄 + 🔈 = 1.4MB\n*5* Jesús Hernández 🌄 + 🔈 = 1.4MB");
        await client.sendText(message.from, "↔️ Continúa en Territorios: \n6 Vivir y resistir como semillas \n*7 Tierras* \n*8* Pueblo Wiwa 📺 + 🔈 = 3.4MB")    
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*9* Disposición al diálogo \n*10 📍Territorios* \n11* Resistencias históricas de los pueblos indígenas \n*12* La fuerza de lo colectivo \n*13* Naciones \n*14* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*15* ¿Qué es SaNaciones? \n*16* 📍Caminos de la exposición \n*17*  Participa de la exposición\n *18* Plataforma virtual")    
      }
      else if(message.content === '4'){
        await client.sendText(message.from, "*Benjamín Jacanamijoy*\n Artista del pueblo Inga de Putumayo. En su idioma natal, su nombre es Uaira Uaua, que significa hijo del viento. Su trabajo reflexiona sobre la recuperación de la historia de su comunidad. Esta obra gira en torno a la Flor del vientre, una especie que no existe de manera literal, pero que en el imaginario inga evoca la figura de la mujer en embarazo y el concepto de “munay”, que en la lengua de este pueblo significa \"amor\".");
        await client.sendImage(message.from, './assets/Tierras/05/Fotos/1.jpg', '', '');
        await client.sendImage(message.from, './assets/Tierras/05/Fotos/2.jpg', '', '');
        await client.sendImage(message.from, './assets/Tierras/05/Fotos/3.jpg', '', '');
        await client.sendImage(message.from, './assets/Tierras/05/Fotos/4.jpg', '', '');
        await client.sendImage(message.from, './assets/Tierras/05/Fotos/5.jpg', '', '');
        await client.sendFile(message.from, './assets/Tierras/05/Audio/Benjamin.mp3', '', '');
        await client.sendText(message.from, "*1* Nohemí Pérez 🌄 + 🔈 = 1.4MB\n*2* Confucio Hernández 🌄 + 🔈 = 1.4MB\n*3* Julieth Morales 🌄 + 🔈 = 1.4MB\n*4* Benjamín Jacanamijoy 🌄 + 🔈 = 1.4MB\n*5* Jesús Hernández 🌄 + 🔈 = 1.4MB");
        await client.sendText(message.from, "↔️ Continúa en Territorios: \n6 Vivir y resistir como semillas \n*7 Tierras* \n*8* Pueblo Wiwa 📺 + 🔈 = 3.4MB")    
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*9* Disposición al diálogo \n*10 📍Territorios* \n11* Resistencias históricas de los pueblos indígenas \n*12* La fuerza de lo colectivo \n*13* Naciones \n*14* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*15* ¿Qué es SaNaciones? \n*16* 📍Caminos de la exposición \n*17*  Participa de la exposición\n *18* Plataforma virtual")    
      }
      else if(message.content === '5'){
        await client.sendText(message.from, "*Jesús Hernández*\n Artista del pueblo Kokonuko, nació en el resguardo de Puracé, en Cauca. Se interesa por la identidad y memoria de los pueblos indígenas del Cauca, con énfasis en los impactos que les ha dejado el conflicto armado. Esta obra se compone de 16 fotografías que retratan los vestigios de la toma guerrillera del 31 de diciembre de 2001 en Puracé (Cauca) y una serie de imágenes de esculturas, en forma de tótem, que el artista elaboró a partir de las fotografías.");
        await client.sendImage(message.from, './assets/Tierras/06/Fotos/3.jpg', '', '');
        await client.sendImage(message.from, './assets/Tierras/06/Fotos/4.jpg', '', '');
        await client.sendImage(message.from, './assets/Tierras/06/Fotos/7.jpg', '', '');
        await client.sendImage(message.from, './assets/Tierras/06/Fotos/8.jpg', '', '');
        await client.sendImage(message.from, './assets/Tierras/06/Fotos/9.jpg', '', '');
        await client.sendImage(message.from, './assets/Tierras/06/Fotos/10.jpg', '', '');
        await client.sendImage(message.from, './assets/Tierras/06/Fotos/11.jpg', '', '');
        await client.sendImage(message.from, './assets/Tierras/06/Fotos/12.jpg', '', '');
        await client.sendImage(message.from, './assets/Tierras/06/Fotos/13.jpg', '', '');
        await client.sendImage(message.from, './assets/Tierras/06/Fotos/14.jpg', '', '');
        await client.sendFile(message.from, './assets/Tierras/06/Audio/Audio.mp3', '', '');
        await client.sendText(message.from, "*1* Nohemí Pérez 🌄 + 🔈 = 1.4MB\n*2* Confucio Hernández 🌄 + 🔈 = 1.4MB\n*3* Julieth Morales 🌄 + 🔈 = 1.4MB\n*4* Benjamín Jacanamijoy 🌄 + 🔈 = 1.4MB\n*5* Jesús Hernández 🌄 + 🔈 = 1.4MB");
        await client.sendText(message.from, "↔️ Continúa en Territorios: \n6 Vivir y resistir como semillas \n*7 Tierras* \n*8* Pueblo Wiwa 📺 + 🔈 = 3.4MB")    
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*9* Disposición al diálogo \n*10 📍Territorios* \n11* Resistencias históricas de los pueblos indígenas \n*12* La fuerza de lo colectivo \n*13* Naciones \n*14* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*15* ¿Qué es SaNaciones? \n*16* 📍Caminos de la exposición \n*17*  Participa de la exposición\n *18* Plataforma virtual")    
      }
      else if(message.content === '6'){
        await client.sendText(message.from, "*Janneth Taimal* \nArtista de origen Pasto del resguardo de Cumbal, en Nariño. Su obra, de carácter autodidacta, busca plasmar la memoria de los mayores de su comunidad. En sus dibujos sobre las mujeres recuperadoras, la artista se dedicó a pensar y representar cada momento de la lucha y de la recuperación de los territorios ancestrales del pueblo Pasto. Janneth también ha incorporado a su obra las tradiciones orales que refieren cómo vivían los mayores en el tiempo de antes y la forma en que los y las renacientes de hoy interpretan esa historia. Los dibujos aquí presentados fueron elaborados en papel lija y lápices de colores, que otorgan una tonalidad particular a sus dibujos y resaltan los colores de las ruanas y sombreros usados por los Pasto para resguardarse del frío que caracteriza el resguardo de Cumbal. ");
        await client.sendImage(message.from, './assets/Tierras/06/Fotos/3.jpg', '', '');
        
        await client.sendText(message.from, "*1* Nohemí Pérez 🌄 + 🔈 = 1.4MB\n*2* Confucio Hernández 🌄 + 🔈 = 1.4MB\n*3* Julieth Morales 🌄 + 🔈 = 1.4MB\n*4* Benjamín Jacanamijoy 🌄 + 🔈 = 1.4MB\n*5* Jesús Hernández 🌄 + 🔈 = 1.4MB");
      }
      else if (message.content === '6'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'Territorios'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, "Vivir y resistir como semillas Te voy a enviar un audio y te propongo que mientras lo escuchas cierres los ojos. 😌 👇🏽 🔢 ⤵️ \n*1* Pueblo WIWA 🔈 = 1.4MB \n*2* Pueblo Nasa 🔈 = 2.2MB \n*3* Pueblo AWÁ 🔈 = 4.6MB \n*4* Pueblo de La Chorrera 🔈 = 1.8MB \n*5* Pueblo Barí 🔈 = 2.1MB");
        await client.sendFile(message.from, './assets/audio/1 Wiwa Soundscape 01.mp3', '', '');
        await client.sendFile(message.from, './assets/audio/2 Chorrera Foto + Soundscapel.mp3', '', '');
        await client.sendFile(message.from, './assets/audio/3 Nasa Foto + Soundscape.mp3', '', '');
        await client.sendFile(message.from, './assets/audio/4 Bari Foto + Soundscapel.mp3', '', '');
        await client.sendFile(message.from, './assets/audio/awa.mp3', '', ''); 
        await client.sendText(message.from, "↔️ Continúa en Territorios: \n*1 Vivir y resistir como semillas* \n*2* Tierras \n*3* Pueblo Wiwa 📺 + 🔈 = 3.4MB")    
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*4* Disposición al diálogo \n*5 📍Territorios* \n*6* Resistencias históricas de los pueblos indígenas \n*7* La fuerza de lo colectivo \n*8* Naciones \n*9* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*10* ¿Qué es SaNaciones? \n*11* 📍Caminos de la exposición \n*12*  Participa de la exposición\n *13* Plataforma virtual")    
      }
      else if(message.content === '7'){
      await axios.post(apiUrl + "/update-status", {from: message.from, state: 'ter_tie'}).catch(err=>{
        console.log(err)
      })  
      await client.sendText(message.from, "*Tierras* \ņLas obras artísticas que vas a encontrar fueron realizadas por artistas pertenecientes a pueblos indígenas. Estas obras son pruebas del fecundo diálogo entre el lenguaje artístico actual y las cosmogonías indígenas ancestrales. Son una invitación a reivindicar, entre otros, los procesos de resistencia de estos pueblos, a dimensionar lo que significa para ellos contemplar el territorio como víctima del conflicto armado. También convocan a respetar la diversidad de pensamientos y formas propias de tramitar el dolor.");
        await client.sendText(message.from, "*1* Nohemí Pérez\n*2* Confucio Hernández\n*3* Julieth Morales\n*4* Benjamín Jacanamijoy\n*5* Jesús Hernández\n");
        await client.sendText(message.from, "↔️ Continúa en Territorios: \n6 Vivir y resistir como semillas \n*7 Tierras* \n*8* Pueblo Wiwa 📺 + 🔈 = 3.4MB")    
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*9* Disposición al diálogo \n*10 📍Territorios* \n11* Resistencias históricas de los pueblos indígenas \n*12* La fuerza de lo colectivo \n*13* Naciones \n*14* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*15* ¿Qué es SaNaciones? \n*16* 📍Caminos de la exposición \n*17*  Participa de la exposición\n *18* Plataforma virtual")    
      }
      else if(message.content === '8'){
      await axios.post(apiUrl + "/update-status", {from: message.from, state: 'ter_pue'}).catch(err=>{
        console.log(err)
      })  
      await client.sendText(message.from, "*Pueblo WiWa*");
      await client.sendImage(message.from, './assets/saludos/1.jpg', '', '');
      await client.sendText(message.from, "↩️ Más de Territorios: \n*6* Vivir y resistir como semillas \n*7* Tierras \n*8* 📍Pueblo Wiwa 📺 + 🔈 = 3.4MB")  
      await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*9* Disposición al diálogo \n*10 📍Territorios* \n*11* Resistencias históricas de los pueblos indígenas \n*12* La fuerza de lo colectivo \n*13* Naciones \n*14* Arte y sanación")  
      await client.sendText(message.from, "🛖 Inicio:\n*15* ¿Qué es SaNaciones? \n*16* 📍Caminos de la exposición \n*17*  Participa de la exposición\n *18* Plataforma virtual")  
      }
      else if(message.content === '9'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'disposicion'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, "*Disposición al diálogo* \nLa palabra sin acción es vacía, la acción sin palabra es ciega, la palabra y la acción por fuera del espíritu de la comunidad son la muerte -Pensamiento Nasa.\n\nEl diálogo permite construir la memoria histórica y es un camino para sanar.")  
        await client.sendText(message.from, "Esta exposición es el resultado de un diálogo entre el Museo de Memoria de Colombia y los pueblos indígenas que participaron.")  
        await client.sendText(message.from, "Estar dispuestos a dialogar nos permite transformar imaginarios sobre los otros y reconocer que a pesar de nuestras diferencias podemos convivir y aprender de los demás. Para esto necesitamos crear acuerdos basados en el respeto, la tolerancia y la defensa de la vida. El diálogo es un pilar fundamental en la cosmogonía de los pueblos indígenas. Está presente en todos los ámbitos de la vida y es esencial en sus procesos de sanación.")  
        await client.sendText(message.from, "Los pueblos indígenas nos saludan e invitan al diálogo: 👇🏽 🔢\n ⤵️ \n\n*1* Saludos de pueblos indigenas 🌄 = 1.4MB\n*2* Mapa de los pueblos indigenas 🗺️ = 2MB")  
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*3 📍Disposición al diálogo* \n*4* Territorios \n*5* Resistencias históricas de los pueblos indígenas \n*6* La fuerza de lo colectivo \n*7* Naciones \n*8* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*9* ¿Qué es SaNaciones? \n*10* 📍Caminos de la exposición \n*11*  Participa de la exposición\n *12* Plataforma virtual")  
      }
      else if(message.content === '10'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'resistencia'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, 'Ahora para continuar lee el menu de cada sección, escribe y envíame solo el número de la opción que más te interese; por ejemplo: 3 👇🏽 🔢\n *1* ¿Qué es SaNaciones?\n *2* Caminos de la exposición\n *3* Participa de la exposición');
      }
      else if(message.content === '11'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'fuerza'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, '*La fuerza de lo colectivo* \nLos logros organizativos de los pueblos indígenas parten de las luchas y experiencias políticas de sus mayores. La defensa del territorio y el conocimiento espiritual se han transmitido de generación en generación. En este camino, los líderes y comunidades han entendido que unidos son más fuertes para enfrentar la violencia de actores armados legales e ilegales.');
        await client.sendText(message.from, 'En este camino verás cómo el pueblo Nasa, en el norte del Cauca, y el pueblo Awá, en Nariño, Putumayo y territorio ecuatoriano, han creado estrategias desde lo colectivo para resistir.');
        await client.sendText(message.from, '👇🏽 🔢 \n⤵️ \n*1* ¡Viva la guardia, viva la minga! \n*2* Rastrear la memoria');
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*3 📍Disposición al diálogo* \n*4* Territorios \n*5* Resistencias históricas de los pueblos indígenas \n*6* La fuerza de lo colectivo \n*7* Naciones \n*8* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*9* ¿Qué es SaNaciones? \n*10* 📍Caminos de la exposición \n*11*  Participa de la exposición\n *12* Plataforma virtual")  
      }
      else if(message.content === '12'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'naciones'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, '*Naciones* La Constitución de 1991 reconoce que hacemos parte de un país que reúne diferentes pueblos con identidades particulares, territorios definidos y derecho a la autodeterminación. Sin embargo, para los pueblos étnicos, la multiculturalidad es una realidad inacabada, pues aún luchan por la defensa de sus derechos, autonomía y soberanía. \nPara los pueblos indígenas la idea de nación recoge el territorio como ser vivo e implica la convivencia armónica entre la naturaleza y los seres humanos, pero también involucra la cosmovisión, la autonomía y la autodeterminación.');
        await client.sendText(message.from, '*Naciones Indigenas* Son proyectos de vida de algunos pueblos indígenas que habitan en Colombia, quienes nos llaman a interactuar y convivir con nuestras diferencias.');
        await client.sendFile(message.from, './assets/audio/awa.mp3', '', '');
        await client.sendFile(message.from, './assets/audio/awa.mp3', '', '');
        await client.sendFile(message.from, './assets/audio/awa.mp3', '', '');
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*1 📍Disposición al diálogo* \n*2* Territorios \n*3* Resistencias históricas de los pueblos indígenas \n*4* La fuerza de lo colectivo \n*5* Naciones \n*6* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*7* ¿Qué es SaNaciones? \n*8* 📍Caminos de la exposición \n*9*  Participa de la exposición\n *10* Plataforma virtual")  
      }
      else if(message.content === '13'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'Info_artista'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, '*Arte y sanación* En 2020, el Museo de Memoria de Colombia invitó a varios artistas a intervenir recibos de servicio público y periódicos con obras que reflexionaran sobre la sanación.');
        await client.sendText(message.from, "*1* Rafael Posso 🌄 + 🔈 = 1.4MB \n*2* Dayro Carrasquilla 🌄 + 🔈 = 2.2MB \n*3* Eusebio Siosi 🌄 + 🔈 = 4.6MB \n*4* Enosh Arias 🌄 + 🔈 = 2.2MB \n*5* Juana Alicia 🌄 + 🔈 = 1.8MB \n*6* Álvaro Barrios 🌄 + 🔈 = 2.1MB \n*7* Alexandra Gelis 🌄 + 🔈 = 2.2MB \n*8* Nohemí Pérez 🌄 + 🔈 = 4.6MB")  
        await client.sendText(message.from, "↩️ Más de Caminos de SaNaciones: \n*9* Disposición al diálogo \n*10* Territorios \n*11* Resistencias históricas de los pueblos indígenas \n*12* La fuerza de lo colectivo \n*13* Naciones \n*14 📍Arte y sanación*")  
        await client.sendText(message.from, "🛖 Inicio:\n*15* ¿Qué es SaNaciones? \n*16* 📍Caminos de la exposición \n*17*  Participa de la exposición\n *18* Plataforma virtual")   
      }
      else if(message.content === '14'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'Info'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, '*SaNaciones: diálogos de la memoria* es una exposición que invita a comprender el territorio como víctima y a reconocer las violencias que han sufrido las comunidades étnicas desde hace siglos. También exalta su capacidad organizativa y cuestiona el lugar que han ocupado en nuestra nación. Esta exposición fue construida de manera participativa y colectiva *con diez comunidades indígenas víctimas del conflicto armado.*' );
        await client.sendText(message.from, 'Te mencioné que SaNaciones es una una exposición *MULTIPLATAFORMA, TRANSMEDIA e ITINERANTE*, esto quiere decir que tiene varias plataformas físicas y virtuales: 🖥️ una curaduría en la página web del Museo, 🎒 una maleta con material didáctico, 🚚 una unidad móvil que recorrerá varios territorios con actividades artísticas, culturales y pedagógicas, y 🤖 este bot de WhatsApp.');
        await client.sendText(message.from, '👇🏽 🔢 ↔️ Más de SaNaciones:\n*1* Caminos de la exposición\n*2* Participa de la exposición\n *3* Plataforma virtual');
      }
      else if(message.content === '15'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'caminos'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, "En SaNaciones tenemos seis  caminos  para entender  las violencias que han sufrido los pueblos indígenas, las formas en quer las han enfrentado y tramitado.")
        await client.sendText(message.from, '👇🏽 🔢 ⤵️ \n\n*1* Disposición al diálogo\n*2* Territorios\n*3* Resistencias históricas de los pueblos indígenas\n*4* La fuerza de lo colectivo\n*5* Naciones\n*6* Arte y sanación');
        await client.sendText(message.from, '🛖 Inicio:\n*7* ¿Qué es SaNaciones?\n*8* 📍Caminos de la exposición\n*9* Participa de la exposición\n *10* Plataforma virtual');
      }
      else if(message.content === '16'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'participa'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, 'Entre todos creamos el mapa de la SaNación! Ya somos 123 participantes! \n Tu opinión será totalmente anónima. \n ¿Cómo sanar las heridas del conflicto armado? Cuéntanos qué piensas con un texto.');
        await client.sendText(message.from, 'Consulte los términos y condiciones  Mapa de SaNaciones en el sitio web www.museodememoria.gov.co/sanaciones');
        await client.sendText(message.from, '¿Quieres participar? \n*1* Sí, quiero participar.\n*2* No, quiero volver.');
      }
      else if (message.content === '17')
      {
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'plataforma'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, 'Otra de las plataformas en la q que desarrollamos la Exposición de SaNaciones es la plataforma web., donde podrás complementar los contenidos de cada uno de los caminos de la exposición. Vas a encontrar contenidos más extensos y diferentes elementos multimedia.');
        await client.sendText(message.from, '⚠️ Te recuerdo que es una página externa y el consumo de los datos en tu celular puede ser alta. Si no puedes hacerlo ahora, te recomiendo la visites cuando tu celular esté conectado a una red WI-FI para que puedas el resto de contenido que está genial.');
        await client.sendText(message.from, 'SaNaciones: diálogos de la memoria \nhttps://museodelamemoria.gov.co/sanaciones');
        await client.sendText(message.from, "👇🏽 🔢 ↔️ O si prefieres continuar conversando de la exposición: \n*1* ¿Qué es SaNaciones? \n*2* Caminos de la exposición \n*3* Participa en el mapa de SaNaciones")  
        
      } 
      else{
        await client.sendText(message.from, "*1* Nohemí Pérez\n*2* Confucio Hernández\n*3* Julieth Morales\n*4* Benjamín Jacanamijoy\n*5* Jesús Hernández");
        await client.sendText(message.from, "↔️ Continúa en Territorios: \n6 Vivir y resistir como semillas \n*7 Tierras* \n*8* Pueblo Wiwa 📺 + 🔈 = 3.4MB")    
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*9* Disposición al diálogo \n*10 📍Territorios* \n*11* Resistencias históricas de los pueblos indígenas \n*12* La fuerza de lo colectivo \n*13* Naciones \n*14* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*15* ¿Qué es SaNaciones? \n*16* 📍Caminos de la exposición \n*17*  Participa de la exposición\n *18* Plataforma virtual")    
      }    
    }   
    else if (r.data.state === 'ter_pue'){
      if (message.content === '1'){
        await client.sendText(message.from, "*Pueblo WiWa*");
        await client.sendImage(message.from, './assets/saludos/1.jpg', '', '');
        await client.sendText(message.from, "↩️ Más de Territorios: \n*6* Vivir y resistir como semillas \n*7* Tierras \n*8* 📍Pueblo Wiwa 📺 + 🔈 = 3.4MB")  
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*9* Disposición al diálogo \n*10 📍Territorios* \n*11* Resistencias históricas de los pueblos indígenas \n*12* La fuerza de lo colectivo \n*13* Naciones \n*14* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*15* ¿Qué es SaNaciones? \n*16* 📍Caminos de la exposición \n*17*  Participa de la exposición\n *18* Plataforma virtual")  
      } 
      else if(message.content === '6'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'Territorios'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, "Vivir y resistir como semillas Te voy a enviar un audio y te propongo que mientras lo escuchas cierres los ojos. 😌 👇🏽 🔢 ⤵️ \n*1* Pueblo WIWA 🔈 = 1.4MB \n*2* Pueblo Nasa 🔈 = 2.2MB \n*3* Pueblo AWÁ 🔈 = 4.6MB \n*4* Pueblo de La Chorrera 🔈 = 1.8MB \n*5* Pueblo Barí 🔈 = 2.1MB");
        await client.sendFile(message.from, './assets/audio/1 Wiwa Soundscape 01.mp3', '', '');
        await client.sendFile(message.from, './assets/audio/2 Chorrera Foto + Soundscapel.mp3', '', '');
        await client.sendFile(message.from, './assets/audio/3 Nasa Foto + Soundscape.mp3', '', '');
        await client.sendFile(message.from, './assets/audio/4 Bari Foto + Soundscapel.mp3', '', '');
        await client.sendFile(message.from, './assets/audio/awa.mp3', '', ''); 
        await client.sendText(message.from, "↔️ Continúa en Territorios: \n*1 Vivir y resistir como semillas* \n*2* Tierras \n*3* Pueblo Wiwa 📺 + 🔈 = 3.4MB")    
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*4* Disposición al diálogo \n*5 📍Territorios* \n*6* Resistencias históricas de los pueblos indígenas \n*7* La fuerza de lo colectivo \n*8* Naciones \n*9* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*10* ¿Qué es SaNaciones? \n*11* 📍Caminos de la exposición \n*12*  Participa de la exposición\n *13* Plataforma virtual")    
      }
      else if(message.content === '7'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'ter_tie'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, "*Tierras* \ņLas obras artísticas que vas a encontrar fueron realizadas por artistas pertenecientes a pueblos indígenas. Estas obras son pruebas del fecundo diálogo entre el lenguaje artístico actual y las cosmogonías indígenas ancestrales. Son una invitación a reivindicar, entre otros, los procesos de resistencia de estos pueblos, a dimensionar lo que significa para ellos contemplar el territorio como víctima del conflicto armado. También convocan a respetar la diversidad de pensamientos y formas propias de tramitar el dolor.");
        await client.sendText(message.from, "*1* Nohemí Pérez\n*2* Confucio Hernández\n*3* Julieth Morales\n*4* Benjamín Jacanamijoy\n*5* Jesús Hernández\n");
        await client.sendText(message.from, "↔️ Continúa en Territorios: \n6 Vivir y resistir como semillas \n*7 Tierras* \n*8* Pueblo Wiwa 📺 + 🔈 = 3.4MB")    
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*9* Disposición al diálogo \n*10 📍Territorios* \n11* Resistencias históricas de los pueblos indígenas \n*12* La fuerza de lo colectivo \n*13* Naciones \n*14* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*15* ¿Qué es SaNaciones? \n*16* 📍Caminos de la exposición \n*17*  Participa de la exposición\n *18* Plataforma virtual")    
      }
      else if(message.content === '8'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'ter_pue'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, "*Pueblo WiWa*");
        await client.sendImage(message.from, './assets/saludos/1.jpg', '', '');
        await client.sendText(message.from, "↩️ Más de Territorios: \n*6* Vivir y resistir como semillas \n*7* Tierras \n*8* 📍Pueblo Wiwa 📺 + 🔈 = 3.4MB")  
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*9* Disposición al diálogo \n*10 📍Territorios* \n*11* Resistencias históricas de los pueblos indígenas \n*12* La fuerza de lo colectivo \n*13* Naciones \n*14* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*15* ¿Qué es SaNaciones? \n*16* 📍Caminos de la exposición \n*17*  Participa de la exposición\n *18* Plataforma virtual")  
      }
      else if(message.content === '9'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'disposicion'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, "*Disposición al diálogo* \nLa palabra sin acción es vacía, la acción sin palabra es ciega, la palabra y la acción por fuera del espíritu de la comunidad son la muerte -Pensamiento Nasa.\n\nEl diálogo permite construir la memoria histórica y es un camino para sanar.")  
        await client.sendText(message.from, "Esta exposición es el resultado de un diálogo entre el Museo de Memoria de Colombia y los pueblos indígenas que participaron.")  
        await client.sendText(message.from, "Estar dispuestos a dialogar nos permite transformar imaginarios sobre los otros y reconocer que a pesar de nuestras diferencias podemos convivir y aprender de los demás. Para esto necesitamos crear acuerdos basados en el respeto, la tolerancia y la defensa de la vida. El diálogo es un pilar fundamental en la cosmogonía de los pueblos indígenas. Está presente en todos los ámbitos de la vida y es esencial en sus procesos de sanación.")  
        await client.sendText(message.from, "Los pueblos indígenas nos saludan e invitan al diálogo: 👇🏽 🔢\n ⤵️ \n\n*1* Saludos de pueblos indigenas 🌄 = 1.4MB\n*2* Mapa de los pueblos indigenas 🗺️ = 2MB")  
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*3 📍Disposición al diálogo* \n*4* Territorios \n*5* Resistencias históricas de los pueblos indígenas \n*6* La fuerza de lo colectivo \n*7* Naciones \n*8* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*9* ¿Qué es SaNaciones? \n*10* 📍Caminos de la exposición \n*11*  Participa de la exposición\n *12* Plataforma virtual")  
      }
      else if(message.content === '10'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'Territorios'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, "*Territorios* \nPara los pueblos indígenas, el territorio representa la madre que da vida. Es un espacio espiritual que conecta con lo sagrado y permite ver las huellas que ha dejado el conflicto armado.")  
        await client.sendText(message.from, "En este camino verás y escucharás los lugares que habitan los pueblos indígenas. También conocerás obras de arte que reflexionan sobre el significado de estos territorios para sus comunidades. 👇🏽 🔢 \n⤵️ \n*1* Vivir y resistir como semillas \n*2* Tierras \n*3* Pueblo Wiwa 📺 + 🔈 = 3.4MB")  
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*4* Disposición al diálogo \n*5 📍Territorios* \n*6* Resistencias históricas de los pueblos indígenas \n*7* La fuerza de lo colectivo \n*8* Naciones \n*9* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*10* ¿Qué es SaNaciones? \n*11* 📍Caminos de la exposición \n*12*  Participa de la exposición\n *13* Plataforma virtual")  
      }
      else if(message.content === '11'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'resistencias'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, '*Resistencias históricas de los pueblos indígenas* \nLos pueblos indígenas y sus territorios han sido afectados desde hace siglos por distintos tipos de violencia. Algunas de ellas continúan todavía. En este camino encontrarás las memorias del pueblo Barí, del Catatumbo, y de los pueblos Uitoto Mnka, vhuuza (Okaina), Gaigoomj (Muinane) y Pnenicína (Bora), esencia del tabaco, la coca y la yuca dulce de La Chorrera, en Amazonas. Estos pueblos por poco fueron exterminados, pero hoy anhelan que no se repita y que puedan tejer una nueva historia. Para poder sanar, reinterpretan su memoria desde la palabra de vida, conocimiento y resistencia.');
        await client.sendText(message.from, '👇🏽 🔢 ⤵️\n*1* Sobrevivientes victoriosos \n*2* Ishtana resiste');
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*3 📍Disposición al diálogo* \n*4* Territorios \n*5* Resistencias históricas de los pueblos indígenas \n*6* La fuerza de lo colectivo \n*7* Naciones \n*8* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*9* ¿Qué es SaNaciones? \n*10* 📍Caminos de la exposición \n*11*  Participa de la exposición\n *12* Plataforma virtual")  
      }
      else if(message.content === '12'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'fuerza'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, '*La fuerza de lo colectivo* \nLos logros organizativos de los pueblos indígenas parten de las luchas y experiencias políticas de sus mayores. La defensa del territorio y el conocimiento espiritual se han transmitido de generación en generación. En este camino, los líderes y comunidades han entendido que unidos son más fuertes para enfrentar la violencia de actores armados legales e ilegales.');
        await client.sendText(message.from, 'En este camino verás cómo el pueblo Nasa, en el norte del Cauca, y el pueblo Awá, en Nariño, Putumayo y territorio ecuatoriano, han creado estrategias desde lo colectivo para resistir.');
        await client.sendText(message.from, '👇🏽 🔢 \n⤵️ \n*1* ¡Viva la guardia, viva la minga! \n*2* Rastrear la memoria');
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*3 📍Disposición al diálogo* \n*4* Territorios \n*5* Resistencias históricas de los pueblos indígenas \n*6* La fuerza de lo colectivo \n*7* Naciones \n*8* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*9* ¿Qué es SaNaciones? \n*10* 📍Caminos de la exposición \n*11*  Participa de la exposición\n *12* Plataforma virtual")  
      }
      else if(message.content === '13'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'naciones'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, '*Naciones* La Constitución de 1991 reconoce que hacemos parte de un país que reúne diferentes pueblos con identidades particulares, territorios definidos y derecho a la autodeterminación. Sin embargo, para los pueblos étnicos, la multiculturalidad es una realidad inacabada, pues aún luchan por la defensa de sus derechos, autonomía y soberanía. \nPara los pueblos indígenas la idea de nación recoge el territorio como ser vivo e implica la convivencia armónica entre la naturaleza y los seres humanos, pero también involucra la cosmovisión, la autonomía y la autodeterminación.');
        await client.sendText(message.from, '*Naciones Indigenas* Son proyectos de vida de algunos pueblos indígenas que habitan en Colombia, quienes nos llaman a interactuar y convivir con nuestras diferencias.');
        await client.sendText(message.from, '*1* Bari 🌄 = 1.2MB\n*2* Nasa 🌄 + 🔈 = 2.2MB\n*3* Awá 🌄 = 1.2MB\n*4* Pasto 📺 = 5.2MB\n*5* Kamantsa 📺 = 12.2MB');
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*6 📍Disposición al diálogo* \n*7* Territorios \n*8* Resistencias históricas de los pueblos indígenas \n*9* La fuerza de lo colectivo \n*10* Naciones \n*11* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*12* ¿Qué es SaNaciones? \n*13* 📍Caminos de la exposición \n*14*  Participa de la exposición\n *15* Plataforma virtual")  
        
      }
      else if(message.content === '14'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'Info_artista'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, '*Arte y sanación* En 2020, el Museo de Memoria de Colombia invitó a varios artistas a intervenir recibos de servicio público y periódicos con obras que reflexionaran sobre la sanación.');
        await client.sendText(message.from, "*1* Rafael Posso 🌄 + 🔈 = 1.4MB \n*2* Dayro Carrasquilla 🌄 + 🔈 = 2.2MB \n*3* Eusebio Siosi 🌄 + 🔈 = 4.6MB \n*4* Enosh Arias 🌄 + 🔈 = 2.2MB \n*5* Juana Alicia 🌄 + 🔈 = 1.8MB \n*6* Álvaro Barrios 🌄 + 🔈 = 2.1MB \n*7* Alexandra Gelis 🌄 + 🔈 = 2.2MB \n*8* Nohemí Pérez 🌄 + 🔈 = 4.6MB")  
        await client.sendText(message.from, "↩️ Más de Caminos de SaNaciones: \n*9* Disposición al diálogo \n*10* Territorios \n*11* Resistencias históricas de los pueblos indígenas \n*12* La fuerza de lo colectivo \n*13* Naciones \n*14 📍Arte y sanación*")  
        await client.sendText(message.from, "🛖 Inicio:\n*15* ¿Qué es SaNaciones? \n*16* 📍Caminos de la exposición \n*17*  Participa de la exposición\n *18* Plataforma virtual")   
      }
      else if(message.content === '15'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'info'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, '*SaNaciones: diálogos de la memoria* es una exposición que invita a comprender el territorio como víctima y a reconocer las violencias que han sufrido las comunidades étnicas desde hace siglos. También exalta su capacidad organizativa y cuestiona el lugar que han ocupado en nuestra nación. Esta exposición fue construida de manera participativa y colectiva *con diez comunidades indígenas víctimas del conflicto armado.*' );
        await client.sendText(message.from, 'Te mencioné que SaNaciones es una una exposición *MULTIPLATAFORMA, TRANSMEDIA e ITINERANTE*, esto quiere decir que tiene varias plataformas físicas y virtuales: 🖥️ una curaduría en la página web del Museo, 🎒 una maleta con material didáctico, 🚚 una unidad móvil que recorrerá varios territorios con actividades artísticas, culturales y pedagógicas, y 🤖 este bot de WhatsApp.');
        await client.sendText(message.from, '👇🏽 🔢 ↔️ Más de SaNaciones:\n*1* Caminos de la exposición\n*2* Participa de la exposición\n *3* Plataforma virtual');
      }
      else if(message.content === '16'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'caminos'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, "En SaNaciones tenemos seis  caminos  para entender  las violencias que han sufrido los pueblos indígenas, las formas en quer las han enfrentado y tramitado.")
        await client.sendText(message.from, '👇🏽 🔢 ⤵️ \n\n*1* Disposición al diálogo\n*2* Territorios\n*3* Resistencias históricas de los pueblos indígenas\n*4* La fuerza de lo colectivo\n*5* Naciones\n*6* Arte y sanación');
        await client.sendText(message.from, '🛖 Inicio:\n*7* ¿Qué es SaNaciones?\n*8* 📍Caminos de la exposición\n*9* Participa de la exposición\n *10* Plataforma virtual');
      }
      else if(message.content === '17'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'participa'}).catch(err=>{
          console.log(err)
        })  
        await client.sendText(message.from, 'Entre todos creamos el mapa de la SaNación! Ya somos 123 participantes! \n Tu opinión será totalmente anónima. \n ¿Cómo sanar las heridas del conflicto armado? Cuéntanos qué piensas con un texto.');
        await client.sendText(message.from, 'Consulte los términos y condiciones  Mapa de SaNaciones en el sitio web www.museodememoria.gov.co/sanaciones');
        await client.sendText(message.from, '¿Quieres participar? \n*1* Sí, quiero participar.\n*2* No, quiero volver.');
      }
      else if (message.content === '18')
      {
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'plataforma'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, 'Otra de las plataformas en la q que desarrollamos la Exposición de SaNaciones es la plataforma web., donde podrás complementar los contenidos de cada uno de los caminos de la exposición. Vas a encontrar contenidos más extensos y diferentes elementos multimedia.');
        await client.sendText(message.from, '⚠️ Te recuerdo que es una página externa y el consumo de los datos en tu celular puede ser alta. Si no puedes hacerlo ahora, te recomiendo la visites cuando tu celular esté conectado a una red WI-FI para que puedas el resto de contenido que está genial.');
        await client.sendText(message.from, 'SaNaciones: diálogos de la memoria \nhttps://museodelamemoria.gov.co/sanaciones');
        await client.sendText(message.from, "👇🏽 🔢 ↔️ O si prefieres continuar conversando de la exposición: \n*1* ¿Qué es SaNaciones? \n*2* Caminos de la exposición \n*3* Participa en el mapa de SaNaciones")  
        
      } 
      else{
        await client.sendText(message.from, "↩️ Más de Territorios: \n*6* 📍Vivir y resistir como semillas \n*7* Tierras \n*8* Pueblo Wiwa 📺 + 🔈 = 3.4MB")  
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*9* Disposición al diálogo \n*10 📍Territorios* \n*11* Resistencias históricas de los pueblos indígenas \n*12* La fuerza de lo colectivo \n*13* Naciones \n*14* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*15* ¿Qué es SaNaciones? \n*16* 📍Caminos de la exposición \n*17*  Participa de la exposición\n *18* Plataforma virtual")  
      }
    }

    else if(r.data.state === 'Info') {
      if(message.content === '1'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'caminos'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, "En SaNaciones tenemos seis  caminos  para entender  las violencias que han sufrido los pueblos indígenas, las formas en quer las han enfrentado y tramitado.")
        await client.sendText(message.from, '👇🏽 🔢 ⤵️ \n\n*1* Disposición al diálogo\n*2* Territorios\n*3* Resistencias históricas de los pueblos indígenas\n*4* La fuerza de lo colectivo\n*5* Naciones\n*6* Arte y sanación');
        await client.sendText(message.from, '🛖 Inicio:\n*7* ¿Qué es SaNaciones?\n*8* 📍Caminos de la exposición\n*9* Participa de la exposición\n *10* Plataforma virtual');
      }
      else if(message.content === '2'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'participa'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, 'Entre todos creamos el mapa de la SaNación! Ya somos 123 participantes! \n Tu opinión será totalmente anónima. \n ¿Cómo sanar las heridas del conflicto armado? Cuéntanos qué piensas con un texto.');
        await client.sendText(message.from, 'Consulte los términos y condiciones  Mapa de SaNaciones en el sitio web www.museodememoria.gov.co/sanaciones');
        await client.sendText(message.from, '¿Quieres participar? \n*1* Sí, quiero participar.\n*2* No, quiero volver.');
      }
      else if (message.content === '3')
      {
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'plataforma'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, 'Otra de las plataformas en la q que desarrollamos la Exposición de SaNaciones es la plataforma web., donde podrás complementar los contenidos de cada uno de los caminos de la exposición. Vas a encontrar contenidos más extensos y diferentes elementos multimedia.');
        await client.sendText(message.from, '⚠️ Te recuerdo que es una página externa y el consumo de los datos en tu celular puede ser alta. Si no puedes hacerlo ahora, te recomiendo la visites cuando tu celular esté conectado a una red WI-FI para que puedas el resto de contenido que está genial.');
        await client.sendText(message.from, 'SaNaciones: diálogos de la memoria \nhttps://museodelamemoria.gov.co/sanaciones');
        await client.sendText(message.from, "👇🏽 🔢 ↔️ O si prefieres continuar conversando de la exposición: \n*1* ¿Qué es SaNaciones? \n*2* Caminos de la exposición \n*3* Participa en el mapa de SaNaciones")  
        
      } 
      else{
        await client.sendText(message.from, '*SaNaciones: diálogos de la memoria* es una exposición que invita a comprender el territorio como víctima y a reconocer las violencias que han sufrido las comunidades étnicas desde hace siglos. También exalta su capacidad organizativa y cuestiona el lugar que han ocupado en nuestra nación. Esta exposición fue construida de manera participativa y colectiva *con diez comunidades indígenas víctimas del conflicto armado.*' );
        await client.sendText(message.from, 'Te mencioné que SaNaciones es una una exposición *MULTIPLATAFORMA, TRANSMEDIA e ITINERANTE*, esto quiere decir que tiene varias plataformas físicas y virtuales: 🖥️ una curaduría en la página web del Museo, 🎒 una maleta con material didáctico, 🚚 una unidad móvil que recorrerá varios territorios con actividades artísticas, culturales y pedagógicas, y 🤖 este bot de WhatsApp.');
        await client.sendText(message.from, '👇🏽 🔢 ↔️ Más de SaNaciones:\n*1* Caminos de la exposición\n*2* Participa de la exposición\n *3* Plataforma virtual');
      }
     
    } /*
    else if(r.data.state === 'saludos'){
      if(message.content === '1'){
        await client.sendText(message.from, '*B* Mapa de ubicación de los pueblos indígenas\n*1* Atrás\n*2* Volver al inicio');
      }
      else if(message.content === '2'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'disposicion'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, "*Disposición al diálogo* \nLa palabra sin acción es vacía, la acción sin palabra es ciega, la palabra y la acción por fuera del espíritu de la comunidad son la muerte -Pensamiento Nasa.\n\nEl diálogo permite construir la memoria histórica y es un camino para sanar.")  
        await client.sendText(message.from, "Esta exposición es el resultado de un diálogo entre el Museo de Memoria de Colombia y los pueblos indígenas que participaron.")  
        await client.sendText(message.from, "Estar dispuestos a dialogar nos permite transformar imaginarios sobre los otros y reconocer que a pesar de nuestras diferencias podemos convivir y aprender de los demás. Para esto necesitamos crear acuerdos basados en el respeto, la tolerancia y la defensa de la vida. El diálogo es un pilar fundamental en la cosmogonía de los pueblos indígenas. Está presente en todos los ámbitos de la vida y es esencial en sus procesos de sanación.")  
        await client.sendText(message.from, "Los pueblos indígenas nos saludan e invitan al diálogo: 👇🏽 🔢\n ⤵️ \n\n*1* Saludos de pueblos indigenas 🌄 = 1.4MB\n*2* Mapa de los pueblos indigenas 🗺️ = 2MB")  
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*3 📍Disposición al diálogo* \n*4* Territorios \n*5* Resistencias históricas de los pueblos indígenas \n*6* La fuerza de lo colectivo \n*7* Naciones \n*8* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*9* ¿Qué es SaNaciones? \n*10* 📍Caminos de la exposición \n*11*  Participa de la exposición")  
      }
      else if(message.content === '3'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: ''}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, 'Ahora para continuar lee el menu de cada sección, escribe y envíame solo el número de la opción que más te interese; por ejemplo: 3 👇🏽 🔢\n *1* ¿Qué es SaNaciones?\n *2* Caminos de la exposición\n *3* Participa de la exposición');
      }
      else{
        await client.sendText(message.from, '👇🏽 🔢 ↔️ Continúa en Disposición al diálogo:\n*2* Mapa de los pueblos indigenas 🗺️ = 2MB');
        await client.sendText(message.from, '↩️ Más de Caminos de SaNaciones:\n*3* 📍Disposición al diálogo\n*4* Territorios\n*5* Resistencias históricas de los pueblos indígenas\n*6* La fuerza de lo colectivo\n*7* Naciones\n*8* Arte y sanación');
        await client.sendText(message.from, '🛖 Inicio:\n*8* ¿Qué es SaNaciones?\n*9* 📍Caminos de la exposición\n*10* Participa de la exposición');        
      }
    }*/

    else if(r.data.state === 'disposicion'){

      if(message.content === '1'){
        await client.sendText(message.from, '*Saludos de los pueblos indígenas*')
        await client.sendImage(message.from, './assets/saludos/1.jpg', '', '');
        await client.sendImage(message.from, './assets/saludos/2.jpg', '', '');
        await client.sendImage(message.from, './assets/saludos/3.jpg', '', '');
        await client.sendImage(message.from, './assets/saludos/4.jpg', '', '');
        await client.sendImage(message.from, './assets/saludos/5.jpg', '', '');
        await client.sendText(message.from, '👇🏽 🔢 ↔️ Continúa en Disposición al diálogo:\n*2* Mapa de los pueblos indigenas 🗺️ = 2MB');
        await client.sendText(message.from, '↩️ Caminos de SaNaciones:\n*3* 📍Disposición al diálogo\n*4* Territorios\n*5* Resistencias históricas de los pueblos indígenas\n*6* La fuerza de lo colectivo\n*7* Naciones\n*8* Arte y sanación');
        await client.sendText(message.from, '🛖 Inicio:\n*9* ¿Qué es SaNaciones?\n*10* 📍Caminos de la exposición\n*11* Participa de la exposición\n *12* Plataforma virtual');
      } else if(message.content === '2') {
        await client.sendText(message.from, '*Mapa de los pueblos indígenas*')
        await client.sendImage(message.from, './assets/saludos/Mapa/01.jpg', '', '');
        await client.sendImage(message.from, './assets/saludos/Mapa/02.jpg', '', '');
        await client.sendImage(message.from, './assets/saludos/Mapa/03.jpg', '', '');
        await client.sendImage(message.from, './assets/saludos/Mapa/04.jpg', '', '');
        await client.sendImage(message.from, './assets/saludos/Mapa/05.jpg', '', '');
        await client.sendImage(message.from, './assets/saludos/Mapa/06.jpg', '', '');
        await client.sendImage(message.from, './assets/saludos/Mapa/07.jpg', '', '');
        await client.sendImage(message.from, './assets/saludos/Mapa/08.jpg', '', '');
        await client.sendImage(message.from, './assets/saludos/Mapa/09.jpg', '', '');
        await client.sendImage(message.from, './assets/saludos/Mapa/10.jpg', '', '');
        await client.sendImage(message.from, './assets/saludos/Mapa/11.jpg', '', '');
        await client.sendText(message.from, '👇🏽 🔢 ↔️ Continúa en Disposición al diálogo:\n*1* Saludos de los pueblos indigenas 🗺️ = 2MB');
        await client.sendText(message.from, '↩️ Más de Caminos de SaNaciones:\n*3* 📍Disposición al diálogo\n*4* Territorios\n*5* Resistencias históricas de los pueblos indígenas\n*6* La fuerza de lo colectivo\n*7* Naciones\n*8* Arte y sanación');
        await client.sendText(message.from, '🛖 Inicio:\n*8* ¿Qué es SaNaciones?\n*9* 📍Caminos de la exposición\n*10* Participa de la exposición\n *11* Plataforma virtual');
        /*
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'saludos'}).catch(err=>{
          console.log(err)
        })
        */
      } 
      else if(message.content === '3'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'disposicion'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, "*Disposición al diálogo* \nLa palabra sin acción es vacía, la acción sin palabra es ciega, la palabra y la acción por fuera del espíritu de la comunidad son la muerte -Pensamiento Nasa.\n\nEl diálogo permite construir la memoria histórica y es un camino para sanar.")  
        await client.sendText(message.from, "Esta exposición es el resultado de un diálogo entre el Museo de Memoria de Colombia y los pueblos indígenas que participaron.")  
        await client.sendText(message.from, "Estar dispuestos a dialogar nos permite transformar imaginarios sobre los otros y reconocer que a pesar de nuestras diferencias podemos convivir y aprender de los demás. Para esto necesitamos crear acuerdos basados en el respeto, la tolerancia y la defensa de la vida. El diálogo es un pilar fundamental en la cosmogonía de los pueblos indígenas. Está presente en todos los ámbitos de la vida y es esencial en sus procesos de sanación.")  
        await client.sendText(message.from, "Los pueblos indígenas nos saludan e invitan al diálogo: 👇🏽 🔢\n ⤵️ \n\n*1* Saludos de pueblos indigenas 🌄 = 1.4MB\n*2* Mapa de los pueblos indigenas 🗺️ = 2MB")  
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones:\n*3* 📍Disposición al diálogo\n*4* Territorios\n*5* Resistencias históricas de los pueblos indígenas\n*6* La fuerza de lo colectivo\n*7* Naciones\n*8* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*9* ¿Qué es SaNaciones? \n*10* 📍Caminos de la exposición \n*11*  Participa de la exposición\n *12* Plataforma virtual")  
      }
      else if(message.content === '4'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'Territorios'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, "*Territorios* \nPara los pueblos indígenas, el territorio representa la madre que da vida. Es un espacio espiritual que conecta con lo sagrado y permite ver las huellas que ha dejado el conflicto armado.")  
        await client.sendText(message.from, "En este camino verás y escucharás los lugares que habitan los pueblos indígenas. También conocerás obras de arte que reflexionan sobre el significado de estos territorios para sus comunidades. 👇🏽 🔢 \n⤵️ \n*1* Vivir y resistir como semillas \n*2* Tierras \n*3* Pueblo Wiwa 📺 + 🔈 = 3.4MB")  
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*4* Disposición al diálogo \n*5 📍Territorios* \n*6* Resistencias históricas de los pueblos indígenas \n*7* La fuerza de lo colectivo \n*8* Naciones \n*9* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*10* ¿Qué es SaNaciones? \n*11* 📍Caminos de la exposición \n*12*  Participa de la exposición\n *13* Plataforma virtual")  
      }
      else if(message.content === '5'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'resistencias'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, '*Resistencias históricas de los pueblos indígenas* \nLos pueblos indígenas y sus territorios han sido afectados desde hace siglos por distintos tipos de violencia. Algunas de ellas continúan todavía. En este camino encontrarás las memorias del pueblo Barí, del Catatumbo, y de los pueblos Uitoto Mnka, vhuuza (Okaina), Gaigoomj (Muinane) y Pnenicína (Bora), esencia del tabaco, la coca y la yuca dulce de La Chorrera, en Amazonas. Estos pueblos por poco fueron exterminados, pero hoy anhelan que no se repita y que puedan tejer una nueva historia. Para poder sanar, reinterpretan su memoria desde la palabra de vida, conocimiento y resistencia.');
        await client.sendText(message.from, '👇🏽 🔢 ⤵️\n*1* Sobrevivientes victoriosos \n*2* Ishtana resiste');
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*3 📍Disposición al diálogo* \n*4* Territorios \n*5* Resistencias históricas de los pueblos indígenas \n*6* La fuerza de lo colectivo \n*7* Naciones \n*8* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*9* ¿Qué es SaNaciones? \n*10* 📍Caminos de la exposición \n*11*  Participa de la exposición\n *12* Plataforma virtual")  
      }
      else if(message.content === '6'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'fuerza'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, '*La fuerza de lo colectivo* \nLos logros organizativos de los pueblos indígenas parten de las luchas y experiencias políticas de sus mayores. La defensa del territorio y el conocimiento espiritual se han transmitido de generación en generación. En este camino, los líderes y comunidades han entendido que unidos son más fuertes para enfrentar la violencia de actores armados legales e ilegales.');
        await client.sendText(message.from, 'En este camino verás cómo el pueblo Nasa, en el norte del Cauca, y el pueblo Awá, en Nariño, Putumayo y territorio ecuatoriano, han creado estrategias desde lo colectivo para resistir.');
        await client.sendText(message.from, '👇🏽 🔢 \n⤵️ \n*1* ¡Viva la guardia, viva la minga! \n*2* Rastrear la memoria');
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*3 📍Disposición al diálogo* \n*4* Territorios \n*5* Resistencias históricas de los pueblos indígenas \n*6* La fuerza de lo colectivo \n*7* Naciones \n*8* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*9* ¿Qué es SaNaciones? \n*10* 📍Caminos de la exposición \n*11*  Participa de la exposición\n *12* Plataforma virtual")  
      }
      else if(message.content === '7'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'naciones'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, '*Naciones* La Constitución de 1991 reconoce que hacemos parte de un país que reúne diferentes pueblos con identidades particulares, territorios definidos y derecho a la autodeterminación. Sin embargo, para los pueblos étnicos, la multiculturalidad es una realidad inacabada, pues aún luchan por la defensa de sus derechos, autonomía y soberanía. \nPara los pueblos indígenas la idea de nación recoge el territorio como ser vivo e implica la convivencia armónica entre la naturaleza y los seres humanos, pero también involucra la cosmovisión, la autonomía y la autodeterminación.');
        await client.sendText(message.from, '*Naciones Indigenas* Son proyectos de vida de algunos pueblos indígenas que habitan en Colombia, quienes nos llaman a interactuar y convivir con nuestras diferencias.');
        await client.sendText(message.from, '*1* Bari 🌄 = 1.2MB\n*2* Nasa 🌄 + 🔈 = 2.2MB\n*3* Awá 🌄 = 1.2MB\n*4* Pasto 📺 = 5.2MB\n*5* Kamantsa 📺 = 12.2MB');
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*6 📍Disposición al diálogo* \n*7* Territorios \n*8* Resistencias históricas de los pueblos indígenas \n*9* La fuerza de lo colectivo \n*10* Naciones \n*11* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*12* ¿Qué es SaNaciones? \n*13* 📍Caminos de la exposición \n*14*  Participa de la exposición\n *15* Plataforma virtual")  
        
      }
      else if(message.content === '8'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'Info_artista'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, '*Arte y sanación* En 2020, el Museo de Memoria de Colombia invitó a varios artistas a intervenir recibos de servicio público y periódicos con obras que reflexionaran sobre la sanación.');
        await client.sendText(message.from, "*1* Rafael Posso 🌄 + 🔈 = 1.4MB \n*2* Dayro Carrasquilla 🌄 + 🔈 = 2.2MB \n*3* Eusebio Siosi 🌄 + 🔈 = 4.6MB \n*4* Enosh Arias 🌄 + 🔈 = 2.2MB \n*5* Juana Alicia 🌄 + 🔈 = 1.8MB \n*6* Álvaro Barrios 🌄 + 🔈 = 2.1MB \n*7* Alexandra Gelis 🌄 + 🔈 = 2.2MB \n*8* Nohemí Pérez 🌄 + 🔈 = 4.6MB")  
        await client.sendText(message.from, "↩️ Más de Caminos de SaNaciones: \n*9* Disposición al diálogo \n*10* Territorios \n*11* Resistencias históricas de los pueblos indígenas \n*12* La fuerza de lo colectivo \n*13* Naciones \n*14 📍Arte y sanación*")  
        await client.sendText(message.from, "🛖 Inicio:\n*15* ¿Qué es SaNaciones? \n*16* 📍Caminos de la exposición \n*17*  Participa de la exposición\n *18* Plataforma virtual")   
      }
      else if(message.content === '9'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'Info'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, '*SaNaciones: diálogos de la memoria* es una exposición que invita a comprender el territorio como víctima y a reconocer las violencias que han sufrido las comunidades étnicas desde hace siglos. También exalta su capacidad organizativa y cuestiona el lugar que han ocupado en nuestra nación. Esta exposición fue construida de manera participativa y colectiva *con diez comunidades indígenas víctimas del conflicto armado.*' );
        await client.sendText(message.from, 'Te mencioné que SaNaciones es una una exposición *MULTIPLATAFORMA, TRANSMEDIA e ITINERANTE*, esto quiere decir que tiene varias plataformas físicas y virtuales: 🖥️ una curaduría en la página web del Museo, 🎒 una maleta con material didáctico, 🚚 una unidad móvil que recorrerá varios territorios con actividades artísticas, culturales y pedagógicas, y 🤖 este bot de WhatsApp.');
        await client.sendText(message.from, '👇🏽 🔢 ↔️ Más de SaNaciones:\n*1* Caminos de la exposición\n*2* Participa de la exposición\n *3* Plataforma virtual');
      }
      else if(message.content === '10'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'caminos'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, "En SaNaciones tenemos seis  caminos  para entender  las violencias que han sufrido los pueblos indígenas, las formas en quer las han enfrentado y tramitado.")
        await client.sendText(message.from, '👇🏽 🔢 ⤵️ \n\n*1* Disposición al diálogo\n*2* Territorios\n*3* Resistencias históricas de los pueblos indígenas\n*4* La fuerza de lo colectivo\n*5* Naciones\n*6* Arte y sanación');
        await client.sendText(message.from, '🛖 Inicio:\n*7* ¿Qué es SaNaciones?\n*8* 📍Caminos de la exposición\n*9* Participa de la exposición\n *10* Plataforma virtual');
      }
      else if(message.content === '11'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'participa'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, 'Entre todos creamos el mapa de la SaNación! Ya somos 123 participantes! \n Tu opinión será totalmente anónima. \n ¿Cómo sanar las heridas del conflicto armado? Cuéntanos qué piensas con un texto.');
        await client.sendText(message.from, 'Consulte los términos y condiciones  Mapa de SaNaciones en el sitio web www.museodememoria.gov.co/sanaciones');
        await client.sendText(message.from, '¿Quieres participar? \n*1* Sí, quiero participar.\n*2* No, quiero volver.');
      }
      else if (message.content === '12')
      {
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'plataforma'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, 'Otra de las plataformas en la q que desarrollamos la Exposición de SaNaciones es la plataforma web., donde podrás complementar los contenidos de cada uno de los caminos de la exposición. Vas a encontrar contenidos más extensos y diferentes elementos multimedia.');
        await client.sendText(message.from, '⚠️ Te recuerdo que es una página externa y el consumo de los datos en tu celular puede ser alta. Si no puedes hacerlo ahora, te recomiendo la visites cuando tu celular esté conectado a una red WI-FI para que puedas el resto de contenido que está genial.');
        await client.sendText(message.from, 'SaNaciones: diálogos de la memoria \nhttps://museodelamemoria.gov.co/sanaciones');
        await client.sendText(message.from, "👇🏽 🔢 ↔️ O si prefieres continuar conversando de la exposición: \n*1* ¿Qué es SaNaciones? \n*2* Caminos de la exposición \n*3* Participa en el mapa de SaNaciones")  
        
      } 
      else{
        await client.sendText(message.from, "*Disposición al diálogo* \nLa palabra sin acción es vacía, la acciń sin palabra es ciega, la palabra y la acción por fuera del espíritu de la comunidad son la muerte -Pensamiento Nasa.\n\nEl diálogo permite construir la memoria histórica y es un camino para sanar *Material adicional:* \n *A* Saludos de pueblos indígenas y frases fuerza\n *B* Mapa de ubicación de los pueblos indígenas\n *1* Atrás\n *2* Volver al inicio")  
        await client.sendText(message.from, "Esta exposición es el resultado de un diálogo entre el Museo de Memoria de Colombia y los pueblos indígenas que participaron.")  
        await client.sendText(message.from, "Estar dispuestos a dialogar nos permite transformar imaginarios sobre los otros y reconocer que a pesar de nuestras diferencias podemos convivir y aprender de los demás. Para esto necesitamos crear acuerdos basados en el respeto, la tolerancia y la defensa de la vida. El diálogo es un pilar fundamental en la cosmogonía de los pueblos indígenas. Está presente en todos los ámbitos de la vida y es esencial en sus procesos de sanación.")  
        await client.sendText(message.from, "Los pueblos indígenas nos saludan e invitan al diálogo: 👇🏽 🔢\n ⤵️ \n\n*1* Saludos de pueblos indigenas 🌄 = 1.4MB\n*2* Mapa de los pueblos indigenas 🗺️ = 2MB")  
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones:\n*3* 📍Disposición al diálogo\n*4* Territorios\n*5* Resistencias históricas de los pueblos indígenas\n*6* La fuerza de lo colectivo\n*7* Naciones\n*8* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*9* ¿Qué es SaNaciones? \n*10* 📍Caminos de la exposición \n*11*  Participa de la exposición\n *12* Plataforma virtual")  
      }
    }
    else if(r.data.state === 'Info_artista'){
      if(message.content === '1'){
        await client.sendImage(message.from, './assets/caminos/Arte/1/01.jpg', '', '');
        await client.sendImage(message.from, './assets/caminos/Arte/1/02.jpg', '', '');
        await client.sendImage(message.from, './assets/caminos/Arte/1/03.jpg', '', '');
        await client.sendImage(message.from, './assets/caminos/Arte/1/04.jpg', '', '');
        await client.sendImage(message.from, './assets/caminos/Arte/1/05.jpg', '', '');
        await client.sendImage(message.from, './assets/caminos/Arte/1/06.jpg', '', '');
        await client.sendImage(message.from, './assets/caminos/Arte/1/07.jpg', '', '');
        /*
        await client.sendImage(message.from, './assets/recibos/Álvaro Barrios-2.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Álvaro Barrios-3.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Álvaro Barrios-4.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Álvaro Barrios-5.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Álvaro Barrios-6.jpg', '', '');
        */
        await client.sendText(message.from, "👇🏽 🔢 \n↔️ Continúa en Arte y sanación: \n*1* Rafael Posso 🌄 + 🔈 = 1.4MB \n*2* Dayro Carrasquilla 🌄 + 🔈 = 2.2MB \n*3* Eusebio Siosi 🌄 + 🔈 = 4.6MB \n*4* Enosh Arias 🌄 + 🔈 = 2.2MB \n*5* Juana Alicia 🌄 + 🔈 = 1.8MB \n*6* Álvaro Barrios 🌄 + 🔈 = 2.1MB \n*7* Alexandra Gelis 🌄 + 🔈 = 2.2MB \n*8* Nohemí Pérez 🌄 + 🔈 = 4.6MB")  
        await client.sendText(message.from, "↩️ Más de Caminos de SaNaciones: \n*9* Disposición al diálogo \n*10* Territorios \n*11* Resistencias históricas de los pueblos indígenas \n*12* La fuerza de lo colectivo \n*13* Naciones \n*14 📍Arte y sanación*")  
        await client.sendText(message.from, "🛖 Inicio:\n*15* ¿Qué es SaNaciones? \n*16* 📍Caminos de la exposición \n*17*  Participa de la exposición\n *18* Plataforma virtual")   
      } else if(message.content === '2'){
        await client.sendImage(message.from, './assets/caminos/Arte/2/01.jpg', '', '');
        await client.sendImage(message.from, './assets/caminos/Arte/2/02.jpg', '', '');
        await client.sendImage(message.from, './assets/caminos/Arte/2/03.jpg', '', '');
        await client.sendImage(message.from, './assets/caminos/Arte/2/04.jpg', '', '');
        await client.sendImage(message.from, './assets/caminos/Arte/2/05.jpg', '', '');
        await client.sendImage(message.from, './assets/caminos/Arte/2/06.jpg', '', '');
        await client.sendImage(message.from, './assets/caminos/Arte/2/07.jpg', '', '');
        /*
        await client.sendImage(message.from, './assets/recibos/Dayro Carrasquilla-1.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Dayro Carrasquilla-2.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Dayro Carrasquilla-3.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Dayro Carrasquilla-4.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Dayro Carrasquilla-5.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Dayro Carrasquilla-6.jpg', '', '');
        */
        await client.sendText(message.from, "👇🏽 🔢 \n↔️ Continúa en Arte y sanación: \n*1* Rafael Posso 🌄 + 🔈 = 1.4MB \n*2* Dayro Carrasquilla 🌄 + 🔈 = 2.2MB \n*3* Eusebio Siosi 🌄 + 🔈 = 4.6MB \n*4* Enosh Arias 🌄 + 🔈 = 2.2MB \n*5* Juana Alicia 🌄 + 🔈 = 1.8MB \n*6* Álvaro Barrios 🌄 + 🔈 = 2.1MB \n*7* Alexandra Gelis 🌄 + 🔈 = 2.2MB \n*8* Nohemí Pérez 🌄 + 🔈 = 4.6MB")  
        await client.sendText(message.from, "↩️ Más de Caminos de SaNaciones: \n*9* Disposición al diálogo \n*10* Territorios \n*11* Resistencias históricas de los pueblos indígenas \n*12* La fuerza de lo colectivo \n*13* Naciones \n*14 📍Arte y sanación*")  
        await client.sendText(message.from, "🛖 Inicio:\n*15* ¿Qué es SaNaciones? \n*16* 📍Caminos de la exposición \n*17*  Participa de la exposición\n *18* Plataforma virtual")   
      } else if(message.content === '3'){
        await client.sendImage(message.from, './assets/caminos/Arte/3/01.jpg', '', '');
        await client.sendImage(message.from, './assets/caminos/Arte/3/02.jpg', '', '');
        await client.sendImage(message.from, './assets/caminos/Arte/3/03.jpg', '', '');
        await client.sendImage(message.from, './assets/caminos/Arte/3/04.jpg', '', '');
        await client.sendImage(message.from, './assets/caminos/Arte/3/05.jpg', '', '');
        await client.sendImage(message.from, './assets/caminos/Arte/3/06.jpg', '', '');
        await client.sendImage(message.from, './assets/caminos/Arte/3/07.jpg', '', '');
        /*
        await client.sendImage(message.from, './assets/recibos/Enosh Arias-1.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Enosh Arias-2.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Enosh Arias-3.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Enosh Arias-4.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Enosh Arias-5.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Enosh Arias-6.jpg', '', '');
        */
        await client.sendText(message.from, "👇🏽 🔢 \n↔️ Continúa en Arte y sanación: \n*1* Rafael Posso 🌄 + 🔈 = 1.4MB \n*2* Dayro Carrasquilla 🌄 + 🔈 = 2.2MB \n*3* Eusebio Siosi 🌄 + 🔈 = 4.6MB \n*4* Enosh Arias 🌄 + 🔈 = 2.2MB \n*5* Juana Alicia 🌄 + 🔈 = 1.8MB \n*6* Álvaro Barrios 🌄 + 🔈 = 2.1MB \n*7* Alexandra Gelis 🌄 + 🔈 = 2.2MB \n*8* Nohemí Pérez 🌄 + 🔈 = 4.6MB")  
        await client.sendText(message.from, "↩️ Más de Caminos de SaNaciones: \n*9* Disposición al diálogo \n*10* Territorios \n*11* Resistencias históricas de los pueblos indígenas \n*12* La fuerza de lo colectivo \n*13* Naciones \n*14 📍Arte y sanación*")  
        await client.sendText(message.from, "🛖 Inicio:\n*15* ¿Qué es SaNaciones? \n*16* 📍Caminos de la exposición \n*17*  Participa de la exposición\n *18* Plataforma virtual")   
      } else if(message.content === '4'){
        await client.sendImage(message.from, './assets/caminos/Arte/4/01.jpg', '', '');
        await client.sendImage(message.from, './assets/caminos/Arte/4/02.jpg', '', '');
        await client.sendImage(message.from, './assets/caminos/Arte/4/03.jpg', '', '');
        await client.sendImage(message.from, './assets/caminos/Arte/4/04.jpg', '', '');
        await client.sendImage(message.from, './assets/caminos/Arte/4/05.jpg', '', '');
        await client.sendImage(message.from, './assets/caminos/Arte/4/06.jpg', '', '');
        await client.sendImage(message.from, './assets/caminos/Arte/4/07.jpg', '', '');
        /*
        await client.sendImage(message.from, './assets/recibos/Eusebio Siosi Rosado-1.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Eusebio Siosi Rosado-2.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Eusebio Siosi Rosado-3.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Eusebio Siosi Rosado-4.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Eusebio Siosi Rosado-5.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Eusebio Siosi Rosado-6.jpg', '', '');
        */
        await client.sendText(message.from, "👇🏽 🔢 \n↔️ Continúa en Arte y sanación: \n*1* Rafael Posso 🌄 + 🔈 = 1.4MB \n*2* Dayro Carrasquilla 🌄 + 🔈 = 2.2MB \n*3* Eusebio Siosi 🌄 + 🔈 = 4.6MB \n*4* Enosh Arias 🌄 + 🔈 = 2.2MB \n*5* Juana Alicia 🌄 + 🔈 = 1.8MB \n*6* Álvaro Barrios 🌄 + 🔈 = 2.1MB \n*7* Alexandra Gelis 🌄 + 🔈 = 2.2MB \n*8* Nohemí Pérez 🌄 + 🔈 = 4.6MB")  
        await client.sendText(message.from, "↩️ Más de Caminos de SaNaciones: \n*9* Disposición al diálogo \n*10* Territorios \n*11* Resistencias históricas de los pueblos indígenas \n*12* La fuerza de lo colectivo \n*13* Naciones \n*14 📍Arte y sanación*")  
        await client.sendText(message.from, "🛖 Inicio:\n*15* ¿Qué es SaNaciones? \n*16* 📍Caminos de la exposición \n*17*  Participa de la exposición\n *18* Plataforma virtual")   
      } else if(message.content === '5'){
        await client.sendImage(message.from, './assets/caminos/Arte/5/01.jpg', '', '');
        await client.sendImage(message.from, './assets/caminos/Arte/5/02.jpg', '', '');
        await client.sendImage(message.from, './assets/caminos/Arte/5/03.jpg', '', '');
        await client.sendImage(message.from, './assets/caminos/Arte/5/04.jpg', '', '');
        await client.sendImage(message.from, './assets/caminos/Arte/5/05.jpg', '', '');
        await client.sendImage(message.from, './assets/caminos/Arte/5/06.jpg', '', '');
        await client.sendImage(message.from, './assets/caminos/Arte/5/07.jpg', '', '');
        /*
        await client.sendImage(message.from, './assets/recibos/Juana Ruiz Hernández-1.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Juana Ruiz Hernández-2.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Juana Ruiz Hernández-3.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Juana Ruiz Hernández-4.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Juana Ruiz Hernández-5.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Juana Ruiz Hernández-6.jpg', '', '');
        */
        await client.sendText(message.from, "👇🏽 🔢 \n↔️ Continúa en Arte y sanación: \n*1* Rafael Posso 🌄 + 🔈 = 1.4MB \n*2* Dayro Carrasquilla 🌄 + 🔈 = 2.2MB \n*3* Eusebio Siosi 🌄 + 🔈 = 4.6MB \n*4* Enosh Arias 🌄 + 🔈 = 2.2MB \n*5* Juana Alicia 🌄 + 🔈 = 1.8MB \n*6* Álvaro Barrios 🌄 + 🔈 = 2.1MB \n*7* Alexandra Gelis 🌄 + 🔈 = 2.2MB \n*8* Nohemí Pérez 🌄 + 🔈 = 4.6MB")  
        await client.sendText(message.from, "↩️ Más de Caminos de SaNaciones: \n*9* Disposición al diálogo \n*10* Territorios \n*11* Resistencias históricas de los pueblos indígenas \n*12* La fuerza de lo colectivo \n*13* Naciones \n*14 📍Arte y sanación*")  
        await client.sendText(message.from, "🛖 Inicio:\n*15* ¿Qué es SaNaciones? \n*16* 📍Caminos de la exposición \n*17*  Participa de la exposición\n *18* Plataforma virtual")   
      } else if(message.content === '6'){
        await client.sendImage(message.from, './assets/caminos/Arte/6/01.jpg', '', '');
        await client.sendImage(message.from, './assets/caminos/Arte/6/02.jpg', '', '');
        await client.sendImage(message.from, './assets/caminos/Arte/6/03.jpg', '', '');
        await client.sendImage(message.from, './assets/caminos/Arte/6/04.jpg', '', '');
        await client.sendImage(message.from, './assets/caminos/Arte/6/05.jpg', '', '');
        await client.sendImage(message.from, './assets/caminos/Arte/6/06.jpg', '', '');
        await client.sendImage(message.from, './assets/caminos/Arte/6/07.jpg', '', '');
        /*
        await client.sendImage(message.from, './assets/recibos/Nohemi Pérez-1.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Nohemi Pérez-2.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Nohemi Pérez-3.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Nohemi Pérez-4.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Nohemi Pérez-5.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Nohemi Pérez-6.jpg', '', '');
        */
        await client.sendText(message.from, "👇🏽 🔢 \n↔️ Continúa en Arte y sanación: \n*1* Rafael Posso 🌄 + 🔈 = 1.4MB \n*2* Dayro Carrasquilla 🌄 + 🔈 = 2.2MB \n*3* Eusebio Siosi 🌄 + 🔈 = 4.6MB \n*4* Enosh Arias 🌄 + 🔈 = 2.2MB \n*5* Juana Alicia 🌄 + 🔈 = 1.8MB \n*6* Álvaro Barrios 🌄 + 🔈 = 2.1MB \n*7* Alexandra Gelis 🌄 + 🔈 = 2.2MB \n*8* Nohemí Pérez 🌄 + 🔈 = 4.6MB")  
        await client.sendText(message.from, "↩️ Más de Caminos de SaNaciones: \n*9* Disposición al diálogo \n*10* Territorios \n*11* Resistencias históricas de los pueblos indígenas \n*12* La fuerza de lo colectivo \n*13* Naciones \n*14 📍Arte y sanación*")  
        await client.sendText(message.from, "🛖 Inicio:\n*15* ¿Qué es SaNaciones? \n*16* 📍Caminos de la exposición \n*17*  Participa de la exposición\n *18* Plataforma virtual")   
      } else if(message.content === '7'){
        await client.sendImage(message.from, './assets/caminos/Arte/7/01.jpg', '', '');
        await client.sendImage(message.from, './assets/caminos/Arte/7/02.jpg', '', '');
        await client.sendImage(message.from, './assets/caminos/Arte/7/03.jpg', '', '');
        await client.sendImage(message.from, './assets/caminos/Arte/7/04.jpg', '', '');
        await client.sendImage(message.from, './assets/caminos/Arte/7/05.jpg', '', '');
        await client.sendImage(message.from, './assets/caminos/Arte/7/06.jpg', '', '');
        await client.sendImage(message.from, './assets/caminos/Arte/7/07.jpg', '', '');
        /*
        await client.sendImage(message.from, './assets/recibos/Rafael Posso-1.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Rafael Posso-2.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Rafael Posso-3.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Rafael Posso-4.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Rafael Posso-5.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Rafael Posso-6.jpg', '', '');
        */
        await client.sendText(message.from, "👇🏽 🔢 \n↔️ Continúa en Arte y sanación: \n*1* Rafael Posso 🌄 + 🔈 = 1.4MB \n*2* Dayro Carrasquilla 🌄 + 🔈 = 2.2MB \n*3* Eusebio Siosi 🌄 + 🔈 = 4.6MB \n*4* Enosh Arias 🌄 + 🔈 = 2.2MB \n*5* Juana Alicia 🌄 + 🔈 = 1.8MB \n*6* Álvaro Barrios 🌄 + 🔈 = 2.1MB \n*7* Alexandra Gelis 🌄 + 🔈 = 2.2MB \n*8* Nohemí Pérez 🌄 + 🔈 = 4.6MB")  
        await client.sendText(message.from, "↩️ Más de Caminos de SaNaciones: \n*9* Disposición al diálogo \n*10* Territorios \n*11* Resistencias históricas de los pueblos indígenas \n*12* La fuerza de lo colectivo \n*13* Naciones \n*14 📍Arte y sanación*")  
        await client.sendText(message.from, "🛖 Inicio:\n*15* ¿Qué es SaNaciones? \n*16* 📍Caminos de la exposición \n*17*  Participa de la exposición\n *18* Plataforma virtual")   
      } 
      else if(message.content === '8'){
        await client.sendImage(message.from, './assets/caminos/Arte/8/01.jpg', '', '');
        await client.sendImage(message.from, './assets/caminos/Arte/8/02.jpg', '', '');
        await client.sendImage(message.from, './assets/caminos/Arte/8/03.jpg', '', '');
        await client.sendImage(message.from, './assets/caminos/Arte/8/04.jpg', '', '');
        await client.sendImage(message.from, './assets/caminos/Arte/8/05.jpg', '', '');
        await client.sendImage(message.from, './assets/caminos/Arte/8/06.jpg', '', '');
        await client.sendImage(message.from, './assets/caminos/Arte/8/07.jpg', '', '');
        /*
        await client.sendImage(message.from, './assets/recibos/Alexandra Gelis-1.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Alexandra Gelis-2.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Alexandra Gelis-3.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Alexandra Gelis-4.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Alexandra Gelis-5.jpg', '', '');
        await client.sendImage(message.from, './assets/recibos/Alexandra Gelis-6.jpg', '', '');
        */
        await client.sendText(message.from, "👇🏽 🔢 \n↔️ Continúa en Arte y sanación: \n*1* Rafael Posso 🌄 + 🔈 = 1.4MB \n*2* Dayro Carrasquilla 🌄 + 🔈 = 2.2MB \n*3* Eusebio Siosi 🌄 + 🔈 = 4.6MB \n*4* Enosh Arias 🌄 + 🔈 = 2.2MB \n*5* Juana Alicia 🌄 + 🔈 = 1.8MB \n*6* Álvaro Barrios 🌄 + 🔈 = 2.1MB \n*7* Alexandra Gelis 🌄 + 🔈 = 2.2MB \n*8* Nohemí Pérez 🌄 + 🔈 = 4.6MB")  
        await client.sendText(message.from, "↩️ Más de Caminos de SaNaciones: \n*9* Disposición al diálogo \n*10* Territorios \n*11* Resistencias históricas de los pueblos indígenas \n*12* La fuerza de lo colectivo \n*13* Naciones \n*14 📍Arte y sanación*")  
        await client.sendText(message.from, "🛖 Inicio:\n*15* ¿Qué es SaNaciones? \n*16* 📍Caminos de la exposición \n*17*  Participa de la exposición\n *18* Plataforma virtual")   
      }
      else if(message.content === '9'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'disposicion'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, "*Disposición al diálogo* \nLa palabra sin acción es vacía, la acciń sin palabra es ciega, la palabra y la acción por fuera del espíritu de la comunidad son la muerte -Pensamiento Nasa.\n\nEl diálogo permite construir la memoria histórica y es un camino para sanar *Material adicional:* \n *A* Saludos de pueblos indígenas y frases fuerza\n *B* Mapa de ubicación de los pueblos indígenas\n *1* Atrás\n *2* Volver al inicio")  
        await client.sendText(message.from, "Esta exposición es el resultado de un diálogo entre el Museo de Memoria de Colombia y los pueblos indígenas que participaron.")  
        await client.sendText(message.from, "Estar dispuestos a dialogar nos permite transformar imaginarios sobre los otros y reconocer que a pesar de nuestras diferencias podemos convivir y aprender de los demás. Para esto necesitamos crear acuerdos basados en el respeto, la tolerancia y la defensa de la vida. El diálogo es un pilar fundamental en la cosmogonía de los pueblos indígenas. Está presente en todos los ámbitos de la vida y es esencial en sus procesos de sanación.")  
        await client.sendText(message.from, "Los pueblos indígenas nos saludan e invitan al diálogo: 👇🏽 🔢\n ⤵️ \n\n*1* Saludos de pueblos indigenas 🌄 = 1.4MB\n*2* Mapa de los pueblos indigenas 🗺️ = 2MB")  
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones:\n*3* 📍Disposición al diálogo\n*4* Territorios\n*5* Resistencias históricas de los pueblos indígenas\n*6* La fuerza de lo colectivo\n*7* Naciones\n*8* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*9* ¿Qué es SaNaciones? \n*10* 📍Caminos de la exposición \n*11*  Participa de la exposición\n *12* Plataforma virtual")  
      }
      else if(message.content === '10'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'territorios'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, "*Territorios* \nPara los pueblos indígenas, el territorio representa la madre que da vida. Es un espacio espiritual que conecta con lo sagrado y permite ver las huellas que ha dejado el conflicto armado.")  
        await client.sendText(message.from, "En este camino verás y escucharás los lugares que habitan los pueblos indígenas. También conocerás obras de arte que reflexionan sobre el significado de estos territorios para sus comunidades. 👇🏽 🔢 \n⤵️ \n*1* Vivir y resistir como semillas \n*2* Tierras \n*3* Pueblo Wiwa 📺 + 🔈 = 3.4MB")  
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*4* Disposición al diálogo \n*5 📍Territorios* \n*6* Resistencias históricas de los pueblos indígenas \n*7* La fuerza de lo colectivo \n*8* Naciones \n*9* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*10* ¿Qué es SaNaciones? \n*11* 📍Caminos de la exposición \n*12*  Participa de la exposición\n *13* Plataforma virtual")  
      }
      else if(message.content === '11'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'resistencias'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, '*Resistencias históricas de los pueblos indígenas* \nLos pueblos indígenas y sus territorios han sido afectados desde hace siglos por distintos tipos de violencia. Algunas de ellas continúan todavía. En este camino encontrarás las memorias del pueblo Barí, del Catatumbo, y de los pueblos Uitoto Mnka, vhuuza (Okaina), Gaigoomj (Muinane) y Pnenicína (Bora), esencia del tabaco, la coca y la yuca dulce de La Chorrera, en Amazonas. Estos pueblos por poco fueron exterminados, pero hoy anhelan que no se repita y que puedan tejer una nueva historia. Para poder sanar, reinterpretan su memoria desde la palabra de vida, conocimiento y resistencia.');
        await client.sendText(message.from, '👇🏽 🔢 ⤵️\n*1* Sobrevivientes victoriosos \n*2* Ishtana resiste');
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*3 📍Disposición al diálogo* \n*4* Territorios \n*5* Resistencias históricas de los pueblos indígenas \n*6* La fuerza de lo colectivo \n*7* Naciones \n*8* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*9* ¿Qué es SaNaciones? \n*10* 📍Caminos de la exposición \n*11*  Participa de la exposición\n *18* Plataforma virtual")  
      }
      else if(message.content === '12'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'fuerza'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, '*La fuerza de lo colectivo* \nLos logros organizativos de los pueblos indígenas parten de las luchas y experiencias políticas de sus mayores. La defensa del territorio y el conocimiento espiritual se han transmitido de generación en generación. En este camino, los líderes y comunidades han entendido que unidos son más fuertes para enfrentar la violencia de actores armados legales e ilegales.');
        await client.sendText(message.from, 'En este camino verás cómo el pueblo Nasa, en el norte del Cauca, y el pueblo Awá, en Nariño, Putumayo y territorio ecuatoriano, han creado estrategias desde lo colectivo para resistir.');
        await client.sendText(message.from, '👇🏽 🔢 \n⤵️ \n*1* ¡Viva la guardia, viva la minga! \n*2* Rastrear la memoria');
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*3 📍Disposición al diálogo* \n*4* Territorios \n*5* Resistencias históricas de los pueblos indígenas \n*6* La fuerza de lo colectivo \n*7* Naciones \n*8* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*9* ¿Qué es SaNaciones? \n*10* 📍Caminos de la exposición \n*11*  Participa de la exposición\n *19* Plataforma virtual")  
      }
      else if(message.content === '13'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'naciones'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, '*Naciones* La Constitución de 1991 reconoce que hacemos parte de un país que reúne diferentes pueblos con identidades particulares, territorios definidos y derecho a la autodeterminación. Sin embargo, para los pueblos étnicos, la multiculturalidad es una realidad inacabada, pues aún luchan por la defensa de sus derechos, autonomía y soberanía. \nPara los pueblos indígenas la idea de nación recoge el territorio como ser vivo e implica la convivencia armónica entre la naturaleza y los seres humanos, pero también involucra la cosmovisión, la autonomía y la autodeterminación.');
        await client.sendText(message.from, '*Naciones Indigenas* Son proyectos de vida de algunos pueblos indígenas que habitan en Colombia, quienes nos llaman a interactuar y convivir con nuestras diferencias.');
        await client.sendText(message.from, '*1* Bari 🌄 = 1.2MB\n*2* Nasa 🌄 + 🔈 = 2.2MB\n*3* Awá 🌄 = 1.2MB\n*4* Pasto 📺 = 5.2MB\n*5* Kamantsa 📺 = 12.2MB');
        await client.sendText(message.from, "↔️ Continúa en Caminos de SaNaciones: \n*6 📍Disposición al diálogo* \n*7* Territorios \n*8* Resistencias históricas de los pueblos indígenas \n*9* La fuerza de lo colectivo \n*10* Naciones \n*11* Arte y sanación")  
        await client.sendText(message.from, "🛖 Inicio:\n*12* ¿Qué es SaNaciones? \n*13* 📍Caminos de la exposición \n*14*  Participa de la exposición\n *15* Plataforma virtual")  
        
      }
      else if(message.content === '14'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'Info_artista'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, '*Arte y sanación* En 2020, el Museo de Memoria de Colombia invitó a varios artistas a intervenir recibos de servicio público y periódicos con obras que reflexionaran sobre la sanación.');
        await client.sendText(message.from, "👇🏽 🔢 \n*1* Álvaro Barrios 🌄 + 🔈 = 2.1MB \n*2* Dayro Carrasquilla 🌄 + 🔈 = 2.2MB \n*3* Enosh Arias 🌄 + 🔈 = 3.6MB \n*4* Eusebio Siosi 🌄 + 🔈 = 4.6MB \n*5* Juana Ruiz 🌄 + 🔈 = 1.8MB \n*6* Nohemí Pérez 🌄 + 🔈 = 4.6MB\n*7* Rafaél Posso 🌄 + 🔈 = 2.2MB\n*8* Alexandra Gelis 🌄 + 🔈 = 4.6MB")  
        await client.sendText(message.from, "↩️ Más de Caminos de SaNaciones: \n*9* Disposición al diálogo \n*10* Territorios \n*11* Resistencias históricas de los pueblos indígenas \n*12* La fuerza de lo colectivo \n*13* Naciones \n*14 📍Arte y sanación*")  
        await client.sendText(message.from, "🛖 Inicio:\n*15* ¿Qué es SaNaciones? \n*16* 📍Caminos de la exposición \n*17*  Participa de la exposición\n *18* Plataforma virtual")   
      }
      else if(message.content === '15'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'Info'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, '*SaNaciones: diálogos de la memoria* es una exposición que invita a comprender el territorio como víctima y a reconocer las violencias que han sufrido las comunidades étnicas desde hace siglos. También exalta su capacidad organizativa y cuestiona el lugar que han ocupado en nuestra nación. Esta exposición fue construida de manera participativa y colectiva *con diez comunidades indígenas víctimas del conflicto armado.*' );
        await client.sendText(message.from, 'Te mencioné que SaNaciones es una una exposición *MULTIPLATAFORMA, TRANSMEDIA e ITINERANTE*, esto quiere decir que tiene varias plataformas físicas y virtuales: 🖥️ una curaduría en la página web del Museo, 🎒 una maleta con material didáctico, 🚚 una unidad móvil que recorrerá varios territorios con actividades artísticas, culturales y pedagógicas, y 🤖 este bot de WhatsApp.');
        await client.sendText(message.from, '👇🏽 🔢 ↔️ Más de SaNaciones:\n*1* Caminos de la exposición\n*2* Participa de la exposición\n *3* Plataforma virtual');
      }
      else if(message.content === '16'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'caminos'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, "En SaNaciones tenemos seis  caminos  para entender  las violencias que han sufrido los pueblos indígenas, las formas en quer las han enfrentado y tramitado.")
        await client.sendText(message.from, '👇🏽 🔢 ⤵️ \n\n*1* Disposición al diálogo\n*2* Territorios\n*3* Resistencias históricas de los pueblos indígenas\n*4* La fuerza de lo colectivo\n*5* Naciones\n*6* Arte y sanación');
        await client.sendText(message.from, '🛖 Inicio:\n*7* ¿Qué es SaNaciones?\n*8* 📍Caminos de la exposición\n*9* Participa de la exposición\n *10* Plataforma virtual');
      }
      else if(message.content === '17'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'participa'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, 'Entre todos creamos el mapa de la SaNación! Ya somos 123 participantes! \n Tu opinión será totalmente anónima. \n ¿Cómo sanar las heridas del conflicto armado? Cuéntanos qué piensas con un texto.');
        await client.sendText(message.from, 'Consulte los términos y condiciones  Mapa de SaNaciones en el sitio web www.museodememoria.gov.co/sanaciones');
        await client.sendText(message.from, '¿Quieres participar? \n*1* Sí, quiero participar.\n*2* No, quiero volver.');
      }
      else if (message.content === '18')
      {
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'plataforma'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, 'Otra de las plataformas en la q que desarrollamos la Exposición de SaNaciones es la plataforma web., donde podrás complementar los contenidos de cada uno de los caminos de la exposición. Vas a encontrar contenidos más extensos y diferentes elementos multimedia.');
        await client.sendText(message.from, '⚠️ Te recuerdo que es una página externa y el consumo de los datos en tu celular puede ser alta. Si no puedes hacerlo ahora, te recomiendo la visites cuando tu celular esté conectado a una red WI-FI para que puedas el resto de contenido que está genial.');
        await client.sendText(message.from, 'SaNaciones: diálogos de la memoria \nhttps://museodelamemoria.gov.co/sanaciones');
        await client.sendText(message.from, "👇🏽 🔢 ↔️ O si prefieres continuar conversando de la exposición: \n*1* ¿Qué es SaNaciones? \n*2* Caminos de la exposición \n*3* Participa en el mapa de SaNaciones")  
        
      } 
      else{
        await client.sendText(message.from, "👇🏽 🔢 \n↔️ Continúa en Arte y sanación: \n*1* Rafael Posso 🌄 + 🔈 = 1.4MB \n*2* Dayro Carrasquilla 🌄 + 🔈 = 2.2MB \n*3* Eusebio Siosi 🌄 + 🔈 = 4.6MB \n*4* Enosh Arias 🌄 + 🔈 = 2.2MB \n*5* Juana Alicia 🌄 + 🔈 = 1.8MB \n*6* Álvaro Barrios 🌄 + 🔈 = 2.1MB \n*7* Alexandra Gelis 🌄 + 🔈 = 2.2MB \n*8* Nohemí Pérez 🌄 + 🔈 = 4.6MB")  
        await client.sendText(message.from, "↩️ Más de Caminos de SaNaciones: \n*9* Disposición al diálogo \n*10* Territorios \n*11* Resistencias históricas de los pueblos indígenas \n*12* La fuerza de lo colectivo \n*13* Naciones \n*14 📍Arte y sanación*")  
        await client.sendText(message.from, "🛖 Inicio:\n*15* ¿Qué es SaNaciones? \n*16* 📍Caminos de la exposición \n*17*  Participa de la exposición\n *18* Plataforma virtual")   
      //  await client.sendText(message.from, 'Descripción de la plataforma en dos líneas de texto y una imágen\n http://museodememoria.gov.co/sanaciones/#/\n*1* Atrás\n*2* Volver al inicio')
      }
    } 
    /*
    else if(r.data.state === 'Info_expo'){
      if(message.content === '1'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'caminos'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, "En SaNaciones tenemos seis  caminos  para entender  las violencias que han sufrido los pueblos indígenas, las formas en quer las han enfrentado y tramitado.")
        await client.sendText(message.from, '👇🏽 🔢 ⤵️ \n\n*1* Disposición al diálogo\n*2* Territorios\n*3* Resistencias históricas de los pueblos indígenas\n*4* La fuerza de lo colectivo\n*5* Naciones\n*6* Arte y sanación');
        await client.sendText(message.from, '🛖 Inicio:\n*7* ¿Qué es SaNaciones?\n*8* 📍Caminos de la exposición\n*9* Participa de la exposición\n *10* Plataforma virtual');
      }
      else if (message.content === '2'){
          await axios.post(apiUrl + "/update-status", {from: message.from, state: 'participa'}).catch(err=>{
            console.log(err)
          })
          await client.sendText(message.from, 'Entre todos creamos el mapa de la SaNación! Ya somos 123 participantes! \n Tu opinión será totalmente anónima. \n ¿Cómo sanar las heridas del conflicto armado? Cuéntanos qué piensas con un texto.');
          await client.sendText(message.from, 'Consulte los términos y condiciones  Mapa de SaNaciones en el sitio web www.museodememoria.gov.co/sanaciones');
          await client.sendText(message.from, '¿Quieres participar? \n*1* Sí, quiero participar.\n*2* No, quiero volver.');
      }
       else {
        await client.sendText(message.from, 'La exposición está organizada en cinco ejes narrativos:\n*1* Disposición al diálogo\n*2* Territorios \n*3* Larga duración (disponible desde el 30 de octubre)\n*4* La fuerza de lo colectivo (disponible desde el 6 de noviembre)\n*5* Naciones (disponible desde el 6 de noviembre)');
        
      }
    } */
    /*
    else if(r.data.state === 'Info_expo_1'){
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
      } else if(message.content === '3'){
        await client.sendText(message.from, 'La exposición está organizada en cinco ejes narrativos:\n*1* Disposición al diálogo\n*2* Territorios \n*3* Larga duración (disponible desde el 30 de octubre)\n*4* La fuerza de lo colectivo (disponible desde el 6 de noviembre)\n*5* Naciones (disponible desde el 6 de noviembre)');
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'Info_expo'}).catch(err=>{
          console.log(err) })
      }
       else {
        await client.sendText(message.from, 'Piezas:\n*1* Saludos de los pueblos indígenas\n*2* Audio Murui\n*3* Volver al menú anterior.');
      }
      console.log("resp 3")
      await axios.post(apiUrl + "/update-status", {from: message.from, state: 'participa'}).catch(err=>{
        console.log(err)
      })
      await client.sendText(message.from, 'Entre todos creamos el mapa de la SaNación! Ya somos 123 participantes! \n Tu opinión será totalmente anónima. \n ¿Cómo sanar las heridas del conflicto armado? Cuéntanos qué piensas con un texto.');
      await client.sendText(message.from, 'Consulte los términos y condiciones  Mapa de SaNaciones en el sitio web www.museodememoria.gov.co/sanaciones');
      await client.sendText(message.from, '¿Quieres participar? \n*1* Sí, quiero participar.\n*2* No, quiero volver.');
      
    }
    */
    else if(r.data.state === 'participa') {
      if(message.content === '1'){
        await client.sendText(message.from, 'Excelente! Entendemos que leíste y aceptas los término y condiciones del ejercicio');
        await client.sendText(message.from, 'Consulte los términos y condiciones  Mapa de SaNaciones en el sitio web www.museodememoria.gov.co/sanaciones');
        await client.sendText(message.from, '¿Con qué nombre quieres aparecer? Puede ser el nombre que prefieras o un seudónimo \n Ejemplo: Angelita');
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'esperando_nom'}).catch(err=>{
          console.log(err)
        })
      } 
      else if(message.content === '2'){
        await client.sendText(message.from, 'Te invitamos a que continúes explorando _SaNaciones: diálogos de la memoria_ Esperamos contar con tus aportes en otra oportunidad.')
        await axios.post(apiUrl + "/update-status", {from: message.from, state: ''}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, 'Ahora para continuar lee el menu de cada sección, escribe y envíame solo el número de la opción que más te interese; por ejemplo: 3 👇🏽 🔢\n *1* ¿Qué es SaNaciones?\n *2* Caminos de la exposición\n *3* Participa de la exposición');
      } 
      else {
        await client.sendText(message.from, 'Entre todos creamos el mapa de la SaNación! Ya somos 123 participantes! \n Tu opinión será totalmente anónima. \n ¿Cómo sanar las heridas del conflicto armado? Cuéntanos qué piensas con un texto.');
        await client.sendText(message.from, '¿Quieres participar? \n*1* Sí, quiero participar.\n*2* No, quiero volver.');
      }
    } 
    
    else if(r.data.state === 'esperando_nom') {
      if(message.type === 'chat' && message.content !== '1') {
        const resp = await axios.post(apiUrl + "/update-status", {from: message.from, state: 'esperando_loc', name_string: json_['content']}).catch(err=>{
          console.log('error esperando el nombre')
        })
        
        await client.sendText(message.from, json_['content'] +', ¿Desde qué país, y desde qué municipio o ciudad nos escribes?, recuerda que no publicaremos tu ubicación exacta Ejemplo: Leticia');
              
    /*
        var mailOptions = {
          from: 'ssanchezola@gmail.com',
          to: 'ruth.sanchez@cnmh.gov.co',
          subject: json_['content'] + ' SaNaciones 2021',
          text: 'That was easy!'
        };

        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
    */

      } 
      
      else if(message.type === 'chat' && message.content === '1') {
        let suma = r.data;
        const resp = await axios.post(apiUrl + "/update-status", {from: message.from, state: 'participa'}).catch(err=>{         
          console.log('error esperando respuesta')})
        await client.sendText(message.from, 'Entre todos creamos el mapa de la SaNación! Ya somos 18 participantes! \n Tu opinión será totalmente anónima. \n ¿Cómo sanar las heridas del conflicto armado? Cuéntanos qué piensas con un texto.');
        await client.sendText(message.from, 'Consulte los términos y condiciones  Mapa de SaNaciones en el sitio web www.museodememoria.gov.co/sanaciones');
        await client.sendText(message.from, '¿Quieres participar? \n*1* Sí, quiero participar.\n*2* No, quiero volver.');
        } 
      else {
        await client.sendText(message.from, '¿Cómo te llamas?');
      }
    } 

    else if(r.data.state === 'esperando_loc') {
      if(message.type === 'chat' && message.content !== '1') {
        const resp = await axios.post(apiUrl + "/update-status", {from: message.from, state: 'esperando_loc', location_string: json_['content']}).catch(err=>{
          console.log('fddfa')
        })

        await client.sendText(message.from, 'Hemos registrado tu ubicación como *'+ json_['content'] +'* , si no es correcto vuelve a enviar tu ubicación de lo contrario escribe *1*.');
      } 
      else if(message.type === 'chat' && message.content === '1') {
        const resp = await axios.post(apiUrl + "/update-status", {from: message.from, state: 'termina'}).catch(err=>{
          console.log('fddfa')
        })
  
        await client.sendText(message.from, 'Comparte con nosotros un texto con la respuesta a la pregunta ¿Cómo sanar las heridas del conflicto armado?');
      } 
      else {
        await client.sendText(message.from, '¿Dónde te encuentras?');
      }
    }
    
    else if(r.data.state === 'termina') {
      if(message.type === 'chat'){
        const r = await axios.post(apiUrl + "/crear-respuesta", json_).catch(err=>{
          console.log(err)
        })
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'terminado'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, 'Otra de las plataformas en las que desarrollamos la Exposición de SaNaciones es la plataforma web 🖥, donde podrás complementar los contenidos de cada uno de los Caminos de la exposición. Vas encontrar contenidos más extensos y diferentes elementos multimedia.');
        await client.sendText(message.from, ' ⚠ Te recuerdo que es una página externa y el consumo de los datos en tu celular puede ser alta. Si no puedes hacerlo ahora, te recomiendo la visites cuando tu celular esté conectado a una red WI-FI para que puedas el resto de contenido que está genial.');
        await client.sendText(message.from, 'SaNaciones: diálogos de la memoria https://museodelamemoria.gov.co/sanaciones');
        await client.sendText(message.from, '👇🏽 🔢 O si prefieres continuar conversando de la exposición: \n*1* ¿Qué es SaNaciones? \n*2* Caminos de la exposición \n*3* Plataforma virtual');
      } else {
        await client.sendText(message.from, 'Por favor envía un texto');
      }
    } 
    else if(r.data.state === 'terminado'){
      if(message.content === '1'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'Info'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, '*SaNaciones: diálogos de la memoria* es una exposición que invita a comprender el territorio como víctima y a reconocer las violencias que han sufrido las comunidades étnicas desde hace siglos. También exalta su capacidad organizativa y cuestiona el lugar que han ocupado en nuestra nación. Esta exposición fue construida de manera participativa y colectiva *con diez comunidades indígenas víctimas del conflicto armado.*' );
        await client.sendText(message.from, 'Te mencioné que SaNaciones es una una exposición *MULTIPLATAFORMA, TRANSMEDIA e ITINERANTE*, esto quiere decir que tiene varias plataformas físicas y virtuales: 🖥️ una curaduría en la página web del Museo, 🎒 una maleta con material didáctico, 🚚 una unidad móvil que recorrerá varios territorios con actividades artísticas, culturales y pedagógicas, y 🤖 este bot de WhatsApp.');
        await client.sendText(message.from, '👇🏽 🔢 ↔️ Más de SaNaciones:\n*1* Caminos de la exposición\n*2* Participa de la exposición\n*3* Plataforma virtual');
      }
      else if(message.content === '2'){
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'caminos'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, "En SaNaciones tenemos seis  caminos  para entender  las violencias que han sufrido los pueblos indígenas, las formas en quer las han enfrentado y tramitado.")
        await client.sendText(message.from, '👇🏽 🔢 ⤵️ \n\n*1* Disposición al diálogo\n*2* Territorios\n*3* Resistencias históricas de los pueblos indígenas\n*4* La fuerza de lo colectivo\n*5* Naciones\n*6* Arte y sanación');
        await client.sendText(message.from, '🛖 Inicio:\n*7* ¿Qué es SaNaciones?\n*8* Caminos de la exposición\n*9* Participa de la exposición\n*10* Plataforma virtual');
      }
      else if (message.content === '3')
      {
        await axios.post(apiUrl + "/update-status", {from: message.from, state: 'plataforma'}).catch(err=>{
          console.log(err)
        })
        await client.sendText(message.from, 'Otra de las plataformas en la q que desarrollamos la Exposición de SaNaciones es la plataforma web., donde podrás complementar los contenidos de cada uno de los caminos de la exposición. Vas a encontrar contenidos más extensos y diferentes elementos multimedia.');
        await client.sendText(message.from, '⚠️ Te recuerdo que es una página externa y el consumo de los datos en tu celular puede ser alta. Si no puedes hacerlo ahora, te recomiendo la visites cuando tu celular esté conectado a una red WI-FI para que puedas el resto de contenido que está genial.');
        await client.sendText(message.from, 'SaNaciones: diálogos de la memoria \nhttps://museodelamemoria.gov.co/sanaciones');
        await client.sendText(message.from, "👇🏽 🔢 ↔️ O si prefieres continuar conversando de la exposición: \n*1* ¿Qué es SaNaciones? \n*2* Caminos de la exposición \n*3* Participa en el mapa de SaNaciones")  
        
      } 
    }
    else {
      await client.sendText(message.from, '👇🏽 🔢 ↔️ Más de SaNaciones: 1 Caminos de la exposición 2 Participa de la exposición El bot del Museo de Memoria de Colombia te da la bienvenida a la exposición _SaNaciones: diálogos de la memoria_. Por este medio, podrá conocer más acerca de los contenidos y participar en la conversación sobre sanación y construcción de memoria.\nA lo largo de la actividad se le presentarán opciones para que usted explore la exposición o comparta sus experiencias. Las opciones estarán indicadas por números para que usted responda sobre este chat. Solo tendrá que contestar a los mensajes con el número de opción que desee.\n*1* ¿Qué es Sanaciones?.\n*2* Caminos de la exposición.\n*3* Haz parte de la exposición.');
      await axios.post(apiUrl + "/update-status", {from: message.from, state: 'Info'}).catch(err=>{
        console.log(err)})
        await client.sendText(message.from, '*SaNaciones: diálogos de la memoria* es una exposición que invita a comprender el territorio como víctima y a reconocer las violencias que han sufrido las comunidades étnicas desde hace siglos. También exalta su capacidad organizativa y cuestiona el lugar que han ocupado en nuestra nación. Esta exposición fue construida de manera participativa y colectiva *con diez comunidades indígenas víctimas del conflicto armado.*' );
      await client.sendText(message.from, 'Te mencioné que SaNaciones es una una exposición *MULTIPLATAFORMA, TRANSMEDIA e ITINERANTE*, esto quiere decir que tiene varias plataformas físicas y virtuales: 🖥️ una curaduría en la página web del Museo, 🎒 una maleta con material didáctico, 🚚 una unidad móvil que recorrerá varios territorios con actividades artísticas, culturales y pedagógicas, y 🤖 este bot de WhatsApp.');
      await client.sendText(message.from, '👇🏽 🔢 ↔️ Más de SaNaciones:\n*1* Caminos de la exposición\n*2* Participa de la exposición\n*3* Plataforma virtual');
    }

    console.log(message.type)
  });
}

create().then(client => start(client));
//create().then(client => main());