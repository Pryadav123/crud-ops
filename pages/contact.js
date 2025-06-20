import Layout from "../components/Layout";

export default function Contact() {
  return (
    <Layout>
      <h2 className="text-2xl font-semibold mb-4">Contact</h2>
      <p>You can reach us at <a href="mailto:contact@example.com" className="text-blue-600 underline">contact@example.com</a>.</p>
    </Layout>
  );
}
