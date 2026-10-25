import Link from "next/link";

function navActive(key: string, page: string) {
  return key === page ? ' className="active"' : '';
}

export default function Header({ page = "" }: { page?: string }) {
  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <Link className="logo" href="/" aria-label="Kèo Cưới - Trang chủ">
          <span className="logo-mark">k</span>
          <span>Kèo Cưới<span style={{ color: "var(--terra)" }}>.</span></span>
        </Link>
        <button className="menu-toggle" aria-label="Mở menu" aria-expanded="false">☰</button>
        <nav className="nav-links" aria-label="Điều hướng chính">
          <Link href="/dich-vu" className={page === 'dich-vu' ? 'active' : ''}>Dịch vụ</Link>
          <Link href="/ve-chung-toi" className={page === 've-chung-toi' ? 'active' : ''}>Về Kèo Cưới</Link>
          <Link href="/quy-trinh" className={page === 'quy-trinh' ? 'active' : ''}>Cách tụi mình làm</Link>
          <Link href="/faq" className={page === 'faq' ? 'active' : ''}>FAQs</Link>
          <Link className="btn" href="/lien-he">Kể tụi mình nghe <span>↗</span></Link>
        </nav>
      </div>
    </header>
  );
}
