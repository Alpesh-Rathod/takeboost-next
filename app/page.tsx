import Banner from "../components/home/Banner";
import HeroSection from "../components/home/HeroSection";
import IngredientsBanner from "../components/home/IngredientsBanner";
import Ingredientssection from "../components/home/Ingredientssection";
import HealthBadges from "../components/home/HealthBadges";

export default function Home() {
  return (
    <main className="flex flex-col flex-1 w-full bg-white">
      <div className="flex flex-col w-full bg-gradient-to-r from-[#fcb900] to-[#ff7a00] text-white">
        <Banner />
        <HeroSection />
        <IngredientsBanner />
        <Ingredientssection />
        <HealthBadges />
      </div>
    </main>
  );
}
