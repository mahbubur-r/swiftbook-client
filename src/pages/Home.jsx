import Hero from "../components/Hero";
import LatestBooks from "../components/LatestBooks";
import WhyChooseUs from "../components/WhyChooseUs";
import CoverageMap from "../components/CoverageMap";
import CallToAction from "../components/CallToAction";
import HowItWorks from "../components/HowItWorks";
import PopularCategories from "../components/PopularCategories";
import Testimonials from "../components/Testimonials";

const Home = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen">
            <Hero />
            <HowItWorks />
            <LatestBooks />
            <PopularCategories />
            <WhyChooseUs />
            <Testimonials />
            <CoverageMap />
            <CallToAction />
        </div>
    );
};

export default Home;
