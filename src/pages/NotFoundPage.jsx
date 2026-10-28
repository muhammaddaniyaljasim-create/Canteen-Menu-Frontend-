import { EmptyState } from "../components/common/UI.jsx";

export default function NotFoundPage() {
  return <section className="page-width standard-page"><EmptyState title="This page took a wrong turn" message="Let's get you back to the good stuff." action="Return home" /></section>;
}