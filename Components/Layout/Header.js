import React, { useState } from "react";
import styles from './Header.module.scss';
import Link from "next/link";

const Header = () => {
    const [isActive, setIsActive] = useState(false);
    return (
        <header className={`${styles.header} shadow`}>
            <div className="container position-relative">
                <nav>

                    <Link href="/">
                        <a className={styles.brand} title="Nöbetçi Eczaneler">Nöbetçi Eczaneler</a>
                    </Link>
                    <ul className={isActive == true ? `${styles.ulClass} ${styles.active}` : `${styles.ulClass}`}>

                        <li>
                            <Link href="/">
                                <a title="Anasayfa">
                                    Anasayfa
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/istanbul-nobetci-eczaneleri">
                                <a title="İstanbul Nöbetçi Eczaneleri">
                                    İstanbul
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/ankara-nobetci-eczaneleri">
                                <a title="Ankara Nöbetçi Eczaneleri">
                                    Ankara
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/izmir-nobetci-eczaneleri">
                                <a title="İzmir Nöbetçi Eczaneleri">
                                    İzmir
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/bursa-nobetci-eczaneleri">
                                <a title="Bursa Nöbetçi Eczaneleri">
                                    Bursa
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/antalya-nobetci-eczaneleri">
                                <a title="Antalya Nöbetçi Eczaneleri">
                                    Antalya
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/adana-nobetci-eczaneleri">
                                <a title="Adana Nöbetçi Eczaneleri">
                                    Adana
                                </a>
                            </Link>
                        </li>
                    </ul>


                </nav>
                <button className={styles.btn} onClick={(e) => setIsActive(!isActive)} type="button">
                    {isActive == true ? (<i className="bi bi-x-circle-fill"></i>) : (<i className="bi bi-list"></i>)}
                </button>
            </div>
        </header>
    );
}
export default Header;