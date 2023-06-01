import { connectToServer } from './socket-client'
import './style.css'


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Web Socket - Client</h1>
    <span id="server-status">offline</span> 
    <ul id="clients-ul">
      <li>Client 1</li>
    </ul>
    <form id="message-form">
      <input type="text" id="message-input" placeholder="Type your message here" />
    </form>
  </div>
`

connectToServer();

