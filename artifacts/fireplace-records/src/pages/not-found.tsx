export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <div className="text-center px-6">
        <h1 className="font-display text-6xl font-bold text-foreground mb-4">404</h1>
        <p className="text-muted-foreground text-lg mb-6">Page not found.</p>
        <a
          href="/"
          className="inline-block bg-primary text-white font-bold text-sm tracking-widest uppercase px-6 py-3 hover:bg-primary/90 transition-colors"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}
