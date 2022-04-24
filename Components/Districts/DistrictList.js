import React from 'react';
import styles from './DistrictList.module.scss';

const DistrictList = ({ ilceler, customSelectDistrict, selectedDistrict }) => {
    return (
        <div className="row">
            <div className='col-12'>
                <ul className={`list-group ${styles.listCustom}`}>
                    {ilceler.map((item) => (
                        <li key={item} onClick={(e) => customSelectDistrict(item)} className={selectedDistrict == item ? `list-group-item ${styles.active}` : `list-group-item`}>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default DistrictList;