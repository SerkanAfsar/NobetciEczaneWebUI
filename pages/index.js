import Head from 'next/head'
import styles from './index.module.scss'
import React, { useEffect, useState, useRef } from 'react';
import https from 'https';
import axios from 'axios';
import Link from 'next/link';
import SeoHead from '../Components/Commons/SeoHead';


export default function Home({ cities }) {

  const [city, selectedCity] = useState();
  const [cityList, setCityList] = useState(cities.data || []);


  const SearchFunction = (input) => {
    setCityList(items => cities?.data?.filter(a => a.cityName.toLocaleLowerCase().indexOf(input.toLocaleLowerCase()) > -1));
  }
  if (cities.hasError) {
    return (
      <div>{cities.data.map(item => (<div key={item}>
        {item}
      </div>))}</div>

    )
  };

  return (
    <>
      <SeoHead title="Türkiye İl & İlçe Nöbetçi Eczane Listesi | Nöbetçi Eczaneler"
        description="Türkiye İl & İlçe Nöbetçi Eczane Listesi | Nöbetçi Eczaneler" />
      <div className='row g-4'>
        <div className='col-12 mb-2'>
          <input type="text" placeholder='Aramak İstediğiniz İli Yazınız...' value={city} onChange={(e) => SearchFunction(e.target.value)} className="w-100 p-3 form-control" />

        </div>
        {cityList?.map((item) => (
          <div className='col-md-6 col-lg-4 col-12 ' key={item.cityName}>
            <Link href={{
              pathname: "/[slug]",
              query: { slug: item.seoUrl }
            }}>
              <a title={item.cityName} className={`shadow border rounded p-4 h-100 ${styles.city}`}>
                {item.cityName}
              </a>
            </Link>

          </div>
        ))}
      </div>
    </>
  )
}

export const getStaticProps = async () => {
  const agent = new https.Agent({
    rejectUnauthorized: false
  });
  const cities = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/Cities/GetCityList`, { httpsAgent: agent })
    .then(resp => {
      const arr = resp.data.entities?.map(item => {
        return {
          seoUrl: item.seoUrl.split("/")[2],
          cityName: item.ilAdi
        }
      });
      return {
        hasError: false,
        data: arr
      };

    })
    .catch(err => {

      return {
        hasError: true,
        data: err.response != null ? err.response.data.errorList : new Array(err.message)
      }
    });



  return {
    props: {
      cities: cities
    }
  }
}


