import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

const SeoHead = ({ title, description, img }) => {
    const router = useRouter();

    return (
        <Head>

            <title>{title}</title>

            <meta name="description" content={description} />
            <meta name="robots" content="follow, index" />
            <meta name="canonical" content={`${process.env.NEXT_PUBLIC_ABSOLUTE_PATH}${router.asPath}`} />

            <meta property="og:locale" content="tr_TR" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={`${process.env.NEXT_PUBLIC_ABSOLUTE_PATH}${router.asPath}`} />
            <meta property="og:site_name" content="Nöbetçi Eczaneler" />

            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:site" content="@nobetcieczanelernet" />
            <meta name="twitter:creator" content="@nobetcieczanelernet" />
            <meta name="theme-color" content="#343a40"></meta>
        </Head>
    )
}
export default SeoHead;