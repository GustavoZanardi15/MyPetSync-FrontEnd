/*import { Platform } from 'react-native';

const PORT = 3000;


const ANDROID_EMULATOR_IP = `http://10.0.2.2:${PORT}`;

const IOS_SIMULATOR_IP = `http://localhost:${PORT}`;
export const API_BASE_URL = Platform.OS === 'android'
  ? ANDROID_EMULATOR_IP
  : IOS_SIMULATOR_IP; 
  
console.log(`[Config] API Base URL: ${API_BASE_URL} (Platform: ${Platform.OS})`);*/


export const API_BASE_URL =
  "https://mypetsync-escoladeti-production.up.railway.app";

console.log('[Config] API Base URL: ${API_BASE_URL}');