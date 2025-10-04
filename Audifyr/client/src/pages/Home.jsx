import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import FAQ from "../components/FAQ";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";

function Home() {
  return (
    <div className="home">
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
}

export default Home;
