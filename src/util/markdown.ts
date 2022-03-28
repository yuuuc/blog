/**
 * markdown
 */
import MdEditor, { Plugins } from 'react-markdown-editor-lite';
import Editor from 'react-markdown-editor-lite';

// 代码高亮
const hljs = require('highlight.js');

const md = require('markdown-it')({
	html: true,
	linkify: true,
	typographer: true,
	highlight: function (str: any, lang: any) {
		let code = md.utils.escapeHtml(str);
		if (lang && hljs.getLanguage(lang)) {
			code = hljs.highlight(lang, str, true).value;
		}
		return `<pre class="hljs"><code>${code}</code></pre>`;
	}
});

Editor.unuse(Plugins.FullScreen);
Editor.unuse(Plugins.ModeToggle);

export { MdEditor, md };
