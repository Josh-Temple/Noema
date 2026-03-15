export const PageHeader = ({ title }: { title: string }) => (
  <header className="sticky top-0 z-20 flex h-[70px] items-center justify-center border-b border-[#5970ae4d] bg-[#0a0b24f2] backdrop-blur">
    <h1 className="text-3xl font-bold">{title}</h1>
  </header>
);
