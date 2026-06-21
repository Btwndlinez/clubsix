import './App.css';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import Navigation from './components/Navigation';
import FloatingMusicPlayer from './components/FloatingMusicPlayer';
import Hero from './sections/Hero';
import Events from './sections/Events';
import Artists from './sections/Artists';
import Art from './sections/Art';
import News from './sections/News';
import Music from './sections/Music';
import VIPTables from './sections/VIPTables';
import About from './sections/About';
import Footer from './sections/Footer';

function App() {
  useSmoothScroll();

  return (
    <div style={{ background: '#0a0a0f', minHeight: '100vh' }}>
      <Navigation />
      <Hero />
      <Events />
      <Artists />
      <Art />
      <News />
      <Music />
      <VIPTables />
      <About />
      <Footer />
      <FloatingMusicPlayer />
    </div>
  );
}

export default App;
