import { marked } from 'marked';

export function renderMarkdown(text) {
  if (!text) return '';
  try {
    return marked.parse(text, { breaks: true });
  } catch (e) {
    return escapeHtml(text);
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
