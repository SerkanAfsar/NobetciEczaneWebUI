import React from "react";
import Pharmacy from './index';

const PharmacyList = ({ eczaneListesi }) => {
    return (
        <div className="row g-4 mb-md-4">
            {eczaneListesi?.map(item => <Pharmacy item={item} key={item.guidKey} />)}
        </div>
    );
}
export default PharmacyList;