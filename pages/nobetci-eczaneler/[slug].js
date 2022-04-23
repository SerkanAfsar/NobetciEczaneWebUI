import React from "react";
import axios from "axios";
import https from 'https';

const IlDetay = ({ deneme }) => {
    return (<div>{deneme}</div>)
}
export default IlDetay;

export const getStaticProps = () => {
    return {
        props: {
            deneme: "Serkan Afşar"
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

