"use client";

import Ably from 'ably';

export const ably = new Ably.Realtime({ authUrl: '/hidden_app/api/ably-token' });
