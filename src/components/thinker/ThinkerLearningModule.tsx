import { SectionTitle } from "@/components/common/SectionTitle";
import { CompassIcon } from "@/components/common/icons";
import { NextStepCard } from "@/components/compare/NextStepCard";
import { NextStepSuggestion } from "@/lib/recommendations";

export const ThinkerLearningModule = ({ items }: { items: NextStepSuggestion[] }) => {
  if (items.length === 0) return null;

  return (
    <section className="mb-5" aria-labelledby="thinker-learning-heading">
      <SectionTitle
        icon={<CompassIcon className="h-5 w-5" />}
        title="この人物から学ぶなら"
        description="入口になる比較と、次に見やすい流れを短く並べます。"
      />
      {items.map((item) => (
        <NextStepCard key={item.href} title={item.title} href={item.href} subtitle={item.reason} />
      ))}
    </section>
  );
};
