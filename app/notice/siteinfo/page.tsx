import React from 'react';

import Head from 'next/head';

import { getHtmlFromMarkdown } from 'library/IOModules';
import path from 'path';

export const metadata = {title: "このサイトについて"}
export const revalidate = 300;

const markdownPath = 'server_data/markdown/notice.md';

const Page = async () => {
    const mdPath = path.join(process.cwd(), markdownPath);
    const contents = await getHtmlFromMarkdown(mdPath);

    return (
        <div
            id='notice-contents'
            className='shadow-md border-2 px-8 py-8 '
            dangerouslySetInnerHTML={{ __html: contents }}
        >
        </div>

    )
}

export default Page;