import React from "react";
import styles from './Header.module.scss';

const Header = () => {
    return (
        <header className={`${styles.header} shadow`}>
            <div className="container">
                <b>Nöbetçi Eczaneler</b>
            </div>
        </header>
    );
}
export default Header;