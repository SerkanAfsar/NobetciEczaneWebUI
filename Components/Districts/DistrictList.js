import React from 'react';
import styles from './DistrictList.module.scss';

const DistrictList = ({ ilceler, setSelectedDistict, selectedDistrict }) => {
    return (
        <div className="row col-12 mb-3">
            {ilceler.map((item) => (
                <div key={item} onClick={(e) => setSelectedDistict(item)} className={`col-sm-6 col-md-6 col-lg-3 col-xl-3 p-1`}>
                    <div className={selectedDistrict == item ? `${styles.item} ${styles.activeItem}` : `${styles.item}`}>
                        {item}
                    </div>

                </div>
            ))}
        </div>
    )
}

export default DistrictList;