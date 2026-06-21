import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const genres = ['TECHNO', 'HOUSE', 'DRUM & BASS', 'EXPERIMENTAL'];

export default function Music() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current.children,
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
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === sectionRef.current) t.kill();
      });
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      if (intervalRef.current) clearInterval(intervalRef.current);
    } else {
      audioRef.current.play().catch(() => {});
      intervalRef.current = setInterval(() => {
        if (audioRef.current) {
          const prog =
            (audioRef.current.currentTime / audioRef.current.duration) * 100;
          setProgress(prog || 0);
        }
      }, 100);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <section
      id="music"
      ref={sectionRef}
      style={{
        background: '#0a0a0f',
        padding: '120px 80px',
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
      className="music-section"
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
          MUSIC
        </h2>

        <div
          ref={contentRef}
          style={{
            display: 'flex',
            gap: '60px',
          }}
          className="music-layout"
        >
          {/* Audio Player */}
          <div
            style={{
              flex: '0 0 60%',
              border: '1px solid rgba(0, 240, 255, 0.3)',
              borderRadius: '8px',
              padding: '32px',
              background: '#12121a',
              opacity: 0,
            }}
          >
            <h3
              style={{
                fontFamily: '"Clash Display", system-ui, sans-serif',
                fontWeight: 600,
                fontSize: '24px',
                color: '#ffffff',
                margin: '0 0 8px 0',
              }}
            >
              Club Six Resident Mix 001
            </h3>
            <p
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontWeight: 400,
                fontSize: '16px',
                color: '#a0a0b0',
                margin: '0 0 24px 0',
              }}
            >
              Mixed by Kairos
            </p>

            {/* Waveform Visualization */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: '3px',
                height: '60px',
                marginBottom: '24px',
              }}
            >
              {Array.from({ length: 40 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    background: 'linear-gradient(to top, #00f0ff, #ff00aa)',
                    borderRadius: '2px',
                    height: '100%',
                    transform: `scaleY(${0.2 + Math.random() * 0.8})`,
                    transformOrigin: 'bottom',
                    animation: `waveform ${0.5 + Math.random() * 0.5}s ease-in-out infinite alternate`,
                    opacity: isPlaying ? 1 : 0.4,
                  }}
                />
              ))}
            </div>

            {/* Controls */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
              }}
            >
              <button
                onClick={togglePlay}
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #00f0ff, #ff00aa)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {isPlaying ? (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="#0a0a0f"
                  >
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                ) : (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="#0a0a0f"
                  >
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                )}
              </button>

              {/* Progress Bar */}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    height: '4px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '2px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${progress}%`,
                      background:
                        'linear-gradient(135deg, #00f0ff, #ff00aa)',
                      borderRadius: '2px',
                      transition: 'width 0.1s linear',
                    }}
                  />
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '8px',
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
                    0:00
                  </span>
                  <span
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontWeight: 400,
                      fontSize: '12px',
                      color: '#a0a0b0',
                    }}
                  >
                    1:24:00
                  </span>
                </div>
              </div>
            </div>

            <audio
              ref={audioRef}
              src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
              loop
            />
          </div>

          {/* Description */}
          <div
            style={{
              flex: '0 0 40%',
              opacity: 0,
            }}
          >
            <p
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontWeight: 400,
                fontSize: '18px',
                color: '#a0a0b0',
                lineHeight: 1.8,
                margin: '0 0 32px 0',
              }}
            >
              Resident DJ mixes, live recordings, and exclusive sets from Club
              Six. Updated weekly with new underground sounds spanning techno,
              house, drum & bass, and experimental electronic.
            </p>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              {genres.map((genre) => (
                <span
                  key={genre}
                  style={{
                    background: 'rgba(0, 240, 255, 0.1)',
                    color: '#00f0ff',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontWeight: 500,
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    padding: '8px 16px',
                    borderRadius: '20px',
                  }}
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes waveform {
          0% { transform: scaleY(0.3); }
          100% { transform: scaleY(1); }
        }
      `}</style>
    </section>
  );
}
