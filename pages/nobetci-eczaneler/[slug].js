import React, { useState, useEffect } from "react";
import axios from "axios";
import https from 'https';
import Pharmacy from "../../Components/Pharmacy";
import { useRouter } from 'next/router';

const IlDetay = ({ result }) => {
    const router = useRouter();

    const [list, setList] = useState(result);
    useEffect(() => {
        setList(result);
    }, [router])


    if (result.hasError == true) {
        return (<div className="col-12">
            <h1>Error Accoured</h1>
        </div>)
    }
    return (
        <>
            <div className="row g-4">
                {list?.data?.entities?.map(item => <Pharmacy item={item} key={item.guidKey} />)}
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
                data: resp.data
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

    // console.log("Paths Are ", paths);
    return {
        paths,
        fallback: false
    }
}

