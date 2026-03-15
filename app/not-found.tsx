import Link from "next/link";

export default function NotFound() {
  return (
    <div className="rounded-card border border-dashed border-[#32477f] bg-[#101633] p-6 text-center">
      <h2 className="mb-2 text-2xl font-bold">ページが見つかりません</h2>
      <p className="mb-3 text-noema-muted">URLが変わったか、まだ用意されていない可能性があります。ホームや検索から探してみてください。</p>
      <div className="flex justify-center gap-4">
        <Link href="/" className="text-noema-accent underline-offset-2 hover:underline">
          ホームへ戻る
        </Link>
        <Link href="/search" className="text-noema-accent underline-offset-2 hover:underline">
          検索へ進む
        </Link>
      </div>
    </div>
  );
}
