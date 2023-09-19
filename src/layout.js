import { fetchText } from './utils.js';

export async function loadLayout() {
  hideDocument();
  const layoutString = await fetchText('/_layout.html');
  const htmlString = interpolateContent(layoutString);
  rewriteDocument(htmlString);
  showDocument();
}

function hideDocument() {
  document.documentElement.style.display = 'none';
}

function interpolateContent(layoutString) {
  const contentString = document.body.innerHTML;
  return layoutString.replace('{content}', contentString);
}

function rewriteDocument(htmlString) {
  document.open();
  document.write(htmlString);
  document.close();
}

function showDocument() {
  document.documentElement.style.display = '';
}
