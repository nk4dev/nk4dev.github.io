import { AppProps } from "next/app";
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import * as gtag from '../libs/gtag'
import { css } from "../../styled-system/css";
import { motion, AnimatePresence } from "framer-motion";
import localFont from 'next/font/local'
import { newsreader, publicSans } from '../libs/fonts'
import { LangProvider } from '../libs/lang'
import "../styles/globals.css"

// load font with nextjs font optimization
// https://nextjs.org/docs/pages/getting-started/fonts
const myFont = localFont({
  src: '../../public/static/UDEVGothicNF-Regular.ttf',
})


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

// master component 
function App({ Component, pageProps }: AppProps) {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {

        const handleStart = () => setIsLoading(true);
        const handleComplete = () => setIsLoading(false);
        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleComplete);

        return () => {
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleComplete);
            router.events.off('routeChangeError', handleComplete);
        }
    }, [router.events]);

    // 外部サイトへのリンククリックを outbound_click として送る(サイト全体で一括)
    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
            if (!a) return;
            let url: URL;
            try {
                url = new URL(a.href, window.location.href);
            } catch {
                return;
            }
            if (!/^https?:$/.test(url.protocol) || url.origin === window.location.origin) return;
            const region = a.closest('[data-ga-location]')?.getAttribute('data-ga-location')
                ?? a.closest('header, footer, nav, main')?.tagName.toLowerCase()
                ?? 'body';
            gtag.outboundClick(url.href, `${window.location.pathname}#${region}`);
        };
        document.addEventListener('click', onClick, { capture: true });
        return () => document.removeEventListener('click', onClick, { capture: true });
    }, []);
    return (
        <div className={`${myFont.className} ${newsreader.variable} ${publicSans.variable}`}>
            <LangProvider>
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

                {process.env.NODE_ENV === 'production' && (
                    <>
                        <script
                            async
                            src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
                        />
                        <script dangerouslySetInnerHTML={{ __html: gtag.gtagInitScript }} />
                    </>
                )}
                <Component {...pageProps} />
            </LangProvider>
        </div>
    )
}

export default App;