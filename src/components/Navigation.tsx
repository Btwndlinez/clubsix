import { useState } from 'react';

const navLinks = [
  { label: 'Events', href: '#events' },
  { label: 'Artists', href: '#artists' },
  { label: 'Art', href: '#art' },
  { label: 'News', href: '#news' },
  { label: 'Music', href: '#music' },
  { label: 'VIP Tables', href: '#vip-tables' },
  { label: 'About', href: '#about' },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '64px',
          zIndex: 100,
          mixBlendMode: 'difference',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 80px',
        }}
        className="nav-bar"
      >
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('#hero');
          }}
          style={{
            fontFamily: '"Clash Display", system-ui, sans-serif',
            fontWeight: 700,
            fontSize: '20px',
            color: '#ffffff',
            textDecoration: 'none',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
        >
          CLUB SIX
        </a>

        {/* Desktop Nav */}
        <div
          style={{
            display: 'flex',
            gap: '32px',
          }}
          className="nav-links-desktop"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(link.href);
              }}
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontWeight: 500,
                fontSize: '14px',
                color: '#ffffff',
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                position: 'relative',
                paddingBottom: '4px',
              }}
              onMouseEnter={(e) => {
                const underline = e.currentTarget.querySelector(
                  '.nav-underline'
                ) as HTMLElement;
                if (underline) underline.style.transform = 'scaleX(1)';
              }}
              onMouseLeave={(e) => {
                const underline = e.currentTarget.querySelector(
                  '.nav-underline'
                ) as HTMLElement;
                if (underline) underline.style.transform = 'scaleX(0)';
              }}
            >
              {link.label}
              <span
                className="nav-underline"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '1px',
                  background: '#00f0ff',
                  transform: 'scaleX(0)',
                  transformOrigin: 'left',
                  transition: 'transform 0.3s ease',
                }}
              />
            </a>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            flexDirection: 'column',
            gap: '6px',
          }}
        >
          <span
            style={{
              width: '24px',
              height: '2px',
              background: '#ffffff',
              display: 'block',
              transition: 'transform 0.3s ease',
              transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none',
            }}
          />
          <span
            style={{
              width: '24px',
              height: '2px',
              background: '#ffffff',
              display: 'block',
              transition: 'opacity 0.3s ease',
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              width: '24px',
              height: '2px',
              background: '#ffffff',
              display: 'block',
              transition: 'transform 0.3s ease',
              transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none',
            }}
          />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="nav-mobile-overlay"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(10, 10, 15, 0.98)',
            zIndex: 99,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
          }}
        >
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(link.href);
              }}
              style={{
                fontFamily: '"Clash Display", system-ui, sans-serif',
                fontWeight: 600,
                fontSize: '48px',
                color: '#ffffff',
                textDecoration: 'none',
                textTransform: 'uppercase',
                opacity: 0,
                animation: `fadeInUp 0.5s ease ${i * 0.08}s forwards`,
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
