export const PageHeader = ({ title }: { title: string }) => (
  <header className="sticky top-0 z-20 border-b border-noema-line bg-white/90 px-6 py-4 backdrop-blur lg:px-10">
    <div className="mx-auto max-w-app lg:max-w-archive">
      <p className="text-[0.6rem] font-black uppercase tracking-[0.24em] text-noema-muted">NOEMA / ARCHIVE</p>
      <h1 className="mt-1 text-xl font-black tracking-tight text-noema-text">{title}</h1>
    </div>
  </header>
);
