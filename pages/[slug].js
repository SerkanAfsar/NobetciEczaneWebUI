import React, { useState, useEffect, useRef } from "react";
import DistrictList from "../Components/Districts/DistrictList";
import PharmacyList from "../Components/Pharmacy/PharmacyList";
import SeoHead from "../Components/Commons/SeoHead";
import { getPharmacyList } from "../Response/pharmacies";
import { getCityList } from "../Response/cities";

const IlDetay = ({ result }) => {

    const [ilceler, setIlceler] = useState([]);
    const [selectedDistrict, setSelectedDistict] = useState();
    const mainDiv = useRef();
    const mainDiv2 = useRef();

    useEffect(() => {
        setIlceler(["Tüm İlçeler", ...new Set(result?.data?.pharmacyList.map((item) => { return item.ilceAdi }))]);
        setSelectedDistict("Tüm İlçeler");
    }, [result]);



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

    if (result?.hasError) {
        return (
            <div className="alert alert-danger" role="alert">
                <ul>
                    {result?.errorList.map(item => (<li key={item}>
                        {item}
                    </li>))}
                </ul>
            </div>
        )
    };
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
    )
}
export default IlDetay;

export const getStaticProps = async (context) => {

    const { slug } = context.params;
    const result = await getPharmacyList(slug);

    return {
        props: {
            result
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

