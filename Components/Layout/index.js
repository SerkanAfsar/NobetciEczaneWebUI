import React from "react";
import Cities from "./Cities";
import Header from "./Header";

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <main className="container my-4">
                <div className="row">
                    <div className="col-lg-4 col-12">
                        <Cities />
                    </div>
                    <div className="col-lg-8 col-12">
                        {children}
                    </div>
                </div>
            </main>
            <footer></footer>
        </>);
}
export default Layout;