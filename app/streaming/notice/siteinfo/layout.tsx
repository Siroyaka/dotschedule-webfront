import React from "react"

interface LayoutProps {
    children: React.ReactNode
}

const Layout = ({children}: LayoutProps) => {
    return (
        <article className='max-w-4xl mx-8 lg:mx-auto mt-8 pb-32 overflow-y-auto'>
            <header className='mb-8 sm:mb-16 text-center'>
                <h1 className='text-2xl sm:text-4xl'>このサイトについて</h1>
            </header>
            {children}
        </article>
    )
}

export default Layout