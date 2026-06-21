import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const vipImages = [
  '/images/vip-1.jpg',
  '/images/vip-2.jpg',
  '/images/vip-3.jpg',
  '/images/vip-4.jpg',
  '/images/vip-5.jpg',
];

export default function VIPTables() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement[]>([]);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 3D Perspective Image Strip Animation
    const images = imagesRef.current.filter(Boolean);
    
    images.forEach((img) => {
      gsap.fromTo(
        img,
        {
          transformOrigin: '50% 100%',
          rotationX: 60,
          z: -300,
          opacity: 0,
          scaleY: 0.8,
        },
        {
          rotationX: 0,
          z: 0,
          opacity: 1,
          scaleY: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: img,
            start: 'top 90%',
            end: 'top 40%',
            scrub: true,
          },
        }
      );
    });

    // Info block reveal
    if (infoRef.current) {
      gsap.fromTo(
        infoRef.current.children,
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
          stagger: 0.15,
          scrollTrigger: {
            trigger: infoRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger && sectionRef.current?.contains(t.trigger as Element)) {
          t.kill();
        }
      });
    };
  }, []);

  return (
    <section
      id="vip-tables"
      ref={sectionRef}
      style={{
        background: 'linear-gradient(180deg, #0a0a0f 0%, #12121a 100%)',
        padding: '120px 80px',
      }}
      className="vip-section"
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
            margin: '0 0 60px 0',
          }}
          className="section-title"
        >
          VIP TABLES
        </h2>

        {/* 3D Perspective Image Strip */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'nowrap',
            justifyContent: 'center',
            gap: '16px',
            margin: '60px 0',
            perspective: '900px',
          }}
          className="vip-image-strip"
        >
          {vipImages.map((src, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) imagesRef.current[i] = el;
              }}
              style={{
                flex: '0 0 auto',
                width: '20vw',
                transformStyle: 'preserve-3d',
                willChange: 'transform, opacity',
                opacity: 0,
              }}
              className="vip-image-item"
            >
              <img
                src={src}
                alt="VIP Table"
                style={{
                  width: '100%',
                  height: '25vw',
                  objectFit: 'cover',
                  borderRadius: '4px',
                  boxShadow: '0 16px 48px rgba(0, 0, 0, 0.6)',
                }}
              />
            </div>
          ))}
        </div>

        {/* VIP Info */}
        <div
          ref={infoRef}
          style={{
            maxWidth: '600px',
            margin: '0 auto',
            textAlign: 'center',
            perspective: '1000px',
            transformStyle: 'preserve-3d',
          }}
        >
          <p
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: 400,
              fontSize: '18px',
              color: '#a0a0b0',
              lineHeight: 1.8,
              margin: '0 0 40px 0',
              opacity: 0,
            }}
          >
            Experience Club Six from the best seats in the house. Our VIP tables
            offer premium bottle service, dedicated hosts, and exclusive access
            to private areas across both floors.
          </p>

          <button
            style={{
              background: 'linear-gradient(135deg, #00f0ff, #ff00aa)',
              color: '#0a0a0f',
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: 600,
              fontSize: '16px',
              textTransform: 'uppercase',
              padding: '16px 48px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              opacity: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow =
                '0 8px 32px rgba(0, 240, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Book VIP Table
          </button>

          <p
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: 500,
              fontSize: '14px',
              color: '#00f0ff',
              margin: '20px 0 0 0',
              opacity: 0,
            }}
          >
            VIP Info: (415) 555-0199
          </p>
        </div>
      </div>
    </section>
  );
}
