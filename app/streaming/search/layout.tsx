import React from "react"

import LoadingField from 'components/field/Loading';

interface LayoutProps {
    children: React.ReactNode
    searchmenu: React.ReactNode
}

const Layout = async ({children, searchmenu}: LayoutProps) => {
    return (
        <section
            id={`streaming-search`}
            className='h-full overflow-y-auto'
        >
            <header id='streaming_search_header' className="px-2 pt-2 h-auto">
                {searchmenu}
            </header>
            {children}
        </section>
    )
}

export default Layout