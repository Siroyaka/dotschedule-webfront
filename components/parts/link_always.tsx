'use client'

import React from 'react';

import Link from 'next/link';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { ParsedUrlQueryInput } from 'querystring';

interface SameCheckParams {
    pathname: string
    query: ParsedUrlQueryInput
}

type Props = Omit<React.ComponentProps<typeof Link>, 'href'> & SameCheckParams;

export const useIsSameLink = (param: SameCheckParams) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    if (pathname !== param.pathname) {
        return false;
    }
    const queryKeys = Object.keys(param.query);

    for(const s of queryKeys) {
        const searchValue = searchParams.get(s);
        if(searchValue === null) {
            return false;
        }

        const queryValue = param.query[s];

        switch(typeof queryValue) {
            case 'string': {
                if(queryValue !== searchValue) {
                    return false;
                }
                break;
            }
            case 'number': {
                const vton = parseInt(searchValue);
                if(isNaN(vton)) return false;
                if(vton !== queryValue) return false;
                break;
            }
            case 'boolean': {
                if(searchValue !== 'true' && searchValue !== 'false') return false;
                if(queryValue !== (searchValue === 'true')) return false;
                break;
            }
            default: {
                return false;
            }
        }
    }

    return true;
}

const LinkAlways: React.FC<Props> = (props) => {
    const router = useRouter();
    if(useIsSameLink(props)) {
        const clickButton = () => {
            console.log('refresh');
            router.refresh();
        }
        return (
            <button onClick={clickButton} className={props.className} >
                {props.children}
            </button>
        )
    }

    return (
        <Link
            href={{
                pathname: props.pathname,
                query: props.query
            }}
            className={props.className}
            draggable={props.draggable}
            prefetch={props.prefetch}
        >
            {props.children}
        </ Link>
    )
}

export default LinkAlways;