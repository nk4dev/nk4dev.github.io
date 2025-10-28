import { AppProps } from "next/app";
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import * as gtag from '../libs/gtag'
import { css } from "../../styled-system/css";
import { motion, AnimatePresence } from "framer-motion";

import "./globals.css"

function LoadingText() {
    return (
        <p className={css({
            fontSize: "24px",
            color: "#fff",
        })}>
            Loading...
        </p>
    )
}
function App({ Component, pageProps }: AppProps) {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {

        const handleStart = () => setIsLoading(true);
        const handleComplete = () => setIsLoading(false);
        const handleRouteChange = (url: string) => {
            gtag.pageview(url);
        }
        router.events.on('routeChangeComplete', handleRouteChange);
        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleComplete);

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleComplete);
            router.events.off('routeChangeError', handleComplete);
        }
    }, [router.events]);
    return (
        <div>
            <AnimatePresence mode="wait">
                {isLoading && (
                    <motion.div
                        key="page-shutter"
                        initial={{ scaleY: 0, opacity: 0 }}
                        animate={{ scaleY: 1, opacity: 1 }}
                        exit={{ scaleY: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 30 }}
                        className={css({
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: "#000",
                            color: "#fff",
                            zIndex: 9999,
                            transformOrigin: "top",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            willChange: "transform, opacity",
                        })}
                    >
                        <LoadingText />
                    </motion.div>
                )}
            </AnimatePresence>

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