import { AiSection } from './components/AiSection';
import { Certifications } from './components/Certifications';
import { Contact } from './components/Contact';
import { Experience } from './components/Experience';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Nav } from './components/Nav';
import { Profile } from './components/Profile';
import { Skills } from './components/Skills';
import { Work } from './components/Work';
import { useReveal } from './hooks/useReveal';

export default function App() {
  useReveal();
  return (
    <>
      <Nav />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Profile />
        <Work />
        <Skills />
        <Experience />
        <AiSection />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
