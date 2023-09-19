import { fetchText } from './utils.js';

export function setupRouter() {
  document.addEventListener('click', async (event) => {
    const anchor = event.target.closest('a');
    if (anchor && isInternalUrl(anchor.href)) {
      event.preventDefault();
      fetchAndLoad(anchor.href);
      updatePath(anchor.href);
    }
  });
  window.addEventListener('popstate', () => {
    fetchAndLoad(location.href);
  });
}

function isInternalUrl(url) {
  return url.startsWith('/') || url.startsWith(location.origin);
}

async function fetchAndLoad(path) {
  const htmlString = await fetchText(path);
  replaceContent(htmlString);
  insertScripts(htmlString);
}

function replaceContent(htmlString) {
  document.getElementById('content').innerHTML = htmlString;
}

function insertScripts(htmlString) {
  const parser = new DOMParser();
  const parsed = parser.parseFromString(htmlString, 'text/html');
  const scripts = parsed.querySelectorAll('script');
  const content = document.getElementById('content');
  scripts.forEach(({ id, type, src, textContent }, i) => {
    if (id !== 'load') {
      const newScript = document.createElement('script');
      if (type) {
        newScript.type = type;
      }
      if (src) {
        newScript.src = src;
      }
      if (textContent) {
        newScript.textContent = textContent;
      }
      content.appendChild(newScript);
    }
  });
}

function updatePath(path) {
  history.pushState(null, '', path);
}
