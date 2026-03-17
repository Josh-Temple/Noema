import { EmptyState } from "@/components/common/EmptyState";
import { SavedItemCard } from "@/components/saved/SavedItemCard";
import { BookmarkIcon } from "@/components/common/icons";

export type SavedEntry = { slug: string; title: string; href: string };

export const SavedSection = ({ items }: { items: SavedEntry[] }) => (
  <section aria-labelledby="saved-items-heading">
    <h2 id="saved-items-heading" className="mb-3 flex items-center gap-2 text-3xl font-bold">
      <BookmarkIcon className="h-6 w-6 text-noema-accent" />
      <span>保存済み</span>
    </h2>
    {items.length === 0 ? (
      <EmptyState title="まだ保存がありません" body="比較・思想家・テーマ画面の保存ボタンから追加できます。" />
    ) : (
      <ul className="list-none p-0">
        {items.map((item) => (
          <li key={item.slug}>
            <SavedItemCard title={item.title} href={item.href} />
          </li>
        ))}
      </ul>
    )}
  </section>
);
