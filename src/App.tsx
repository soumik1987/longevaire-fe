
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import LongevityGrid from './components/LongevityGrid';
import ElevateSection from './components/ElevateSection';
import Slideshow from './components/Slideshow';
import ExpertiseSection from './components/ExpertiseSection';
import FAQSection from './components/FAQSection';
import WellnessInsightSection from './components/WellnessInsightSection';
import PricingSection from './components/PricingSection';
import LuxuryRetreats from './components/LuxuryRetreats';
import Footer from './components/Footer';
import ImmersiveScrollSection from './components/ImmersiveScrollingSection';
import './styles/App.css';
import './styles/global.css';


function App() {
  return (
    <div className="App">
      <Navigation />
      <HeroSection />
      <ElevateSection />
      <LongevityGrid />
      <Slideshow />
      <ExpertiseSection />
      <FAQSection />
      <WellnessInsightSection />
      <ImmersiveScrollSection/>
      <PricingSection />
      <LuxuryRetreats />
      <Footer />
    </div>
  );
}

export default App;