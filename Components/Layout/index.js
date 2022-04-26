import React, { useEffect, useState } from "react";
import Cities from "./Cities";
import Header from "./Header";
import ScrollToTop from "./ScrollToTop";

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
        </>);
}
export default Layout;