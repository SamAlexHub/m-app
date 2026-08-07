// Mock expo-image-picker for web when running under Vite
// This prevents Vite from crashing when trying to bundle Expo native modules for the web.
// On Android/iOS, Expo's Metro bundler is used and this mock is ignored.

export const launchImageLibraryAsync = async () => {
  console.warn("expo-image-picker mock called on web. Use standard web file picker instead.");
  return { canceled: true, assets: [] };
};

export const MediaTypeOptions = {
  All: 'All',
  Images: 'Images',
  Videos: 'Videos',
};
