import { EmptyState } from "@/components/common/EmptyState";
import { SavedItemCard } from "@/components/saved/SavedItemCard";

export type SavedEntry = { slug: string; title: string; href: string };

export const SavedSection = ({ items }: { items: SavedEntry[] }) => (
  <section>
    <h2 className="mb-3 text-3xl font-bold">保存済み</h2>
    {items.length === 0 ? (
      <EmptyState title="まだ保存がありません" body="検索や比較画面から気になる項目を保存できます。" />
    ) : (
      items.map((item) => <SavedItemCard key={item.slug} title={item.title} href={item.href} />)
    )}
  </section>
);
