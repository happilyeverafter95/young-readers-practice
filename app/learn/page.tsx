import { allStages, StageNumber } from "@/lib/content/activities";
import { LearnClient } from "@/components/learn-client";

type LearnPageProps = {
  searchParams: Promise<{ stage?: string }>;
};

export default async function LearnPage({ searchParams }: LearnPageProps) {
  const params = await searchParams;
  const stageFromQuery = Number(params.stage);
  const selectedStage = (allStages.includes(stageFromQuery as StageNumber) ? stageFromQuery : 1) as StageNumber;
  return <LearnClient selectedStage={selectedStage} />;
}
