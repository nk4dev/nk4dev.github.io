import { AppProps } from "next/app";
import React, { use } from "react";
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as gtag from '../libs/gtag'

import "./globals.css"

function App({Component, pageProps}: AppProps) {
    const router = useRouter();
    useEffect(() => {
        const handleRouteChange = (url: string) => {
            gtag.pageview(url);
        }
        router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        }
    }, [router.events]);
    return (
        <div>
            <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${'G-9TG7JEDDCX'}`}
            />
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${'G-9TG7JEDDCX'}', {
                            page_path: window.location.pathname,
                        });
                    `,
                }}
            />
            <Component {...pageProps} />

        </div>
    )
}

export default App;