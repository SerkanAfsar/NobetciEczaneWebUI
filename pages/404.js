import React from "react";
import Image from 'next/image';
import styles from './404.module.scss'
import img from '../public/eczane.jpg';

const NotFound = () => {
    return (
        <div className={styles.wrapper}>
            <Image src={img} width={150} height={150} />
            <h4>Aradığınız Sayfa Bulunamamıştır</h4>
        </div>

    );
}
export default NotFound;