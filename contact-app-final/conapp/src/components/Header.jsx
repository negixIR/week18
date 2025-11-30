import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const { pathname } = useLocation();
  return (
    <header className="header">
      <h2>📒 دفترچه مخاطبین</h2>
      <nav>
        <Link className={pathname === '/' ? 'active' : ''} to="/">لیست مخاطبین</Link>
        <Link className={pathname === '/add' ? 'active' : ''} to="/add">➕ افزودن مخاطب</Link>
      </nav>
    </header>
  );
}

export default Header;