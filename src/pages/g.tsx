import Layout from "../layout/main";
import LinkPage from "../components/redirect";

export default function GitHubRedirect() {
  return (
    <Layout>
      <LinkPage url={`/rd2/github?utm_source=github_redirect&utm_medium=event_from_link&rpath=/g`} text="GitHub" rd2event/>
    </Layout>
  );
}
