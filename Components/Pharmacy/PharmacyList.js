import React, { useEffect, useState } from "react";
import Pharmacy from './index';
import styles from './PharmacyList.module.scss';

const PharmacyList = ({ eczaneListesi, selectedDistrict }) => {
    const [list, setList] = useState(eczaneListesi);
    useEffect(() => {
        setList((items) => selectedDistrict != "Tüm İlçeler" ? [...eczaneListesi.filter(a => a.ilceAdi == selectedDistrict)] : eczaneListesi);
    }, [selectedDistrict]);
    return (
        <div className={`row g-4 mb-md-4 ${styles.mb20}`}>
            {
                list.map((item, index) => {
                    return <Pharmacy item={item} key={index} />

                })
            }

        </div>
    );
}
export default PharmacyList;