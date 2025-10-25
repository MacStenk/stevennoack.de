/**
 * Projects Data
 */

export const projects = [
  {
    id: 'privacy-ai-os',
    title: 'Privacy AI OS',
    icon: '🔒',
    description: 'Self-hosted AI Infrastructure Stack. Plug-and-Play Hardware ohne Cloud. Launch Januar 2026.',
    tech: ['Docker', 'Ollama', 'Open WebUI', 'Qdrant', 'n8n'],
    status: 'active',
    links: [
      { type: 'website', url: 'https://privacy-ai-os.de', label: 'Website' }
    ],
    features: [
      'Komplette Datenkontrolle',
      '17 Docker Services',
      'Custom TTS (Piper)',
      'RAG System'
    ]
  },
  {
    id: 'codeback',
    title: 'CodeBack.de',
    icon: '⚡',
    description: 'JAMstack Lösungen für Coaches. Modern, schnell - ohne WordPress-Bloat.',
    tech: ['Astro', 'Cloudflare Pages', 'GitHub Actions'],
    status: 'active',
    links: [
      { type: 'website', url: 'https://codeback.de', label: 'Website' }
    ],
    features: [
      'Static Site Generation',
      'Sub-Second Load Times',
      'Git-basierter Workflow'
    ]
  },
  {
    id: 'stevennoack',
    title: 'StevenNoack.de',
    icon: '👨‍💻',
    description: 'Personal Hub mit Matrix-Ästhetik. Daily Logs, Tech Journey.',
    tech: ['Astro', 'Matrix Design', 'CRT Effects'],
    status: 'active',
    links: [],
    features: [
      'Matrix Rain Background',
      'NFO Box Design',
      'Component-Based Architecture'
    ]
  }
];

export default projects;
