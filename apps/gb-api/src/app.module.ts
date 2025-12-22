import { Module } from '@nestjs/common';
import { BoardGateway } from './board/board.gateway';
import { BoardService } from './board/board.service';
import { HealthController } from './health.controller';

@Module({
  providers: [BoardGateway, BoardService],
  controllers: [HealthController],
})
export class AppModule {}
