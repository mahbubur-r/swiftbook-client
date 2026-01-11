import Hero from "../components/Hero";
import LatestBooks from "../components/LatestBooks";
import WhyChooseUs from "../components/WhyChooseUs";
import CoverageMap from "../components/CoverageMap";
import CallToAction from "../components/CallToAction";
import HowItWorks from "../components/HowItWorks";
import PopularCategories from "../components/PopularCategories";
import Testimonials from "../components/Testimonials";
import Stats from "../components/Stats";
import FeaturedAuthors from "../components/FeaturedAuthors";
import Newsletter from "../components/Newsletter";
import FAQ from "../components/FAQ";

const Home = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen">
            <Hero />
            <Stats />
            <HowItWorks />
            <LatestBooks />
            <PopularCategories />
            <FeaturedAuthors />
            <FAQ />
            <WhyChooseUs />
            <Testimonials />
            <CoverageMap />
            <Newsletter />
        </div>
    );
};

export default Home;
