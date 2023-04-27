import React from 'react';

import logger from 'library/logger'

interface LayoutProps {
    children: React.ReactNode
    modal: React.ReactNode
}

const Layout = ({ children, modal }: LayoutProps) => {
    return (
        <div className='relative h-full'>
            {children}
            {modal}
        </div>
    );
}

export default Layout;