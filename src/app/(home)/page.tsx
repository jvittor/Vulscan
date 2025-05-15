// import { CTASection } from './components/cta-section';
import HomeHero from './components/home-hero';
import HomeAbout from './components/home-about';
import HomeTimeline from './components/home-timeline';
import { LogoGrid } from './components/home-slide-logos';

const Home = () => {
  return (
    <div>
      <HomeHero />
      <HomeAbout />
      <HomeTimeline />
      <LogoGrid />
    </div>
  );
};


// Dados, Mapas, Documentos, Vuscan ->
// analisar localização
export default Home;
