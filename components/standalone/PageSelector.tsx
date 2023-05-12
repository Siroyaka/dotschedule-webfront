import React from "react";

import { NavigationNextSvg, NavigationBeforeSvg } from 'components/parts/svgIcons';
import Link from 'next/link';

interface Props {
    totalLen: number
    viewNum: number
    nowPage: number
    pageQueryName: string
    pagePath: string
    otherQuerys?: {}
    numbersClassName?: string
    parentClassName?: string
    childNumberClassName?: string
    childClassName?: string
    arrowLinkClassName?: string
    disableArrowClassName?: string
    nowPageNumClassName?: string
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
    numbersClassName,
    childNumberClassName,
    childClassName,
    arrowLinkClassName,
    disableArrowClassName,
    nowPageNumClassName,
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
            <div className={parentClassName}>
                {
                    nowPage !== 1 ? (
                        <div className={`${arrowLinkClassName}`}>
                            <Link href={{
                                pathname: pagePath,
                                query: {
                                    ...otherQuerys,
                                    [pageQueryName]: nowPage - 1
                                }

                            }}
                                draggable={false}
                            >
                                <NavigationBeforeSvg className="w-8"/>
                            </Link>
                        </div>
                    ) : (
                        <div className={`${disableArrowClassName}`}>
                            <NavigationBeforeSvg className="w-8"/>
                        </div>
                    )
                }
                <ol className={numbersClassName}>
                    {
                        pages.map((i, _) => {
                            if (i === nowPage) {
                                return (
                                    <li key={`page-${i}`} className={`${childNumberClassName} ${nowPageNumClassName}`}>
                                        {i}
                                    </li>
                                )
                            }
                            return (
                                <li key={`page-${i}`} className={`${childNumberClassName} ${enableLinkClassName}`}>
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
                {
                    pages[pages.length - 1] > nowPage ? (
                        <div className={`${arrowLinkClassName}`}>
                            <Link href={{
                                pathname: pagePath,
                                query: {
                                    ...otherQuerys,
                                    [pageQueryName]: nowPage + 1
                                }

                            }}
                                draggable={false}
                            >
                                <NavigationNextSvg className="w-8"/>
                            </Link>
                        </div>
                    ) : (
                        <div className={`${disableArrowClassName}`}>
                            <NavigationNextSvg className="w-8"/>
                        </div>
                    )
                }
            </div>
        </React.Fragment>
    )
}

export default PageSelecter;