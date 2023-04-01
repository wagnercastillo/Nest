import './style.css'
import { connectToServer } from './socket-client';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1> WebSocket - Client</h1>

    <input id="jwt-token" placeholder="Json Web Toke" />
    <button id="btn-connect">Connect</button>

    <br />

    <span id="server-status">Offline</span>

  <ul id='clients-ul'>
    <li>Clients</li>
  </ul>

  <form id="message-form" >
    <input placeholder="message" id="message-input" />
  </form>

  <h3>Message</h3>
  <ul id="messages-ul"></ul>

  </div>
`

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)


const jwtToken = document.querySelector<HTMLInputElement>('#jwt-token')!
const btnConnect = document.querySelector<HTMLButtonElement>('#btn-connect')!

btnConnect?.addEventListener('click', () => {

  if( jwtToken.value.trim().length <= 0 ) return alert('Ingrese a valid JWT')

  connectToServer( jwtToken.value.trim() )

})

