export function NotFound() {
  return (
    <main className="not-found">
      <p className="eyebrow">
        <span className="eyebrow-index">404</span>Route not found
      </p>
      <h1 className="not-found-title">
        This screen isn't in the <em>navigation graph.</em>
      </h1>
      <p className="section-lead">The page you requested doesn't exist or has moved.</p>
      <a className="btn btn-primary" href="/">
        Back to the portfolio
      </a>
    </main>
  );
}
