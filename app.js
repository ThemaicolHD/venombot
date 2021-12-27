// Supports ES6
// import { create, Whatsapp } from 'venom-bot';
const mensaje = require('./mensajes/steps.json')
const venom = require('venom-bot');
let backToMenu = false;
let steps = 1;
let sendMessage;
let wellcomeMesage="¡Hola! Soy Mostro, tu asesor virtual de Emprendimiento SENA y te puedo mostrar una ruta para construir. \n\nConoce tus opciones para emprender con nosotros: \n\n1. Crear - Ideas de negocio 💡 \n2. Crecer - Empresas o unidades productivas 🚀 \n\nDigita la opción deseada.";
venom
  .create({
    session: 'session-name', //name of session
    multidevice: false // for version not multidevice use false.(default: true)
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  client.onMessage((message) => {
    body = message.body.toLowerCase();
    console.log('este es el body', steps)
    if (mensaje.STEP_1.includes(body) && steps == 1) {
      steps = 2
      client
      .sendText(message.from, wellcomeMesage)
      .then((result) => {
        console.log('Result: ', result); //return object success
      })
      .catch((erro) => {
        console.error('Error when sending: ', erro); //return object error
      });
      body= "";
    }
    else if ((mensaje.OPTION_1.includes(body) && steps == 2) || backToMenu) {
      steps = 3
      if (body == mensaje.OPTION_1[0] || body == mensaje.OPTION_1[1]){
        sendMessage = "¿tienes un producto que ya haya generado ventas? \n\nsi tu respuesta es Si, digita el numero 1. \n\nsi tu respuesta es No, digita el numero 2.";
      }else 
      if(body == mensaje.OPTION_1[2] || body == mensaje.OPTION_1[3]){
        sendMessage = "¿tienes una empresa legalmente constituida? \n\nsi tu respuesta es Si, digita el numero 3. \n\nsi tu respuesta es No, digita el numero 4.";
      }
    
      body = "";
      client
      .sendText(message.from, sendMessage)
      .then((result) => {
        console.log('Result: ', result); //return object success
      })
      .catch((erro) => {
        console.error('Error when sending: ', erro); //return object error
      });
    }
    else if (mensaje.RESPUESTA.includes(body) && steps == 3) {
      steps = 4
      if (body == mensaje.RESPUESTA[0]){
        sendMessage = "Genial, a continuacion te adjunto el link al cual puedes dirigirte para realizar el formulario: \n\nhttps://www.youtube.com/watch?v=mCdA4bJAGGk";
      }
      else if(body == mensaje.RESPUESTA[2]){
        sendMessage = "¿Genial, a continuacion te adjunto el link al cual puedes dirigirte para realizar el formulario: \n\nhttps://www.youtube.com/channel/UC-uc1oWLN9eukRG4-co5UAA?";
      }
      else if(body == mensaje.RESPUESTA[1] || body == mensaje.RESPUESTA[3]){
        sendMessage = "¿tienes una idea de negocio?";
      }
      else if(body == mensaje.OPTION_1[6]){
        steps = 1
        backToMenu = true;
        sendMessage = wellcomeMesage;       
      }
      
      client
      .sendText(message.from, sendMessage)
      .then((result) => {
        console.log('Result: ', result); //return object success
        if(body == "regresar"){         
        return;
        }
      })
      .catch((erro) => {
        console.error('Error when sending: ', erro); //return object error
        if(body == "regresar"){
          return;
          }
      });
      body= "";
    }
    else if (mensaje.OPTION_1.includes(body) && steps == 4) {
      steps = 5
      if(body == mensaje.OPTION_1[4]){
        steps = 1
        backToMenu = true;
        sendMessage = wellcomeMesage;       
      }
      
      client
      .sendText(message.from, sendMessage)
      .then((result) => {
        console.log('Result: ', result); //return object success
        if(body == "regresar"){         
        return;
        }
      })
      .catch((erro) => {
        console.error('Error when sending: ', erro); //return object error
        if(body == "regresar"){
          return;
          }
      });
      body= "";
    }




    else{
      body= "";
      console.log(mensaje.ERROR[0])
      client
      .sendText(message.from,mensaje.ERROR[0])
      .then((result) => {
        console.log('Result: ', result); //return object success
      })
      .catch((erro) => {
        console.error('Error when sending: ', erro); //return object error
      });

      client
      .sendText(message.from)
      .then((result) => {
        console.log('Result: ', result); //return object success 
        return
      })
      .catch((erro) => {
        console.error('Error when sending: ', erro); //return object error
        return
      });
    }
  });
}
// EDUARDO ES GAY 
