import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MessageWsService } from './message-ws.service';
import { Server, Socket } from 'socket.io';
import { NewMessageDto } from './new-message-dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../auth/interfaces';


@WebSocketGateway({ cors: true })
export class MessageWsGateway implements OnGatewayConnection, OnGatewayDisconnect{
  
  
  @WebSocketServer() wss: Server;
  constructor(

    private readonly messageWsService: MessageWsService,
    private readonly jwtService: JwtService

    ) {}

  async handleConnection(client: Socket) {

    const token = client.handshake.headers.authentication as string;
    let payload: JwtPayload

    try {

      payload = this.jwtService.verify( token )
      await this.messageWsService.registerClient( client, payload.id )

    } catch (error) {
      client.disconnect();
      return;
      
    }

    console.log({ payload });

    // console.log('Cliente conectado:', client.id);
    
    

    // client.join('ventas');
    // client.join(client.id);
    // client.join( user.email );
    // this.wss.to('ventas').emit('')

    this.wss.emit('clients-updated', this.messageWsService.getConnectedClients() )
    
  }

  handleDisconnect(client: Socket) {
    // console.log('Cliente desconectado:', client.id);
    this.messageWsService.removeClient( client.id )
    this.wss.emit('clients-updated', this.messageWsService.getConnectedClients() )
  }

  @SubscribeMessage('message-from-client')
  handleMessageFromClient( client: Socket, payload: NewMessageDto){

    //! Emite únicamente al cliente
    // client.emit('message-from-server',{
    //   fullName: 'Soy yo!',
    //   message: payload.message || 'no-message!!'
    // });

    // //! Emitir a todos menos al cliente Inicial
    // client.broadcast.emit('message-from-server',{
    //   fullName: 'Soy yo!',
    //   message: payload.message || 'no-message!!'
    // });

    //! Emite a todos incluyendo al cliente Inicial
    this.wss.to('clientID')
    this.wss.emit('message-from-server',{
      fullName: this.messageWsService.getUserFullName(client.id),
      message: payload.message || 'no-message!!'
    });
  }
  
  
}
  