# 🌐 GlassBoard

**A realtime kanban board powered by shared TypeScript contracts, NestJS websockets, and a Next.js 16 frontend.**  
Move cards in one tab and watch them instantly update in another.

**Realtime. Typed. Beautiful.**

---

## ✨ Why I Built This

I wanted a small, fast weekend build that showcases:

- **Frontend architecture** (Next.js 16, dnd-kit, Framer Motion)
- **Realtime backend engineering** (NestJS + Socket.IO)
- **Shared contracts** to eliminate drift between client and server
- **High-end UI polish** (glassmorphism, animation, accessibility)
- **Rapid, senior-level delivery**

This project demonstrates **clean architecture and realtime system design** in a tiny, digestible codebase.

---

## 🚀 Features

### 🔄 Realtime Collaboration

- NestJS WebSocket Gateway
- Instant sync across multiple tabs/clients
- Server-authoritative board state
- Live activity feed pushed from the backend

### 🧩 Shared TypeScript Contracts

Package: `@glassboard/contracts`

- Zod schemas for runtime validation
- TypeScript types for compile-time safety
- Contract-first system design
- Zero client/server drift — ever

### 🧲 Drag & Drop UX

- Built with **dnd-kit**
- Drag cards across columns
- Cursor-following overlay (smooth, no jank)
- Deterministic backend ordering
- Works across all connected clients

### ✨ Polished UI

- Glassmorphism panels
- Subtle gradients + shadows
- Framer Motion transitions
- Animated activity updates
- Clean column + card layout

---

## 🏗️ Tech Stack

### **Frontend**

- Next.js 16
- TypeScript
- TailwindCSS
- dnd-kit
- Framer Motion
- Socket.IO Client

### **Backend**

- NestJS 10
- Socket.IO Gateway
- In-memory board state store

### **Shared**

- Zod
- TypeScript
- Local package: `@glassboard/contracts`

---

## 📂 Project Structure

```
glassboard/
├── apps/
│   ├── api/          # NestJS WebSocket backend
│   └── gb-front/     # Next.js 16 frontend
│
└── packages/
    └── contracts/    # Shared Zod schemas + TS types
```

**Architecture goal:**  
**One source of truth** for board state, event types, and schema validation.

---

## 🔌 How Realtime Works

1. Frontend connects via Socket.IO
2. Backend sends an initial `board-state` snapshot
3. Client emits a `ClientEvent` (`create-card`, `move-card`)
4. Backend validates the event with Zod
5. State is updated in the in-memory store
6. Backend broadcasts:
   - Updated `board-state`
   - `activity` event for the sidebar
7. All connected clients re-render instantly

**The backend is the source of truth.  
The UI is reactive.**

---

## 🧪 Running Locally

### 1. Install dependencies

```bash
npm install
```

### 2. Start the backend

```bash
cd apps/api
npm run start:dev
```

Runs at: `ws://localhost:3001`

### 3. Start the frontend

```bash
cd apps/gb-front
npm run dev
```

Open →  
**http://localhost:3000**

To test realtime → open **two browser tabs** and drag a card.

---

## 📝 Code Highlights

### 🔹 Shared Event Contracts

```ts
export const ClientEventSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("create-card"),
    payload: z.object({
      title: z.string(),
      description: z.string().optional(),
    }),
  }),

  z.object({
    type: z.literal("move-card"),
    payload: z.object({
      cardId: z.string(),
      toColumnId: ColumnIdSchema,
      index: z.number(),
    }),
  }),
]);
```

Both frontend and backend import these → **no mismatches**.

---

### 🔹 WebSocket Gateway (NestJS)

```ts
@WebSocketGateway({ cors: true })
export class BoardGateway {
  @SubscribeMessage("client-event")
  handleClientEvent(@MessageBody() message: ClientEvent) {
    const parsed = ClientEventSchema.parse(message);
    this.store.apply(parsed);

    this.server.emit("server-event", this.store.toSnapshot());
  }
}
```

Small. Deterministic. Testable.

---

### 🔹 dnd-kit + Framer Motion

```tsx
<motion.div
  layout
  whileHover={{ y: -2 }}
  whileTap={{ scale: 0.985 }}
  className="rounded-xl bg-slate-900/70 ..."
>
  {card.title}
</motion.div>
```

Subtle, elegant interaction.

---

### 🔹 Animated Activity Feed

```tsx
<AnimatePresence>
  {activity.map((item) => (
    <motion.li
      key={item.id}
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 8 }}
    >
      {item.message}
    </motion.li>
  ))}
</AnimatePresence>
```

Smooth realtime animations.

---

## 🎯 What This Project Demonstrates (For Recruiters)

- Ability to design & implement **realtime systems**
- Strong command of **frontend architecture**
- **Contract-driven** communication between services
- High UI polish under tight timelines
- Clean, maintainable TypeScript-first engineering
- Comfort with **NestJS**, **Next.js 16**, **Socket.IO**, **Zod**
- Ability to ship a vertical slice in **48 hours**

This is the exact skill set used in:

- Collaboration tools
- Admin dashboards
- Workflow / project management software
- B2B SaaS
- Internal productivity tools

---

## 🔮 Potential Extensions

- Authentication (JWT / cookies)
- Persistent DB (Postgres + Prisma)
- Multiple boards / teams
- Comments, labels, checklists
- RBAC / permissions
- Presence indicators
- Undo/redo event stream

---

## 🙌 Thanks

If you'd like to discuss the architecture, collaborate, or explore extending this project — feel free to reach out!
