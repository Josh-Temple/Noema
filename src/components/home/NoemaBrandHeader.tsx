export const NoemaBrandHeader = () => (
  <header className="mb-12 pt-2" aria-labelledby="noema-brand-heading">
    <div className="flex items-end justify-between gap-6">
      <div>
        <h1 id="noema-brand-heading" className="text-5xl font-black leading-none tracking-[-0.07em] text-noema-text sm:text-6xl">NOEMA</h1>
        <div className="mt-4 flex items-center gap-1" aria-hidden="true">
          <span className="h-1.5 w-8 rounded-sm bg-noema-accent" />
          <span className="h-1.5 w-1.5 rounded-sm bg-noema-blue" />
          <span className="h-1.5 w-1.5 rounded-sm bg-noema-yellow" />
        </div>
      </div>
      <span className="mb-1 h-5 w-5 rounded-full border-4 border-noema-yellow" aria-hidden="true" />
    </div>
    <p className="mt-5 max-w-sm text-[0.65rem] font-black uppercase tracking-[0.2em] text-noema-muted">Philosophy through comparison.</p>
    <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600">思想家と問いを比較しながら、考えるための入口を少しずつ集めます。</p>
  </header>
);
