import React, { Fragment } from 'react'
import Header from './Header';

import './LayoutStyles.css';
const Layout = ({children}) => {
    return (
        <div style={{display: 'flex', flexDirection:'row'}}>
            
            <div style={{flexGrow: 1}}>
            <Header />
            <main style={{backgroundColor: 'lightgrey', /* minWidth: '100vw',  */ width: '100%', minHeight: '90vh', padding: '24px'}}>
                {children}
            </main>
            
            </div>
        </div>
    )
}

export default Layout;
