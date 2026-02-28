import { headers } from 'next/headers';

export default async function sitemap() {
  const headersList = await headers();
  const host = headersList.get('host') || 'polutek.pl';
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const baseUrl = `${protocol}://${host}`;

  if (host.includes('eliksir-wiedzmina.pl')) {
    return [
      {
        url: 'https://www.eliksir-wiedzmina.pl',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1.0,
      },
    ];
  }

  // Vibe Coding Routes for polutek.pl
  const routes = [
    '',
    '/co-to-jest-vibe-coding',
    '/narzedzia-ai',
    '/andrej-karpathy',
    '/praca',
    '/faq',
    '/vibe-coding-dla-founderow',
    '/legalnosc-kodu-ai',
    '/deepseek-v3-vs-claude-35',
    '/zaawansowany-cursor',
    '/vibe-coding-w-medycynie',
    '/przyszlosc-saas-2025',
    '/cursor-vs-windsurf',
    '/agentic-workflows-tutorial',
    '/vibe-coding-dla-studentow',
    '/scaling-vibe-teams',
    '/security-audit-checklist',
    '/vibe-coding-w-pythonie',
    '/zarabianie-na-vibe-codingu',
    '/saas-w-24h',
    '/najlepsze-prompty-vibe-coding',
    '/przyszlosc-juniorow',
    '/bezpieczenstwo-kodu-ai',
    '/psychologia-vibe-codingu',
    '/vibe-coding-vs-no-code',
    '/vibe-coding-vs-prompt-engineering',
    '/vibe-coding-w-enterprise',
    '/vibe-coding-w-react',
    '/najlepsze-modele-ai-2025',
    '/jak-zaczac-z-cursorem',
    '/roadmap',
    '/slownik',
    '/cursor-vs-vscode-copilot',
    '/bolt-vs-lovable',
    '/claude-35-sonnet-vs-gpt-o1',
    '/case-study-dashboard-mvp',
    '/case-study-chrome-extension-ai',
    '/quiz',
    '/news',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
