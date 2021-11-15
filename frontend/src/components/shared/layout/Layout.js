import React, { Fragment } from 'react'
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import './LayoutStyles.css';
const Layout = ({children}) => {
    return (
        <div style={{display: 'flex', flexDirection:'row'}}>
            {/* <Sidebar /> */}
            <div style={{flexGrow: 1}}>
            <Header />
            <main style={{backgroundColor: 'lightgrey', /* minWidth: '100vw',  */ width: '100%', minHeight: '90vh', padding: '24px'}}>
                {children}
            </main>
            <Footer />
            </div>
        </div>
    )
}

export default Layout;
