import { profile } from '../data/content';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>
          © {new Date().getFullYear()} {profile.fullName}. Built with React, TypeScript &amp; Vite, and hosted on Firebase.
        </p>
        <a href="#top" className="footer-top">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
