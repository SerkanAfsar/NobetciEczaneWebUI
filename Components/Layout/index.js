import React from "react";
import Header from "./Header";

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <main>
                {children}
            </main>
            <footer>Footer Deneme</footer>
        </>);
}
export default Layout;