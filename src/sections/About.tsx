import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const paragraphs = [
  "Club Six is a legendary nightclub and live performance space located at 60 6th St, San Francisco, CA 94103. Known for its vibrant atmosphere and diverse entertainment, the venue features three distinct rooms across two floors.",
  "The 'White Room' serves as an art gallery and lounge, while the 'Darkroom' is designed for live performances. The club has a rich history, originally operating from 1998 to 2012 as San Francisco's most legendary underground nightclub before reopening.",
  'It hosts a variety of music genres, showcasing local DJs and international artists, with a full bar offering cocktails, beers, and spirits.',
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 3D Text Rotation Animation for title
    const titleEl = titleRef.current;
    if (titleEl) {
      const titleText = titleEl.textContent?.trim() || '';
      titleEl.innerHTML = '';

      const spanWrap = document.createElement('span');
      spanWrap.style.display = 'inline-block';
      spanWrap.style.transformStyle = 'preserve-3d';
      spanWrap.style.perspective = '1200px';

      const frontColor = '#ffffff';
      const backColor = '#ff00aa';

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

    // Paragraph reveal animation
    if (textRef.current) {
      gsap.fromTo(
        textRef.current.children,
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
            trigger: textRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        background: '#12121a',
        padding: '120px 80px',
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
      className="about-section"
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
          ABOUT
        </h2>

        <div
          ref={textRef}
          style={{
            maxWidth: '800px',
            perspective: '1000px',
            transformStyle: 'preserve-3d',
          }}
        >
          {paragraphs.map((text, i) => (
            <p
              key={i}
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontWeight: 400,
                fontSize: '20px',
                color: '#a0a0b0',
                lineHeight: 1.8,
                margin: '0 0 24px 0',
                opacity: 0,
              }}
            >
              {text}
            </p>
          ))}

          <p
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: 500,
              fontSize: '16px',
              color: '#ffffff',
              margin: '48px 0 0 0',
              opacity: 0,
            }}
          >
            60 6th St, San Francisco, CA 94103
          </p>
        </div>
      </div>
    </section>
  );
}
