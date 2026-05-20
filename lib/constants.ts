import type { Band, Dimension, Industry } from '@/types';

export const DIMENSION_LABELS: Record<Dimension, string> = {
  empathy: 'Developer Empathy',
  gtm: 'GTM for Developer Tools',
  content: 'Content & Community',
  technical: 'Technical Depth',
  credibility: 'Credibility Signals',
};

export const INDUSTRY_LABELS: Record<Industry, string> = {
  'cloud-infra': 'Cloud Infrastructure',
  'ai-ml': 'AI / ML',
  'crm-saas': 'CRM / SaaS',
  'devtools-apis': 'DevTools & APIs',
  'data-analytics': 'Data & Analytics',
};

export const INDUSTRY_TAGLINES: Record<Industry, string> = {
  'cloud-infra': 'Kubernetes, SLAs, and FinOps fluency',
  'ai-ml': 'LLMs, RAG, and model evaluation basics',
  'crm-saas': 'Multi-tenancy, webhooks, and NRR',
  'devtools-apis': 'REST, GraphQL, and developer experience',
  'data-analytics': 'Warehouses, dbt, and the modern data stack',
};

export const BAND_INTERPRETATIONS: Record<Band, string> = {
  'DevRel-Ready':
    'You think like a technical GTM practitioner. Focus on public proof and depth in your target niche.',
  Transitioning:
    'Strong foundations with clear gaps. Targeted learning in your weakest dimensions will compound quickly.',
  'Early Stage':
    'You have marketing instincts but need more technical and developer-native muscle memory.',
  'Foundation First':
    'Start with empathy and credibility signals before pitching technical GTM roles.',
};

export const INDUSTRIES: Industry[] = [
  'cloud-infra',
  'ai-ml',
  'crm-saas',
  'devtools-apis',
  'data-analytics',
];
