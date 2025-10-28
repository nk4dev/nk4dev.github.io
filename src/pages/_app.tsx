import { AppProps } from "next/app";
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import * as gtag from '../libs/gtag'
import { css } from "../../styled-system/css";
import { motion, AnimatePresence } from "framer-motion";

import "./globals.css"

// simple spinner component shown at bottom-right during route changes
function Spinner() {
    return (
        <motion.div
            aria-hidden
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className={css({
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                border: "4px solid rgba(255,255,255,0.15)",
                borderTop: "4px solid #fff",
                boxSizing: "border-box",
            })}
        />
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
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        key="bottom-spinner"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 12 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className={css({
                            position: "fixed",
                            right: "20px",
                            bottom: "20px",
                            backgroundColor: "rgba(0,0,0,0.6)",
                            padding: "8px",
                            borderRadius: "10px",
                            zIndex: 99999,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 6px 18px rgba(0,0,0,0.4)",
                            willChange: "transform, opacity",
                        })}
                    >   
                        <p className={css({color: "#fff", padding: "10px"})}>loading...</p>
                        <Spinner />
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