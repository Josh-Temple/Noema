import Link from "next/link";
import { EmptyState } from "@/components/common/EmptyState";
import { BookmarkIcon, ChevronRightIcon } from "@/components/common/icons";
import { NextStepCard } from "@/components/compare/NextStepCard";
import { SavedStudyGroup } from "@/lib/recommendations";

export const StudyShelfSection = ({ groups }: { groups: SavedStudyGroup[] }) => (
  <section aria-labelledby="saved-items-heading">
    <h2 id="saved-items-heading" className="mb-4 border-l-4 border-noema-accent pl-4 text-xl font-black">
      <BookmarkIcon className="h-6 w-6 text-noema-accent" />
      <span>保存した学習棚</span>
    </h2>
    <p className="mb-4 text-sm text-noema-muted">保存した比較・思想家・テーマを、次に開きやすい順路つきで整理しています。</p>

    <div className="space-y-6">
      {groups.map((group) => (
        <section key={group.title} className="rounded-2xl border border-noema-line bg-white p-5 shadow-sm" aria-labelledby={`${group.title}-heading`}>
          <div className="mb-3">
            <h3 id={`${group.title}-heading`} className="text-xl font-bold text-noema-text">{group.title}</h3>
            <p className="mt-1 text-sm text-noema-muted">{group.description}</p>
          </div>

          {group.items.length === 0 ? (
            <EmptyState title="まだ項目がありません" body={group.emptyMessage} />
          ) : (
            <ul>
              {group.items.map((item) => (
                <li key={`${group.title}:${item.slug}`} className="border-b border-noema-line/25 py-3 last:border-b-0">
                  <Link href={item.href} className="flex items-center justify-between gap-3 rounded-xl py-3 text-noema-text transition hover:bg-slate-50">
                    <div>
                      <p className="mb-1 text-[0.65rem] font-black uppercase tracking-widest text-noema-blue">{item.kindLabel}</p>
                      <p className="font-bold">{item.title}</p>
                      {item.note ? <p className="mt-1 text-sm text-noema-muted">{item.note}</p> : null}
                    </div>
                    <ChevronRightIcon className="h-4 w-4 text-noema-accent" />
                  </Link>
                  {item.nextStep ? <div className="mt-3"><NextStepCard title={item.nextStep.title} href={item.nextStep.href} subtitle={item.nextStep.reason} /></div> : null}
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  </section>
);
