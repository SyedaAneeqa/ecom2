// import React, { Children } from 'react'
// import Navbar from './Navbar'
// import Footer from './Footer'

// function Layout({ children }) {
//     return (
//         <>
//             <Navbar />
//             <main>{children}</main>
//             <Footer />


//         </>
//     )
// }

// export default Layout
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';


function Layout({ children }) {
    return (
        <>
            <Navbar />
            
            {/* Optional: About Section above main content */}
            
            <main>{children}</main>

            <Footer />
        </>
    );
}

export default Layout;
