import {
  MessageBody,
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import {
  ActivityItem,
  ClientEvent,
  ClientEventSchema,
  ServerEvent,
} from '@glassboard/contracts';
import { BoardService } from './board.service';
import { randomUUID } from 'crypto';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class BoardGateway implements OnGatewayConnection {
  @WebSocketServer()
  server!: Server;

  constructor(private readonly board: BoardService) {}

  handleConnection(client: Socket) {
    const state = this.board.getState();
    const event: ServerEvent = { type: 'board-state', payload: state };
    client.emit('server-event', event);
  }

  @SubscribeMessage('client-event')
  handleClientEvent(@MessageBody() raw: unknown) {
    const parsed = ClientEventSchema.safeParse(raw);
    if (!parsed.success) return;

    const event: ClientEvent = parsed.data;

    switch (event.type) {
      case 'create-card': {
        const { title, description, columnId } = event.payload;
        this.board.createCard(title, description, columnId);
        this.broadcast('Card created', title);
        break;
      }
      case 'move-card': {
        const { cardId, toColumnId, index } = event.payload;
        this.board.moveCard(cardId, toColumnId, index);
        this.broadcast(`Card moved to ${toColumnId}`, undefined);
        break;
      }
    }
  }

  private broadcast(message: string, title?: string) {
    const state = this.board.getState();
    const boardEvent: ServerEvent = { type: 'board-state', payload: state };

    const activity: ActivityItem = {
      id: randomUUID(),
      message: title ? `${message}: “${title}”` : message,
      timestamp: new Date().toISOString(),
    };
    const activityEvent: ServerEvent = { type: 'activity', payload: activity };

    this.server.emit('server-event', boardEvent);
    this.server.emit('server-event', activityEvent);
  }
}
