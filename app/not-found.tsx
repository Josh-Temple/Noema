import Link from "next/link";

export default function NotFound() {
  return (
    <div className="rounded-card border border-dashed border-[#32477f] bg-[#101633] p-6 text-center">
      <h2 className="mb-2 text-2xl font-bold">Not Found</h2>
      <p className="mb-3 text-noema-muted">指定されたページは存在しません。</p>
      <Link href="/" className="text-noema-accent">ホームへ戻る</Link>
    </div>
  );
}
