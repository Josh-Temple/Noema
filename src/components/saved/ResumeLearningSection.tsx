import { CompassIcon } from "@/components/common/icons";
import { NextStepCard } from "@/components/compare/NextStepCard";
import { SavedResumeGroup } from "@/lib/recommendations";

export const ResumeLearningSection = ({ groups }: { groups: SavedResumeGroup[] }) => {
  if (groups.length === 0) return null;

  return (
    <section className="mb-12" aria-labelledby="resume-learning-heading">
      <h2 id="resume-learning-heading" className="mb-3 border-l-4 border-noema-blue pl-4 text-xl font-black">
        <CompassIcon className="h-6 w-6 text-noema-accent" />
        <span>学びを再開する</span>
      </h2>
      <p className="mb-4 text-sm text-noema-muted">保存と最近見た項目から、続きやすい順路だけを短く出しています。</p>

      <div className="space-y-5">
        {groups.map((group) => (
          <section key={group.id} aria-labelledby={`resume-group-${group.id}`} className="rounded-2xl border border-noema-line bg-white p-4 shadow-sm">
            <h3 id={`resume-group-${group.id}`} className="text-lg font-bold">
              {group.title}
            </h3>
            <p className="mb-1 mt-1 text-sm text-noema-muted">{group.description}</p>
            {group.suggestions.map((item) => (
              <NextStepCard
                key={`${group.id}-${item.href}`}
                title={item.title}
                subtitle={item.context ? `${item.reason} · ${item.context}` : item.reason}
                href={item.href}
                variant="row"
              />
            ))}
          </section>
        ))}
      </div>
    </section>
  );
};
