import React, { useState, useEffect, useRef } from "react";
import DistrictList from "../Components/Districts/DistrictList";
import PharmacyList from "../Components/Pharmacy/PharmacyList";
import SeoHead from "../Components/Commons/SeoHead";
import { getPharmacyList } from "../Response/pharmacies";
import { getCityList } from "../Response/cities";
import useSWR, { SWRConfig } from "swr";
import { useRouter } from "next/router";


const Article = () => {
    const router = useRouter();
    const { slug } = router.query;
    const fetcher = async () => await getPharmacyList(slug);
    const { data: result } = useSWR('/api/article', fetcher, { refreshInterval: 1, refreshWhenHidden: true, refreshWhenOffline: true, revalidateIfStale: true });
    const [ilceler, setIlceler] = useState([]);
    const [selectedDistrict, setSelectedDistict] = useState("Tüm İlçeler");

    useEffect(() => {
        setIlceler(["Tüm İlçeler", ...new Set(result.data.pharmacyList.map((item) => { return item.ilceAdi }))]);
        if (!ilceler.includes(selectedDistrict)) {
            setSelectedDistict("Tüm İlçeler");
        }
    }, [result]);

    useEffect(() => {
        setSelectedDistict("Tüm İlçeler");
    }, [slug])

    const mainDiv = useRef();
    const mainDiv2 = useRef();

    const customSelectDistrict = (distict) => {
        if (window.innerWidth > 1023) {
            window.scrollTo({
                top: mainDiv.current, behavior: "smooth"
            });
        }
        else {
            window.scrollTo({
                top: mainDiv2.current.clientHeight + 40, behavior: "smooth"
            });
        }
        setSelectedDistict(distict);
    }
    return (
        <>
            <SeoHead title={`${result?.data?.cityName}`}
                description={`${result?.data?.cityName}`}
            />
            <h1 style={{ display: "none" }}>{result?.data?.cityName}</h1>
            <h2 style={{ display: "none" }}>{`${result?.data?.cityName.split(" ")[0]} Nöbetçi Eczane`}</h2>
            <h3 style={{ display: "none" }}>{`${result?.data?.cityName.split(" ")[0]} Nöbetçi Eczane Listesi`}</h3>
            <h4 style={{ display: "none" }}>{`${result?.data?.cityName.split(" ")[0]} Eczaneleri`}</h4>
            <h5 style={{ display: "none" }}>{`${result?.data?.cityName.split(" ")[0]} Nöbetçi Eczaneler`}</h5>
            <h6 style={{ display: "none" }}>Nöbetçi Eczane</h6>
            <div className="row d-flex flex-column-reverse flex-lg-row  bd-highlight">
                <div className="col-lg-10 col-12" ref={mainDiv}>
                    <PharmacyList eczaneListesi={result?.data?.pharmacyList} selectedDistrict={selectedDistrict} />
                </div>
                <div className="col-lg-2 col-12" ref={mainDiv2}>
                    <DistrictList ilceler={ilceler} selectedDistrict={selectedDistrict} customSelectDistrict={customSelectDistrict} />
                </div>
            </div>
        </>
    );

}

const IlDetay = ({ fallback }) => {
    return (
        <SWRConfig value={{ fallback }}>
            <Article />
        </SWRConfig>
    );
}
export default IlDetay;

export const getStaticProps = async (context) => {

    const { slug } = context.params;
    const response = await getPharmacyList(slug);
    return {
        props: {
            fallback: {
                '/api/article': response
            }
        },
        revalidate: 1
    }
}
export const getStaticPaths = async () => {

    const result = await getCityList();
    const paths = (result?.data) && result.data.map(item => {
        return {
            params: { slug: item.seoUrl }
        }
    }) || [];


    return {
        paths,
        fallback: false
    }
}

