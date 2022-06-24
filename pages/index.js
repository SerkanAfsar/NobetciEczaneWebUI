import styles from './index.module.scss'
import React, { useState } from 'react';
import Link from 'next/link';
import SeoHead from '../Components/Commons/SeoHead';
import { getCityList } from '../Response/cities';


export default function Home({ result }) {

  const [city, selectedCity] = useState();
  const [cityList, setCityList] = useState(result?.data || []);

  const SearchFunction = (input) => {
    setCityList(items => cities?.data?.filter(a => a.cityName.toLocaleLowerCase().indexOf(input.toLocaleLowerCase()) > -1));
  }
  if (result?.hasError) {
    return (
      <div className="alert alert-danger" role="alert">
        <ul>
          {result.errorList.map(item => (<li key={item}>
            {item}
          </li>))}
        </ul>
      </div>
    )
  };

  return (
    <>
      <SeoHead title="Türkiye İl & İlçe Nöbetçi Eczane Listesi | Nöbetçi Eczaneler"
        description="Türkiye İl & İlçe Nöbetçi Eczane Listesi | Nöbetçi Eczaneler" />
      <h1 className={styles.seoTag}>Türkiye İl & İlçe Nöbetçi Eczane Listesi</h1>
      <h2 className={styles.seoTag}>Nöbetçi Eczaneler</h2>
      <h3 className={styles.seoTag}>İstanbul Nöbetçi Eczaneleri | İstanbul Nöbetçi Eczane</h3>
      <h4 className={styles.seoTag}>Ankara Nöbetçi Eczaneleri | Ankara Nöbetçi Eczane</h4>
      <h5 className={styles.seoTag}>İzmir Nöbetçi Eczaneleri | İzmir Nöbetçi Eczane</h5>
      <h6 className={styles.seoTag}>Nöbetçi Eczane</h6>
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

  const result = await getCityList();

  return {
    props: {
      result
    }
  }
}


