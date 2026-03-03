/**
 * Evaluation Service - Candidature scoring and assessment
 */

import { createDelay } from '@/core/infrastructure/utils/delay';
import { mockEvaluations } from '@/mocks/mockDatabase';
import type { Evaluation, CriterionScore } from '@/types';

export async function getEvaluationsByApplication(applicationId: string): Promise<Evaluation[]> {
  await createDelay(300);
  return mockEvaluations.filter((e) => e.applicationId === applicationId);
}

export async function submitEvaluation(
  applicationId: string,
  evaluatorId: string,
  criterionScores: CriterionScore[],
  comments: string
): Promise<Evaluation> {
  await createDelay(500);

  const newEval: Evaluation = {
    id: `eval-${Date.now()}`,
    applicationId,
    evaluatorId,
    criterionScores,
    comments,
    submittedAt: new Date().toISOString(),
  };

  mockEvaluations.push(newEval);
  return newEval;
}

export function calculateWeightedScore(evaluation: Evaluation, criteria: { id: string; weight: number }[]): number {
  let totalWeighted = 0;
  let totalWeight = 0;

  for (const score of evaluation.criterionScores) {
    const criterion = criteria.find((c) => c.id === score.criterionId);
    if (criterion) {
      totalWeighted += score.score * (criterion.weight / 100);
      totalWeight += criterion.weight / 100;
    }
  }

  return totalWeight > 0 ? totalWeighted / totalWeight : 0;
}
