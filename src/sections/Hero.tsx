import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ASCIICanvas from '../components/ASCIICanvas';

const heroImages = [
  '/images/hero-img-1.jpg',
  '/images/hero-img-2.jpg',
  '/images/hero-img-3.jpg',
  '/images/hero-img-4.jpg',
  '/images/hero-img-5.jpg',
];

const cardTransforms = [
  'translate3d(-350px, -80px, -120px) rotateY(25deg) rotateX(5deg)',
  'translate3d(-180px, 120px, 80px) rotateY(-15deg) rotateX(-8deg)',
  'translate3d(50px, -150px, -200px) rotateY(10deg) rotateX(12deg)',
  'translate3d(250px, 50px, 50px) rotateY(-20deg) rotateX(-5deg)',
  'translate3d(380px, -100px, -80px) rotateY(30deg) rotateX(8deg)',
];

const cardTransformsMobile = [
  'translate3d(-120px, -60px, -80px) rotateY(20deg) rotateX(5deg)',
  'translate3d(-60px, 80px, 40px) rotateY(-12deg) rotateX(-6deg)',
  'translate3d(20px, -100px, -120px) rotateY(8deg) rotateX(10deg)',
  'translate3d(100px, 30px, 30px) rotateY(-15deg) rotateX(-4deg)',
  'translate3d(150px, -70px, -50px) rotateY(25deg) rotateX(6deg)',
];

export default function Hero() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInnerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const taglineRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const transforms = isMobile ? cardTransformsMobile : cardTransforms;

    // Set initial card transforms
    cardsRef.current.forEach((card, i) => {
      if (card) {
        card.style.transform = transforms[i];
      }
    });

    // Build 3D text shadow
    const animator = {
      getTextShadowSteps(count: number, startColor: string, endColor: string) {
        const extractRGB = (hex: string) => {
          const r = parseInt(hex.slice(1, 3), 16);
          const g = parseInt(hex.slice(3, 5), 16);
          const b = parseInt(hex.slice(5, 7), 16);
          return { r, g, b };
        };
        const startRGB = extractRGB(startColor);
        const endRGB = extractRGB(endColor);
        const shadows: string[] = [];
        for (let i = 1; i <= count; i++) {
          const progress = i / count;
          const r = Math.round(startRGB.r + (endRGB.r - startRGB.r) * progress);
          const g = Math.round(startRGB.g + (endRGB.g - startRGB.g) * progress);
          const b = Math.round(startRGB.b + (endRGB.b - startRGB.b) * progress);
          shadows.push(`${i}px ${i}px rgb(${r}, ${g}, ${b})`);
        }
        return shadows.join(',\n');
      },
    };

    const tl = gsap.timeline({ delay: 0.3 });

    // Animate title text shadow
    const textShadowStartSteps = animator.getTextShadowSteps(0, '#00f0ff', '#00f0ff');
    const textShadowEndSteps = animator.getTextShadowSteps(30, '#00f0ff', '#ff00aa');

    tl.fromTo(
      titleRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: 'power2.out' }
    );

    tl.fromTo(
      titleInnerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: 'power2.out' },
      0
    );

    // Animate text shadow build
    const shadowObj = { progress: 0 };
    tl.to(
      shadowObj,
      {
        progress: 1,
        duration: 2.5,
        ease: 'expo.out',
        onUpdate: () => {
          const p = shadowObj.progress;
          const endIdx = Math.floor(p * 30);
          const shadow = textShadowStartSteps.slice(0, 0) + textShadowEndSteps.slice(0, endIdx * 20);
          if (titleInnerRef.current) {
            titleInnerRef.current.style.textShadow = shadow;
          }
        },
      },
      0.3
    );

    // Set final shadow after animation
    tl.call(
      () => {
        if (titleInnerRef.current) {
          titleInnerRef.current.style.textShadow = textShadowEndSteps;
        }
      },
      [],
      2.8
    );

    // Animate cards
    tl.fromTo(
      cardsRef.current,
      { opacity: 0, z: -500 },
      { opacity: 1, z: 0, duration: 1, ease: 'cubic.out', stagger: 0.1 },
      0.8
    );

    // Animate tagline
    tl.fromTo(
      taglineRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      1.5
    );

    // Animate scroll indicator
    tl.fromTo(
      scrollIndicatorRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: 'power2.out' },
      2.0
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: '#0a0a0f',
      }}
    >
      <ASCIICanvas />

      {/* 3D Perspective Scene */}
      <div
        ref={sceneRef}
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          height: '100%',
          perspective: '1000px',
          transformStyle: 'preserve-3d',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* 3D Title */}
        <div
          ref={titleRef}
          style={{
            position: 'relative',
            fontFamily: '"Clash Display", system-ui, sans-serif',
            fontSize: '15vw',
            fontWeight: 700,
            lineHeight: 0.85,
            margin: 0,
            color: 'transparent',
            textAlign: 'center',
            transform: 'rotateY(15deg) rotateX(-10deg)',
            transformStyle: 'preserve-3d',
            opacity: 0,
          }}
          className="hero-title-responsive"
        >
          <div
            ref={titleInnerRef}
            style={{
              display: 'block',
              color: 'transparent',
              background: 'linear-gradient(180deg, #ffffff 0%, #e0e0e0 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              opacity: 0,
            }}
          >
            CLUB
            <br />
            SIX
          </div>
        </div>

        {/* 3D Carousel Cards */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            transformStyle: 'preserve-3d',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            pointerEvents: 'none',
          }}
        >
          {heroImages.map((src, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
              className="hero-card"
              style={{
                position: 'absolute',
                transformStyle: 'preserve-3d',
                transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
                willChange: 'transform',
                pointerEvents: 'auto',
                opacity: 0,
              }}
              onMouseEnter={(e) => {
                const currentTransform = window.innerWidth < 768
                  ? cardTransformsMobile[i]
                  : cardTransforms[i];
                e.currentTarget.style.transform = `${currentTransform} scale3d(1.05, 1.05, 1.05) translateZ(30px)`;
              }}
              onMouseLeave={(e) => {
                const currentTransform = window.innerWidth < 768
                  ? cardTransformsMobile[i]
                  : cardTransforms[i];
                e.currentTarget.style.transform = currentTransform;
              }}
            >
              <img
                src={src}
                alt=""
                style={{
                  width: '200px',
                  height: '300px',
                  objectFit: 'cover',
                  borderRadius: '4px',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)',
                }}
                className="hero-card-img"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Text Overlay */}
      <div
        style={{
          position: 'absolute',
          bottom: '80px',
          left: '80px',
          zIndex: 2,
          opacity: 0,
        }}
        ref={taglineRef}
        className="hero-tagline"
      >
        <p
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontWeight: 500,
            fontSize: '14px',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: '#ffffff',
            margin: 0,
          }}
        >
          THE FUTURE OF CLUBBING
        </p>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          opacity: 0,
        }}
      >
        <div
          style={{
            width: '1px',
            height: '60px',
            background: '#ffffff',
            animation: 'scroll-line 2s ease-in-out infinite',
          }}
        />
      </div>
    </section>
  );
}
