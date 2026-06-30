// EDIT ME — Your personal information
export const OWNER = {
  name: 'Punya Jain',
  tagline: 'Software Engineer • AI/ML',
  email: 'punyajain312@gmail.com',
  bio: `Software Engineer focused on building scalable full-stack
   applications and solving real-world engineering problems. Passionate 
   about system design, developer experience, and leveraging AI to build smarter products. 
   Currently seeking exciting SDE opportunities where I can contribute, learn 
   from exceptional engineers, and build products at scale.`,
  resumeUrl: '/resume.pdf', // EDIT ME — drop your PDF in public/resume.pdf
  avatar: null,             // EDIT ME — set to '/avatar.jpg' after adding to public/
  techStack: [
    'Python', 'FastAPI', 'React', 'TypeScript',
    'PostgreSQL', 'PyTorch', 'Docker', 'AWS',
  ],
  university: 'VIT University',   // EDIT ME
  gradYear: '2026',
}

// EDIT ME — Your social handles and URLs
export const SOCIALS = {
  github: {
    handle: '@punyajain312',
    url: 'https://github.com/punyajain312',
  },
  linkedin: {
    handle: 'punyajain',
    url: 'https://www.linkedin.com/in/punya-jain/',
  },
  leetcode: {
    handle: 'punyajain312',
    url: 'https://leetcode.com/punyajain312',
    solvedCount: '300+',
  },
  instagram: {
    handle: '@punya.jpeg',
    url: 'https://instagram.com/punya.jpeg',
  },
}

// EDIT ME — Your projects. Add/remove entries freely.
export const PROJECTS = [
  {
    id: 'docurag',
    name: 'DocuRAG',
    subtitle: 'AI Document Intelligence Platform',
    description:
      'An enterprise-grade RAG (Retrieval-Augmented Generation) pipeline for querying large document collections using natural language. Supports multi-format ingestion (PDF, DOCX, CSV), semantic chunking, vector search via Pinecone, and a streaming GPT-4o response layer. Built for teams who need precise answers from their internal knowledge base.',
    tech: ['Python', 'FastAPI', 'LangChain', 'Pinecone', 'React', 'OpenAI API'],
    color: '#7c6af7',
    liveUrl: 'https://docurag.vercel.app',   // EDIT ME
    githubUrl: 'https://github.com/punyajain312/docurag', // EDIT ME
    highlights: ['Semantic chunking pipeline', 'Streaming SSE responses', 'Multi-tenant auth'],
  },
  {
    id: 'nexusboard',
    name: 'NexusBoard',
    subtitle: 'SaaS Analytics Dashboard',
    description:
      'A multi-tenant SaaS dashboard enabling startups to track product metrics, cohort retention, and funnel analytics in real time. Features role-based access control, a custom chart builder, scheduled PDF reports, and a shareable public link system. Handles 50k+ events/day with sub-second queries on PostgreSQL materialized views.',
    tech: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Redis', 'Recharts'],
    color: '#4f9cf7',
    liveUrl: 'https://nexusboard.vercel.app',
    githubUrl: 'https://github.com/punyajain312/nexusboard',
    highlights: ['Sub-second OLAP queries', 'Role-based access control', 'Shareable dashboards'],
  },
  {
    id: 'flowforge',
    name: 'FlowForge',
    subtitle: 'Visual Workflow Automation Builder',
    description:
      'A no-code workflow builder with a React Flow canvas where users compose triggers, conditionals, and integrations into automation pipelines. Supports 30+ integration nodes (Slack, Gmail, Notion, Webhooks), real-time execution logs, and branching logic. Exported workflows run on a serverless Python execution engine.',
    tech: ['React', 'React Flow', 'Python', 'FastAPI', 'PostgreSQL', 'Docker'],
    color: '#f77c4f',
    liveUrl: 'https://flowforge.vercel.app',
    githubUrl: 'https://github.com/punyajain312/flowforge',
    highlights: ['30+ integration nodes', 'Real-time execution logs', 'Serverless Python runner'],
  },
  {
    id: 'recosync',
    name: 'RecoSync',
    subtitle: 'ML-Powered Recommendation Engine',
    description:
      'A production-ready recommendation system combining collaborative filtering, content-based signals, and a two-tower neural network trained on implicit user feedback. Ships as a FastAPI microservice with A/B test routing, feature store integration, and a React admin portal to monitor model drift and precision/recall metrics over time.',
    tech: ['Python', 'PyTorch', 'FastAPI', 'Redis', 'React', 'MLflow'],
    color: '#4ff7a0',
    liveUrl: 'https://recosync.vercel.app',
    githubUrl: 'https://github.com/punyajain312/recosync',
    highlights: ['Two-tower neural network', 'A/B test routing', 'MLflow experiment tracking'],
  },
  {
    id: 'pulsechat',
    name: 'PulseChat',
    subtitle: 'Real-Time Messaging Platform',
    description:
      'A Slack-inspired real-time chat platform with WebSocket message delivery, threaded conversations, file sharing, and end-to-end encrypted DMs. Handles 1000+ concurrent connections on a single Node.js instance via Socket.io with Redis pub/sub for horizontal scaling. Deployed on AWS ECS with a full CI/CD GitHub Actions pipeline.',
    tech: ['Node.js', 'Socket.io', 'React', 'PostgreSQL', 'Redis', 'AWS ECS'],
    color: '#f74f9c',
    liveUrl: 'https://pulsechat.vercel.app',
    githubUrl: 'https://github.com/punyajain312/pulsechat',
    highlights: ['1000+ concurrent connections', 'E2E encrypted DMs', 'Zero-downtime deploys'],
  },
  {
    id: 'finsight',
    name: 'FinSight',
    subtitle: 'AI-Powered Portfolio Analytics',
    description:
      'An investment portfolio tracker with real-time market data, P&L visualization, sector allocation heatmaps, and AI-generated commentary via the Claude API. Includes tax-lot tracking, dividend reinvestment modeling, and CSV import from major brokerages. Built with React + FastAPI aggregating Yahoo Finance and Alpha Vantage data.',
    tech: ['React', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL', 'Claude API'],
    color: '#f7d44f',
    liveUrl: 'https://finsight.vercel.app',
    githubUrl: 'https://github.com/punyajain312/finsight',
    highlights: ['AI portfolio commentary', 'Tax-lot tracking', 'Multi-brokerage CSV import'],
  },
]
