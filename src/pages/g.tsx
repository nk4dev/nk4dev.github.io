import Layout from "../layout/main";
import LinkPage from "../components/redirect";

export default function GitHubRedirect() {
  return (
    <Layout>
      <LinkPage url="https://github.com/nk4dev" text="GitHub" />
    </Layout>
  );
}
