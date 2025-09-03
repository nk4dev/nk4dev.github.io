import { useEffect, useState } from "react"

export const browserLocal = () => {
    const [width, setWidth] = useState<number>(0);
    useEffect(() => {
        // get windowsize 
        setWidth(window.innerWidth);
        // get windowsize then resize event
        window.addEventListener("resize", function () {
            setWidth(window.innerWidth)
        })
    }, [width])

    return width;
}