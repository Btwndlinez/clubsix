import { useEffect, useRef } from 'react';

export default function ASCIICanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const BASE_INCREMENT = 0.04;
    const SPEED = 1;
    const CHAR_RAMP = ' .,-~:;=!*#$@';
    const COLOR = '#00f0ff';

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let increment = 0;
    let animationFrameId: number;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width;
      canvas!.height = height;
      cols = Math.floor(width / 12);
      rows = Math.floor(height / 12);
      increment = 0;
    }

    function draw() {
      ctx!.fillStyle = '#0a0a0f';
      ctx!.fillRect(0, 0, width, height);
      ctx!.fillStyle = COLOR;
      ctx!.font = '12px monospace';
      ctx!.textBaseline = 'top';

      const frequency = cols / 4;
      const time = isReduced ? 0 : performance.now() / 1000;
      const amplitudeMod = 1 + 0.3 * Math.sin(time * 0.5);

      let i = 0;
      for (let y = 0; y < rows; y++) {
        const rowOffset = y * 0.1;
        for (let x = 0; x < cols; x++) {
          const wave1 = Math.sin(
            (x + time * SPEED * 10) * ((2 * Math.PI) / frequency) + rowOffset + increment
          );
          const wave2 = Math.sin(
            (x - time * SPEED * 5) * ((2 * Math.PI) / (frequency * 1.5)) - rowOffset
          );
          const combinedWave = (wave1 + wave2) * 0.5 * amplitudeMod;
          let charIndex = Math.floor((combinedWave + 1) * 0.5 * (CHAR_RAMP.length - 1));
          charIndex = Math.max(0, Math.min(CHAR_RAMP.length - 1, charIndex));
          const opacity = 0.3 + (charIndex / (CHAR_RAMP.length - 1)) * 0.7;
          const char = CHAR_RAMP[charIndex];
          const posX = x * (width / cols);
          const posY = y * (height / rows);
          const verticalShift = Math.sin(x * 0.1 + time * 0.2) * 3;

          ctx!.save();
          ctx!.globalAlpha = opacity;
          ctx!.fillText(char, posX, posY + verticalShift);
          ctx!.restore();
          i++;
        }
      }

      increment += isReduced ? 0 : BASE_INCREMENT;
      animationFrameId = requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
