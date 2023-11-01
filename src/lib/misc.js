export const fetchText = (url) => fetch(url).then((r) => r.text());

export const log = console.log;
