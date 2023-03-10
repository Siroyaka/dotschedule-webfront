import React from "react"

interface LayoutProps {
    children: React.ReactNode
}

const Layout = ({children}: LayoutProps) => {
    return (
        <article className='max-w-4xl mx-8 lg:mx-auto my-8 sm:my-16 overflow-y-auto h-full'>
            <header>
                <h1 className='text-2xl sm:text-4xl text-center w-full mb-8 sm:mb-16'>このサイトについて</h1>
            </header>
            {children}
        </article>
    )
}

export default Layout