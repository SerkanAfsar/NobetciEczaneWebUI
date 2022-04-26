import React from "react";
import styles from './ScrollToTop.module.scss';

const ScrollToTop = ({ isActive }) => {
    return (<div
        onClick={(e) => {
            window.scrollTo({ top: 0, behavior: "smooth" })
        }}
        className={isActive == true ? `${styles.scrollDiv} ${styles.active}` : `${styles.scrollDiv}`}>
        <i className="bi bi-arrow-up-circle"></i>
    </div>)
}
export default ScrollToTop;