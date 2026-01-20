"use client";

import Ably from 'ably';

const createAblyClient = () => {
    // If we're on the server, return a mock client to avoid errors during build.
    if (typeof window === 'undefined') {
        return {
          channels: {
            get: () => ({
              subscribe: () => {},
              unsubscribe: () => {},
              publish: () => {},
            }),
          },
          auth: {},
        } as unknown as Ably.Realtime;
    }

    // If we're in the browser, create the real client.
    return new Ably.Realtime({ authUrl: '/hidden_app/api/ably-token' });
}

export const ably = createAblyClient();
