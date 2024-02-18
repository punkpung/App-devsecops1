import { marked as markedOG } from "marked";
import hljs from "highlight.js";

const renderer = new markedOG.Renderer();

renderer.paragraph = (text) => {
  return `<p class="mb-4">${text}</p>`;
};

renderer.code = (code, language) => {
  const validLang = !!(language && hljs.getLanguage(language));
  const highlighted = validLang
    ? hljs.highlight(code, { language, ignoreIllegals: true }).value
    : code;
  return `<div class="shadow-md rounded-md overflow-hidden bg-neutral-900"><div class="p-2 text-xs">${language}</div><pre><code class="!whitespace-pre hljs language-${language} text-sm">${highlighted}</code></pre></div>`;
};

markedOG.setOptions({
  renderer,
});

export const marked = markedOG;
