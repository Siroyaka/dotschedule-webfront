import React from 'react';

import logger from 'library/logger'

interface LayoutProps {
    children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className='relative h-full'>
            {children}
        </div>
    );
}

export default Layout;