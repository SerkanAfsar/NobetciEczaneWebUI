import React from "react";
import Pharmacy from './index';
import styles from './PharmacyList.module.scss';

const PharmacyList = ({ eczaneListesi }) => {
    return (
        <div className={`row g-4 mb-md-4 ${styles.mb20}`}>
            {eczaneListesi?.map(item => <Pharmacy item={item} key={item.guidKey} />)}
        </div>
    );
}
export default PharmacyList;