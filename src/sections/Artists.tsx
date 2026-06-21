import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const artists = [
  { image: '/images/artist-1.jpg', name: 'Kairos', genre: 'Techno' },
  { image: '/images/artist-2.jpg', name: 'Luna Vex', genre: 'House' },
  { image: '/images/artist-3.jpg', name: 'Phantom Stack', genre: 'Drum & Bass' },
  { image: '/images/artist-4.jpg', name: 'Zara Kincaid', genre: 'Electronic' },
];

export default function Artists() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // 3D Text Rotation Animation
    const titleEl = titleRef.current;
    if (titleEl) {
      const titleText = titleEl.textContent?.trim() || '';
      titleEl.innerHTML = '';

      const spanWrap = document.createElement('span');
      spanWrap.style.display = 'inline-block';
      spanWrap.style.transformStyle = 'preserve-3d';
      spanWrap.style.perspective = '1200px';

      const frontColor = '#ffffff';
      const backColor = '#00f0ff';

      for (let i = 0; i < titleText.length; i++) {
        const char = titleText[i];
        const charWrap = document.createElement('span');
        charWrap.style.display = 'inline-block';
        charWrap.style.position = 'relative';
        charWrap.style.transformStyle = 'preserve-3d';
        if (char === ' ') {
          charWrap.style.width = '0.3em';
        }

        const front = document.createElement('span');
        front.textContent = char;
        front.style.display = 'inline-block';
        front.style.backfaceVisibility = 'hidden';
        front.style.color = frontColor;

        const back = document.createElement('span');
        back.textContent = char;
        back.style.display = 'inline-block';
        back.style.position = 'absolute';
        back.style.left = '0';
        back.style.top = '0';
        back.style.backfaceVisibility = 'hidden';
        back.style.color = backColor;

        const isEven = i % 2 === 0;
        front.style.transform = `rotate3d(0, 1, 0, ${isEven ? -180 : 180}deg)`;
        back.style.transform = `rotate3d(0, 1, 0, ${isEven ? 0 : 360}deg)`;

        charWrap.appendChild(front);
        charWrap.appendChild(back);
        spanWrap.appendChild(charWrap);
      }

      titleEl.appendChild(spanWrap);

      const charWraps = titleEl.querySelectorAll('span > span');
      const origins = ['0% 50%', '100% 50%', '50% 0%', '50% 100%'];
      charWraps.forEach((char) => {
        (char as HTMLElement).style.transformOrigin =
          origins[Math.floor(Math.random() * origins.length)];
      });

      gsap.fromTo(
        charWraps,
        { rotationX: -100, rotationY: 100, rotationZ: 0 },
        {
          rotationX: 0,
          rotationY: 0,
          rotationZ: 0,
          ease: 'sine.out',
          stagger: { each: 0.04, from: 'start' },
          scrollTrigger: {
            trigger: titleEl,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // Card reveal animation
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
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="artists"
      ref={sectionRef}
      style={{
        background: '#12121a',
        padding: '120px 80px',
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
      className="artists-section"
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        <h2
          ref={titleRef}
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
          ARTISTS
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px',
          }}
          className="artist-grid"
        >
          {artists.map((artist, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
              className="artist-card"
              style={{ opacity: 0, position: 'relative' }}
            >
              <div
                style={{
                  position: 'relative',
                  aspectRatio: '3/4',
                  borderRadius: '4px',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  const img = e.currentTarget.querySelector('img');
                  const gradient = e.currentTarget.querySelector('.artist-gradient');
                  if (img) {
                    img.style.transform = 'scale(1.08)';
                    img.style.filter = 'brightness(1.2)';
                  }
                  if (gradient) {
                    (gradient as HTMLElement).style.opacity = '1';
                  }
                }}
                onMouseLeave={(e) => {
                  const img = e.currentTarget.querySelector('img');
                  const gradient = e.currentTarget.querySelector('.artist-gradient');
                  if (img) {
                    img.style.transform = 'scale(1)';
                    img.style.filter = 'brightness(1)';
                  }
                  if (gradient) {
                    (gradient as HTMLElement).style.opacity = '0';
                  }
                }}
              >
                <img
                  src={artist.image}
                  alt={artist.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease, filter 0.5s ease',
                  }}
                />
                <div
                  className="artist-gradient"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to top, rgba(0, 240, 255, 0.3), transparent 60%)',
                    opacity: 0,
                    transition: 'opacity 0.4s ease',
                    pointerEvents: 'none',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    padding: '20px',
                    zIndex: 2,
                  }}
                >
                  <h3
                    style={{
                      fontFamily: '"Clash Display", system-ui, sans-serif',
                      fontWeight: 600,
                      fontSize: '28px',
                      color: '#ffffff',
                      margin: '0 0 4px 0',
                    }}
                  >
                    {artist.name}
                  </h3>
                  <span
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontWeight: 500,
                      fontSize: '12px',
                      color: '#00f0ff',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                    }}
                  >
                    {artist.genre}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
