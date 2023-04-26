import React from 'react';

interface LayoutProps {
    children: React.ReactNode
    modal: React.ReactNode
}

export const revalidate = 5;

const Layout = ({ children, modal }: LayoutProps) => {
    return (
        <div className='relative h-full'>
            {children}
            {modal}
        </div>
    );
}

export default Layout;