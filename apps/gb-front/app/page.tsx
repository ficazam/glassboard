import { BoardView } from "./components/Board.component";

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.16),transparent_55%),radial-gradient(circle_at_bottom,rgba(94,234,212,0.14),transparent_55%)]" />
      <div className="relative flex min-h-screen items-center justify-center px-4 py-8">
        <div className="w-full max-w-6xl">
          <BoardView />
        </div>
      </div>
    </main>
  );
}
