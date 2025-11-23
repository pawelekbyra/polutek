export const mockNotifications = [
  {
    id: 'mock-1',
    userId: 'user-1',
    title: 'Witaj w wersji VIP 👑',
    message: 'Dzięki za dołączenie! To jest przykładowe powiadomienie testowe.',
    type: 'system', // system, like, comment, tip
    isRead: false,
    createdAt: new Date().toISOString(),
    data: null
  },
  {
    id: 'mock-2',
    userId: 'user-1',
    title: 'Nowa wpłata 💰',
    message: 'Otrzymałeś napiwek w wysokości 50 PLN od Nieznajomego.',
    type: 'tip',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1h temu
    data: { amount: 50, currency: 'PLN' }
  },
  {
    id: 'mock-3',
    userId: 'user-1',
    title: 'Ktoś polubił Twój post ❤️',
    message: 'Użytkownik Jules polubił Twoje wideo "Nocne kodowanie".',
    type: 'like',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 dzień temu
    data: { videoId: 'v1' }
  }
];
