import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: 'react-native-svg',
        replacement: path.resolve(__dirname, './src/mocks/reactNativeSvgMock.jsx'),
      },
      {
        find: 'expo-image-picker',
        replacement: path.resolve(__dirname, './src/mocks/expoImagePickerMock.js'),
      },
      {
        find: 'react-native/Libraries/Utilities/codegenNativeComponent',
        replacement: path.resolve(__dirname, './src/mocks/codegenNativeComponent.js'),
      },
      {
        find: 'react-native',
        replacement: 'react-native-web',
      },
      {
        find: '@',
        replacement: path.resolve(__dirname, './src'),
      },
    ],
  },
  server: {
    port: 3000,
    host: true,
  },
  // Inject React Native's __DEV__ global for web builds.
  // This does NOT affect Android/Expo — they have their own native __DEV__ value.
  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
  },
});
