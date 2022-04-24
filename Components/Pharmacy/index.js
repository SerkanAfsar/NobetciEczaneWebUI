import React, { useRef, useState, useEffect } from "react";
import styles from './index.module.scss';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { GMap } from 'primereact/gmap';


const Pharmacy = ({ item }) => {
    const [displayBasic, setDisplayBasic] = useState(false);
    const [googleMapsReady, setGoogleMapsReady] = useState(false);
    const [overlays, setOverlays] = useState(null);
    useEffect(() => {
        loadGoogleMaps(() => {
            setGoogleMapsReady(true);
        });

        return () => {
            removeGoogleMaps();
        }
    }, []);

    const onMapClick = (event) => {
        setDialogVisible(true);
        setSelectedPosition(event.latLng)
    }
    const onMapReady = (event) => {
        setOverlays(
            [
                new google.maps.Marker({ position: { lat: parseInt(item.latitude), lng: parseInt(item.longitude) }, title: item.eczaneAdi }),

            ]
        );
    }

    const options = {
        center: { lat: parseInt(item.latitude), lng: parseInt(item.longitude) },
        zoom: 11
    };

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
                            <Button label="HARİTA İÇİN TIKLAYINIZ" className={styles.mapButton} onClick={() => setDisplayBasic(true)} />
                        </div>
                    ) : (<></>)
                    }

                </div>
            </div>
        </div>
        <Dialog header={`${item.eczaneAdi} - ${item.ilceAdi}`} visible={displayBasic} style={{ width: '80vw' }} onHide={() => setDisplayBasic(false)}>
            {googleMapsReady && (
                <GMap overlays={overlays} options={options} style={{ width: '100%', minHeight: '400px' }} onMapReady={onMapReady}
                />
            )}

        </Dialog>

    </>
    );
}
export const loadGoogleMaps = (callback) => {
    const existingScript = document.getElementById('googleMaps');

    if (!existingScript) {
        const script = document.createElement('script');
        script.src = 'https://maps.google.com/maps/api/js?key=AIzaSyAAFudThbsUsJXAxn0BSOIvCMXEAHV9NK8';
        script.id = 'googleMaps';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        script.onload = () => {
            if (callback) callback();
        };
    }

    if (existingScript && callback) callback();
};

export const removeGoogleMaps = () => {
    const mapScript = document.getElementById('googleMaps');

    if (mapScript) {
        mapScript.parentNode.removeChild(mapScript);

        const head = document.getElementsByTagName('head')[0];
        const scripts = head.getElementsByTagName('script');
        for (let i = 0; i < scripts.length; i++) {
            let script = scripts[i];
            let src = script.src;

            if (src.startsWith('https://maps.google.com/maps')) {
                head.removeChild(script);
            }
        }
    }
};

export default Pharmacy;