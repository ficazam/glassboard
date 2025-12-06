import { Module } from '@nestjs/common';
import { BoardGateway } from './board/board.gateway';
import { BoardService } from './board/board.service';

@Module({
  providers: [BoardGateway, BoardService],
})
export class AppModule {}
