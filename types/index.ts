export type Dimension =
  | 'empathy'
  | 'gtm'
  | 'content'
  | 'technical'
  | 'credibility';

export type Industry =
  | 'cloud-infra'
  | 'ai-ml'
  | 'crm-saas'
  | 'devtools-apis'
  | 'data-analytics';

export type Band =
  | 'DevRel-Ready'
  | 'Transitioning'
  | 'Early Stage'
  | 'Foundation First';

export interface Question {
  id: string;
  dimension: Dimension;
  industry?: Industry;
  prompt: string;
  options: { id: 'a' | 'b' | 'c' | 'd'; text: string }[];
  correct: 'a' | 'b' | 'c' | 'd';
  rationale: string;
}

export interface ScoreResult {
  total: number;
  band: Band;
  dimensions: Record<Dimension, number>;
  gaps: Dimension[];
}

export interface Resource {
  title: string;
  type: 'book' | 'article' | 'course' | 'talk';
  author: string;
  url: string;
}

export interface SubmitPayload {
  name: string;
  email: string;
  currentRole?: string;
  targetRole?: string;
  industry: Industry;
  answers: Record<string, 'a' | 'b' | 'c' | 'd'>;
}

export interface ResultRecord {
  id: string;
  user_id: string;
  total_score: number;
  band: Band;
  empathy_score: number;
  gtm_score: number;
  content_score: number;
  technical_score: number;
  credibility_score: number;
  created_at: string;
  users: {
    name: string;
    email: string;
    industry: Industry;
    current_role: string | null;
    target_role: string | null;
  };
  responses: {
    question_id: string;
    answer: string;
    dimension: string;
    is_correct: boolean;
  }[];
}
