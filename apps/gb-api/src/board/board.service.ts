import { Injectable } from '@nestjs/common';
import { BoardStateStore } from './board.state';
import { BoardState, ColumnId } from '@glassboard/contracts';

@Injectable()
export class BoardService {
  private store = new BoardStateStore();

  getState(): BoardState {
    return this.store.getState();
  }

  createCard(
    title: string,
    description: string | undefined,
    columnId: ColumnId,
  ): BoardState {
    return this.store.createCard({ title, description, columnId });
  }

  moveCard(cardId: string, toColumnId: ColumnId, index: number): BoardState {
    return this.store.moveCard(cardId, toColumnId, index);
  }
}
