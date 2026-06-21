import { useState, useRef, useEffect } from 'react';

export default function FloatingMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Show player after scrolling past hero
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button
      onClick={togglePlay}
      style={{
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        zIndex: 90,
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #00f0ff, #ff00aa)',
        border: '2px solid rgba(255,255,255,0.2)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: isPlaying
          ? '0 6px 32px rgba(0, 240, 255, 0.6)'
          : '0 4px 24px rgba(0, 240, 255, 0.4)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease, opacity 0.5s ease',
        transform: isVisible ? 'scale(1)' : 'scale(0)',
        opacity: isVisible ? 1 : 0,
        animation: isPlaying ? 'pulse-glow 2s ease-in-out infinite' : 'none',
      }}
      onMouseEnter={(e) => {
        if (isVisible) {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow =
            '0 6px 32px rgba(0, 240, 255, 0.6)';
        }
      }}
      onMouseLeave={(e) => {
        if (isVisible) {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = isPlaying
            ? '0 6px 32px rgba(0, 240, 255, 0.6)'
            : '0 4px 24px rgba(0, 240, 255, 0.4)';
        }
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '24px',
          height: '24px',
        }}
      >
        {/* Play Icon */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="#0a0a0f"
          style={{
            position: 'absolute',
            inset: 0,
            opacity: isPlaying ? 0 : 1,
            transition: 'opacity 0.2s ease',
          }}
        >
          <polygon points="5,3 19,12 5,21" />
        </svg>
        {/* Pause Icon */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="#0a0a0f"
          style={{
            position: 'absolute',
            inset: 0,
            opacity: isPlaying ? 1 : 0,
            transition: 'opacity 0.2s ease',
          }}
        >
          <rect x="6" y="4" width="4" height="16" />
          <rect x="14" y="4" width="4" height="16" />
        </svg>
      </div>
      <audio
        ref={audioRef}
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        loop
      />
    </button>
  );
}
