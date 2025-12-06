import { BoardState, Card, ColumnId } from '@glassboard/contracts';
import { randomUUID } from 'crypto';

export class BoardStateStore {
  private state: BoardState = {
    columns: [
      { id: 'todo', title: 'To Do', order: 0 },
      { id: 'doing', title: 'In Progress', order: 1 },
      { id: 'done', title: 'Done', order: 2 },
    ],
    cards: [
      {
        id: randomUUID(),
        title: 'Welcome to GlassBoard ✨',
        description: 'Drag cards between columns to see realtime updates.',
        columnId: 'todo',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
  };

  getState(): BoardState {
    return this.state;
  }

  createCard(args: {
    title: string;
    description?: string;
    columnId: ColumnId;
  }): BoardState {
    const newCard: Card = {
      id: randomUUID(),
      title: args.title,
      description: args.description,
      columnId: args.columnId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.state = { ...this.state, cards: [newCard, ...this.state.cards] };
    return this.state;
  }

  moveCard(cardId: string, toColumnId: ColumnId, index: number): BoardState {
    const cards = [...this.state.cards];
    const i = cards.findIndex((c) => c.id === cardId);
    if (i === -1) return this.state;

    const [card] = cards.splice(i, 1);
    card.columnId = toColumnId;
    card.updatedAt = new Date().toISOString();

    const sameColumnIndices = cards
      .map((c, idx) => ({ c, idx }))
      .filter(({ c }) => c.columnId === toColumnId)
      .map(({ idx }) => idx);

    const insertAt = sameColumnIndices[index] ?? cards.length;
    cards.splice(insertAt, 0, card);

    this.state = { ...this.state, cards };
    return this.state;
  }
}
