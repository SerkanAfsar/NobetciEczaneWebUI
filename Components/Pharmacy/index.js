import React, { useRef, useState, useEffect } from "react";
import styles from './index.module.scss';
import { Dialog } from 'primereact/dialog';






const Pharmacy = ({ item }) => {
    const [displayBasic, setDisplayBasic] = useState(false);


    return (<>
        <div className="col-lg-4 col-md-6 col-12">
            <div className={`card shadow h-100 ${styles.customCard}`}>
                <div className={`card-header ${styles.title}`}>
                    {item.eczaneAdi} - {item.ilceAdi}
                </div>
                <div className="card-body">
                    <div className={styles.subInfo}>
                        <i className="bi bi-geo-alt-fill"></i>
                        <p className={`card-text ${styles.info}`}>{item.adres}</p>
                    </div>
                    <div className={styles.subInfo}>
                        <i className="bi bi-telephone-fill"></i>
                        <a href={`tel:${item.telefon}`} className={`card-text ${styles.info} ${styles.phone}`}>{item.telefon} - <b>ARA</b> </a>
                    </div>

                    {item.hasMap == true ? (
                        <div className={styles.subInfo}>
                            <i className="bi bi-pin-map-fill"></i>
                            {/* <Button label="HARİTA İÇİN TIKLAYINIZ" className={styles.mapButton} onClick={() => setDisplayBasic(true)} />
                            < */}
                            <a target="_blank" href={`https://www.google.com/maps?q=${item.latitude},${item.longitude}`} className={styles.mapButton} > Harita İçin Tıklayınız</a>
                        </div>
                    ) : (<></>)
                    }

                </div>
            </div>
        </div>
        {/* <Dialog header={`${item.eczaneAdi} - ${item.ilceAdi}`} visible={displayBasic} style={{ width: '80vw' }} onHide={() => setDisplayBasic(false)}>
            <PharmacyMap item={item} />
        </Dialog> */}

    </>
    );
}




export default Pharmacy;