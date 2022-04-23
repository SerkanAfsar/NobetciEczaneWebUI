import React from "react";
import styles from './Header.module.scss';
import Link from "next/link";

const Header = () => {
    return (
        <header className={`${styles.header} shadow`}>
            <div className="container d-flex align-items-center">
                <Link href="/">
                    <a className={styles.brand} title="Nöbetçi Eczaneler">Nöbetçi Eczaneler</a>
                </Link>
                <ul>
                    <li>
                        <Link href="/nobetci-eczaneler/istanbul-nobetci-eczaneleri">
                            <a title="İstanbul Nöbetçi Eczaneleri">
                                İstanbul
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/nobetci-eczaneler/ankara-nobetci-eczaneleri">
                            <a title="Ankara Nöbetçi Eczaneleri">
                                Ankara
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/nobetci-eczaneler/izmir-nobetci-eczaneleri">
                            <a title="İzmir Nöbetçi Eczaneleri">
                                İzmir
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/nobetci-eczaneler/bursa-nobetci-eczaneleri">
                            <a title="Bursa Nöbetçi Eczaneleri">
                                Bursa
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/nobetci-eczaneler/antalya-nobetci-eczaneleri">
                            <a title="Antalya Nöbetçi Eczaneleri">
                                Antalya
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/nobetci-eczaneler/adana-nobetci-eczaneleri">
                            <a title="Adana Nöbetçi Eczaneleri">
                                Adana
                            </a>
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    );
}
export default Header;