// Polyfills for Hermes JS engine (React Native)
import 'react-native-url-polyfill/auto';

const TextEncodingPolyfill = require('text-encoding');

// Guarantee global, globalThis, and window have TextDecoder / TextEncoder
const g = typeof globalThis !== 'undefined' ? globalThis : (typeof global !== 'undefined' ? global : window);

g.TextDecoder = g.TextDecoder || TextEncodingPolyfill.TextDecoder;
g.TextEncoder = g.TextEncoder || TextEncodingPolyfill.TextEncoder;

if (typeof global !== 'undefined') {
  global.TextDecoder = global.TextDecoder || TextEncodingPolyfill.TextDecoder;
  global.TextEncoder = global.TextEncoder || TextEncodingPolyfill.TextEncoder;
}

// Polyfill window & window.location for web libraries used in React Native (e.g., uploadthing)
if (typeof window === 'undefined') {
  g.window = g;
}
if (!g.window.location) {
  g.window.location = {
    origin: 'http://localhost',
    protocol: 'http:',
    host: 'localhost',
    hostname: 'localhost',
    port: '',
    pathname: '/',
    search: '',
    hash: '',
    href: 'http://localhost/',
  };
}

