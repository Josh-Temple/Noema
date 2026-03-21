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
      icon={<ClockIcon className="h-6 w-6" />}
      title="1分で振り返る"
      description="保存と最近見た流れから、静かに戻りやすい比較をまとめています。"
    />
    {savedItems.length > 0 ? (
      <div className="mb-4">
        <h3 className="mb-2 flex items-center gap-2 text-lg font-bold text-noema-text">
          <BookmarkIcon className="h-4 w-4 text-noema-accent" />
          <span>保存から再開</span>
        </h3>
        {savedItems.map((item) => (
          <NextStepCard key={item.href} title={item.title} href={item.href} subtitle={item.reason} />
        ))}
      </div>
    ) : null}

    <div>
      <h3 className="mb-2 text-lg font-bold text-noema-text">最近見た比較の続き</h3>
      {recentItems.map((item) => (
        <NextStepCard key={item.href} title={item.title} href={item.href} subtitle={item.reason} />
      ))}
    </div>
  </section>
);
