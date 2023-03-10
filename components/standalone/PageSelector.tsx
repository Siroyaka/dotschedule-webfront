import React from "react";

import Link from 'next/link';

interface Props {
    totalLen: number
    viewNum: number
    nowPage: number
    pageQueryName: string
    pagePath: string
    otherQuerys?: {}
    parentClassName?: string
    childClassName?: string
    disableLinkClassName?: string
    enableLinkClassName?: string
}

const viewPages = (nowPage: number, pageLen: number, pageViewNum: number) => {
    if (pageLen <= pageViewNum) {
        const viewingPageNum: number[] = [];
        for (let i = 0; i < pageLen; i++) {
            viewingPageNum.push(i + 1);
        }
        return viewingPageNum;
    }

    const pagesMoveStartNum = Math.ceil(pageViewNum / 2);
    const pagesMoveEndNum = pageLen - pagesMoveStartNum;

    const viewingPageNums: number[] = [];
    let a = 0;
    if (nowPage <= pagesMoveStartNum) {
        a = 1;
    } else if (nowPage >= pagesMoveEndNum) {
        a = pageLen - pageViewNum;
        a++;
    } else {
        a = nowPage - pagesMoveStartNum + 1;
    }

    for (let i = 0; i < pageViewNum; i++) {
        viewingPageNums.push(i + a);
    }
    return viewingPageNums;
}

const PageSelecter: React.FC<Props> = ({
    totalLen,
    viewNum,
    nowPage,
    pageQueryName,
    pagePath,
    otherQuerys,
    parentClassName,
    childClassName,
    disableLinkClassName,
    enableLinkClassName
}) => {
    const pages = viewPages(nowPage, totalLen, viewNum);
    if (totalLen < 2) {
        return (
            <div></div>
        )
    } 
    return (
        <React.Fragment>
            <ol className={parentClassName}>
                {
                    pages.map((i, _) => {
                        if (i === nowPage) {
                            return (
                                <li key={`page-${i}`} className={`${childClassName} ${disableLinkClassName}`}>
                                    {i}
                                </li>
                            )
                        }
                        return (
                            <li key={`page-${i}`} className={`${childClassName} ${enableLinkClassName}`}>
                                <Link href={{
                                    pathname: pagePath,
                                    query: {
                                        ...otherQuerys,
                                        [pageQueryName]: i
                                    }
                                    
                                }}
                                    draggable={false}
                                    prefetch={false}
                                >
                                    {i}
                                </Link>
                            </li>
                        )
                    })
                }
            </ol>
        </React.Fragment>
    )
}

export default PageSelecter;