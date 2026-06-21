import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const featuredArticle = {
  image: '/images/news-1.jpg',
  date: 'JAN 15, 2025',
  title: "Club Six Reopens: A New Chapter for San Francisco's Legendary Nightclub",
};

const smallArticles = [
  {
    image: '/images/news-2.jpg',
    title: 'Behind the Decks: An Interview with Resident DJ Kairos',
    excerpt:
      'We sat down with Kairos to discuss his creative process, favorite venues, and what makes Club Six special.',
  },
  {
    image: '/images/news-3.jpg',
    title: 'New Digital Art Exhibition Opens in The White Room',
    excerpt:
      'Experience "Luminous Frequencies," an immersive digital art installation running through March.',
  },
];

export default function News() {
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
      id="news"
      ref={sectionRef}
      style={{
        background: '#12121a',
        padding: '120px 80px',
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
      className="news-section"
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: '60px',
          }}
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
            NEWS
          </h2>
          <span
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: 500,
              fontSize: '14px',
              color: '#00f0ff',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              cursor: 'pointer',
            }}
          >
            View All →
          </span>
        </div>

        {/* Articles Layout */}
        <div
          style={{
            display: 'flex',
            gap: '32px',
          }}
          className="news-layout"
        >
          {/* Featured Article */}
          <div
            ref={(el) => {
              if (el) cardsRef.current[0] = el;
            }}
            style={{
              flex: '0 0 60%',
              position: 'relative',
              borderRadius: '4px',
              overflow: 'hidden',
              cursor: 'pointer',
              opacity: 0,
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <img
              src={featuredArticle.image}
              alt={featuredArticle.title}
              style={{
                width: '100%',
                aspectRatio: '16/9',
                objectFit: 'cover',
                display: 'block',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '32px',
                background:
                  'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
              }}
            >
              <span
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontWeight: 500,
                  fontSize: '12px',
                  color: '#00f0ff',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                {featuredArticle.date}
              </span>
              <h3
                style={{
                  fontFamily: '"Clash Display", system-ui, sans-serif',
                  fontWeight: 600,
                  fontSize: '36px',
                  color: '#ffffff',
                  margin: 0,
                  lineHeight: 1.2,
                }}
                className="featured-title"
              >
                {featuredArticle.title}
              </h3>
            </div>
          </div>

          {/* Small Articles */}
          <div
            style={{
              flex: '0 0 40%',
              display: 'flex',
              flexDirection: 'column',
              gap: '32px',
            }}
            className="small-articles"
          >
            {smallArticles.map((article, i) => (
              <div
                key={i}
                ref={(el) => {
                  if (el) cardsRef.current[i + 1] = el;
                }}
                style={{
                  display: 'flex',
                  gap: '16px',
                  cursor: 'pointer',
                  opacity: 0,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  borderRadius: '4px',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow =
                    '0 12px 40px rgba(0,0,0,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <img
                  src={article.image}
                  alt={article.title}
                  style={{
                    width: '40%',
                    aspectRatio: '1/1',
                    objectFit: 'cover',
                    borderRadius: '4px',
                    flexShrink: 0,
                  }}
                />
                <div style={{ padding: '8px 0' }}>
                  <h4
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontWeight: 500,
                      fontSize: '20px',
                      color: '#ffffff',
                      margin: '0 0 8px 0',
                      lineHeight: 1.3,
                    }}
                  >
                    {article.title}
                  </h4>
                  <p
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontWeight: 400,
                      fontSize: '14px',
                      color: '#a0a0b0',
                      margin: 0,
                      lineHeight: 1.5,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {article.excerpt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
