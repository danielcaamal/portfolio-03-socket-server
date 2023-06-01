import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets/interfaces/hooks';
import { Socket, Server,  } from 'socket.io';
import { MessagesWsService } from './messages-ws.service';

@WebSocketGateway({ cors: true })
export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() wss: Server;

  constructor(private readonly messagesWsService: MessagesWsService) {}

  handleDisconnect(client: Socket) {
    this.messagesWsService.removeClient(client);
    this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients());
  }
  handleConnection(client: Socket, ...args: any[]) {
    this.messagesWsService.registerClient(client);
    this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients());

    client.on('message', (message: string) => {
      console.log(message);
    });
  }

}
