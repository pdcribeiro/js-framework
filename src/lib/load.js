import { loadLayout } from '/lib/layout.js';
import { setupRouter } from '/lib/router.js';

// document.body.replaceChildren();
document.body.querySelectorAll('script').forEach((s) => s.remove());
window.stop();

// load();

async function load() {
  await loadLayout();
  setupRouter();
}
