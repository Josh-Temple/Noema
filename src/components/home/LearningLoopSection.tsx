import { SectionTitle } from "@/components/common/SectionTitle";
import { ClockIcon, BookmarkIcon } from "@/components/common/icons";
import { NextStepCard } from "@/components/compare/NextStepCard";
import { NextStepSuggestion } from "@/lib/recommendations";

export const LearningLoopSection = ({
  savedItems,
  recentItems,
}: {
  savedItems: NextStepSuggestion[];
  recentItems: NextStepSuggestion[];
}) => (
  <section className="mb-6" aria-labelledby="learning-loop-heading">
    <SectionTitle
      icon={<ClockIcon className="h-5 w-5" />}
      title="1分で振り返る"
      description="保存と最近見た流れから、戻りやすい比較をまとめています。"
    />
    <div className="rounded-2xl border border-noema-line bg-white p-5 shadow-sm">
      {savedItems.length > 0 ? (
        <div className="pb-1">
          <h3 className="mb-2 flex items-center gap-2 text-sm font-black text-noema-text">
            <BookmarkIcon className="h-3.5 w-3.5 text-noema-accent" />
            <span>保存から再開</span>
          </h3>
          <div className="divide-y divide-noema-line">
            {savedItems.map((item) => (
              <NextStepCard key={item.href} title={item.title} href={item.href} subtitle={item.reason} variant="row" />
            ))}
          </div>
        </div>
      ) : null}

      <div className={savedItems.length > 0 ? "mt-5 border-t border-noema-line pt-5" : ""}>
        <h3 className="mb-2 text-sm font-black text-noema-text">最近見た比較の続き</h3>
        <div className="divide-y divide-noema-line">
          {recentItems.map((item) => (
            <NextStepCard key={item.href} title={item.title} href={item.href} subtitle={item.reason} variant="row" />
          ))}
        </div>
      </div>
    </div>
  </section>
);
