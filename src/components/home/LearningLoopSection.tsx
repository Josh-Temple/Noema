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
    <div className="rounded-card bg-[#0f1630]/55 p-3">
      {savedItems.length > 0 ? (
        <div className="pb-1">
          <h3 className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-[#c4d0f3]">
            <BookmarkIcon className="h-3.5 w-3.5 text-noema-accent/70" />
            <span>保存から再開</span>
          </h3>
          <div className="divide-y divide-noema-line/25">
            {savedItems.map((item) => (
              <NextStepCard key={item.href} title={item.title} href={item.href} subtitle={item.reason} variant="row" />
            ))}
          </div>
        </div>
      ) : null}

      <div className={savedItems.length > 0 ? "mt-2 border-t border-noema-line/25 pt-2" : ""}>
        <h3 className="mb-1.5 text-sm font-semibold text-[#c4d0f3]">最近見た比較の続き</h3>
        <div className="divide-y divide-noema-line/25">
          {recentItems.map((item) => (
            <NextStepCard key={item.href} title={item.title} href={item.href} subtitle={item.reason} variant="row" />
          ))}
        </div>
      </div>
    </div>
  </section>
);
