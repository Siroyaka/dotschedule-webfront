import fs from 'fs';
import remark from 'remark';
import html from 'remark-html';

export const getHtmlFromMarkdown = async (dataSource: string) => {
  const fileContents = fs.readFileSync(dataSource, 'utf8');

  const contents = await remark().use(html).process(fileContents);
  const htmlContents = contents.toString();
  return htmlContents;
}
