import type { Dimension, Industry, Resource } from '@/types';

export const RESOURCES_BY_DIMENSION: Record<Dimension, Resource[]> = {
  empathy: [
    {
      title: 'Developer Marketing Does Not Exist',
      type: 'talk',
      author: 'Adam DuVander',
      url: 'https://www.youtube.com/watch?v=ZVt8x2l7YqE',
    },
    {
      title: 'Writing for Developers',
      type: 'article',
      author: 'Stripe Press',
      url: 'https://press.stripe.com/',
    },
    {
      title: 'Falsehoods Programmers Believe About Marketing to Developers',
      type: 'article',
      author: 'Patrick McKenzie',
      url: 'https://www.kalzumeus.com/2012/01/09/the-software-seller-faq/',
    },
  ],
  gtm: [
    {
      title: 'Working Backwards',
      type: 'book',
      author: 'Colin Bryar & Bill Carr',
      url: 'https://www.workingbackwards.com/',
    },
    {
      title: 'The DevGuide',
      type: 'course',
      author: 'Heavybit',
      url: 'https://www.heavybit.com/library/the-devguide',
    },
    {
      title: 'OpenView PLG Index',
      type: 'article',
      author: 'OpenView Partners',
      url: 'https://openviewpartners.com/plg/',
    },
  ],
  content: [
    {
      title: 'Show Your Work!',
      type: 'book',
      author: 'Austin Kleon',
      url: 'https://austinkleon.com/show-your-work/',
    },
    {
      title: 'Stripe Documentation',
      type: 'article',
      author: 'Stripe',
      url: 'https://docs.stripe.com/',
    },
    {
      title: 'CSS-Tricks Archives',
      type: 'article',
      author: 'DigitalOcean',
      url: 'https://css-tricks.com/archives/',
    },
  ],
  technical: [
    {
      title: 'Designing Data-Intensive Applications',
      type: 'book',
      author: 'Martin Kleppmann',
      url: 'https://dataintensive.net/',
    },
    {
      title: 'The Missing Semester of Your CS Education',
      type: 'course',
      author: 'MIT',
      url: 'https://missing.csail.mit.edu/',
    },
    {
      title: 'System Design Primer',
      type: 'article',
      author: 'Donne Martin',
      url: 'https://github.com/donnemartin/system-design-primer',
    },
  ],
  credibility: [
    {
      title: 'Building a Personal Brand as a Software Engineer',
      type: 'article',
      author: 'Gergely Orosz',
      url: 'https://blog.pragmaticengineer.com/',
    },
    {
      title: 'Show Your Work!',
      type: 'book',
      author: 'Austin Kleon',
      url: 'https://austinkleon.com/show-your-work/',
    },
    {
      title: 'Wizard Zines',
      type: 'book',
      author: 'Julia Evans',
      url: 'https://wizardzines.com/',
    },
  ],
};

export const TECHNICAL_RESOURCES_BY_INDUSTRY: Record<Industry, Resource[]> = {
  'cloud-infra': [
    {
      title: 'AWS Well-Architected Framework',
      type: 'course',
      author: 'Amazon Web Services',
      url: 'https://aws.amazon.com/architecture/well-architected/',
    },
    {
      title: 'Kubernetes Documentation',
      type: 'article',
      author: 'CNCF',
      url: 'https://kubernetes.io/docs/home/',
    },
    {
      title: 'The Cloudflare Blog — Infrastructure',
      type: 'article',
      author: 'Cloudflare',
      url: 'https://blog.cloudflare.com/tag/infrastructure/',
    },
  ],
  'ai-ml': [
    {
      title: 'Intro to Large Language Models',
      type: 'talk',
      author: 'Andrej Karpathy',
      url: 'https://www.youtube.com/watch?v=zjkBMFhNj_g',
    },
    {
      title: 'Prompt Engineering Guide',
      type: 'article',
      author: 'DAIR.AI',
      url: 'https://www.promptingguide.ai/',
    },
    {
      title: 'RAG from Scratch',
      type: 'course',
      author: 'LangChain',
      url: 'https://python.langchain.com/docs/tutorials/rag/',
    },
  ],
  'crm-saas': [
    {
      title: 'SaaStr Annual Talks',
      type: 'talk',
      author: 'SaaStr',
      url: 'https://www.saastr.com/library/',
    },
    {
      title: 'B2B SaaS Metrics Guide',
      type: 'article',
      author: 'Bessemer Venture Partners',
      url: 'https://www.bvp.com/atlas',
    },
    {
      title: 'Multi-Tenancy in SaaS',
      type: 'article',
      author: 'WorkOS',
      url: 'https://workos.com/blog/what-is-multi-tenancy',
    },
  ],
  'devtools-apis': [
    {
      title: 'Designing Data-Intensive Applications',
      type: 'book',
      author: 'Martin Kleppmann',
      url: 'https://dataintensive.net/',
    },
    {
      title: 'API Design Patterns',
      type: 'book',
      author: 'JJ Geewax',
      url: 'https://www.manning.com/books/api-design-patterns',
    },
    {
      title: 'Stripe API Reference',
      type: 'article',
      author: 'Stripe',
      url: 'https://docs.stripe.com/api',
    },
  ],
  'data-analytics': [
    {
      title: 'dbt Learn',
      type: 'course',
      author: 'dbt Labs',
      url: 'https://learn.getdbt.com/',
    },
    {
      title: 'The Modern Data Stack Guide',
      type: 'article',
      author: 'a16z',
      url: 'https://a16z.com/emerging-architectures-for-modern-data-infrastructure/',
    },
    {
      title: 'Fundamentals of Data Engineering',
      type: 'book',
      author: 'Reis & Housley',
      url: 'https://www.oreilly.com/library/view/fundamentals-of-data/9781098108298/',
    },
  ],
};

export function getResourcesForGaps(
  gaps: Dimension[],
  industry: Industry
): Resource[] {
  const resources: Resource[] = [];
  for (const gap of gaps) {
    if (gap === 'technical') {
      resources.push(...TECHNICAL_RESOURCES_BY_INDUSTRY[industry].slice(0, 2));
    } else {
      resources.push(...RESOURCES_BY_DIMENSION[gap].slice(0, 2));
    }
  }
  return resources.slice(0, 6);
}
