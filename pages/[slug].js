import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import https from 'https';
import DistrictList from "../Components/Districts/DistrictList";
import PharmacyList from "../Components/Pharmacy/PharmacyList";
import SeoHead from "../Components/Commons/SeoHead";
import { useRouter } from "next/router";
import useSWR, { SWRConfig } from 'swr'

const fetcher = (params) => {
    const agent = new https.Agent({
        rejectUnauthorized: false
    });
    return axios.post(`${process.env.NEXT_PUBLIC_API_URL}/Pharmacies/PharmacyListBySlug`,
        {
            slugUrl: `/nobetci-eczaneler${params}`
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
                data: err.response != null ? err.response.data.errorList : new Array(err.message)
            }
        });
}

function Article({ ilceler, setIlceler, eczaneListesi, setEczaneListesi, selectedDistrict, setSelectedDistict, mainDiv, mainDiv2, customSelectDistrict }) {
    const router = useRouter();
    const { data, error, isValidating } = useSWR(router.asPath, fetcher);

    if (isValidating) {
        return (
            <div>Yükleniyor</div>
        )
    }
    if (error) {
        return (
            <div>{JSON.stringify(error)}</div>
        )
    }

    // if (data.hasError) {
    //     return (
    //         <div>{data.data.map((item, index) => (<div key={index}>
    //             {item}
    //         </div>))}</div>

    //     )
    // };








    if (data) {
        return <>
            <SeoHead title={`${data.data.cityName} | ${data.data.cityName.split(' ')[0]} Nöbetçi Eczane`}
                description={`${data.data.cityName} | ${data.data.cityName.split(' ')[0]} Nöbetçi Eczane`}
            />
            <h1 style={{ display: "none" }}>{data.data.cityName}</h1>
            <h2 style={{ display: "none" }}>{`${data.data.cityName.split(" ")[0]} Nöbetçi Eczane`}</h2>
            <h3 style={{ display: "none" }}>{`${data.data.cityName.split(" ")[0]} Nöbetçi Eczane Listesi`}</h3>
            <h4 style={{ display: "none" }}>{`${data.data.cityName.split(" ")[0]} Eczaneleri`}</h4>
            <h5 style={{ display: "none" }}>{`${data.data.cityName.split(" ")[0]} Nöbetçi Eczaneler`}</h5>
            <h6 style={{ display: "none" }}>Nöbetçi Eczane</h6>
            <div className="row d-flex  flex-column-reverse flex-lg-row  bd-highlight">
                <div className="col-lg-10 col-12" ref={mainDiv}>
                    <PharmacyList eczaneListesi={eczaneListesi} />
                </div>
                <div className="col-lg-2 col-12" ref={mainDiv2}>
                    <DistrictList ilceler={ilceler} selectedDistrict={selectedDistrict} customSelectDistrict={customSelectDistrict} />
                </div>
            </div></>
    }



}


const IlDetay = ({ result }) => {

    const [ilceler, setIlceler] = useState([]);
    const [eczaneListesi, setEczaneListesi] = useState([]);
    const [selectedDistrict, setSelectedDistict] = useState();

    const mainDiv = useRef();
    const mainDiv2 = useRef();

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

    useEffect(() => {
        setIlceler(["Tüm İlçeler", ...new Set(result.data.pharmacyList.map((item) => { return item.ilceAdi }))]);
        setEczaneListesi(result?.data?.pharmacyList);
        setSelectedDistict("Tüm İlçeler");
    }, [result]);

    useEffect(() => {
        setEczaneListesi((items) => selectedDistrict != "Tüm İlçeler" ? [...result.data.pharmacyList.filter(a => a.ilceAdi == selectedDistrict)] : result?.data?.pharmacyList);
    }, [selectedDistrict]);

    return (
        <SWRConfig value={{ result }}>
            <Article ilceler={ilceler}
                setIlceler={setIlceler}
                eczaneListesi={eczaneListesi}
                setEczaneListesi={setEczaneListesi}
                selectedDistrict={selectedDistrict}
                setSelectedDistict={setSelectedDistict}
                mainDiv={mainDiv}
                mainDiv2={mainDiv2}
                customSelectDistrict={customSelectDistrict}
            />
        </SWRConfig>
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
                data: err.response != null ? err.response.data.errorList : new Array(err.message)
            }
        });

    return {
        props: {
            result: result
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
            return [];
        });


    return {
        paths,
        fallback: false
    }
}

