import Link from "next/link";

export const DiscoveryCard = ({ title, body, href }: { title: string; body: string; href: string }) => (
  <Link href={href} className="mb-3 block rounded-card border border-noema-line bg-gradient-to-b from-[#13163a] to-[#0d102f] p-4">
    <p className="text-[#7f8cff]">次の比較</p>
    <h3 className="text-2xl font-bold">{title}</h3>
    <p className="text-noema-muted">{body}</p>
  </Link>
);
