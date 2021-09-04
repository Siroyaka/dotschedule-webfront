import fs from 'fs';
import marked      from 'marked';
import highlightjs from 'highlight.js';

marked.setOptions({
  highlight: function(code, lang) {
    return highlightjs.highlightAuto(code, [lang]).value;
  },
  pedantic: false,
  gfm: true,
  breaks: true,
  silent: false
});

export const getHtmlFromMarkdown = async (dataSource: string) => {
  const fileContents = fs.readFileSync(dataSource, 'utf8');

  const htmlContents = marked(fileContents);
  return htmlContents;
}
