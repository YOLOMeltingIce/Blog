import React from 'react';

const Layout: React.FC = ({ children }) => {
    return (
        <div>
            <header>
                <h1>我的博客</h1>
            </header>
            <main>{children}</main>
            <footer>
                <p>© 2023 我的博客. 保留所有权利。</p>
            </footer>
        </div>
    );
};

export default Layout;