import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <section>
      <h1>Visitor Management System</h1>
      <p>Organization-first onboarding with future-ready multi-tenant support.</p>
      <Link to="/app/dashboard">Enter App</Link>
    </section>
  );
}
