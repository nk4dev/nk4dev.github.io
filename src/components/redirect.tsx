import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function LinkPage({url, text}: {url: string, text: string}) {
  const router = useRouter();
  useEffect(() => {
    router.push(`${url}?utm_source=redirect_url&utm_medium=link_redirect_event`);
  }, []);
  return (
    <>
      <div style={{ textAlign: "center", marginTop: "50px", height: "100vh" }}>
        <h1>Redirect to {text === null ? url : text}...</h1>
        <p>
          If you are not redirected automatically, please click the link below.
        </p>
        <Link
          href={url}
          style={{ color: "white", textDecoration: "underline" }}
        >
          {text === null ? url : text}
        </Link>
      </div>
    </>
  );
}
