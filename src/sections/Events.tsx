import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const events = [
  {
    image: '/images/event-1.jpg',
    date: 'FEB 14',
    title: "Valentine's Underground",
    artist: 'DJ Shadow',
  },
  {
    image: '/images/event-2.jpg',
    date: 'FEB 21',
    title: 'Neon Dreams Festival',
    artist: 'MESTIZA',
  },
  {
    image: '/images/event-3.jpg',
    date: 'MAR 07',
    title: 'White Room Gallery Night',
    artist: 'Various Artists',
  },
];

export default function Events() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    
    gsap.fromTo(
      cards,
      {
        transformOrigin: '0% 50%',
        rotationX: 70,
        y: 300,
        z: -500,
        opacity: 0,
      },
      {
        rotationX: 0,
        y: 0,
        z: 0,
        opacity: 1,
        ease: 'power2.out',
        duration: 1.2,
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === sectionRef.current) t.kill();
      });
    };
  }, []);

  return (
    <section
      id="events"
      ref={sectionRef}
      style={{
        background: '#0a0a0f',
        padding: '120px 80px',
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
      className="events-section"
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: '60px',
          maxWidth: '1440px',
          margin: '0 auto 60px',
        }}
        className="events-header"
      >
        <h2
          style={{
            fontFamily: '"Clash Display", system-ui, sans-serif',
            fontWeight: 600,
            fontSize: '120px',
            color: '#ffffff',
            textTransform: 'uppercase',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            margin: 0,
          }}
          className="section-title"
        >
          WHAT'S ON
        </h2>
        <span
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontWeight: 500,
            fontSize: '14px',
            color: '#00f0ff',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          Events Calendar →
        </span>
      </div>

      {/* Event Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '32px',
          maxWidth: '1440px',
          margin: '0 auto',
        }}
        className="event-grid"
      >
        {events.map((event, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) cardsRef.current[i] = el;
            }}
            className="event-card"
            style={{ opacity: 0 }}
          >
            <div
              style={{
                position: 'relative',
                aspectRatio: '16/9',
                borderRadius: '4px',
                overflow: 'hidden',
                marginBottom: '16px',
              }}
            >
              <img
                src={event.image}
                alt={event.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLImageElement).style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLImageElement).style.transform = 'scale(1)';
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  background: 'rgba(0, 240, 255, 0.15)',
                  color: '#00f0ff',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontWeight: 500,
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  padding: '6px 12px',
                  borderRadius: '2px',
                }}
              >
                {event.date}
              </span>
            </div>
            <h3
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontWeight: 500,
                fontSize: '22px',
                color: '#ffffff',
                margin: '0 0 4px 0',
              }}
            >
              {event.title}
            </h3>
            <p
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontWeight: 400,
                fontSize: '14px',
                color: '#a0a0b0',
                margin: '0 0 12px 0',
              }}
            >
              {event.artist}
            </p>
            <span
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontWeight: 500,
                fontSize: '14px',
                color: '#ff00aa',
                textTransform: 'uppercase',
                cursor: 'pointer',
                display: 'inline-block',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLSpanElement).style.borderBottom = '1px solid #ff00aa';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLSpanElement).style.borderBottom = '1px solid transparent';
              }}
            >
              Get Tickets
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
