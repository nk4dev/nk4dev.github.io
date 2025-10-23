import HMeta from "../../components/headermeta";
import Layout from "../../layout/main";

export default function GoogleImgHostList() {
    return (
        <Layout>
            <HMeta pageTitle="Google Img Hosts" pageDescription="List of Google Image hosts for development purposes." />
            <h1>Google Image Hosts</h1>
            <p>This is a list of Google Image hosts that can be used for development purposes.</p>
            <ul>
                <li>googleusercontent.com - Google</li>
                <li>i.ytimg.com - Youtube thumbnails</li>
                <li>img.youtube.com - Youtube thumbnails (youtube subdomain)</li>
            </ul>
        </Layout>
    );
}
