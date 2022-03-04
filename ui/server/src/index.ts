import { start } from './server/index.js';

import { initLog } from './log-config.js';

const app = () => {
  initLog();
  start();
} 
app();