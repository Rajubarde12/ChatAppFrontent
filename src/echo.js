import Echo from 'laravel-echo';
import Pusher from 'pusher-js/react-native';
import { getString } from './utils/storage';

global.Pusher = Pusher;

const token = getString('token');

// 🌐 Static Reverb values (matching your .env)
const REVERB_APP_KEY = 'oi4rnynjhmgd5vvz024v';
const REVERB_HOST = '192.168.1.7'; // your LAN IP (not localhost)
const REVERB_PORT = 8080;
const REVERB_SCHEME = 'http';

const echo = new Echo({
  broadcaster: 'reverb',
  key: REVERB_APP_KEY,
  wsHost: REVERB_HOST,
  wsPort: REVERB_PORT,
  wssPort: REVERB_PORT,
  forceTLS: REVERB_SCHEME === 'https',
  disableStats: true,
  enabledTransports: ['ws', 'wss'],
  authEndpoint: `${REVERB_SCHEME}://${REVERB_HOST}:8000/broadcasting/auth`,
  auth: {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  },
});

export default echo;
