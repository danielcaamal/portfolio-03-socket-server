import { Manager, Socket } from 'socket.io-client';

export const connectToServer = () => {
    const manager = new Manager('http://localhost:3000/socket.io/socket.io.js');
    const socket = manager.socket('/');
    addListeners(socket);
};

const addListeners = (socket: Socket) => {
    const serverStatusLabel = document.querySelector<HTMLSpanElement>('#server-status')!;
    const clientsUl = document.querySelector<HTMLSpanElement>('#clients-ul')!;

    const messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
    const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;

    socket.on('connect', () => {
        serverStatusLabel.textContent = 'online';
        serverStatusLabel.style.color = 'green';
    });

    socket.on('disconnect', () => {
        serverStatusLabel.textContent = 'offline';
        serverStatusLabel.style.color = 'red';
    });

    socket.on('clients-updated', (clients: string[]) => {
        let clientsHtml = '';

        clients.forEach(client => {
            clientsHtml += `<li>${client}</li>`
        });

        clientsUl.innerHTML = clientsHtml;
    });

    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (messageInput.value.trim().length > 0) {
            socket.emit('message', messageInput.value);
            messageInput.value = '';
        }
    });
};