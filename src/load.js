/* TODO
  - Prevent scripts from running twice
 */

import { loadLayout } from './layout.js';
import { setupRouter } from './router.js';

load();

async function load() {
  await loadLayout();
  setupRouter();
}
