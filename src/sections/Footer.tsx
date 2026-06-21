const socialLinks = ['Instagram', 'TikTok', 'X', 'Facebook', 'Spotify'];
const ticketingLinks = ['AXS', 'DoTheBay', 'Eventbrite'];
const navLinks = [
  { label: 'Events', href: '#events' },
  { label: 'Artists', href: '#artists' },
  { label: 'Art', href: '#art' },
  { label: 'News', href: '#news' },
  { label: 'Music', href: '#music' },
  { label: 'VIP Tables', href: '#vip-tables' },
  { label: 'About', href: '#about' },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      style={{
        background: '#0a0a0f',
        padding: '80px 80px 40px',
        borderTop: '1px solid rgba(255,255,255,0.08)',
      }}
      className="footer-section"
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        {/* Top Row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '24px',
          }}
        >
          <span
            style={{
              fontFamily: '"Clash Display", system-ui, sans-serif',
              fontWeight: 700,
              fontSize: '24px',
              color: '#ffffff',
              letterSpacing: '0.1em',
            }}
          >
            CLUB SIX
          </span>
          <div
            style={{
              display: 'flex',
              gap: '32px',
              flexWrap: 'wrap',
            }}
          >
            {socialLinks.map((link) => (
              <span
                key={link}
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontWeight: 500,
                  fontSize: '14px',
                  color: '#a0a0b0',
                  cursor: 'pointer',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLSpanElement).style.color = '#00f0ff';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLSpanElement).style.color = '#a0a0b0';
                }}
              >
                {link}
              </span>
            ))}
          </div>
        </div>

        {/* Middle Row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '60px',
            flexWrap: 'wrap',
            gap: '40px',
          }}
          className="footer-middle"
        >
          {/* Ticketing */}
          <div>
            <h4
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontWeight: 600,
                fontSize: '14px',
                color: '#ffffff',
                textTransform: 'uppercase',
                margin: '0 0 16px 0',
                letterSpacing: '0.05em',
              }}
            >
              TICKETING
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {ticketingLinks.map((link) => (
                <span
                  key={link}
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontWeight: 400,
                    fontSize: '14px',
                    color: '#a0a0b0',
                    cursor: 'pointer',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLSpanElement).style.color = '#00f0ff';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLSpanElement).style.color = '#a0a0b0';
                  }}
                >
                  {link}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontWeight: 600,
                fontSize: '14px',
                color: '#ffffff',
                textTransform: 'uppercase',
                margin: '0 0 16px 0',
                letterSpacing: '0.05em',
              }}
            >
              NAVIGATION
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {navLinks.map((link) => (
                <span
                  key={link.label}
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontWeight: 400,
                    fontSize: '14px',
                    color: '#a0a0b0',
                    cursor: 'pointer',
                    transition: 'color 0.2s ease',
                  }}
                  onClick={() => scrollTo(link.href)}
                  onMouseEnter={(e) => {
                    (e.target as HTMLSpanElement).style.color = '#00f0ff';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLSpanElement).style.color = '#a0a0b0';
                  }}
                >
                  {link.label}
                </span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontWeight: 600,
                fontSize: '14px',
                color: '#ffffff',
                textTransform: 'uppercase',
                margin: '0 0 16px 0',
                letterSpacing: '0.05em',
              }}
            >
              CONTACT
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontWeight: 400,
                  fontSize: '14px',
                  color: '#a0a0b0',
                }}
              >
                VIP Info: (415) 555-0199
              </span>
              <span
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontWeight: 400,
                  fontSize: '14px',
                  color: '#a0a0b0',
                }}
              >
                info@clubsixsf.com
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '60px',
            paddingTop: '24px',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <span
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: 400,
              fontSize: '12px',
              color: '#a0a0b0',
            }}
          >
            © 2025 Club Six. All Rights Reserved.
          </span>
          <span
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: 400,
              fontSize: '12px',
              color: '#a0a0b0',
            }}
          >
            Privacy Policy · Terms of Service
          </span>
        </div>
      </div>
    </footer>
  );
}
