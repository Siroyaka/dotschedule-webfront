import fs from 'fs';
import { marked, MarkedOptions } from 'marked';
import highlightjs from 'highlight.js';

const markedOption: MarkedOptions = ({
  highlight: function(code, lang) {
    const l = lang === undefined ? undefined : [lang];
    return highlightjs.highlightAuto(code, l).value;
  },
  pedantic: false,
  gfm: true,
  breaks: true,
  silent: false
});

export const getHtmlFromMarkdown = async (dataSource: string) => {
  const fileContents = fs.readFileSync(dataSource, 'utf8');

  const htmlContents = marked(fileContents, markedOption);
  return htmlContents;
}
