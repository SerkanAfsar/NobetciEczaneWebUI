import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import https from 'https';
import Pharmacy from "../Components/Pharmacy";
import { useRouter } from 'next/router';
import DistrictList from "../Components/Districts/DistrictList";
import PharmacyList from "../Components/Pharmacy/PharmacyList";

const IlDetay = ({ result }) => {

    const [ilceler, setIlceler] = useState([]);
    const [eczaneListesi, setEczaneListesi] = useState([]);
    const [selectedDistrict, setSelectedDistict] = useState();

    const mainDiv = useRef();
    const mainDiv2 = useRef();

    useEffect(() => {
        setIlceler(["Tüm İlçeler", ...new Set(result.data.pharmacyList.map((item) => { return item.ilceAdi }))]);
        setEczaneListesi(result?.data?.pharmacyList);
        setSelectedDistict("Tüm İlçeler");
    }, [result]);

    useEffect(() => {
        setEczaneListesi((items) => selectedDistrict != "Tüm İlçeler" ? [...result.data.pharmacyList.filter(a => a.ilceAdi == selectedDistrict)] : result?.data?.pharmacyList);
    }, [selectedDistrict]);

    const customSelectDistrict = (distict) => {

        if (window.innerWidth > 1023) {

            window.scrollTo({
                top: mainDiv.current, behavior: "smooth"
            })
        }
        else {
            window.scrollTo({
                top: mainDiv2.current.clientHeight + 40, behavior: "smooth"
            })
        }

        setSelectedDistict(distict);
    }

    if (result.hasError == true) {
        return (<div className="col-12">
            <h1>Error Accoured</h1>
        </div>)
    }
    return (
        <>
            <div className="row d-flex  flex-column-reverse flex-lg-row  bd-highlight">
                <div className="col-lg-10 col-12" ref={mainDiv}>
                    <PharmacyList eczaneListesi={eczaneListesi} />
                </div>
                <div className="col-lg-2 col-12" ref={mainDiv2}>
                    <DistrictList ilceler={ilceler} selectedDistrict={selectedDistrict} customSelectDistrict={customSelectDistrict} />
                </div>
            </div>


        </>
    )
}
export default IlDetay;

export const getStaticProps = async (context) => {
    const agent = new https.Agent({
        rejectUnauthorized: false
    });

    const { slug } = context.params;

    const result = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/Pharmacies/PharmacyListBySlug`,
        {
            slugUrl: `/nobetci-eczaneler/${slug}`
        }, { httpsAgent: agent })
        .then(resp => {
            return {
                hasError: false,
                data: {
                    cityName: resp?.data?.entity?.city?.ilAdi,
                    pharmacyList: resp?.data?.entity?.pharmacies
                }
            }
        }).catch(err => {

            return {
                hasError: true,
                data: err
            }
        });

    return {
        props: {
            result
        }
    }
}
export const getStaticPaths = async () => {

    const agent = new https.Agent({
        rejectUnauthorized: false
    });
    const paths = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/Cities/GetCityList`, { httpsAgent: agent })
        .then(resp => {
            return resp.data.entities?.map(item => {
                return {
                    params: { slug: item.seoUrl.split("/")[2] }
                }
            })
        })
        .catch(err => {
            console.log("Erros Are ", err);
        });


    return {
        paths,
        fallback: false
    }
}

