import fs from 'fs';
import { marked, MarkedOptions } from 'marked';

const markedOption: MarkedOptions = ({
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
