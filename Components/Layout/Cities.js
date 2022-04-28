import React, { useState, useEffect } from "react";
import axios from 'axios';
import Link from 'next/link';
import styles from './Cities.module.scss';


const Cities = () => {
    const [cityList, setCitylist] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/Cities/GetCityList`).then(resp => {
            setCitylist(item => resp.data.entities?.map(item => {
                return {
                    ilId: item.ilid,
                    ilAdi: item.ilAdi,
                    seoUrl: item.seoUrl.split("/")[2]
                }
            }))
        }).catch(err => {
            console.log(err);
        })
    }, []);


    return (
        <aside className="p-3 shadow">
            <ul className={styles.listCity}>
                {cityList.map((item, index) => (
                    <li key={index}>
                        <Link
                            href={{
                                pathname: "/nobetci-eczaneler/[slug]",
                                query: { slug: item.seoUrl }
                            }}>
                            <a title={item.ilAdi}>
                                {item.ilAdi}
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    )
}
export default React.memo(Cities);