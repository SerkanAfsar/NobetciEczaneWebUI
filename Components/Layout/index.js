import React, { useEffect, useState } from "react";

import Header from "./Header";
import ScrollToTop from "./ScrollToTop";
import Script from 'next/script';

const Layout = ({ children }) => {
    const [isActive, setIsActive] = useState(false);
    useEffect(() => {
        window.onscroll = function (e) {
            if (window.scrollY >= 100) {
                setIsActive(true)
            }
            else { setIsActive(false) }
        }
    }, [])
    return (
        <>
            <Header />
            <main className="container my-4">
                <div className="row">

                    <div className="col-12">
                        {children}
                    </div>
                </div>
            </main>
            <footer></footer>
            <ScrollToTop isActive={isActive} />
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=G-718E8FL3TK"
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
           window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('js', new Date());
         
           gtag('config', 'G-718E8FL3TK');
        `}
            </Script>
        </>

    );
}
export default Layout;