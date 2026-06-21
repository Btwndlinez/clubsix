import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const artworks = [
  { image: '/images/art-1.jpg', title: 'Neon Flow', aspect: '3/4' },
  { image: '/images/art-2.jpg', title: 'Geometric Intersection', aspect: '4/3' },
  { image: '/images/art-3.jpg', title: 'Light Sculpture III', aspect: '1/1' },
  { image: '/images/art-4.jpg', title: 'Projected Dreams', aspect: '3/4' },
  { image: '/images/art-5.jpg', title: 'Electric Canvas', aspect: '4/3' },
  { image: '/images/art-6.jpg', title: 'Kinetic Spectrum', aspect: '1/1' },
];

export default function Art() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const items = itemsRef.current.filter(Boolean);

    gsap.fromTo(
      items,
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
        stagger: 0.08,
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
      id="art"
      ref={sectionRef}
      style={{
        background: '#0a0a0f',
        padding: '120px 80px',
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
      className="art-section"
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        <h2
          style={{
            fontFamily: '"Clash Display", system-ui, sans-serif',
            fontWeight: 600,
            fontSize: '120px',
            color: '#ffffff',
            textTransform: 'uppercase',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            margin: '0 0 16px 0',
          }}
          className="section-title"
        >
          THE WHITE ROOM
        </h2>
        <p
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontWeight: 400,
            fontSize: '24px',
            color: '#a0a0b0',
            margin: '0 0 60px 0',
          }}
        >
          Immersive Art Gallery
        </p>

        {/* Masonry Grid */}
        <div
          style={{
            columns: 3,
            columnGap: '24px',
          }}
          className="masonry-grid"
        >
          {artworks.map((art, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) itemsRef.current[i] = el;
              }}
              style={{
                breakInside: 'avoid',
                marginBottom: '24px',
                opacity: 0,
                position: 'relative',
                borderRadius: '4px',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                const img = e.currentTarget.querySelector('img');
                const caption = e.currentTarget.querySelector('.art-caption');
                if (img) {
                  img.style.transform = 'scale(1.03)';
                  img.style.filter = 'brightness(1.1)';
                }
                if (caption) {
                  (caption as HTMLElement).style.opacity = '1';
                }
              }}
              onMouseLeave={(e) => {
                const img = e.currentTarget.querySelector('img');
                const caption = e.currentTarget.querySelector('.art-caption');
                if (img) {
                  img.style.transform = 'scale(1)';
                  img.style.filter = 'brightness(1)';
                }
                if (caption) {
                  (caption as HTMLElement).style.opacity = '0';
                }
              }}
            >
              <img
                src={art.image}
                alt={art.title}
                style={{
                  width: '100%',
                  display: 'block',
                  transition: 'transform 0.4s ease, filter 0.4s ease',
                  aspectRatio: art.aspect,
                  objectFit: 'cover',
                }}
              />
              <div
                className="art-caption"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '24px',
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                  opacity: 0,
                  transition: 'opacity 0.4s ease',
                }}
              >
                <span
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontWeight: 500,
                    fontSize: '14px',
                    color: '#ffffff',
                  }}
                >
                  {art.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
