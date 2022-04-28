import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

const SeoHead = ({ title, description, img }) => {
    const router = useRouter();

    return (
        <Head>

            <title>{title}</title>

            <meta name="description" content={description} key="description" />
            <meta name="robots" content="follow, index" key="robots" />
            <meta name="canonical" content={`${process.env.NEXT_PUBLIC_ABSOLUTE_PATH}${router.asPath}`} key="canonical" />

            <meta property="og:locale" content="tr_TR" key="oglocale" />
            <meta property="og:type" content="website" key="ogtype" />
            <meta property="og:title" content={title} key="ogtitle" />
            <meta property="og:description" content={description} key="ogdescription" />
            <meta property="og:url" content={`${process.env.NEXT_PUBLIC_ABSOLUTE_PATH}${router.asPath}`} key="ogurl" />
            <meta property="og:site_name" content="Nöbetçi Eczaneler" key="ogsitename" />

            <meta name="twitter:card" content="summary" key="ogtwittercard" />
            <meta name="twitter:title" content={title} key="twittertitle" />
            <meta name="twitter:description" content={description} key="twitterdescription" />
            <meta name="twitter:site" content="@nobetcieczanelernet" key="twittersite" />
            <meta name="twitter:creator" content="@nobetcieczanelernet" key="twittercreator" />
            <meta name="theme-color" content="#343a40" key="themecolor" />
        </Head>
    )
}
export default SeoHead;