import React from "react";
import Pharmacy from './index';
import styles from './PharmacyList.module.scss';

const PharmacyList = ({ eczaneListesi }) => {
    return (
        <div className={`row g-4 mb-md-4 ${styles.mb20}`}>
            {eczaneListesi?.map((item, index) => <Pharmacy item={item} key={index} />)}
        </div>
    );
}
export default PharmacyList;