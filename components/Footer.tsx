import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <Link className="logo" href="/">
          <img className="logo-mark" src="/assets/img/logo.jpg" alt="Kèo Cưới" />
          <span>Kèo Cưới<span style={{ color: "var(--butter)" }}>.</span></span>
        </Link>
        <small>© 2026 Kèo Cưới. Made for your kind of love.</small>
        <div className="footer-links">
          <Link href="/dich-vu">Dịch vụ</Link>
          <Link href="/ve-chung-toi">Về tụi mình</Link>
          <Link href="/lien-he">Liên hệ</Link>
        </div>
      </div>
    </footer>
  );
}
